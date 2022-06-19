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
  {
    date: "2022-06-19",
    generatedCode: [
      "00001",
      "00002"
    ]
  },
  {
    date: "2022-06-20",
    generatedCode: [
      "00001"
    ]
  },
  {
    date: "2022-06-21",
    generatedCode: [
      "00001",
      "00002",
      "00003"
    ]
  }
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

  if (incrementationData.length === 0) {
    return incrementationData.push(requestData);
  }
  const validateDateAndPushIfNotExist = incrementationData.find(el => el.date === req.body.date);

  if (validateDateAndPushIfNotExist) {
    validateDateAndPushIfNotExist.generatedCode.push(req.body.generatedCode);
  }
  else {
    incrementationData.push(requestData);
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
