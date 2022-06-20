
let registryData = [];
let incrementationData = [];

async function httpAddNewApiary(req, res) {
  let apiaryData = {
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    date: req.body.date
  };
  registryData.push(apiaryData);
  res.sendStatus(200)
}

async function  httpAddIncrementationData(req, res) {
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
}

module.exports = {
  httpAddNewApiary,
  httpAddIncrementationData,
  registryData,
  incrementationData
}

