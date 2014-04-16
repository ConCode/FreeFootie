var validatable = require('./validatable');

module.exports = function Game(obj){

	validatable.makeValidatable(this, {
		location: { required: true, displayName: 'Location' },
		date: { required: true, displayName: 'Date' },
		home: {required: true, displayName: 'Home Team' },
		away: { required: true, displayName: 'Away Team' },
		state: { required: false, displayName: 'State', defaultValue: null}
	});

	if(obj)
		this.copyFrom(obj);

	//handle sample data
	if (this.date && this.date.match) {
            var r = this.date.match(/<<now(?:~(\d)h)?>>/);
            if (r) {
                var time = new Date(),
                    diff = r[1] | 0,
                         hourOffset = Math.floor((Math.random() - 0.5) * 2 * diff),
                         newTime = time.getTime() + hourOffset * 3600000;
                this.date = new Date(newTime);//.toISOString();
            }
        }


	if(typeof this.date == 'string')
		this.date = new Date(this.date);//ensure date object so query filters work..



	this.ensureRequiredDefaults();
};
