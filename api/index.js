const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "tmp/",
  filename: (req, file, cb) => cb(null, file.originalname),
  limits: { fileSize: 1 * 1000000 },
});
const upload = multer({ storage });
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
router.patch(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  ctrlUsers.updateAvatar
);
router.get("/users/verify/:verificationToken", ctrlUsers.verifyUser);
router.post("/users/verify", ctrlUsers.resendVerificationMail);

module.exports = router;
