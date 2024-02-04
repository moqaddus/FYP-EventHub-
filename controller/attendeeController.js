import Attendee from '../models/attendee.js'; 
import Event from '../models/event.js';
import PlatformUser from '../models/platformUser.js';

export const createTicketAndAttendee = async (req, res) => {
  try {
    const { UserID, EventID } = req.body;

    // Check if the provided Event ID exists
    const eventExists = await Event.findById(EventID);
    if (!eventExists) {
      return res.status(400).json({ error: 'Event not found' });
    }

    // Check if the provided User ID exists
    const userExists = await PlatformUser.findById(UserID);
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }
    const existingAttendee = await Attendee.findOne({ UserID, EventID });
    if (existingAttendee) {
      return res.status(400).json({ error: 'Attendee already exists for this user and event' });
    }

    let ticketstotal=eventExists.TotalTickets;
    if(ticketstotal<1)
    {
      return res.status(400).json({ error: 'Unsufficient Tickets' });
    }
    let ticketsold=eventExists.SoldTickets;

    if(ticketstotal===ticketsold)
    {
      return res.status(400).json({ error: 'All tickets are sold' });
    }
   
    await Event.findByIdAndUpdate(
      EventID,
      { $set: { SoldTickets: ticketsold+1 } },
      { new: true }
    );
    let ticketCode=ticketsold+100001;
    // Create a new attendee associated with the ticket
    const attendee = new Attendee({ UserID, EventID, TicketCode:ticketCode, CheckedIn: false, Rating: null, Review: null });
    await attendee.save();

    // Respond with the created ticket and attendee
    res.status(201).json({ attendee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getAttendeesForEvent = async (req, res) => {
  try {
    const eventID = req.params.eventId;

    const eventExists = await Event.findById(eventID);

    if (!eventExists) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Retrieve all messages for the specified chat
    const attendees = await Attendee.find({ EventID: eventID });

    res.status(200).json(attendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const postReviewAndRating = async (req, res) => {
    try {
  
      // Check if the provided Attendee ID exists
      const attendeeId = req.params.attendeeId;
      //const {id:attendeeId}=req.params
      const attendeeExists = await Attendee.findById(attendeeId);
      if (!attendeeExists) {
        return res.status(400).json({ error: 'Attendee not found' });
      }
      if(attendeeExists.CheckedIn===true)
      {
        return res.status(400).json({ error: 'Attendee has already posted the rating' });
      }
      const {rating, review } = req.body;
      // Update the attendee with the provided rating and review
      await Attendee.findByIdAndUpdate(
        attendeeId,
        { $set: { CheckedIn:true, Rating: rating, Review: review } },
        { new: true }
      );
  
      res.status(200).json({ message: 'Review and rating posted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
