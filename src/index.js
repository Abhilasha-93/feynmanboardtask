const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use("/", route);

mongoose.connect("mongodb+srv://Seema:C5PtEdt23kmtx9ov@cluster0.gjunl.mongodb.net/feynmanboardtask?retryWrites=true&w=majority")
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));



app.listen(4000, function () {
    console.log("Express app running on port " + 4000);
});