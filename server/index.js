const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Google Drive Clone API is running');
});

const { router: authRouter } = require('./authController');
app.use('/api/auth', authRouter);

app.use('/api/files', require('./driveController'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
