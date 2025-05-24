import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: subscription});
    } catch (e) {
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not an admin or the owner of this account.' );
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        if (!subscriptions) {
            res.status(404).json({ success: false, message: 'This user has no subscriptions found.' });
        }
        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptons = await Subscription.find();
        if (!subscriptons) {
            const error = new Error('There is no one subscriptions');
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ success: true, data: subscriptons });

    } catch (e) {
        next(e);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription does not exist');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });

    } catch (e) {
        next(e);
    }
}

export const