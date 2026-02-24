import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      startDate,
      endDate,
      location,
      description,
    } = req.body;

    // Validation
    if (
      !title ||
      !category ||
      !startDate ||
      !endDate ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    const event = await Event.create({
      title,
      category,
      startDate,
      endDate,
      location,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};