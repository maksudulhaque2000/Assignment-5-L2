import { User } from '../user/user.model';
import { Driver } from '../driver/driver.model';
import { Ride } from '../ride/ride.model';

const getAllUsers = async () => User.find({ role: 'rider' });
const getAllDrivers = async () => User.find({ role: 'driver' }).populate({ path: 'driverProfile', model: 'Driver' });
const getAllRides = async () => Ride.find().populate('riderId driverId', 'name email');

const manageDriverApproval = async (driverUserId: string, status: 'approved' | 'suspended') => {
  const driver = await Driver.findOne({ userId: driverUserId });
  if (!driver) {
    throw new Error('Driver not found');
  }
  driver.approvalStatus = status;
  if (status === 'suspended') {
    driver.availability = 'offline';
  }
  await driver.save();
  return driver;
};

const manageUserBlockStatus = async (userId: string, isBlocked: boolean) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.isBlocked = isBlocked;
  await user.save();
  return user;
};

export const adminServices = {
  getAllUsers,
  getAllDrivers,
  getAllRides,
  manageDriverApproval,
  manageUserBlockStatus,
};