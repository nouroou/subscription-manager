import {Router} from "express";
import { getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.get('/', admin, getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.put('/:id', (req, res) => res.send({title: 'PUT a user by id'} ));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a users'} ));

export default userRouter;