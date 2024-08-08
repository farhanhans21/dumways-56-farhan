const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db =require("./src/db");
// const db = require("/src/db");

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/asset", express.static("asset"));
app.use("/style", express.static("style"));
app.use("/views", express.static("views"));
app.use("/javascript", express.static("javascript"));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

//strat project
app.get("/project", renderProject);
app.post("/project", postProject);
app.get("/project-get/:id", renderProjectEdit);
app.post("/project-update/:id", updateProject);
app.get("/project-delete/:id", deleteProject);
app.get("/testimonial", renderTestimonial);

let projects = [];

function renderProject(req, res) {
  res.render("project", {
    data: projects,
  });
}

function postProject(req, res) {
  const newProject = {
    id: projects.length + 1,
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    tech: req.body.tech,
    is_node: req.body.tech === "node" ? true : false,
    is_react: req.body.tech === "react" ? true : false,
    is_next: req.body.tech === "next" ? true : false,
    is_ts: req.body.tech === "ts" ? true : false,    
    createAt: new Date(),
    textarea: req.body.textarea,
    image: req.body.image,
  };
  projects.push(newProject);

  res.redirect("/project");

}
function renderProjectEdit(req, res) {
    
  const detailId = parseInt(req.params.id);
  
  const projectDetail = projects.find((e) => e.id == detailId);
  
  res.render("project-edit", { data: projectDetail });
  
}
function updateProject(req, res) {
  
  const id = parseInt(req.params.id);

  const newProject = {
    id:id,
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    tech: req.body.tech,
    is_node: req.body.tech.includes("node")  ? true : false,
    is_react: req.body.tech.includes("react")  ? true : false,
    is_next: req.body.tech.includes("next")  ? true : false,
    is_ts: req.body.tech.includes("ts")  ? true : false,   
    createAt: new Date(),
    textarea: req.body.textarea,
    image: req.body.image,
  };


  const index = projects.findIndex((item) => item.id === id);
  
  
  if (index === -1) {
    return res.status(404).send("Project not found");
  }
  
  projects[index] = newProject
  res.redirect("/project");

}
function deleteProject(req, res) {
  const id = req.params.id;

  const index = projects.findIndex((e) => e.id == id);

  projects.splice(index, 1);

  res.redirect("/project");
}
//end project

//end project-detail

function renderTestimonial(req, res) {
  res.render("testimonial", {
  });
}
app.listen(port, () => {
  console.log(`server running at server:${port}`);
});

// conn db
