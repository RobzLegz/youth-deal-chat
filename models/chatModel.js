const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    users: {
        type: Array,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Chats", chatSchema);