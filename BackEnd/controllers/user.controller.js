const {authenticateUser, createUser, getUserByEmail,deleteUserByEmail} = require('../models/user.model');
const User = require('../models/user.class');

const registerUser = async (req, res) => {
    const{
        name,
        email,
        password
    } = req.body;

    const newUser = new User(
        name,
        email,
        password
    );

    try{
        const savedUser = await createUser(newUser);
        console.log('User account created:', savedUser.userID);
        return res.status(201).json({ message: 'User created successfully', user: savedUser });

    }catch(error){
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
      const email = req.params.email; 
  
      const result = await deleteUserByEmail(email);
      console.log('User deleted:', result);
      return res.status(200).json({ message: 'User deleted successfully', result }); 
    } catch (error) {
      console.error('Error deleting user:',error);
      return res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const authResult = await authenticateUser(email, password);
  
      if (!authResult) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const { token, user } = authResult;
      console.log('User logged in successfully:', user.email);
  
      return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Error during login', error: error.message });
    }
  };

  const logoutUser = async (req, res) => {
    try {
      console.log("User logged out successfully");
      return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Error during logout', error: error.message });
    }
  };

  const getUser = async (req, res) => {
    const { email } = req.params; 
  
    try {
      const user = await getUserByEmail(email); 
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(`Error fetching user by email (${email}):`, error);
      return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  };


module.exports={
    registerUser,
    getUser,
    loginUser,
    logoutUser,
    deleteUser,
};