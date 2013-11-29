'use strict'


var fs = require('fs')
, mongo = require('mongodb')
, monk = require('monk')
, db = monk('localhost:27017/FreeFootieDB');

var transform = function(data) {
    for (var property in data) {
        if (data[property] && data[property].match) {
            var r = data[property].match(/<<now(?:~(\d)h)?>>/);
            if (r) {
                var time = new Date(),
                diff = r[1] | 0,
                hourOffset = Math.floor((Math.random() - 0.5) * 2 * diff),
                newTime = time.getTime() + hourOffset * 3600000;
                console.log ("SSSSSSS", new Date(newTime));
                data[property] = new Date(newTime).toISOString();
            }
        }
    }
    return data;
};

var getById = function (array, id) {

    var a = array.filter(function(elem) {
        return elem.id == id;
    });

    if (a.length > 0)
        return a[0];
    return {};
};

var dataLoader = function (datafile) {
    return function (req, res){
        var id = parseInt( req.params.id );
        var data = JSON.parse(fs.readFileSync(datafile));

        if (id) {
           res.send( 
               transform(getById(data, id))
               );
       } else {
        res.send(
            data.map(transform).filter(function(item){
                return Object.keys(req.params).every(function(prop){
                    if (prop === 'id') return true;
                    if (prop === 'date') {
                        var pDate = new Date(content.parameters[prop]),
                        oDate = new Date(item[prop]),
                        year = pDate.getYear(),
                        month = pDate.getMonth(),
                        date = pDate.getDate();
                        return oDate.getYear() === pDate.getYear() && oDate.getMonth() === pDate.getMonth() && oDate.getDate() === pDate.getDate();
                    } 
                });
            }));
    }
};
};

var getData =  function (tableName) {
    return function (req, res) {
        var id = req.params.id;
        var collection = db.get(tableName);

        if (id) {

            collection.findOne({'_id' : id},{},function(e, data){
                res.send(transform(data));
            });
        }
        else
        {
            collection.find({},{},function(e, data){
                res.send(
                    data.map(transform).filter(function(item){
                        return Object.keys(req.params).every(function(prop){
                            if (prop === 'id') return true;
                            if (prop === 'date') {
                                var pDate = new Date(content.parameters[prop]),
                                oDate = new Date(item[prop]),
                                year = pDate.getYear(),
                                month = pDate.getMonth(),
                                date = pDate.getDate();
                                return oDate.getYear() === pDate.getYear() && oDate.getMonth() === pDate.getMonth() && oDate.getDate() === pDate.getDate();
                            } 
                        });
                    }));
            });
        }
    };
};

var addPlayer = function() {
    return function(req, res) {
        var collection = db.get('players');
        var name = req.body.name;

        collection.insert({
            'name' : name,
            'number' : req.body.number,
            'dob' : req.body.dob    
        }, function (err, doc) {
            addResponseMessage(err, res, 'Player', name);
        });
    }
}

var addLocation = function() {
    return function(req, res) {
        var collection = db.get('locations');
        var name = req.body.name;

        collection.insert({
            'name' : name,
            'latitude' : req.body.latitude,
            'longitude' : req.body.longitude    
        }, function (err, doc) {
            addResponseMessage(err, res, 'Location', name);
        });
    }
}


var addGame = function() {
    return function(req, res) {
        var collection = db.get('games');

        collection.insert({
            'location' : req.body.location,
            'date' : req.body.date,
            'locationName' : req.body.locationName,
            'home' : req.body.home,
            'away' : req.body.away,
            'state' : req.body.state,
        }, function (err, doc) {
            addResponseMessage(err, res, 'Game', '');
        });
    }
}

var addPool = function() {
    return function(req, res) {
        var collection = db.get('pools');
        var name = req.body.name;

        collection.insert({
            'name' : name
        }, function (err, doc) {
            addResponseMessage(err, res, 'Pool', name);
        });
    }
}

var addTeam = function() {
    return function(req, res) {
        var collection = db.get('teams');
        var name = req.body.name;

        collection.insert({
            'name' : name,
            'wins' : req.body.wins,
            'losses' : req.body.losses,
            'ties' : req.body.ties,
            'pool' : req.body.pool,
            'coach' : req.body.coach,
            'phone' : req.body.phone,
            'school' : req.body.school,
            'players':req.body.players  
        }, function (err, doc) {
            addResponseMessage(err, res, 'Team', name);
        });
    }
}


var updatePlayer = function() {
    return function(req, res) {
        var collection = db.get('players');
        var name = req.body.name; 

        collection.update({ _id: req.body._id },{
            'name' : req.body.name,
            'number' : req.body.number,
            'dob' : req.body.dob    
        }, function (err, doc) {
            updateResponseMessage(err, res, 'Team', name);
        });
    }
}

var updateLocation = function() {
    return function(req, res) {
        var collection = db.get('locations');
        var name = req.body.name;

        collection.update({ _id: req.body._id },{
            'name' : name,
            'latitude' : req.body.latitude,
            'longitude' : req.body.longitude    
        }, function (err, doc) {
            updateResponseMessage(err, res, 'Location', name);
        });
    }
}


var updateGame = function() {
    return function(req, res) {
        var collection = db.get('games');

        collection.update({ _id: req.body._id },{
            'location' : req.body.location,
            'date' : req.body.date,
            'locationName' : req.body.locationName,
            'home' : req.body.home,
            'away' : req.body.away,
            'state' : req.body.state,
        }, function (err, doc) {
            updateResponseMessage(err, res, 'Game', '');
        });
    }
}

var updatePool = function() {
    return function(req, res) {
        var collection = db.get('pools');
        var name = req.body.name;

        collection.update({ _id: req.body._id },{
            'name' : name
        }, function (err, doc) {
            updateResponseMessage(err, res, 'Pool', name);
        });
    }
}

var updateTeam = function() {
    return function(req, res) {
        var collection = db.get('teams');
        var name = req.body.name;

        collection.update({ _id: req.body._id },{
            'name' : name,
            'wins' : req.body.wins,
            'losses' : req.body.losses,
            'ties' : req.body.ties,
            'pool' : req.body.pool,
            'coach' : req.body.coach,
            'phone' : req.body.phone,
            'school' : req.body.school,
            'players':req.body.players  
        }, function (err, doc) {
            updateResponseMessage(err, res, 'Team', name);
        });
    }
}

var deleteItem = function(tableName) {
    return function(req, res) {
        var collection = db.get(tableName);

        collection.remove({ _id: req.body._id }, function (err, doc) {
            deleteResponseMessage(err, res, tableName);
        });
    }
}

var addResponseMessage = function(err, res, item, name){
    responseMessage(err, res, "The " + item + " " + name + " was added succesfully.",
        "There was a problem adding the " + item + " '" + name + "'. The item was not added.");
}

var updateResponseMessage = function(err, res, item, name){
    responseMessage(err, res, "The " + item + " " + name + " has been updated succesfully.",
        "There was a problem modifying the " + item + " " + name + ". The information was not updated.");
}

var deleteResponseMessage = function(err, res, tableName){
    responseMessage(err, res, "An item from " + tableName + " has been deleted succesfully.",
        "There was a problem deleting an item from " + tableName + ". Item was not deleted.");
}

var responseMessage = function(err, res, successMessage, failMessage){
    if (err) {
        res.send(failMessage);
        console.log("ERROR!" + err.stack);
    }
    else {
        res.send(successMessage);
    }
} 

exports.configureRoutes = function(app){
    app.get('/api/games/:id?', getData('games'));
    app.get('/api/locations/:id?', getData('locations'));
    app.get('/api/pools/:id?', getData('pools'));
    app.get('/api/teams/:id?', getData('teams'));
    app.get('/api/players/:id?', getData('players'));

    app.post('/api/games/add', addGame());
    app.post('/api/locations/add', addLocation());
    app.post('/api/pools/add', addPool());
    app.post('/api/teams/add', addTeam());
    app.post('/api/players/add', addPlayer());

    app.put('/api/games/update', updateGame());
    app.put('/api/locations/update', updateLocation());
    app.put('/api/pools/update', updatePool());
    app.put('/api/teams/update', updateTeam());
    app.put('/api/players/update', updatePlayer());

    app.delete('/api/games/delete', deleteItem('games'));
    app.delete('/api/locations/delete', deleteItem('locations'));
    app.delete('/api/pools/delete', deleteItem('pools'));
    app.delete('/api/teams/delete', deleteItem('teams'));
    app.delete('/api/players/delete', deleteItem('players'));
};

