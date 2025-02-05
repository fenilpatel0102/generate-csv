const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function writeToCSV(data) {
    // Define CSV file path
    const filePath = path.join(__dirname, 'output.csv');

    // Create CSV writer instance
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'Name', title: 'User Name' },
            { id: 'Title', title: 'Title' },
            { id: 'Comment', title: 'Comment' }
        ]
    });
    const formattedData = [];
    Object.entries(data).forEach(([userId, user]) => {
        const maxLength = Math.max(user.allposts.length, user.allcomments ? user.allcomments.length : 0);

        for (let i = 0; i < maxLength; i++) {
            formattedData.push({
                Name: user.userName,
                Title: user.allposts[i] || '', // Handle missing values
                Comment: user.allcomments ? user.allcomments[i] || '' : ''
            });
        }
    });

    try {
        await csvWriter.writeRecords(formattedData);
        console.log(`CSV file created successfully at: ${filePath}`);
        return filePath;
    } catch (err) {
        console.error('Error writing CSV:', err);
        throw err;
    }

}

module.exports = writeToCSV;