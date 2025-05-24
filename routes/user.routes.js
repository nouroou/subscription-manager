import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: 'POST a new user'} ));

userRouter.put('/:id', (req, res) => res.send({title: 'PUT a user by id'} ));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a users'} ));

export default userRouter;