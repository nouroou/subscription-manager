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
            res.status(404).json({ success: false, message: 'Subscriptions not found.' });
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
            res.status(404).json({ message: 'Subscription not found.' });
        }

        res.status(200).json({ success: true, data: subscription });

    } catch (e) {
        next(e);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription) {
            res.status(404).json({ success: false, message: 'Subscription not found.' });
        }

        if (subscription.user.data !== req.user.id.data) {
            const error = new Error('You are not an admin of this account to update the subscription.' );
            error.statusCode = 401;
            throw error;
        }

        subscription.status = 'canceled';
        await subscription.save();


        res.status(200).json({ success: true, message: 'Subscription canceled successfully.', data: {subscription} });
    } catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const updatedSubscription = req.body;

        const subscription = await Subscription
            .findByIdAndUpdate(req.params.id, {
                ...updatedSubscription,
            }, {new: true, runValidators: true});

        if(!subscription) {
            res.status(404).json({ success: false, message: 'Subscription not found.' });
        }

        if (subscription.user.data !== req.user.id.data) {
            const error = new Error('You are not an admin of this account to update the subscription.' );
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ success: true, message: 'Subscription updated successfully.', data: {subscription} });
    } catch (e) {
        next(e);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if(!subscription) {
            const error = new Error('Subscription does not exist');
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.data !== req.user.id.data) {
            const error = new Error('You are not an admin of this account to update the subscription.' );
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ success: true, message: 'Subscription deleted successfully.', data: {subscription} });

    } catch (e) {
        next(e);
    }
}

export const upcomingRenewals = async (req, res, next) => {
    try {

        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to access this data.');
            error.statusCode = 403;
            throw error;
        }

        const sevenDays = 8 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const sevenDaysLater = new Date(Date.now() + sevenDays);


        const subscriptions = await Subscription.find({
            user: req.params.id,
            renewalDate: { $lte: sevenDaysLater },
        });

        if (!subscriptions || subscriptions.length === 0) {
            res.status(404).json({ success: false, message: 'You have no upcoming subscriptions.' });
        }

        res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });

    } catch (e) {
        next(e);
    }
}

