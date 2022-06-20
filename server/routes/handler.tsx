const express = require('express');
const router = express.Router();

let registryData = [];

let incrementationData = [];

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
