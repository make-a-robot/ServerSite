const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/Site')));
app.use(bodyParser.json());
app.use(cors());

/*
app.get('/book', function(req, res) {
  const sessionsPath = path.join(__dirname, 'sessions.json');

  fs.readFile(sessionsPath, 'utf8', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.post('/sessions', function(req, res) {
  const sessionsPath = path.join(__dirname, 'sessions.json');
  console.log(req.body);
  fs.writeFile(sessionsPath, JSON.stringify(req.body), error => {
    if (error) {
      console.error(error);
      res.status(500).end();
      return
    }
  }); 
    });


  app.post('/purchase', function(req, res) {
    stripe.charges.create({
    amount: req.body.total,
    source: req.body.stripeTokenId,
    currency:'usd'
    }).then(function(){
    console.log('charge successfull')
    res.json({ message:'succesfully purchased items'})
    }).catch(function(){
    console.log('charge failed')
    res.status(500).end()
  })
  res.json({ message: 'Data received successfully' });
});

app.post('/send-email', (req, res) => {
  const {from, to, subject, text, attachment1, attachmemt2} = req.body;
  const attachment2 = req.body.attachmemt2;
  
  const
   transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'malekabdoh2000@gmail.com',
      pass: 'eezpqeypfcizqpii',
    },
  });

  // Define the email options
  const mailOptions = {
    from,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "person's_data.json", 
        content: JSON.stringify(attachment1),
        contentType: 'application/json'
      },
      {
        filename: "sessions's_data.json", 
        content: JSON.stringify(attachment2),
        contentType: 'application/json'
      },
    ] 
  };
  console.log(req.body);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});
*/


app.post('/get-account-info', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const usersData = JSON.parse(data).users;
        const userId = JSON.parse(req.body.id);
        const foundUser = usersData.find(user => user.userId === userId);
        res.json({foundUser});

      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
    });
});

app.post('/check-email', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const usersData = JSON.parse(data);
        const { email } = req.body;

        // Check if the email exists in the user data
        const emailExists = usersData.users.some(user => user.Email === email);

        res.json({ emailExists });

      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
    });
});



app.post('/login', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const usersData = JSON.parse(data);
        const { email,password } = req.body;
        console.log(req.body);

        // Check if the email exists in the user data
        const emailExists = usersData.users.some(user => user.Email === email);
        if(emailExists){
          const userData = usersData.users.find(user => user.Email === email);
          if(userData){
            if(userData.Password == password){
              res.json({ "emailExists":true, "PasswordCorrect":true, "AccountId":userData.userId});
              //console.log("{:true, :true, :userData.userId}");
            }else{
              res.json({ "emailExists":true, "PasswordCorrect":false, "AccountId":"N/A"});
              //console.log("{:true, :false, :N/A}");
            }
          }else{
            console.log("Serious Error me confus");
          }
        }else{
          res.json({ "emailExists":false, "PasswordCorrect":false, "AccountId":"N/A"});
          //console.log("{:fals, :false, :N/A}");
        }

      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
    });
});


app.post('/signup', (req, res) => {
  const { email, name, password, phone } = req.body;
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Name:", name);
  console.log("Phone:", phone);
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

        res.send(JSON.stringify(newId));

        usersData.users.push({
            "userId": newId,
            "Name": name,
            "Phone": phone,
            "Email": email,
            "Password": password,
            "Kids": {},
            "Payments":{
              "Cards":{

              },
              "Bills":{

              }
            } 
        });

        // Convert the updated data back to JSON
        const updatedData = JSON.stringify(usersData, null, 4);

        // Write the updated JSON back to the file
        fs.writeFile('users.json', updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
  });
});




app.listen(80, () => {
  console.log('Server is running on port 80');
});
