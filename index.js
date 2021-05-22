import Express, { json } from "express";

const app = Express();

app.use(json());

const todo = [];

app.post("/todos", (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      throw new Error();
    }
    const newTodo = {
      title: req.body.title,
      desc: req.body.desc,
      isDone: false,
    };
    todo.push(newTodo);
    res.status(201).json({ Status: "Todo Created Succesfully" });
  } catch (error) {
    res.status(400).json({ Error: "Bad Data Input 😡" });
  }
});

app.get("/todos/all", (req, res) => {
  res.json(todo);
});

app.get("/todos", (req, res) => {
  const todos = todo.filter((item) => item.isDone === false);
  res.json(todos);
});

app.get("/todos/completed", (req, res) => {
  const todos = todo.filter((item) => item.isDone);
  res.json(todos);
});

const middleware = (req, res, next) => {
  const number = parseInt(req.params.id) || "Invalid";
  const type = typeof number;
  if (type === "number") {
    next();
  } else {
    res.status(400).json({ Error: "Number expected 😏" });
  }
};

app.get("/todos/:id", middleware, (req, res) => {
  res.json(todo[req.params.id]);
});

app.get("/todos/:id/markdone", middleware, (req, res) => {
  todo[req.params.id].isDone = true;
  res.json({ Status: "Marked DOne 💚" });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.delete("/todos", (req, res) => {
  todo.pop();
  res.json({ Status: "Deleted Last item successfully 🐼" });
});

app.put("/todos/:id", middleware, (req, res) => {
  todo[req.params.id] = { ...req.body };
  res.json({ Status: "Item replaced successfully 😎" });
});

app.patch("/todos/:id", middleware, (req, res) => {
  const oldTodo = todo[req.params.id];
  if (!oldTodo) {
    return res.send(404).json({ Error: "Not found 😔" });
  }
  todo[req.params.id] = { ...oldTodo, ...req.body };
  res.json({ Status: "Updated values succesfully 😁" });
});
app.listen(3000, () => console.log("Server started at port 3000 🚀"));
