var memoizer = function(func) {
	/** @private */
	var memo = {};
	/** @private */
	var slice = Array.prototype.slice;

	if(typeof func !== 'function') {
		throw 'ArgumentError: function expected';
	}
	/** @constructor 
	 * @return {function} cache function
	 */
	function setMemo() {
		/** @private */
		var args = slice.call(arguments);

		if(!(func in memo)) {
			memo[func] = memo[func] || {};
			memo[func][''] = func;
		}

		if(!(args in memo[func])) {
			if(args.length > 0) {
				memo[func][args] = func.apply(this, args);
				
			}else {
				memo[func][args] = func;
				
			}
		} else {
			console.log('from cache');
		}
		return memo[func][args];
	}

	/** @private */
	var args = slice.call(arguments);
	/** 
	 * @constructor
	 * @return {function} cache function
 	*/
	return (function () {
		if(args.length <= 0) {
			throw 'ArgumentError: function expected';
		}else {
			if(args.length > 1) {
				args = args.slice(1);
				setMemo.apply(this, args);
			}
		}
		return setMemo;
	})();
};
module.exports = memoizer;