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
		host: '127.0.0.1',
		port: '5432',
		user : 'postgres',
		password: '5JzRjJuHwcgWZa4tE842',
		database: 'smart-brain'
	}
});
// Express
const app = express();
app.use(express.json());
app.use(cors());
// Endpoints
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
// Listen
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});