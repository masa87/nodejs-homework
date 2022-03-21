const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller");

router.get("/contacts", ctrlContacts.get);
router.get("/contacts/:id", ctrlContacts.getById);

// router.get("/tasks/:id", ctrlTask.getB

module.exports = router;
