const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2,
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3,
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4,
  },
];

/**Returns Hello world in http://localhost:3001 */

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/**Returns persons array http://localhost:3001/persons */
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

/**3.2 Phone directory backend, part 2:returns a single phone directory entry */
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
/**Delete single phone directory */
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0
      ? persons
          .map((p) => p.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;
  return maxId + 1;
};

/** Add new phone directory entry can be added with a HTTP POST request  */
app.post("/api/persons", (request, response) => {
  const body = request.body;

  /**Checks if name is missing */
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  /*Checks if number is missing*/
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  /**Checks if name is unique */
  if (persons.some((person) => person.name === body.name)) {
    console.log("name must be unique");
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
