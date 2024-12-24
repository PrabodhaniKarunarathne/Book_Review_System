const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const reviewRoutes = require('./routes/reviews.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.use('/api/reviews',reviewRoutes);


const PORT = process.env.PORT || 5000;


app.get('/check-connection', async (req, res) => {
    try {
      const snapshot = await db.collection('users').limit(1).get();
      if (snapshot.empty) {
        res.status(200).send('Firestore is connected but no data found.');
      } else {
        res.status(200).send('Firestore is connected and data is available.');
      }
    } catch (error) {
      res.status(500).send('Error connecting to Firestore: ' + error.message);
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});