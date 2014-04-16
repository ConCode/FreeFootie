var mongojs = require("mongojs");
var db = require("mongojs").connect("freefootie",
	["Game", "Location", "Player", "Division", "Team"]);
var ObjectId = mongojs.ObjectId;
var Q = require("q");

module.exports = function(collectionName){

	var collection = db[collectionName];

	this.insert = function(item, callback){
		collection.insert(item, callback);
	};

	this.update = function(item, callback){

		collection.update(
			{_id : item._id},
			{$set:item.fetchProperties()},
			callback
		);
	};

	this.getById = function(id, callback){
		collection.findOne( {_id : convertToDbId(id)}, callback);
	};

	this.getAll = function(callback){
		collection.find( callback );
	};

	this.find = function(params, callback){
		collection.find( params, callback );
	};

};

function convertToDbId(id){
	return ObjectId(id);
}
