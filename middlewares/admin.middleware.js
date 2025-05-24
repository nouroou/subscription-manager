
const admin = async (req, res, next) => {
    try {

        console.log(`USER ID: ${req.user._id}`);
        console.log(`USER ID: ${req.params.id}`);

        if (req.user.role !== 'admin' || !req.user.role) return res.status(401).json({message: 'You must be admin to perform this action.'});

        next();

    } catch (e) {
        res.status(401).json({ message: 'Unauthorized user', error: e});
    }
}

export default admin;