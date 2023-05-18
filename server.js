const PORT = process.env.PORT;

// Dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
// Controllers
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
// Database
const DATABASE_URL = process.env.DATABASE_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
	client: 'pg',
	connection: {
		host: DATABASE_URL,
		port: '25060',
		user : 'db',
		password: 'AVNS_Ih0tsSOOUIgoZ8sK6kz',
		database: 'db',
		ssl: 'true'
	}
});

// const db = knex({
// 	client: 'pg',
// 	connection: {
// 		host: DATABASE_URL,
// 		port: DB_PORT,
// 		user : DB_USER,
// 		password: DB_PASS,
// 		database: DB_NAME,
// 		ssl: 'true'
// 	}
// });
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
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, fetch) });
// Listen
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});