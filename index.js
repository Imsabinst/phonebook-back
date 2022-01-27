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

/** Add new phone directory entry can be added with a HTTP POST request  */
app.post("/api/persons", (request, response) => {
  //const maxId = persons[Math.floor(Math.random() * persons.length)];
  const maxId =
    persons.length > 0
      ? persons
          .map((p) => p.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;
  const person = request.body;
  person.id = maxId + 1;
  persons = persons.concat(person);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
