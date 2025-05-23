import {Router} from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title: 'GET all users'} ));

userRouter.get('/:id', (req, res) => res.send({title: 'GET a user by id'} ));

userRouter.post('/', (req, res) => res.send({title: 'POST a new user'} ));

userRouter.put('/:id', (req, res) => res.send({title: 'PUT a user by id'} ));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a users'} ));

export default userRouter;