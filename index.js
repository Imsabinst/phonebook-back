const express = require("express");
const app = express();
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
app.get("/persons", (req, res) => {
  res.send(persons);
});

/**3.2 Phone directory backend, part 2:returns a single phone directory entry */
app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
/**Delete single phone directory */
app.delete("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
