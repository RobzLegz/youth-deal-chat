const messageHash = process.env.MESSAGE_HASH;


const Messages = require("../models/messageModel");
const Chats = require("../models/chatModel");
const cryptr = require("cryptr");
const hasher = new cryptr(messageHash);

const chatCtrl = {
    new: async (req, res) => {
        try {
            const {
                senderAccesstoken, 
                receiverAccessToken,
                chatID,
                text
            } = req.body;

            if(!senderAccesstoken || !receiverAccessToken || !chatID || !text){
                res.status(400).json({msg: "err"})
            }

            const testSearchChat = await Chats.findById({_id: chatID});

            if(!testSearchChat){
                res.status(400).json({msg: "invalid chat id"})
            }

            const message = hashMessage(text);

            const newMesage = new Messages({
                sender: senderAccesstoken,
                reciever: receiverAccessToken,
                chatID: chatID,
                text: message
            });

            await newMesage.save();

            res.json({msg: "Message sent!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getChatMessages: async (req, res) => {
        try {
            const chatID = req.params.chatID;

            const testSearchChat = await Chats.findById({_id: chatID});

            if(!testSearchChat){
                res.status(400).json({msg: "invalid chat id"})
            }

            const chatMessages = await Messages.find({chatID: chatID}).sort({createdAt: -1});

            chatMessages.forEach((messageData) => {
                messageData.text = unhashMessage(messageData.text);
            })

            res.json(chatMessages);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = chatCtrl;

const hashMessage = (payload) => {
    const hashedMessage = hasher.encrypt(payload);
    return hashedMessage;
}

const unhashMessage = (payload) => {
    const unhashedMessage = hasher.decrypt(payload);
    return unhashedMessage;
}