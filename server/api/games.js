var repository = require('../database/games');
var Game = require('../models/game');

exports.get = function(req, res){
	var id = req.params.id;
	var filter = req.query.filter;
	if(id)
	{
		repository.getById(id).then(
			function(result){
				res.json(result);
			},
			createErrorCallback(res));
	}
	else if(filter){
		repository.getByFilter(filter)
			.then(
				function(results){
					res.json(results);
				},
				createErrorCallback(res));
	}
	else{
		repository.getAll()
			.then(
				function(results){
					res.json(results);
				},
				createErrorCallback(res));
	}
};

exports.save = function(req, res){

	var game = new Game(req.body);

	var saveMethod = game._id ? repository.update : repository.add;

	saveMethod(game)
		.then(function(result){
			res.json(result);
		}, function(error){
			res.send(500, 'Oops, something bad happened:'+error);
		});
};

function createErrorCallback(res){
	return function(error){
		res.send(500, 'Oops, something bad happened:'+error);
	}
}
