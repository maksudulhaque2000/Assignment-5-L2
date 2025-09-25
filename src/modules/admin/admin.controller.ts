import { Request, Response } from 'express';
import { adminServices } from './admin.service';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllUsers();
    res
      .status(200)
      .json({ success: true, message: 'Users fetched successfully', data: result });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const manageDriverApproval = async (req: Request, res: Response) => {
  try {
    const { driverId } = req.params;
    const { status } = req.body;
    const result = await adminServices.manageDriverApproval(driverId, status);
    res
      .status(200)
      .json({
        success: true,
        message: `Driver status updated to ${status}`,
        data: result,
      });
  } catch (error: unknown) {
    res.status(400).json({
      success: false,
      message: 'Failed to update driver status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const manageUserBlockStatus = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { isBlocked } = req.body;
        const result = await adminServices.manageUserBlockStatus(userId, isBlocked);
        res.status(200).json({ success: true, message: `User block status updated`, data: result });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: 'Failed to update user block status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const adminControllers = {
  getAllUsers,
  manageDriverApproval,
  manageUserBlockStatus,
};