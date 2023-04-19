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
const blogsCollection = client.db('cs260').collection('blogPosts');
const usersCollection = client.db('cs260').collection('users');

function getUser(email) {
    return usersCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return usersCollection.findOne({ token: token });
  }
  
  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await usersCollection.insertOne(user);
  
    return user;
  }

// Add blog post
function addBlogPost(date, image, title, text, id, preview) {
  blogsCollection.insertOne({ date: date, image: image, title: title, text: text, id: id, preview: preview});
}

// Get blog post
function getBlogPost(id) {
  console.log(id);
  return blogsCollection.findOne({ _id: id });
}

// Get all blog posts
function getAllBlogPosts() {
  return blogsCollection.find({}).toArray();
}

// Delete blog post
function deleteBlogPost(id) {
  blogsCollection.delete({ id: id });
}

// Update blog post
function updateBlogPost(date, image, title, text, id, preview) {
  blogsCollection.updateOne({ id: id }, { date: date, image: image, title: title, text: text, preview: preview});
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addBlogPost,
    getBlogPost,
    getAllBlogPosts,
    deleteBlogPost,
    updateBlogPost,
  };