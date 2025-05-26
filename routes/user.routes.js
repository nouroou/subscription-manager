import {Router} from "express";
import {deleteUser, getUser, getUsers, updateUserName} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.get('/', admin, getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.put('/:id', authorize, updateUserName);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;