const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Read the JSON file
fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const usersData = JSON.parse(data);
        
        // Extract existing user IDs
        const existingUserIds = usersData.users.map(user => user.userId);
        
        // Function to generate a unique user ID
        const generateUniqueUserId = () => {
            let newUserId;
            do {
                newUserId = uuidv4();
            } while (existingUserIds.includes(newUserId));
            return newUserId;
        };
        newId = generateUniqueUserId();
        console.log(usersData);
        usersData.users.push({
            "userId": newId,
            "Name": "Mal",
            "Phone": "1232",
            "Email": "1@gmail.com",
            "Password": "MAKmak99"
        });
        console.log(usersData);

        // Convert the updated data back to JSON
        const updatedData = JSON.stringify(usersData, null, 4);

        // Write the updated JSON back to the file
        fs.writeFile('updated_users.json', updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('User IDs updated successfully. Check updated_users.json');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
