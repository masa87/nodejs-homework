const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find();
const getContactById = (id) => Contact.findById(id).exec();
const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });

module.exports = { getAllContacts, getContactById, createContact };
