const express = require('express');
const router = express.Router();

let registryData = [
  {
    date: "2022-06-18",
    serialNumber: 2022061600003712,
    name: "Pasieka"
  }
];

let incrementationData = [
];

router.get('/registry-list', (req, res ) => {
  res.send(registryData)
});

router.get('/numbers-list', (req, res ) => {
  res.send(incrementationData)
});

router.post('/numbers-list', (req, res) => {
  let requestData = {
    date: req.body.date,
    generatedCode: [req.body.generatedCode]
  }
  console.log(req.body.date);

  if (incrementationData.length === 0) {
    incrementationData.push(requestData);
  } else {
    incrementationData.forEach((el) => {
      if (el.date === req.body.date) {
        el.generatedCode.push(req.body.generatedCode)
      }
    });
  }
  res.sendStatus(200)
})

router.post('/registry-list', (req, res) => {
  let apiaryData = {
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    date: req.body.date
  };
  registryData.push(apiaryData);
  res.sendStatus(200)
});

module.exports = router;

