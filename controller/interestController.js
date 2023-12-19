import Interests from '../models/interests.js';
import User from '../models/user.js';

export const updateUserInterests = async (req, res) => {
  try {
    const {
         userID,
         interests,
         newInterests } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'UserID is required for updating user interests' });
    }

    // Check if the user exists
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming interests are valid since they are hardcoded
    if (interests && Array.isArray(interests)) {
      user.Interests = interests;
    }

    // If new interests are provided, add them
    if (newInterests && Array.isArray(newInterests)) {
      // Filter out new interests that the user already has
      const uniqueNewInterests = newInterests.filter(newInterest => !user.Interests.includes(newInterest));

      // Add the unique new interests to the user's interests
      user.Interests = [...user.Interests, ...uniqueNewInterests];

      // Add the user to the new interests' users
      for (const newInterestID of uniqueNewInterests) {
        const newInterest = await Interests.findById(newInterestID);
        if (newInterest) {
          newInterest.Users.push(userID);
          await newInterest.save();
        }
      }
    }

    await user.save();

    res.status(200).json({ message: 'User interests updated successfully', interests: user.Interests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addUserInterest = async (req, res) => {
  try {
    const { userID, interestID } = req.body;

    if (!userID || !interestID) {
      return res.status(400).json({ message: 'UserID and InterestID are required for adding user interest' });
    }

    // Check if the user exists
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the interest exists
    const interest = await Interests.findById(interestID);

    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    // Check if the user already has the interest
    if (user.Interests.includes(interestID)) {
      return res.status(400).json({ message: 'User already has this interest' });
    }

    // Add the interest to the user's interests
    user.Interests.push(interestID);
    await user.save();

    // Add the user to the interest's users
    interest.Users.push(userID);
    await interest.save();

    res.status(200).json({ message: 'Interest added to user successfully', interest: interestID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserInterest = async (req, res) => {
  try {
    const { userID, interestID } = req.body;

    if (!userID || !interestID) {
      return res.status(400).json({ message: 'UserID and InterestID are required for deleting user interest' });
    }

    // Check if the user exists
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the specified interest
    if (!user.Interests.includes(interestID)) {
      return res.status(400).json({ message: 'User does not have this interest' });
    }

    // Remove the interest from the user's interests
    user.Interests = user.Interests.filter(id => id !== interestID);
    await user.save();

    // Remove the user from the interest's users
    await Interests.findByIdAndUpdate(interestID, { $pull: { Users: userID } });

    res.status(200).json({ message: 'User interest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
