const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller");

router.get("/contacts", ctrlContacts.get);
router.get("/contacts/:id", ctrlContacts.getById);
router.post("/contacts", ctrlContacts.addContact);

module.exports = router;
