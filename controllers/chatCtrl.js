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
    get: async (req, res) => {
        try {
            const usersChats = await Chats.find({
                users: { $in: [req.params.accessToken]}
            })

            

            res.json({msg: "Created a new chat!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = chatCtrl;