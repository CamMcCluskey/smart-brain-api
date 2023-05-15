const PORT = process.env.PORT;

// Dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// Controllers
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
// Database
const db = knex({
	client: 'pg',
	connection: {
		host: 'app-b19018ba-9ead-45c9-95e2-682b39933dab-do-user-13705780-0.b.db.ondigitalocean.com',
		port: '25060',
		user : 'db',
		password: 'AVNS_Ih0tsSOOUIgoZ8sK6kz',
		database: 'db'
	}
});
// Express
const app = express();
app.use(express.json());
app.use(cors());
// Endpoints
app.get('/', (req, res) => { res.send('site is working!') });
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
// Listen
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});