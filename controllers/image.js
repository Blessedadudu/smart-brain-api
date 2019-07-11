const Clarifai = require('clarifai');

/* ADD YOUR OWN API KEY */
const app = new Clarifai.App({
 apiKey: '20aa94b1e29d4b37ab39507005a7553a'
});


const handleApiCall = (req,res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('UNABLE TO WORK WITH API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
    	res.json(entries[0]);
  })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage, 
	handleApiCall /* Es6 feature - You don't need to pass in the value */
}