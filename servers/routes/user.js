const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//requests will be done from here
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/viewuser/:id", userController.viewAll);
router.get("/adduser", userController.form);
router.post("/adduser", userController.create);
router.get("/edituser/:id", userController.edit);
router.post("/edituser/:id", userController.update);
router.get("/:id", userController.delete);

module.exports = router;