const axios = require('axios');

async function fetchUsers() {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://jsonplaceholder.typicode.com/users',
            headers: {}
        };

        const response = await axios.request(config);
        return response.data; // Returning fetched data
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error; // Rethrow the error for handling
    }
}

async function getUserPost() {
  try {
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://jsonplaceholder.typicode.com/posts',
          headers: {}
      };

      const response = await axios.request(config);
      return response.data; // Returning fetched data
  } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error; // Rethrow the error for handling
  }
}


async function getUserComments() {
  try {
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://jsonplaceholder.typicode.com/comments',
          headers: {}
      };

      const response = await axios.request(config);
      return response.data; // Returning fetched data
  } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error; // Rethrow the error for handling
  }
}

// Export the function
module.exports = { fetchUsers, getUserPost, getUserComments };
