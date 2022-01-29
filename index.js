const express = require("express");
const app = express();
app.use(express.static("build"));
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
const Person = require("./models/person");

const formatDetails = (person) => {
  const formattedDetails = { ...person._doc, id: person._id };
  delete formattedDetails._id;
  delete formattedDetails.__v;

  return formattedDetails;
};

app.get("/api/persons", (request, response) => {
  Person.find({}, { __v: 0 }).then((persons) => {
    response.json(persons.map(formatDetails));
  });
});

const logger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("checking");
  next();
};
app.use(logger);

const error = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
