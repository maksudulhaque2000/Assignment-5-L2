import { Request, Response } from 'express';
import { User } from '../user/user.model';
import { Driver } from '../driver/driver.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, vehicleDetails, licenseNumber } = req.body;

    const newUser = new User({ name, email, password, role });
    const savedUser = await newUser.save();

    if (role === 'driver') {
      const newDriver = new Driver({
        userId: savedUser._id,
        vehicleDetails,
        licenseNumber,
      });
      await newDriver.save();
    }

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: 'User is blocked' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            config.jwt_secret as string,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

export const authControllers = { registerUser, loginUser };