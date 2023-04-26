const express = require("express");
const ejs = require('ejs');

const app = express();

app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
