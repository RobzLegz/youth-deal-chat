const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    reciever: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Messages", messageSchema);