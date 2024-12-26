const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({
        error: true,
        isAuthenticated: false,
        message: "Authentication token is missing.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          isAuthenticated: false,
          message: "Invalid or expired token.",
        });
      }

      req.user = decoded;

      if (req.originalUrl !== "/logout") {
        const refreshedToken = jwt.sign(
          {
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("authToken", refreshedToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 3600000,
        });
      }

      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default checkAuth;
