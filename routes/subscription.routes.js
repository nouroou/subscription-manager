import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all subscription'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/:id', (req, res) => res.send({title: 'GET a subscription by id'}));

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'PUT a subscription by id'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a subscription by id'}));

subscriptionRouter.get('/user/:id', (req, res) => res.send({title: 'GET all of a user subscription'}));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL a user subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));


export default subscriptionRouter;