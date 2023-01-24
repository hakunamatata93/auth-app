const {Router} = require('express');

const authController = require("../controllers/authController.js");

const mainRouter = Router();

mainRouter.get('/users', authController.getUsers);

mainRouter.delete('/:id', authController.deleteSelected)

module.exports = mainRouter;