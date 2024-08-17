// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const experimentMeta = [
  {
    id: 1,
    name: 'Experiment 1',
    description: 'This is the first experiment description.',
    date: '2023-01-15',
    duration: '2 weeks',
    location: 'Lab A',
    researcher: 'John Doe',
  },
  {
    id: 2,
    name: 'Experiment 2',
    description: 'This is the second experiment description.',
    date: '2023-02-20',
    duration: '3 weeks',
    location: 'Lab B',
    researcher: 'Jane Smith',
  },
  // Add more experiments as needed
];

app.get('/api/experiments', (req, res) => {
  res.json(experimentMeta);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
