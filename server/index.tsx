const express = require('express');
const cors = require('cors');
const apiaryRouter = require("./routes/handler.tsx");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(require('body-parser').json());
app.use(express.urlencoded({extended: true}))
app.use('/', apiaryRouter);
app.use('/registry-list', apiaryRouter);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`);
});