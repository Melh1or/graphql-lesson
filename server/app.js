const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use("/graphql", graphqlHTTP({}));

const PORT = process.env.PORT || 3010;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`App started on port: ${PORT}`);
});
