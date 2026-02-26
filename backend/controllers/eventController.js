import Event from "../models/Event.js";
import AdminLog from "../models/AdminLog.js"; // ✅ NEW import


/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private (college_admin, super_admin)
 */
export const createEvent = async (req, res, next) => {
  try {
    const {
      college_id,
      title,
      description,
      category,
      location,
      start_date,
      end_date,
    } = req.body;

    // Basic validation
    if (
      !college_id ||
      !title ||
      !description ||
      !category ||
      !location ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      college_id,
      title,
      description,
      category,
      location,
      start_date,
      end_date,
      createdBy: req.user.id,
    });

    // ✅ Automatic admin log
    await AdminLog.create({
      action: `Created event: ${event.title}`,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email college")
      .sort({ start_date: 1 });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get single event by ID
 * @route   GET /api/events/:id
 * @access  Public
 */
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email college");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Update event
 * @route   PUT /api/events/:id
 * @access  Private (college_admin, super_admin)
 */
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership OR super admin check
    if (
      event.createdBy.toString() !== req.user.id.toString() &&
      req.user.role !== "super_admin"
    ) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // ✅ Automatic admin log
    await AdminLog.create({
      action: `Updated event: ${updatedEvent.title}`,
      user_id: req.user.id,
    });

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private (college_admin, super_admin)
 */
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership OR super admin check
    if (
      event.createdBy.toString() !== req.user.id.toString() &&
      req.user.role !== "super_admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();

    // ✅ Automatic admin log
    await AdminLog.create({
      action: `Deleted event: ${event.title}`,
      user_id: req.user.id,
    });

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
