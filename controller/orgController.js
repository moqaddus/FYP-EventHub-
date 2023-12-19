import orgSchema from '../models/organization.js';
import Event from '../models/event.js';
import userSchema from '../models/user.js'

 export const addOrganization = async (req, res) => {
    try {
      const { ID, Status, Description } = req.body; // Assuming events contain names of events
  
      // Find the user by ID provided in the request
      const user = await userSchema.findById(ID);
  
      if (!user || user.type !== 'OrgAdmin') {
        return res.status(403).json({ message: 'Unauthorized: User is not an OrgAdmin' });
      }
      const existingOrganization = await orgSchema.findOne({ ID: user._id });

      if (existingOrganization) {
        return res.status(400).json({ message: 'User has already created an organization' });
      }
      // Array to store event IDs associated with the organization
      let eventIds = [];
  
     
  
      // Create a new organization object
      const organization = new orgSchema({
        ID: ID, // Reference to the User document
        Status: Status,
        Description: Description,
      });
  
     
  
      // Save the organization to the database
      await organization.save();
  
      res.status(201).json({ organization });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params; // Organization ID

    // Destructure the fields from the request body
    const {
      Email,
      Username,
      Password,
      Status,
      Description
    } = req.body;

    // Find the organization by ID
    const organization = await orgSchema.findById(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Update organization fields if provided
    if (Status) {
      organization.Status = Status;
    }
    if (Description) {
      organization.Description = Description;
    }

    // Check if Email, Username, or Password is provided
    if (Email || Username || Password) {
      // Find the user associated with the organization
      const user = await userSchema.findById(organization.ID);

      if (!user) {
        return res.status(404).json({ message: 'User not found for the organization' });
      }

      // Update user fields if provided
      if (Email) {
        user.Email = Email;
      }
      if (Username) {
        user.Username = Username;
      }
      if (Password) {
        user.Password = Password;
      }

      // Save the updated user details
      await user.save();
    }

    // Save the updated organization details
    await organization.save();

    res.status(200).json({ organization });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrganization = async (req, res) => {
  try {
    const { id } = req.params; // Organization ID

    // Find the organization by ID
    const organization = await orgSchema.findById(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Find the associated user using the ID stored in the organization
    const user = await userSchema.findById(organization.ID);

    if (!user) {
      return res.status(404).json({ message: 'User not found for the organization' });
    }

    // Extract necessary fields for response
    const { Email, Username ,Password} = user; // Fields from UserSchema
    const { Status, Description } = organization; // Fields from OrganizationSchema

    // Construct and send the response
    res.status(200).json({
      Email,
      Username,
      Password,
      Status,
      Description
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};