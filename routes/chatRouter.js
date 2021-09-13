const router = require("express").Router();
const chatCtrl = require("../controllers/chatCtrl");

router.post("/new_chat", chatCtrl.new);
router.post("/user_chats/:accessToken", chatCtrl.get);

module.exports = router;