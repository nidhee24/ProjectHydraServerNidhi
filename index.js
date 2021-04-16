const express = require('express');
const cors = require('cors');

const aboutRoute = require('./routes/aboutRoute');
const roomRoutes = require('./routes/roombook');
const userRoutes = require('./routes/register');
const authRoutes = require('./routes/login');
const dealRoutes = require('./routes/DealRoute');
const hotelroomRoute = require('./routes/HotelRoom');

const connectDB = require('./config/connect');


const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/rooms', roomRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/about',aboutRoute);
app.use('/api/deal',dealRoutes);
app.use('/api/hotelroom',hotelroomRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started');
});