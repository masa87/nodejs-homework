const service = require("../service");
const { schema } = require("../utils/joiSchema.js");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate({ name, email, phone });
  if (error === undefined) {
    try {
      const result = await service.createContact({ name, email, phone });
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contacts: result,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.json({
      status: "error",
      code: 403,
      message: error.details[0].message,
    });
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await service.updateContact({ id, name, email, phone });
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    const result = await service.updateContact({ id, favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  addContact,
  removeContactById,
  updateContact,
  updateStatus,
};
