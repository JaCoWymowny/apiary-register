const express = require('express');
const router = express.Router();

let data = [
  {
    serialNumber: 723,
    date: "2022-06-14",
    name: "ceta"
  }
]

router.get('/', (req, res ) => {
  res.send(data)
});

router.get('/registry-list', (req, res ) => {
  res.send(data)
});

router.post('/add-apiary', (req, res) => {
  let apiaryData = {
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    date: req.body.date
  }
  data.push(apiaryData)
  res.status(200)
});

module.exports = router;

