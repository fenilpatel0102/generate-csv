const express = require('express');
const app = express();

const writeToCSV = require('./createcsv.js');
const fetchUsers = require('../apihelper/users.js');

function organizeData(users, posts, comments) {
    const organizedData = {};
    // Process users data
    users.forEach(user => {
        if (!organizedData[user.id]) {
            organizedData[user.id] = {};
        }
        organizedData[user.id].userName = user.name;
    });

    posts.forEach(post => {
        if (!organizedData[post.userId]) {
            organizedData[post.userId] = {};
        }
        if (!organizedData[post.userId].posts) {
            organizedData[post.userId].posts = {}
            organizedData[post.userId].allposts = [];
        }
        organizedData[post.userId].posts[post.id] = {
            title: post.title
        };
        organizedData[post.userId].allposts.push(post.title);
    });

    // Process comments data
    comments.forEach(comment => {
        const post = posts.find(p => p.id === comment.postId);
        if (post && organizedData[post.userId]) {
            if (!organizedData[post.userId].posts[comment.postId].comments) {
                organizedData[post.userId].posts[comment.postId].comments = [];
                organizedData[post.userId].allcomments = [];
            }
            organizedData[post.userId].posts[comment.postId].comments.push({
                id: comment.id,
                body: comment.body
            });
            organizedData[post.userId].allcomments.push(comment.body);
        }
    });
    return organizedData;
}

app.get('/generate-csv', async (req, res) => {
    try {
        console.log('Starting data organization process...');
        
        const users = await fetchUsers.fetchUsers();
        const posts = await fetchUsers.getUserPost();
        const comments = await fetchUsers.getUserComments();
        // console.log("users: ", users);
        
        const organizedData = organizeData(users, posts, comments);
        
        console.log('Data organization completed successfully');
        let pathoffile = await writeToCSV(organizedData)
        
        res.json({status: "success", filepath:pathoffile});
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Failed to process data' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});