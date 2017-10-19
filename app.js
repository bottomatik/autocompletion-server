const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Systems = require('./lib/systems');
const Autocomplete = require('./lib/autocomplete');

app.get('/', function (req, res, next){
	return res.status(400).json({
		error:{
			message: 'System needed'
		}
	});
});

app.post('/:id', function(req, res, next){
	if(!req.body.query){
		return res.status(400).json({error:{message:'Query required in body'}});
	}

	try{
		let system = Systems.get(req.params.id);
		if(!system){
			return res.status(404).json({error:{message:'System does not exist'}});
		}
		return res.json(Autocomplete.get(req.body.query, system));
	} catch(err) {
		console.error(err);
		return res.status(500).json({error:{message:err.message}});	
	}
});

app.get('/:id/full', function(req, res, next){
	try{
		let system = Systems.get(req.params.id);
		return res.json(system);
	} catch(err) {
		console.error(err);
		return res.status(500).json({error:{message:err.message}});	
	}
});

app.post('/new/:id', function(req, res, next){
	if(!req.body.data){
		return res.status(400).json({error:{message:'Data required in body'}});
	}

	try{
		Systems.new(req.params.id, req.body.data);
		return res.json({success:true});	
	} catch(e) {
		return res.status(500).json({error:{message:e.message}});
	}
});

app.listen(7523, function(){
	console.log('Server listening on port 7523');
});