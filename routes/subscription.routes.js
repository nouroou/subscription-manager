import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    cancelSubscription,
    createSubscription, deleteSubscription,
    getAllSubscriptions,
    getSubscription,
    getUserSubscriptions, upcomingRenewals, updateSubscription
} from "../controllers/subscription.controller.js";
import admin from "../middlewares/admin.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, admin, getAllSubscriptions);

subscriptionRouter.post('/', authorize,  createSubscription);

subscriptionRouter.get('/:id', authorize, admin, getSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/:id/upcoming-renewals', authorize, upcomingRenewals);


export default subscriptionRouter;