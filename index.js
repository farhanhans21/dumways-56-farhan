const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const model = require("./models/model");
const db = require("./src/db");
const { SELECT } = require("sequelize/lib/query-types");

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

async function renderProject(req, res) {
  try {
    const query = `select * from personal.project`;
    const [results] = await db.query(query, { typeQuery: SELECT });

    res.render("project", {
      data: results,
    });
  } catch (error) {
    console.error(error);
  }
}
async function postProject(req, res) {
  try {
    const tech = req.body.tech;
    const newProject = {
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      tech: tech,
      is_node: req.body.tech === "node" ? true : false,
      is_react: req.body.tech === "react" ? true : false,
      is_next: req.body.tech === "next" ? true : false,
      is_ts: req.body.tech === "ts" ? true : false,
      textarea: req.body.textarea,
      image: req.body.image,
    };
    await model.project.create(newProject);
    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating project" });
  }
}

async function renderProjectEdit(req, res) {
  try {
    const detailId = parseInt(req.params.id);
    const query = `select *from personal.project where id = ${detailId}`;
    const [results] = await db.query(query, { typeQuery: SELECT });

    const obj = results[0];

    res.render("project-edit", { data: obj });
  } catch (error) {
    console.error(error);
  }
}
async function updateProject(req, res) {
  try {
    const idProject = parseInt(req.params.id);

    const newProject = {
      id: idProject,
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      tech: req.body.tech,
      is_node: req.body.tech.includes("node") ? true : false,
      is_react: req.body.tech.includes("react") ? true : false,
      is_next: req.body.tech.includes("next") ? true : false,
      is_ts: req.body.tech.includes("ts") ? true : false,
      textarea: req.body.textarea,
      image: req.body.image,
    };

    await model.project.update(newProject, { where: { id: idProject } });

    renderProject(req, res);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: "Error updating project" });
  }
}
async function deleteProject(req, res) {
  try {
    const id = req.params.id;

    await model.project.destroy({ where: { id: id } });
    // const index = projects.findIndex((e) => e.id == id);

    res.redirect("/project");
    // projects.splice(index, 1);
  } catch (error) {
    console.error(error);
  }
}

function renderTestimonial(req, res) {
  res.render("testimonial", {});
}

app.listen(port, async () => {
  try {
    db.authenticate()
      .then(() => {
        console.log("connection established");
      })
      .catch((err) => console.error(err));

    console.log(`server running at server:${port}`);
  } catch (error) {
    console.error(error);
  }
});

// conn db
