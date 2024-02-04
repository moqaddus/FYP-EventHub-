// messageController.js
import Message from '../models/message.js';
import Chat from '../models/chat.js';
import User from '../models/user.js';

// // Controller function to create a new message
// export const createMessage = async (req, res) => {
//   try {
//     const {Message: messageText, Sender, Receiver } = req.body;

//     // Validate that Sender and Receiver exist in the User collection
//     const senderUser = await User.findById(Sender);
//     const receiverUser = await User.findById(Receiver);

//     if (!senderUser || !receiverUser) {
//       return res.status(400).json({ error: 'Sender or Receiver not found' });
//     }

//     // Check if a chat already exists between the two users
//     const existingChat = await Chat.findOne({
//       $or: [
//         { $and: [{ User1: Sender }, { User2: Receiver }] },
//         { $and: [{ User1: Receiver }, { User2: Sender }] },
//       ],
//     });

//     let chatId;

//     // If a chat doesn't exist, create a new chat
//     if (!existingChat) {
//       const newChat = new Chat({
//        // ID, // Add your logic to generate a unique ID
//         User1: Sender,
//         User2: Receiver,
//       });
//       const savedChat = await newChat.save();
//       chatId = savedChat._id;
//     } else {
//       chatId = existingChat._id;
//     }

//     // Create a new message using the chat ID
//     const newMessage = new Message({
//       //ID,
//       Message: messageText,
//       Sender,
//       Receiver,
//       ChatID: chatId,
//     });

//     await newMessage.save();

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createMessage = async (req, res) => {
  try {
    const { Message: messageText, Sender, Receiver } = req.body;

    // Validate that Sender and Receiver exist in the User collection
    const senderUser = await User.findById(Sender);
    const receiverUser = await User.findById(Receiver);

    if (!messageText || !senderUser || !receiverUser) {
      return res.status(400).json({ error: 'message or Sender or Receiver not found' });
    }

    // Check if a chat already exists between the two users
    const existingChat = await Chat.findOne({
      $or: [
        { $and: [{ User1: Sender }, { User2: Receiver }] },
        { $and: [{ User1: Receiver }, { User2: Sender }] },
      ],
    });

    let chatId;

    // If a chat doesn't exist, create a new chat
    if (!existingChat) {
      const newChat = new Chat({
        //User1: mongoose.Types.ObjectId(Sender),
        //User2: mongoose.Types.ObjectId(Receiver),
        User1:Sender,
        User2:Receiver
      });
      const savedChat = await newChat.save();
      chatId = savedChat._id;
    } else {
      chatId = existingChat._id;
    }

    // Create a new message using the chat ID
    const newMessage = new Message({
      Message: messageText,
      Sender,
      Receiver,
      ChatID: chatId,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessagesForChat = async (req, res) => {
    try {
      const chatId = req.params.chatId;
  
      const chatExists = await Chat.findById(chatId);
  
      if (!chatExists) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      // Retrieve all messages for the specified chat
      const messages = await Message.find({ ChatID: chatId });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

