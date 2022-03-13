const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const { schema } = require("../../utils/joiSchema.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  listContacts()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  getContactById(contactId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  const { name, email, phone } = body;
  const { error } = schema.validate({ name, email, phone });
  if (error === undefined) {
    addContact(body)
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  } else {
    res.json({
      status: "error",
      code: 403,
      message: error.details[0].message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const { name, email, phone } = body;
  const { error } = schema.validate({ name, email, phone });
  if (error === undefined) {
    updateContact(contactId, body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  } else {
    res.json({
      status: "error",
      code: 403,
      message: error.details[0].message,
    });
  }
});

module.exports = router;
