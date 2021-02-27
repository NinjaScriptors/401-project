const { ChatRoomModel } = require('../../../auth/models/chatRoom/chatRoom');
const UserModel = require('../../../auth/models/users/user-schema')
const chatMessageSchema = require('../../../auth/models/chatMessages/ChatMessage')
const { CHAT_ROOM_TYPES } = require('../../../auth/models/chatRoom/chatRoom')
const MongoClient = require('mongodb').MongoClient;

async function initiateChat(userIds, type, chatInitiator) {
  try {
    const availableRoom = await ChatRoomModel.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await ChatRoomModel.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}

module.exports = {


  initiate: async (req, res) => {

    console.log("before validation ")

    // const validation = makeValidation(types => ({
    //   payload: req.body,
    //   checks: {
    //     userIds: {
    //       type: types.array,
    //       options: { unique: true, empty: false, stringOnly: true }
    //     },

    //   }
    // }));
    // if (!validation.success) return res.status(400).json({ ...validation });

    console.log(req.body.userIds)
    const { userIds, type } = req.body;
    const chatInitiator = req.user._id;
    console.log("chatInitiator >>>", chatInitiator)

    const allUserIds = [...userIds, chatInitiator];
    console.log("allUserIds >>>", allUserIds)

    const chatRoom = await initiateChat(allUserIds, type, chatInitiator);
    return res.status(200).json({ success: true, chatRoom });


  },






  postMessage: async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.user._id;
      let newMessage = new chatMessageSchema.chatMessageSchema({
        chatRoomId: roomId,
        message: messagePayload,
        postedByUser: currentLoggedUser,
        readByRecipients: { readByUserId: currentLoggedUser }
      })
      let post = await newMessage.save();
      console.log("post id >>>", post)
      global.io.sockets.in(roomId).emit('new message', { message: post });
      // global.io.sockets.in(roomId).on("new message", payload=>{
      //   console.log("paylllooooaaaaadddddddd >>>",payload)
      // })
      return res.status(200).json({ success: true, post });
    }

    catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },






  getRecentConversation: async (req, res) => {
    const room = await ChatRoomModel.findOne({})

    // if (!room) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'No room yet, add one first', 
    //   })
    // }
    console.log(room)
    // const users = await UserModel.getUserByIds(room.userIds);
    // const options = {
    //   page: parseInt(req.query.page) || 0,
    //   limit: parseInt(req.query.limit) || 10,
    // };

    return res.status(200).json(room)
  },





  getConversationByRoomId: async (req, res) => {
    console.log("req params>>>>", req.params)
    const roomId = req.params.roomId;
    const room = await ChatRoomModel.findOne({ _id: roomId })
    console.log("room >>>>>>", room)
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      })
    }
    const users = await UserModel.getUserByIds(room.userIds);
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };


    const conv = await chatMessageSchema.chatMessageSchema.find({ chatRoomId: roomId })
    let conversation = []
    conv.forEach(message => {
      conversation.push(message)
    });

    // return thte chat and users that has this room_id
    // const conversation = await chatMessageSchema.chatMessageSchema.aggregate([
    //   { $match: { roomId } },
    //   { $sort: { createdAt: -1 } },
    //   // do a join on another table called users, and 
    //   // get me a user whose _id = postedByUser
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'postedByUser',
    //       foreignField: '_id',
    //       as: 'postedByUser',
    //     }
    //   },
    //   { $unwind: "$postedByUser" },
    //   // apply pagination
    //   { $skip: options.page * options.limit },
    //   { $limit: options.limit },
    //   { $sort: { createdAt: 1 } },
    // ]);

    return res.status(200).json({
      success: true,
      conversation,
      users,
    });

    //  catch (error) {
    //   return res.status(500).json({ success: false, error });
    // }

  },








  markConversationReadByRoomId: async (req, res) => {

    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const currentLoggedUser = req.user._id;
      const result = await chatMessageSchema.markMessageRead(roomId, currentLoggedUser);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },








}