const bcrypt = require('bcryptjs');

// Mock database for users
let users = [];
let nextId = 1;

class User {
  constructor(name, email, password) {
    this.id = nextId++;
    this.name = name;
    this.email = email;
    this.password = this.hashPassword(password);
    this.createdAt = new Date();
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

// User functions
const UserModel = {
  // Create new user
  create: (name, email, password) => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const user = new User(name, email, password);
    users.push(user);
    return user;
  },

  // Find user by email
  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  // Find user by ID
  findById: (id) => {
    return users.find(u => u.id === id);
  },

  // Get all users
  getAll: () => {
    return users.map(u => u.toJSON());
  }
};

module.exports = UserModel;