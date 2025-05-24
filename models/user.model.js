import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'User name is required'],
       trim: true,
       minLength: 3,
       maxLength: 75,
   },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 255,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },

    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
    },

    role: {
       type: String,
        required: [true, 'Role is required'],
        trim: true,
        enum: ['user', 'admin'],
    }


}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;