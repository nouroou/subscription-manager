import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: { users }});

    } catch (e) {
        next(e);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: { user }});

    } catch (e) {
        next(e);
    }
}

export const updateUserName = async (req, res, next) => {
    try {
        const name = req.body.name;
        const user = await User.findById(req.params.id);
        if (name === user.name) {
            res.status(200).json({success: false, message: 'Nothing to update'});
        }
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to update this user');
            error.statusCode = 401;
            throw error;
        }
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.name = name;
        await user.save();
        console.log(user);

        res.status(200).json({ success: true, message: 'User updated successfully', data: { name: user.name }});

    } catch (e) {
        next(e);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to update this user');
            error.statusCode = 401;
            throw error;
        }
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if (req.user.role === 'admin' && req.user.id !== req.params.id || req.user.id === req.params.id) {

            res.status(200).json({success: true, message: 'User deleted successfully'});
        }
        res.status(200).json({success: true, message: 'User deleted successfully'});
    } catch (e) {
        next(e);
    }
}
