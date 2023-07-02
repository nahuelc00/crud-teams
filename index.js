const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 8080;

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine({
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials/`,
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static(`${__dirname}/uploads`));

function getTeams() {
  const teams = JSON.parse(fs.readFileSync('./data/equipos.json'));
  return teams;
}

app.get('/', (req, res) => {
  const teams = getTeams();

  const lengthTeams = teams.length;
  const nameTeams = teams.map((team) => team.shortName);
  const shieldTeams = teams.map((team) => team.crestUrl);
  const countries = teams.map((team) => team.area.name);
  const ids = teams.map((team) => team.id);

  res.statusCode = 200;
  res.contentType('html');
  res.render('main', {
    layout: 'index', nameTeams, countries, shieldTeams, lengthTeams, ids,
  });
});

app.get('/form', (req, res) => {
  res.statusCode = 200;
  res.contentType('html');
  res.render('form', {
    layout: 'index',
  });
});

app.get('/form/edit/:id', (req, res) => {
  const paramId = Number(req.params.id);
  const teams = getTeams();
  const teamToModify = teams.find((team) => Number(team.id) === paramId);

  res.statusCode = 200;
  res.contentType('html');
  res.render('form', {
    layout: 'index', teamToModify,
  });
});

app.get('/team/:id/see', (req, res) => {
  const teams = getTeams();

  const paramId = Number(req.params.id);

  const teamToSend = teams.find((team) => Number(team.id) === paramId);

  res.statusCode = 200;

  res.contentType('html');
  res.render('team', {
    layout: 'index', teamToSend,
  });
});

app.post('/teams', upload.single('shieldImg'), (req, res) => {
  const { body } = req;
  const shieldFile = req.file;

  const newTeam = {
    area: { id: body.idArea, name: body.nameArea },
    name: body.name,
    shortName: body.shortName,
    tla: body.abbreviation,
    address: body.address,
    phone: body.phone,
    website: body.website,
    email: body.email,
    founded: body.founded,
    clubColors: body.colors,
    venue: body.stadium,
    crestUrl: `http://localhost:8080/${shieldFile.filename}`,
  };

  const teamsToUpdate = getTeams();
  const lastTeam = teamsToUpdate[teamsToUpdate.length - 1];

  newTeam.id = lastTeam.id + 1;
  teamsToUpdate.push(newTeam);

  fs.writeFileSync('./data/equipos.json', JSON.stringify(teamsToUpdate));
  fs.writeFileSync(`./data/equipos/${newTeam.tla}.json`, JSON.stringify(newTeam));

  res.statusCode = 200;
  res.send(newTeam);
});

app.delete('/team/:id', (req, res) => {
  const teams = getTeams();

  const paramId = Number(req.params.id);

  const teamToDelete = teams.find((team) => Number(team.id) === paramId);
  const teamPositionToDelete = teams.indexOf(teamToDelete);

  teams.splice(teamPositionToDelete, 1);

  fs.unlinkSync(`./data/equipos/${teamToDelete.tla}.json`);
  fs.writeFileSync('./data/equipos.json', JSON.stringify(teams));

  res.send('Team deleted');
});

app.put('/team/:id', upload.single('shieldImg'), (req, res) => {
  const teams = getTeams();
  const shieldFile = req.file;

  const paramTeam = JSON.parse(JSON.stringify(req.body));

  const updatedTeam = {
    id: paramTeam.id,
    area: { id: paramTeam.idArea, name: paramTeam.nameArea },
    name: paramTeam.name,
    shortName: paramTeam.shortName,
    tla: paramTeam.abbreviation,
    address: paramTeam.address,
    phone: paramTeam.phone,
    website: paramTeam.website,
    email: paramTeam.email,
    founded: paramTeam.founded,
    clubColors: paramTeam.colors,
    venue: paramTeam.stadium,
    crestUrl: `http://localhost:8080/${shieldFile.filename}`,
  };

  const paramTeamId = Number(paramTeam.id);

  teams.forEach((team, index) => {
    if (Number(team.id) === paramTeamId) {
      teams[index] = { ...updatedTeam };
    }
  });

  fs.writeFileSync('./data/equipos.json', JSON.stringify(teams));
  fs.writeFileSync(`./data/equipos/${updatedTeam.tla}.json`, JSON.stringify(updatedTeam));

  res.statusCode = 200;
  res.send(updatedTeam);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
