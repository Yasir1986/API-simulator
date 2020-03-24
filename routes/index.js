var express = require('express');
var router = express.Router();
var app = express();
//var risks = require('./json.js');

app.use(express.json());

const risks = [
  { id: 1, name: 'risk1', type: "low"},
  { id: 2, name: 'risk2', type: "normal"},
  { id: 3, name: 'risk3', type: "hard"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', (req,res) => {
  res.send("About Us")
})

router.get('/contact', (req,res) => {
  res.send("Contact Us")
})

//To get risk api
router.get('/api/risk', (req,res) => {
  res.send(risks)
})

//To get risk by ID
router.get('/api/risk/:id', (req,res) => {
  const risk =  risks.find(c => c.id === parseInt(req.params.id));
  if (!risk) res.status(404).send('The given risk is not found');
  res.send(risk);
})


//To create and add new risk
router.post('/api/risk', (req,res) => {
  if (!req.body.name && !req.body.type && risks.length < 3){
    //404 Bad request
    res.status(400).send("Name is required and should be min of 3 letters!");
    return;
  }
  const risk = {
    id: risks.length + 1,
    name: req.body.name,
    type: req.body.type
  };
  risks.push(risk);
  res.send(risks);
})



module.exports = router;
