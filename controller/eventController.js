import Event from '../models/event.js';
import Interest from '../models/interest.js';
import PlatformAdmin from '../models/platformAdmin.js';
import Organization from '../models/organization.js';

export const addEvent = async (req, res) => {
  try {
    const {
      Name,
      Description,
      EventDate,
      StartTime,
      EndTime,
      Location,
      TotalTickets,
      SoldTickets,
      TicketPrice,
      eventTags,
      Status,
      PlatformAdminName,
      //OrganizationID,
    } = req.body;
    const {id:UserID} = req.user;
   
    const organization_1 = await Organization.findOne({ID:UserID});
    console.log(organization_1);
    if (!organization_1) {
      return res.status(404).json({ message: 'Organization not found for the user' });
    }

    const OrganizationID = organization_1._id;



    // Check if eventTags array is provided
    let eventTagIds = [];
    if (eventTags && eventTags.length > 0) {
      // Find interest IDs for the provided interest names
      const interests = await Interest.find({ Name: { $in: eventTags } });
      eventTagIds = interests.map((interest) => interest._id);
    }

    let approvedBy = null;
    // Check if PlatformAdminName is provided
    if (PlatformAdminName) {
      // Find PlatformAdmin by name
      const platformAdmin = await PlatformAdmin.findOne({ Name: PlatformAdminName });
      if (platformAdmin) {
        approvedBy = platformAdmin._id;
      }
    }

    let organization = null;
    // Check if OrganizationID is provided
    if (OrganizationID) {
      // Find Organization by ID
      organization = await Organization.findById(OrganizationID);

      // If no organization is found, return an error
      if (!organization) {
        return res.status(404).json({ message: 'No such organization exists' });
      }
    }

    // Create a new event object
    const event = new Event({
      Name,
      Description,
      EventDate,
      StartTime,
      EndTime,
      Location,
      TotalTickets,
      SoldTickets,
      TicketPrice,
      eventTags: eventTagIds,
      Status,
      ApprovedBy: approvedBy,
      Organization: organization ? organization._id : null,
    });

    // Save the event to the database
    await event.save();

    // Update OrganizationEvents array in Organization model if organization is found
    if (organization) {
      organization.OrganizationEvents.push(event._id);
      await organization.save();
    }

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID

    // Destructure the fields from the request body
    const {
      Name,
      Description,
      EventDate,
      StartTime,
      EndTime,
      Location,
      Status
      // Add other fields as required
    } = req.body;

    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update event fields if provided
    if (Name) {
      event.Name = Name;
    }
    if (Description) {
      event.Description = Description;
    }
    if (EventDate) {
      event.EventDate = EventDate;
    }
    if (StartTime) {
      event.StartTime = StartTime;
    }
    if (EndTime) {
      event.EndTime = EndTime;
    }
    if (Location) {
      event.Location = Location;
    }
    if (Status) {
      event.Status = Status;
    }
    // Add other field updates as needed

    // Save the updated event details
    await event.save();

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllOrganizationEvents = async (req, res) => {
  try {
    //const { id } = req.params; // Organization ID

    const {id:UserID} = req.user;
   
    const organization_1 = await Organization.findOne({ID:UserID});
    console.log(organization_1);
    if (!organization_1) {
      return res.status(404).json({ message: 'Organization not found for the user' });
    }

    const iid = organization_1._id;



    // Find the organization by ID
    // const organization = await Organization.findById(iid);

    // if (!organization) {
    //   return res.status(404).json({ message: 'Organization not found' });
    // }

    // Find all events associated with the organization
    const events = await Event.find({ Organization: iid });

    // Count of events for the organization
    const eventCount = events.length;

    res.status(200).json({ events, eventCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleEvent = async (req, res) => {
  try {
   // const { orgId, eventId } = req.params; // Organization ID and Event ID

       const { eventId } = req.params;

       const {id:UserID} = req.user;
   
       const organization_1 = await Organization.findOne({ID:UserID});
       console.log(organization_1);
       if (!organization_1) {
         return res.status(404).json({ message: 'Organization not found for the user' });
       }
   
       const orgId = organization_1._id;

    // Find the organization by ID
    // const organization = await Organization.findById(orgId);

    // if (!organization) {
    //   return res.status(404).json({ message: 'Organization not found' });
    // }

    // Find the event by ID associated with the organization
    const event = await Event.findOne({ _id: eventId, Organization: orgId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found for the organization' });
    }

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteOrganizationEvent = async (req, res) => {
  try {
    //const { orgId, eventId } = req.params; // Organization ID and Event ID

    // Find the organization by ID
    // const organization = await Organization.findById(orgId);

    // if (!organization) {
    //   return res.status(404).json({ message: 'Organization not found' });
    // }

    const { eventId } = req.params;

       const {id:UserID} = req.user;
   
       const organization = await Organization.findOne({ID:UserID});
       console.log(organization);
       if (!organization) {
         return res.status(404).json({ message: 'Organization not found for the user' });
       }
   
       const orgId = organization._id;

    // Find the event by ID associated with the organization
    const event = await Event.findOne({ _id: eventId, Organization: orgId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found for the organization' });
    }

    // Remove the event ID from OrganizationEvents array in the organization
    organization.OrganizationEvents = organization.OrganizationEvents.filter(
      (eventId) => eventId.toString() !== event._id.toString()
    );

    // Save the updated organization with removed event ID
    await organization.save();

    // Delete the event from Event collection
    await Event.deleteOne({ _id: eventId });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};