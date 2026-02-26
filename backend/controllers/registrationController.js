import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import AdminLog from "../models/AdminLog.js"; // ✅ NEW import


/**
 * @desc    Student registers for an event
 * @route   POST /api/registrations
 * @access  Private (student)
 */
export const registerForEvent = async (req, res, next) => {
  try {
    const { event_id } = req.body;

    if (!event_id) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Ensure event exists
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create registration (unique index prevents duplicates)
    const registration = await Registration.create({
      event_id,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Registration submitted and pending approval",
      registration,
    });
  } catch (error) {
    // Duplicate registration error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already registered for this event" });
    }
    next(error);
  }
};


/**
 * @desc    Student views own registrations
 * @route   GET /api/registrations/my
 * @access  Private (student)
 */
export const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user_id: req.user.id })
      .populate("event_id")
      .sort({ timestamp: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Admin views registrations for an event
 * @route   GET /api/registrations/event/:eventId
 * @access  Private (college_admin, super_admin)
 */
export const getEventRegistrations = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ event_id: eventId })
      .populate("user_id", "name email college")
      .sort({ timestamp: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Approve registration
 * @route   PUT /api/registrations/:id/approve
 * @access  Private (college_admin, super_admin)
 */
export const approveRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "approved";
    await registration.save();

    // ✅ Automatic admin log
    await AdminLog.create({
      action: `Approved registration ${registration._id} for event ${registration.event_id}`,
      user_id: req.user.id,
    });

    res.status(200).json({
      message: "Registration approved",
      registration,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Reject registration
 * @route   PUT /api/registrations/:id/reject
 * @access  Private (college_admin, super_admin)
 */
export const rejectRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "rejected";
    await registration.save();

    // ✅ Automatic admin log
    await AdminLog.create({
      action: `Rejected registration ${registration._id} for event ${registration.event_id}`,
      user_id: req.user.id,
    });

    res.status(200).json({
      message: "Registration rejected",
      registration,
    });
  } catch (error) {
    next(error);
  }
};
