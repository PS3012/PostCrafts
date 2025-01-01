const handleGetProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({
      _id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      createdAt: user.createdAt,
      role: user.role,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error sending User details", error });
  }
};

export default handleGetProfile;
