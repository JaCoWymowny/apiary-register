const express = require('express');
const apiaryRouter = require("./routes/managementOfApiaryData.ts");
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(require('body-parser').json());
app.use(express.urlencoded({extended: true}))
app.use('/', apiaryRouter);
app.use('/registry-list', apiaryRouter);
app.use('/numbers-list', apiaryRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`);
});
