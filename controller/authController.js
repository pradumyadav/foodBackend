const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "SECRET_KEY"; // Make sure this key is a secure and secret value
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password: hashPassword });
    const savedUser = await user.save();

    try {
      await new Promise((resolve, reject) => {
        req.login(savedUser, (err) => {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
      console.log("outside promise");
      const token = jwt.sign({ id: savedUser.id }, JWT_SECRET_KEY); // Corrected JWT signing
      console.log(token);
      res.status(201).json({ id: savedUser.id, role: savedUser.role, token });
    } catch (loginError) {
      console.log("loginError", loginError);
      res.status(400).json({ error: "Login error", details: loginError });
    }
  } catch (registrationError) {
    res
      .status(400)
      .json({ error: "Register error", details: registrationError });
  }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      console.log("inside signIn Controller");
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        // Passwords do not match
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Passwords match, generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
  
      // Send response with token and user information
      res.status(200).json({ id: user.id, role: user.role, token });
    } catch (error) {
      // Handle any unexpected errors
      console.error("Sign-in error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  exports.getAllstaff = async (req, res) => {
    try {
        const response = await User.find({ role: "staff" }); 
        console.log(response);
        res.status(200).json(response); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
};




exports.logout = async (req, res) => {
  req.logout();
  res.json({ success: true, message: "User Logged out stccesfully" });
};
