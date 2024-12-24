const jwt = require('jsonwebtoken');
const db = require('../config/firebase'); 
const bcrypt = require('bcryptjs');
const User = require('./user.class'); 

const createUser = async (userData) => {
    try{
        const hashedPassword = await bcrypt.hash(userData.password,10);
        userData.password = hashedPassword;
    
        const newUser = new User(
            userData.name,
            userData.email,
            userData.password
        );

        const userRef = db.collection('users').add({...newUser}); 
        newUser.userID = (await userRef).id;
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
}

const authenticateUser = async (email, password) => {
  try {
    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      console.log('No user found with email:', email);
      return null; 
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      console.log('Invalid password for userName:', email);
      return null; 
    }

    const token = jwt.sign(
      { 
        userID: userDoc.id, 
        name: userData.name,
        email: userData.email,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const userWithID = { ...userData, userID: userDoc.id };

    return { token, user: userWithID };

  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Authentication failed');
  }
};


const deleteUserByEmail = async (email) => {
    try {
      const userRef = db.collection('users').where('email', '==', email);
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        throw new Error('User not found');
      }
  
      const userDoc = snapshot.docs[0];
      await userDoc.ref.delete();
  
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Error deleting user');
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const userRef = db.collection('users').where('email', '==', email);
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        console.log('No matching user found for email:', email);
        return null; 
      }
  
      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Error fetching user');
    }
  };


  module.exports = {
    createUser,
    authenticateUser,
    deleteUserByEmail,
    getUserByEmail,
  }
 