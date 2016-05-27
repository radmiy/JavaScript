var debehaviorizer = function(data) {
	var args = Array.prototype.slice.call(arguments);
	var isBehaviorSeparate = !!args[1] && typeof args[1] === 'boolean';
	var isReverse = !!args[1] && typeof args[1] === 'object' && Array.isArray(args[1]);
	var index = -1;
	
	function isFunction() {
		index++;
		if(index >= args[1].length || !isReverse) {
			return;
		}
		isReverse = !!args[1][index] && typeof args[1][index] === 'function';
		isFunction();
	}

	function setFunctions() {
		index--;
		if(index < 0) {
			return;
		}
		var key = 'methodName' + index;
		var func = args[1][index];
		data[key] = func;
		setFunctions();
	}

	isFunction();
	
	var prop = Object.getOwnPropertyNames(data);
	var arrayFunc = [];
	var indexFunc = -1;
	var indexProp = -1;

	function action() {
		indexProp++;
		var key = prop[indexProp];
		if(!!data[key] && typeof data[key] === 'function') {
			if(Object.isFrozen(data[key]) || Object.isSealed(data[key])) {
				throw 'This function is frozen';
			}
			if(isBehaviorSeparate) {
				arrayFunc[++indexFunc] = data[key];
			}
			delete data[key];
		}

		if(!!prop[indexProp + 1]) {
			action();
		}
	}

	return (function () {
		if(typeof data !== 'object') {
			throw 'ArgumentError: object expected';
		}

		if(Object.isFrozen(data) || Object.isSealed(data)) {
			throw 'This object is frozen';
		}

		if(isReverse) {
			setFunctions();
		}else {
			action();
		}
		return isBehaviorSeparate ? arrayFunc : data;
	})();
};

module.exports = debehaviorizer;