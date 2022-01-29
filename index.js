const express = require("express");
const app = express();
app.use(express.static("build"));
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
const Person = require("./models/person");

const logger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("Body:  ", response.body);
  console.log("checking");
  next();
};
app.use(logger);

const formatDetails = (person) => {
  const formattedDetails = { ...person._doc, id: person._id };
  delete formattedDetails._id;
  delete formattedDetails.__v;

  return formattedDetails;
};

/**Gets the list of persons */
app.get("/api/persons", (request, response) => {
  Person.find({}, { __v: 0 }).then((persons) => {
    response.json(persons.map(formatDetails));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) =>
    response.json(formatDetails(person))
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(form)
    .then((savedAndFormattedDetails) => {
      response.json(savedAndFormattedDetails);
    });
});

/* app.delete("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) =>
    response.json(person["_id" !== person])
  );
}); */
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => response.status(204).end())
    .catch((error) => {
      response.status(404).send({ error: "unknown id" });
    });
});

const error = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(error);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
