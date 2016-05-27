var STKit = require('./js/stkit');

var logger = console.log.bind(console);

var objLogFunc = function(obj) {
	var isArray = Array.isArray(obj);
	var isObject = typeof obj === 'object';
	var strObj = isArray ? '[' : isObject ? '{' : "'" + obj;

	if(isObject) {
		for(var prop in Object.keys(obj)) {
			if(typeof obj[Object.keys(obj)[prop]] === 'object') {
				var str = objLogFunc(obj[Object.keys(obj)[prop]]);
				strObj += Object.keys(obj)[prop] + ': {' + str.substring(0, str.length - 1) + '}';
			}else {
				strObj += Object.keys(obj)[prop] + ': ' + obj[Object.keys(obj)[prop]] + ', ';
			}
		}
		if(strObj.length >= 2 && strObj.substring(strObj.length - 2, strObj.length) == ', ') {
			strObj = strObj.substring(0, strObj.length - 2);
		}
	}
	strObj += isArray ? ']' : isObject ? '}' : "'";
	return strObj;
};

function factorial(n) {
	if(typeof n !== 'number') {
		throw 'ArgumentError: number expected';
	}
    var res = 1;
    while(n !== 1) {
        res *= n--;
    }
    return res;
}

function sum() {
	var sum = 0;
	for(var prop in arguments) {
		if(typeof arguments[prop] === 'number') {
			sum += arguments[prop];
		}
	}
	return sum;
}

function fibonacci(n) {
  if (n === 0 || n === 1) {
  	return n;
  }else {
  	return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

var memo = STKit.memoizer(sum);
logger('__________________________');
logger('Task#1 Memoizer');
logger('__________________________');
logger('Given function sum()');
logger('result of function with params is ' + memo(1, 1));
logger('result of function with params is ' + memo(2, 2, 2));
logger('result of function with params is ' + memo(1, 1));
logger('result of function with params is ' + memo(2, 2, 2));
logger();

memo = STKit.memoizer(factorial);
logger('Given function factorial()');
var timeLoop = Date.now();
memo = STKit.memoizer(fibonacci);
logger('fibonachi(41) = ' + memo(41));
timeLoop = Date.now() - timeLoop;
logger('Lead time = ' + timeLoop);
var timeLoop = Date.now();
logger('fibonachi(41) = ' + memo(41));
timeLoop = Date.now() - timeLoop;
logger('Lead time = ' + timeLoop);
logger();

logger('__________________________');
logger('Task#2 Is Array Like');
logger('__________________________');
var a = {0:'a', 1:'b', 2:'c', length:3};
var b = 'jdskhf';
var c = ['a', 'b', 'c'];
var d = {'1':'a', '5':'b', '2':'c', length:'2a'};
var obj = { name: 'test', size: 2, length: 5 };
logger('For object (' + objLogFunc(a) + ') array like is ' + STKit.isArrayLike(a));
logger('For object (' + objLogFunc(b) + ') array like is ' + STKit.isArrayLike(b));
logger('For object (' + objLogFunc(c) + ') array like is ' + STKit.isArrayLike(c));
logger('For object (' + objLogFunc(d) + ') array like is ' + STKit.isArrayLike(d));
logger('For object (' + objLogFunc(obj) + ') array like is ' + STKit.isArrayLike(obj));
logger();

logger('__________________________');
logger('Task#3 Debehaviorizer');
logger('__________________________');
obj = {'a':1, 'b':2, getA: function(){return this.a;}, getB: function(){return this.b;}, mass:['h1', 2, 3]};
logger('Given object:');
logger(obj);
// Object.freeze(obj.getA);
try {
	// STKit.debehaviorizer(obj, true);
	logger('Removed functions');
	var array = STKit.debehaviorizer(obj, true);
	logger(obj);
	logger('Add functions');
	logger(STKit.debehaviorizer(obj, array));
}catch (e) {
	logger(e);
}
logger();

logger('__________________________');
logger('Task#4 SemiColonSON Evolved');
logger('__________________________');
obj = {'a':1, getA: function(){return this.a;}, mass:['h1', 2, 3]};
logger('Given object:');
logger(obj);
var stringObject = STKit.semiColonSON(obj);
logger('Received string = ' + stringObject);
var object3 = STKit.semiColonSON(stringObject);
logger('Early received string parse to object againt ' );
logger(object3);

obj = ';key,value;methodName,|function (a) { return a + 1; }|;arrayHere:k1,v1;k2,v2;k3,v3';
var object1 = STKit.semiColonSON(obj);
logger('Given string:');
logger(obj);
logger('Call method in generated object with param (4)');
logger('Result = ' + object1.methodName(4));

obj = ';key,3;methodName,|var a=10; return a * this.key|;';
var object2 = STKit.semiColonSON(obj);
logger('Given string:');
logger(obj);
logger('Call method in generated object');
logger('Result = ' + object2.methodName());