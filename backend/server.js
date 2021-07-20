const express = require("express");
// const bodyParser = require('body-parser')  // Not required to call in newer version of express
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser.json()) //not necessary; do the below one instead
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected.."))
  .catch((err) => console.log(err));

//importing router files for the server to use
const exercisesRoute = require("./routes/exercises");
const usersRoute = require("./routes/users");

app.use("/exercises", exercisesRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
