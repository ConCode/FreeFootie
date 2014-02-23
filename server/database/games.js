var mongojs = require("mongojs");
var db = require("mongojs").connect("freefootie", ["games"]);
var collection = db.games;
var ObjectId = mongojs.ObjectId;
var Q = require("q");
var Game = require('../models/game');

exports.add = function(item){
	var deferred = Q.defer();
	collection.insert(
		item, 
		createCallback(deferred)
	);
	return deferred.promise;
};

exports.update = function(item){
	var deferred = Q.defer();
	collection.update(
		{_id : convertToDbId(item.id)}, 
		{$set:item},
		createCallback(deferred)
	);
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	collection.findOne(
		{_id : convertToDbId(id)}, 
		createCallback(deferred)
	);
	return deferred.promise;
};

exports.getAll = function(){
	var deferred = Q.defer();
	collection.find(createCallback(deferred));
	return deferred.promise;
};

function convertToDbId(id){
	return id;//return ObjectId(id);
}

function createCallback(deferred){
	return function(err, result){
		if(err)
			deferred.reject(new Error(err));
		else if(result instanceof Array)
			deferred.resolve(result.map(function(item){
				return new Game(item);
			}));
		else
			deferred.resolve(new Game(result));
	}
}