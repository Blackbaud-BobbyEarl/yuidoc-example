module.exports = {
    eq: function(a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    },
    debug: function(a) {
    	console.log(a);
    }
};