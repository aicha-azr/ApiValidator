const express = require('express');
const router = require('./Router/routers');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
app.use(express.json());
app.use(router)





app.listen(PORT, () => {
    console.log(`the app listening at port : http://localhost:${PORT}`);
});
 