import axios from 'axios';

const token = localStorage.getItem('token'); // or get it from AuthContext

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const response = await axios.post(
  'http://localhost:5000/api/generate-itinerary',
  itineraryData,
  config
);
