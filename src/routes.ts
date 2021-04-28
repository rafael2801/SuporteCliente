import { Router } from 'express'
import { getCustomRepository } from 'typeorm';
import { MessageController } from './controllers/MessageController';
import { Settings } from './controllers/Settings';
import { UsersController } from './controllers/UsersController';

const routes = Router();

const settingsController = new Settings()
const usersController = new UsersController()
const messageController = new MessageController()

routes.post("/settings",settingsController.create)
routes.get("/settings/:username",settingsController.findByUserName)
routes.put("/settings/:username",settingsController.update)

routes.post("/users",usersController.create)

routes.post("/message",messageController.create)
routes.get("/message/:id",messageController.showByUser)

export { routes }