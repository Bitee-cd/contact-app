const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
