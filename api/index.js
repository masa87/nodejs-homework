const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller/contacts");
const ctrlUsers = require("../controller/users");
const { auth } = require("../utils/auth.js");

router.get("/contacts", ctrlContacts.getAll);
router.get("/contacts/:id", ctrlContacts.getById);
router.post("/contacts", ctrlContacts.addContact);
router.delete("/contacts/:id", ctrlContacts.removeContactById);
router.put("/contacts/:id", ctrlContacts.updateContact);
router.patch("/contacts/:id/favorite", ctrlContacts.updateStatus);

router.get("/users", ctrlUsers.getAllUsers);
router.post("/users/signup", ctrlUsers.registerUser);
router.post("/users/login", ctrlUsers.loginUser);
router.get("/users/logout", auth, ctrlUsers.logoutUser);
router.get("/users/current", auth, ctrlUsers.currentUser);
router.patch("/users", auth, ctrlUsers.updateUserSub);

module.exports = router;
