const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("../schema/schema")

mongoose.connect(
  "mongodb+srv://user:lkjlkj@cluster0.wfunj.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true  }
)

const app = express();
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on("err", (err) => console.log("error: ", err));
dbConnection.once("open", () => console.log("Db connected"));

const PORT = process.env.PORT || 3010;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`App started on port: ${PORT}`);
});
