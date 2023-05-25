const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

const handleApiCall = (req, res, fetch) => {
	const raw = JSON.stringify({
	  "user_app_id": {
	  "user_id": "clarifai",
	  "app_id": "main"
	  },
	  "inputs": [
	      {
	          "data": {
	              "image": {
	                  "url": req.body.input
	              }
	          }
	      }
	  ]
	});

	const requestOptions = {
	  method: 'POST',
	  headers: {
	      'Accept': 'application/json',
	      'Authorization': 'Key ' + API_KEY
	  },
	  body: raw
	};

	fetch(API_URL, requestOptions)
	  .then(response => response.json())
	  .then(data => {
	  	res.json(data);
	  })
	  .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => {
		console.log(err);
		res.status(400).json('Something went wrong');
	});
}

module.exports = { handleImage, handleApiCall };