var Game = require('../models/game');
var collection = new (require('./collection'))('Game');
var mapper = require('./mapper');
var Q = require("q");

exports.add = function(item){
	var deferred = Q.defer();
	if(!item.validate())
		deferred.reject(new Error('Invalid Game:'+item.getValidationErrors().join('|')));
	else
		collection.insert( item, function(err, result) {
			//Update returns a strange object instead of the model object. As a result, we can't
			//use the default mapper
			if (err) deferred.reject(new Error(err));
			else {
				var item = result[0];
				item._id = item._id.toHexString();
				deferred.resolve(item);
			}
		});
	return deferred.promise;
};

exports.update = function(item){
	var deferred = Q.defer();
	if(!item.validate())
		deferred.reject(new Error('Invalid Game:'+item.getValidationErrors().join('|')));
	else
		collection.update( item, function(err, result) {
			//Update returns a strange object instead of the model object. As a result, we can't
			//use the default mapper
			if (err) deferred.reject(new Error(err));
			else deferred.resolve(item);
		});
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	collection.getById( id, function(err, result) {
		//Update returns a strange object instead of the model object. As a result, we can't
		//use the default mapper
		if (err) deferred.reject(new Error(err));
		else {
			if(result)
				result._id = result._id.toHexString();
			deferred.resolve(result);
		}
	});
	return deferred.promise;
};

exports.getAll = function(){
	var deferred = Q.defer();
	collection.getAll( function(err, result) {
		//Update returns a strange object instead of the model object. As a result, we can't
		//use the default mapper
		if (err) deferred.reject(new Error(err));
		else {
			result.forEach(function(item) {
				item._id = item._id.toHexString();
			});
			deferred.resolve(result);
		}
	});
	return deferred.promise;
};

exports.getByFilter = function(filter){
	var deferred = Q.defer();
	var query = {};
	if(filter){

		var now = new Date();
		var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		if(filter==='today'){
			var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			tomorrow.setDate(tomorrow.getDate()+1);
			query={'date': {'$gte':today, '$lt':tomorrow}};
		}
		else if(filter==='week'){
			var weekFromToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			weekFromToday.setDate(weekFromToday.getDate()+7);
			query={'date': {'$gte':today, '$lt':weekFromToday}};
		}
	}
	collection.find(query, function(err, result) {
		if (err) deferred.reject(new Error(err));
		else {
			result.forEach(function(item) {
				item._id = item._id.toHexString();
			});
			deferred.resolve(result);
		}
	});
	return deferred.promise;
};
