const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pradumyadav020:Food123@cluster0.11rfvrm.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on(
  "err",
  console.error.bind(console, "Error in connectiing to the database")
);
db.once("open", function () {
  console.log("Connected to database :: Mongodb");
});
