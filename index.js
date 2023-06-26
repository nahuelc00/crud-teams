const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;
const bodyParser = require('body-parser');

const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine({
  layoutsDir: `${__dirname}/views/layouts`,
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

function getDataOfTeams() {
  const teams = JSON.parse(fs.readFileSync('./data/equipos.json'));
  const lengthTeams = teams.length;
  const nameTeams = teams.map((team) => team.shortName);
  const shieldTeams = teams.map((team) => team.crestUrl);
  const countries = teams.map((team) => team.area.name);

  return {
    teams, lengthTeams, nameTeams, shieldTeams, countries,
  };
}

app.get('/', (req, res) => {
  const {
    lengthTeams, nameTeams, shieldTeams, countries,
  } = getDataOfTeams();

  res.statusCode = 200;
  res.contentType('html');
  res.render('main', {
    layout: 'index', nameTeams, countries, shieldTeams, lengthTeams,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
