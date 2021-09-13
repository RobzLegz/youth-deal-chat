const router = require("express").Router();
const chatCtrl = require("../controllers/chatCtrl");

router.post("/new_chat", chatCtrl.new);

module.exports = router;