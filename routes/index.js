var express = require("express");
var router = express.Router();
var app = express();
var Joi = require("joi");

//var risks = require('./json.js');

app.use(express.json());

const risks = [
  { id: 1, name: "risk1", type: "low" },
  { id: 2, name: "risk2", type: "normal" },
  { id: 3, name: "risk3", type: "hard" }
];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//To get risk api
router.get("/api/risk", (req, res) => {
  res.send(risks);
});

//To get risk by ID
router.get("/api/risk/:id", (req, res) => {
  const risk = risks.find(c => c.id === parseInt(req.params.id));
  if (!risk) res.status(404).send("The given risk is not found");
  res.send(risk);
});

//To create and add new risk
router.post("/api/risk", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const risk = {
    id: risks.length + 1,
    name: req.body.name,
    type: req.body.type
  };

  risks.push(risk);
  res.send(risks);
});

router.put("/api/risk/:id", (req, res) => {
  const risk = risks.find(c => c.id === parseInt(req.params.id));
  if (!risk) res.status(404).send("The given risk is not found");

  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  risk.name = req.body.name;
  res.send(risks);
});

router.delete("/api/risk/:id", (req, res) => {
  const risk = risks.find(c => c.id === parseInt(req.params.id));
  if (!risk) res.status(404).send("The given risk is not found");

  const index = risks.indexOf(risk);
  risks.splice(index, 1);

  res.send(risk);
});

function validateRisk(risk) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(risk, schema);
}

module.exports = router;
