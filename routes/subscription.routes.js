import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";
import admin from "../middlewares/admin.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, admin, getAllSubscriptions);

subscriptionRouter.post('/', authorize,  createSubscription);

subscriptionRouter.get('/:id', authorize, admin, getSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'PUT a subscription by id'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a subscription by id'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL a user subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));


export default subscriptionRouter;