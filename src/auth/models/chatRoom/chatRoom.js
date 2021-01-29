const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const CHAT_ROOM_TYPES = {
    SELLER_SELLER: "seller-seller",
    BURYER_SELLER: "buyer-seller",
    SELLER_ADmIN:"seller-admin",
    BUYER_ADMIN: "buyer-admin",
    ADMIN_ADMIN:"admin-admin",
    BUYER_BUYER:"buyer-buyer"
};

const chatRoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        userIds: Array,
        type: String,
        chatInitiator: String,
    },
    {
        timestamps: true,
        collection: "chatrooms",
    }
);

chatRoomSchema.statics.initiateChat = async function (
    userIds, type, chatInitiator
) {
    try {
        const availableRoom = await this.findOne({
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

        const newRoom = await this.create({ userIds, type, chatInitiator });
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





chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
      const room = await this.findOne({ _id: roomId });
      return room;
    } catch (error) {
      throw error;
    }
  }






module.exports = {
    CHAT_ROOM_TYPES: CHAT_ROOM_TYPES,
    ChatRoomModel: mongoose.model("ChatRoom", chatRoomSchema)
}