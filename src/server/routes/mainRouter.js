const {Router} = require('express');

const controller = require("../controllers/authController.js");

const mainRouter = Router();

mainRouter.get('/users', controller.getUsers);
mainRouter.delete('/delete/:id', controller.deleteSelected);
mainRouter.patch('/block/:id', controller.block)
mainRouter.patch('/unblock/:id', controller.block)

module.exports = mainRouter;