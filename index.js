const express = require("express");
const app = express();
const port = 3000;
const { QueryTypes, where } = require("sequelize");
const bodyParser = require("body-parser");
const path = require("path");
const hash = require("./javascript/bcryptFile");

const { hashPassword, comparePassword } = require("./javascript/bcryptFile");

const model = require("./models/model");
const db = require("./src/db");
const { SELECT } = require("sequelize/lib/query-types");
const multer = require("multer");
const session = require("express-session");
const flash = require("express-flash");

app.set("view engine", "hbs");
app.set("views", "views");
app.set("trush proxy", 1);

app.use("/asset", express.static("asset"));
app.use("/style", express.static("style"));
app.use("/views", express.static("views"));
app.use("/javascript", express.static("javascript"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "farhan",
    cookie: { maxAge: 3600000, httpOnly: true, secure: false },
    saveUninitialized: true,
    resave: false,
    store: new session.MemoryStore(),
  })
);
app.use(flash());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "asset/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Simpan dengan nama unik
  },
});
const upload = multer({ storage: storage });

//strat project
app.get("/project", renderProject);
app.post("/project", upload.single("image"), postProject);
app.get("/project-get/:id", renderProjectEdit);
app.post("/project-update/:id", upload.single("image"), updateProject);
app.get("/project-delete/:id", deleteProject);
app.get("/testimonial", renderTestimonial);
app.get("/login", renderLogin);
app.post("/login", postLogin);
app.get("/register", renderRegister);
app.post("/register", postRegister);

async function renderProject(req, res) {
  try {
    console.log(req.session);
    
    const isLogin =  req.session.isLogin;
    if(!isLogin) return res.redirect('/login')

    const query = `select * from personal.project`;
    const [results] = await db.query(query, { typeQuery: SELECT });

    results.forEach((element) => {
      element.image = JSON.parse(element.image);
      element.image.path = element.image.path.replace("\\", "/");
    });

    res.render("project", {
      data: results,
    });
  } catch (error) {
    console.error(error);
  }
}
async function postProject(req, res) {
  try {
    let tech = req.body.tech;
    if (typeof tech === typeof "") {
      tech = [req.body.tech];
    }

    const newProject = {
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      tech: tech,
      is_node: req.body.tech.includes("node") ? true : false,
      is_react: req.body.tech.includes("react") ? true : false,
      is_next: req.body.tech.includes("next") ? true : false,
      is_ts: req.body.tech.includes("ts") ? true : false,
      textarea: req.body.textarea,
      image: JSON.stringify(req.file),
    };

    const ok = await model.project.create(newProject);

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

    let tech = req.body.tech;
    if (typeof tech === typeof "") {
      tech = [req.body.tech];
    }
    const updateProject = {
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      tech: tech,
      is_node: req.body.tech.includes("node") ? true : false,
      is_react: req.body.tech.includes("react") ? true : false,
      is_next: req.body.tech.includes("next") ? true : false,
      is_ts: req.body.tech.includes("ts") ? true : false,
      textarea: req.body.textarea,
      image: JSON.stringify(req.file),
    };

    await model.project.update(updateProject, { where: { id: idProject } });
    res.redirect("/project");
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: "Error updating project" });
  }
}
async function deleteProject(req, res) {
  try {
    const id = req.params.id;

    await model.project.destroy({ where: { id: id } });

    res.redirect("/project");
  } catch (error) {
    console.error(error);
  }
}

async function renderLogin(req, res) {
  const isLogin = req.session.isLogin;
  if (isLogin) {
    req.flash("error", "anda harus login terlebih dahulu");
    res.redirect("/");
    return;
  }

  res.render("login");
}
async function renderRegister(req, res) {
  console.log(req.session);

  res.render("register", {});
}
async function postRegister(req, res) {
  try {
    console.log(req.body);

    newObj = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      born: req.body.date,
      hp: req.body.phoneNumber,
      password: await hash.hashPassword(req.body.password),
      email: req.body.email,
    };
    await model.userProject.create(newObj);
    req.flash("info", "running registration");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

async function postLogin(req, res) {
  try {
    const email = req.body.email;
    const userEmail = await model.userProject.findOne({ where: { email: email } });
    const pass = req.body.password;
    const check = await hash.comparePassword(pass, userEmail.password);
    const emailCheck = userEmail.email
    
    if ( email == emailCheck && check ) {
      req.session.user = [0];
      console.log(req.session.user);
      req.session.isLogin = true;

      req.flash("succes", "login sukses");
      res.redirect("/");
    } 
    else {
      console.log("gagal");
      req.flash("error", "login gagal");
      res.redirect("/login");
      return;
    }

  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
}
async function renderTestimonial(req, res) {
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
