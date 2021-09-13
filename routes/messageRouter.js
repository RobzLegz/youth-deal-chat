const router = require("express").Router();
const messageCtrl = require("../controllers/messageCtrl");

router.post("/new", messageCtrl.new);
router.get("/chat/:chatID", messageCtrl.getChatMessages);


module.exports = router;