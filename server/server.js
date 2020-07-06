const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();
const history = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function calculateEquation(equation) {
  // do the maths

  // return solved equation
  return equation;
}

// route to post an equation
app.post('/api/equation', (req, res) => {
  // solves the maths
  const solvableEquation = req.body;
  // {
  //   num1: Number,
  //   num2: Number,
  //   operator: 'string',
  // }
  const solvedEquation = calculateEquation(solvableEquation);

  // push equation into history
  history.push(solvedEquation);
  console.log(history);

  // send back an OK or Created
  res.sendStatus(201);
});

app.listen(PORT, function() {
  console.log(`Server running on PORT ${PORT}`);
});