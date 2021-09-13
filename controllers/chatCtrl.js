const Chats = require("../models/chatModel");



const chatCtrl = {
    new: async (req, res) => {
        try {
            const {users} = req.body;

            if(users.length < 2){
                return res.status(400).json({msg: "Unsuccessfull"});
            }

            for (let i = 0; i < users.length; i++){
                if(users[i].length < 5){
                    return res.status(400).json({msg: "Unsuccessfull"});
                }
            }

            const newChat = new Chats({
                users
            });

            await newChat.save();

            res.json({msg: "Created a new chat!"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = chatCtrl;