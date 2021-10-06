const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    type: {
        type: Number,
    },
    info: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Themes", themeSchema);