const User = require("../models/user");
const { createJwtToken } = require("../utils/user/createJwtToken");
const bcrypt = require("bcrypt");

// register a new user
const registerUser = async (req, res) => {
    // data from client
    const { user_name, email, password, profile_image } = req.body;

  try {
    // sent message if user already registered with email
    const isAlreadyUser = await User.findOne({ email: req.body.email });
    if (isAlreadyUser) return res.status(409).json({ message: "email already registered" });

    // hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // create a new user
    const newUser = new User({
        user_name,
        email,
        password: hashedPassword,
        profile_image,
      });

    // Save the user to the database
    const savedUser = await newUser.save();

    // create jwt token
    const token = createJwtToken(user_name, savedUser._id)

    // send jwt token and register success message
    return res.status(201).json({token, message: "user registered successfully"})
    
  } catch (error) {
    res.status(500).json({ message: "failed to register user" });
  }
};

// user login
const loginUser = async (req, res) => {
    // data from client
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists and sent message
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'invalid credentials' });
      }
  
    // create jwt token
    const token = createJwtToken(user.user_name, user._id)
    console.log(user)

    // send jwt token and login success message
    return res.status(200).json({token, message: "user loggined successfully"})

    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: 'failed to log in' });
    }
  };
  

module.exports = { registerUser, loginUser };
