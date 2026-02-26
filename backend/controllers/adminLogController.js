import AdminLog from "../models/AdminLog.js";

/**
 * @desc    Get all admin logs
 * @route   GET /api/admin-logs
 * @access  Private (super_admin)
 */
export const getAllAdminLogs = async (req, res, next) => {
  try {
    const logs = await AdminLog.find()
      .populate("user_id", "name email role")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get logs for a specific admin user
 * @route   GET /api/admin-logs/user/:userId
 * @access  Private (super_admin)
 */
export const getLogsByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const logs = await AdminLog.find({ user_id: userId })
      .populate("user_id", "name email role")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get logs of the currently logged-in admin
 * @route   GET /api/admin-logs/me
 * @access  Private (college_admin, super_admin)
 */
export const getMyAdminLogs = async (req, res, next) => {
  try {
    const logs = await AdminLog.find({ user_id: req.user.id })
      .populate("user_id", "name email role")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Create an admin log entry
 * @note    Usually called internally after admin actions
 * @route   POST /api/admin-logs
 * @access  Private (college_admin, super_admin)
 */
export const createAdminLog = async (req, res, next) => {
  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    const log = await AdminLog.create({
      action,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Admin log created",
      log,
    });
  } catch (error) {
    next(error);
  }
};
