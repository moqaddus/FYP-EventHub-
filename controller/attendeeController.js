// controllers/attendeeController.js
import Attendee from '../models/attendee.js'; 
import Event from '../models/event.js';


export const getAttendeesForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Assuming eventId is part of the route parameters

    // Check if the provided Event ID exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(400).json({ error: 'Event not found' });
    }

    // Retrieve all attendees for the specified event
    const attendees = await Attendee.find({ 'Ticket.Event': eventId }).populate('Ticket');

    // Respond with the list of attendees
    res.status(200).json(attendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const postReviewAndRating = async (req, res) => {
    try {
      const {attendeeId, rating, review } = req.body;
  
      // Check if the provided Attendee ID exists
      const attendeeExists = await Attendee.findById(attendeeId);
      if (!attendeeExists) {
        return res.status(400).json({ error: 'Attendee not found' });
      }
  
      // Update the attendee with the provided rating and review
      await Attendee.findByIdAndUpdate(
        attendeeId,
        { $set: { Rating: rating, Review: review } },
        { new: true }
      );
  
      res.status(200).json({ message: 'Review and rating posted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
