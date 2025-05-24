import User from "../models/user.model.js";

const admin = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        if (user.role === 'admin') {
          next(true);
        } else {
            next(false);
        }
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized', error: e});
    }
}

export default admin;