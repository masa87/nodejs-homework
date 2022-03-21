const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find();
const getContactById = (id) => Contact.findById(id).exec();

module.exports = { getAllContacts, getContactById };
