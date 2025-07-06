const { User } = require("@/models");

const updateUser = async (req, res) => {
    try {
        const { phone_num, img, name } = req.body;
        
        const updateFields = {};
        if (phone_num) updateFields.phone_num = phone_num;
        if (img) updateFields.img = img;
        if (name) updateFields.name = name;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ 
            error: 'Error updating user',
            message: error.message 
        });
    }
}

module.exports = {
    updateUser
};