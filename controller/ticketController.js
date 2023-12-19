import Ticket from '../models/ticket.js'; 
import Attendee from '../models/attendee.js';
import Event from '../models/event.js'; 
import PlatformUser from '../models/platformUser.js';

// Controller function to create a new ticket and attendee
export const createTicketAndAttendee = async (req, res) => {
  try {
    const { ID, UserID, EventID, TicketCode } = req.body;

    // Check if the provided Event ID exists
    const eventExists = await Event.findById(EventID);
    if (!eventExists) {
      return res.status(400).json({ error: 'Event not found' });
    }

    // Check if the provided User ID exists
    const userExists = await PlatformUser.findById(User);
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }
    let tickets=eventExists.TotalTickets;
    if(tickets<=0)
    {
      return res.status(400).json({ error: 'Unsufficient Tickets' });
    }
    // Create a new ticket
    const ticket = new Ticket({ ID, UserID, EventID, TicketCode });
    await ticket.save();

    await Event.findByIdAndUpdate(
      EventID,
      { $set: { TotalTickets: tickets-1 } },
      { new: true }
    );

    // Create a new attendee associated with the ticket
    const attendee = new Attendee({ ID, Ticket: ticket._id, CheckedIn: false, Rating: null, Review: null });
    await attendee.save();

    // Respond with the created ticket and attendee
    res.status(201).json({ ticket, attendee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


