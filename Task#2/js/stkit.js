var STKit = (function () {
	return {
		memoizer: require('./memoizer'),
		semiColonSON: require('./semicolonson'),
		debehaviorizer: require('./debehaviorizer'),

		isArrayLike: function(value) {
			/*An "array-like" object is an ordinary JavaScript object 
			that has numeric properties names and a length property*/
			var isObject = value && 
				typeof value === 'object'; 

			var hasLength = value.hasOwnProperty('length') && 
				typeof value.length === 'number';

			var isPositiveInteger = isFinite(value.length) && 
				value.length === Math.floor(value.length) && 
				value.length >= 0 && 
				value.length < 4294967296;

			if(isObject && hasLength && isPositiveInteger) {
				for(var prop in value) {
					if(prop !== 'length') {
						var intProp = parseInt(prop);
						if(isNaN(intProp)) {
							return false;
						}
					}
				}
			}else {
				return false;
			}
			return true;
		}
	};
})();
module.exports = STKit;