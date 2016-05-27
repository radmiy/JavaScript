var semiColonSON = function(data) {
	var object = {};
	var stringResult = '';
	/** 
	 * @private 
	 * @return {number} return number of given symbol in string
	 */
	function checkBrackets(symbol) {
		var eof = false;
		var numberSymbol = 0;
		var indexSymbol = 0;
		
		while(!eof) {
			if(indexSymbol != -1) {
				indexSymbol = data.indexOf(symbol, indexSymbol + 1);
				if(indexSymbol != -1) {
					numberSymbol++;
				}
			}
			eof = indexSymbol == -1;
		}

		return numberSymbol;
	}

	/** 
	 * @private 
	 * @return {object} return array of objects initialisation
	 */
	function getObjects() {
		/** @private */
		var eof = false;
		/** @private */
		var arrayFunc = [];
		/** @private */
		var indexGroup = 0;
		/** @private */
		var endIndex = -1;
		/** @private */
		var startIndex = -1;
		while(!eof) {
			endIndex = data.indexOf('}');
			if(endIndex !== -1) {
				startIndex = data.slice(0, endIndex).lastIndexOf('{');
			}
			if(startIndex !== -1 && endIndex !== -1){
				var subData = data.slice(startIndex, endIndex + 1);
				arrayFunc[indexGroup] = subData;
				data = data.replace(subData, '()' + indexGroup + '()');
			}else {
				eof = true;
				startIndex = data.indexOf('|');
				endIndex = data.slice(startIndex + 1).indexOf('|');
				if(startIndex !== endIndex) {
					subData = data.slice(startIndex, startIndex + endIndex + 2);
					arrayFunc[indexGroup] = subData;
					data = data.replace(subData, '()' + indexGroup + '()');
					indexGroup++;
				}

				startIndex = data.lastIndexOf(':');
				if(startIndex !== -1) {
					startIndex = data.slice(0, startIndex).lastIndexOf(';');
					subData = data.slice(startIndex + 1, data.length);
					arrayFunc[indexGroup] = subData;
					data = data.replace(subData, '()' + indexGroup + '()');
				}
			}
			indexGroup++;
		}
		return reestablishMap(arrayFunc, data.split(/;/));
	}

	/** 
	 * @private 
	 * @return {object} return array of objects initialisation
	 */
	function reestablishMap(arrayFunc, map) {
		var subData = '';
		if(arrayFunc.length !== 0 && map.length !== 0) {
			for(var index = arrayFunc.length - 1; index >= 0; index--) {
				subData = '()' + index + '()';
				for(var indexMap = 0; indexMap < map.length; indexMap++) {
					var indexSubString = map[indexMap].indexOf(subData);
					if(indexSubString != -1) {
						map[indexMap] = map[indexMap].replace(subData, arrayFunc[index]);
					}
				}
			}
		}
		return map;
	}

	/** 
	 * @private 
	 * @return {object} return created array
	 */
	function getArray(keyValue) {
		object[keyValue[0].trim()] = [];
		var tempValue = (keyValue[1].trim()).split(/;/);
		var index = -1;
		
		function recurse() {
			index++;
			
			if(index >= tempValue.length) {
				return;
			}

			if(!!tempValue[index]) {
				var temp = tempValue[index].split(/,/);
				var num = parseInt(temp[1]);
				if(!!num) {
					object[keyValue[0].trim()][temp[0]] = num;
				}else {
					object[keyValue[0].trim()][temp[0]] = temp[1];
				}
			}
			recurse();
		}
		
		recurse();
	}

	/** @private */
	function getFunction(keyValue, startIndex, endIndex) {
		var subData = keyValue[1].slice(startIndex, endIndex + 1);
		startIndex = subData.indexOf('function');
		if(startIndex != -1) {
			subData = subData.slice(1, subData.length - 1).trim();
			startIndex = subData.indexOf('(');
			endIndex = subData.indexOf(')');
			var paramsFunc = subData.slice(startIndex + 1, endIndex).split(/,/);
			startIndex = subData.indexOf('{');
			endIndex = subData.indexOf('}');
			var bodyFunc = subData.slice(startIndex + 1, endIndex);
			/** @constructor */
			object[keyValue[0].trim()] = new Function(paramsFunc, bodyFunc);
		}else {
			/** @constructor */
			var func = new Function(subData.slice(1, subData.length - 1));
			object[keyValue[0].trim()] = func;
		}
	}

	function getObjectValue(keyValue) {
		if(keyValue.length == 2 && !!keyValue[0]) {
			var startIndex = keyValue[1].indexOf('|');
			var endIndex = keyValue[1].indexOf('|', startIndex + 1);
			if(startIndex != endIndex) {
				getFunction(keyValue, startIndex, endIndex);
			}else {
				var num = parseInt(keyValue[1]);
				if(!!num) {
					object[keyValue[0].trim()] = num;
				}else {
					object[keyValue[0].trim()] = keyValue[1];
				}
			}
		}
	}

	function stringifyArray(value) {
		if(Array.isArray(value)) {
			stringResult += ': ';
			for(var indexArray = 0; indexArray < value.length; indexArray++) {
				if(!!value[indexArray]) {
					stringResult += indexArray + ',' + value[indexArray] + ';';
				}
			}
		}
	}

	function stringToObject() {
		var map = [];
		var index = -1;
		if(checkBrackets('|') % 2 !== 0 || checkBrackets('{') != checkBrackets('}')) {
			throw 'ArgumentError: error in function string';
		}

		map = getObjects();

		function recurse() {
			index++;
			
			if(index >= map.length) {
				return;
			}

			if(!!map[index]) {
				var indexOfColon = map[index].indexOf(':');
				if(indexOfColon !== -1) {
					getArray(map[index].split(/:/));
				}else {
					getObjectValue(map[index].split(/,/));
				}
			}
			recurse();	
		}
		
		recurse();
		return object;
	}

	function objectToString() {
		var prop = Object.getOwnPropertyNames(data);
		for(var index = 0; index < prop.length; index++){
			if(!!prop[index]) {
				var key = prop[index];
				var value = data[key];
				stringResult += key;
				switch(typeof value) {
					case 'object':
						stringifyArray(value);
						break;
					case 'function':
						stringResult += ',|' + value + '|;';
						break;
					default:
						stringResult += ',' + value + ';';
						break;
				}
			}
		}
		return stringResult;
	}

	return (function() {
			var type = typeof data;
			switch(type) {
				case 'string':
					return stringToObject();
				case 'object':
					return objectToString();
				default:
					throw 'ArgumentError: object or string expected';
			}
		})();
};

module.exports = semiColonSON;