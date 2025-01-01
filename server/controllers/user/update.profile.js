import User from "../../models/user.model.js";

const handleUpdateProfile = async (req, res) => {
  const { name, username, phone, role, email } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      username,
      phone,
      role,
      email,
    });
    res.status(200).send({ message: "Profile updated successfully!!" });
  } catch (error) {
    res.status(500).send({ message: "Error sending User details", error });
  }
};

export default handleUpdateProfile;
