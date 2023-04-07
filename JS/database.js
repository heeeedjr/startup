const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const blogCollection = client.db('cs260').collection('blogPosts');
const usersCollection = client.db('cs260').collection('users');

function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }

// Add blog post

// Get blog post

// Get all blog posts

// Delete blog post

// Update blog post


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    // addBlogPost,
    // getBlogPost,
    // getAllBlogPosts,
    // deleteBlogPost,
    // updateBlogPost,
  };