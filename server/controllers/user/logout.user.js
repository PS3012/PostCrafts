const handleUserLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: "true",
      sameSite: "none",
    });
    res.status(200).json({ error: false, message: "Logout successfully" });
  } catch (err) {
    res.status(500).json({ error: true, message: err });
  }
};

export default handleUserLogout;
