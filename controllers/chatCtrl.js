const Chats = require("../models/chatModel");

const chatCtrl = {
    new: async (req, res) => {
        try {
            const {senderAccesstoken, receiverAccessToken} = req.body;

            const newChat = new Chats({
                users: [senderAccesstoken, receiverAccessToken]
            });

            await newChat.save();

            res.json({msg: "Created a new chat"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUserChats: async (req, res) => {
        try {
            const usersChats = await Chats.find({
                users: { $in: [parseInt(req.params.accessToken)] },
            });

            res.json(usersChats);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getChatByID: async (req, res) => {
        try {
            const id = req.params.id;

            const chat = await Chats.findById({_id: id});

            res.json(chat);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteChat: async (req, res) => {
        try {
            const id = req.params.id;

            await Chats.findByIdAndDelete({_id: id});

            res.json({msg: "delete success"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = chatCtrl;