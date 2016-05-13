var logger = console.log.bind(console);
//TASK#1 Reverse String
logger('\nTASK#1 Reverse String');
var str = 'Hello World!';
var tempStr = '';
indexEnd = str.length;
logger(str);

while (indexEnd > 0) {
	tempStr += str.charAt(--indexEnd);
}
str = tempStr;
logger(tempStr);



//TASK#1 Check if string ends with
logger('\nTASK#1 Check if string ends with');
var findStr = 'olleH';
var findIndex = str.lastIndexOf(findStr);
indexEnd = str.length;

if(findIndex == indexEnd - findStr.length) {
	logger('The string "' + findStr + '" is end of string ' + str);
}else {
	logger('The string "' + findStr + '" is not end of string ' + str);
}



//TASK#1 Check if string begins with
logger('\nTASK#1 Check if string begins with');
findStr = '!dlr';
findIndex = str.indexOf(findStr);
if(findIndex == 0) {
	logger('The string "' + findStr + '" is begin of string ' + str);
}else {
	logger('The string "' + findStr + '" is not begin of string ' + str);
}



//TASK#1 Check if string is in camelCase (CamelClass)
logger('\nTASK#1 Check if string is in camelCase (CamelClass)');
str = 'helloWorld';
var camelCase = function (strFunc) {
	let isCamel = true;
	let len = 0;
	arrayStr = strFunc.match(/([a-z0-9]*[A-Z][a-z0-9]*){1,}/g);
	for(let index in arrayStr) {
		len += arrayStr[index].length;
	}
	return arrayStr[0] != null && len == strFunc.length;
}
if(camelCase(str)){
	logger('The string "' + str + '" is in camelCase ');
}else {
	logger('The string "' + str + '" is not in camelCase ');
}



//TASK#1 Check if string is in Pascal_Case (pascal_case_to)
logger('\nTASK#1 Check if string is in Pascal_Case (pascal_case_to)');
str = 'hello_world!';
var pascalCase = function (strFunc) {
	let arrayStr = strFunc.split(/[^a-zA-Z]/);
	let isFirstUpper = true;
	let tempStr = '';
	for(let prop in arrayStr) {
		if(arrayStr[prop].charAt(0) != arrayStr[prop].charAt(0).toUpperCase()) {
			isFirstUpper = false;
			break;
		}else {
			let tempStr = arrayStr[prop].slice(1, arrayStr[prop].length);
			if(tempStr != tempStr.toLowerCase()){
				isFirstUpper = false;
				break;
			}
		}
	}



	if(isFirstUpper) {
		arrayStr = strFunc.toLowerCase().split(/_/);
	}else {
		arrayStr = strFunc.split('_');
	}
	let pascalStr = '';
	for(let prop in arrayStr) {
		if(arrayStr[prop] != '') {
			pascalStr += arrayStr[prop] + '_';
		}
	}
	let pascalStrLen = pascalStr.length;
	if(pascalStrLen > 1) {
		pascalStr = pascalStr.slice(0, pascalStrLen - 1);
	}
	if(pascalStr == str.toLowerCase()) {
		return true;
	}else {
		return false;
	}
}
if(pascalCase(str)) {
	logger('The string "' + str + '" is in Pascal_Case');
}else {
	logger('The string "' + str + '" is not in Pascal_Case');
}



//TASK#2 Insertion sort
var swap = function(array, firstIndex, secondIndex) {
	let temp = array[firstIndex];
	array[firstIndex] = array[secondIndex]
	array[secondIndex] = temp;
}

logger('\nTASK#2 Insertion sort');
var points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var insertionSort = function(array) {
	for(let firstIndex = 1; firstIndex < array.length; firstIndex++) {
		for(let secondIndex = firstIndex; secondIndex > 0 && array[secondIndex - 1] > array[secondIndex]; secondIndex--) {
			swap(array, secondIndex - 1, secondIndex);
		}
	}
}
insertionSort(points)
logger('Result array = [' + points + ']');



//TASK#2 Quicksort
logger('\nTASK#2 Quicksort');
points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var quickSort = function (array) {
	let startArray = 0;
	let endArray = array.length - 1;
	let doSort = function (start, end) {
		if (start >= end) {
			return;
		}
		let startIndex = start;
		let endIndex = end;
		let currentIndex = startIndex - Math.round((startIndex - endIndex) / 2);
		while (startIndex < endIndex) {
			while (array[startIndex] <= array[currentIndex] && startIndex < currentIndex) {
				startIndex++;
			}
			while (array[currentIndex] <= array[endIndex] && endIndex > currentIndex) {
				endIndex--;
			}
			if (startIndex < endIndex) {
				swap(array, startIndex, endIndex);
				if (startIndex == currentIndex) {
					currentIndex = endIndex;
				}
				else {
					if (endIndex == currentIndex) {
						currentIndex = startIndex;
					}
				}
			}
		}
		doSort(start, currentIndex);
		doSort(currentIndex + 1, end);
	}
	doSort(startArray, endArray);
}
quickSort(points);
logger('Result array = [' + points + ']');



//TASK#2 Merge sort
logger('\nTASK#2 Merge sort');
points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var mergeSort = function (array) {
	if(array.length < 2) return array;
	let middle = array.length / 2;
	let array1 = array.slice(0, middle);
	let array2 = array.slice(middle, array.length);
	return merge(mergeSort(array1), mergeSort(array2));
}
var merge = function (array1, array2){
	var len = array1.length + array2.length;
	let array = [];
	let indexArray1 = 0;
	let indexArray2 = 0;
	for(let index = 0; index < len; index++){
		if(indexArray1 == array1.length){
			array[index] = array2[indexArray2++];				
		}else {
			if(indexArray2 == array2.length){
				array[index] = array1[indexArray1++];
			}else {
				if(array1[indexArray1] < array2[indexArray2]){
					array[index] = array1[indexArray1++];
				}else {
					array[index] = array2[indexArray2++];
				}
			}
		}
	}
	return array;
}
logger('Result array = [' + mergeSort(points) + ']');



//TASK#2 Bubble sort
logger('\nTASK#2 Bubble sort');
points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var bubbleSort = function (array){
	let len = array.length;
	for (let firstIndex = 0; firstIndex < len; firstIndex++) {
		for (let secondIndex = len - 1; secondIndex > firstIndex; secondIndex--) {
			if (array[secondIndex] < array[secondIndex - 1]) {
				swap(array, secondIndex - 1, secondIndex);
			}
		}
	}
}
bubbleSort(points);
logger('Result array = [' + points + ']');



//TASK#2 Shell sort
logger('\nTASK#2 Shell sort');
points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var shellSort = function (array) {
	let doSort = function (array, h) {
		let len = array.length;
		for (let firstIndex = h; firstIndex < len; firstIndex++) {
			for (let secondIndex = firstIndex; secondIndex >= h; secondIndex -= h) {
				if (array[secondIndex] < array[secondIndex - h]){
					swap(array, secondIndex, secondIndex - h);
				}
				else {
					break;
				}
			}
		}
	}
	let h = 1;
	while (h * 3 < array.length) {
		h = h * 3 + 1;
	}
	while(h >= 1) {
		doSort(array, h);
		h = Math.round(h/3);
	}
}
shellSort(points);
logger('Result array = [' + points + ']');



//TASK#2 Counting sort
logger('\nTASK#2 Counting sort');
points = [40, 100, 1, 5, 25, 10, 2];
logger('Input array = [' + points + ']');
var countingSort = function (array) {
	let min = array[0];
	let max = min;
	let len = array.length;
	for(let firstIndex = 0; firstIndex < len; firstIndex++) {
		if(min > array[firstIndex]) {
			min = array[firstIndex];
		}else {
			if(max < array[firstIndex]) {
				max = array[firstIndex];
			}
		}
	}
	let tempArray = [];
	for(let index = 0; index < max - min + 1; index++) {
		tempArray[index] = 0;
	}
	for(let prop in array) {
		if(tempArray[array[prop] - min] === undefined) {
			tempArray[array[prop] - min] = 1;
		}else {
			tempArray[array[prop] - min]++;
		}
	}
	let n = 0;
	for(let firstIndex = 0; firstIndex < tempArray.length; firstIndex++) {
		for(let secondIndex = 0; secondIndex < tempArray[firstIndex]; secondIndex++) {
			array[n++] = firstIndex + min;
		}
	}
}
countingSort(points);
logger('Result array = [' + points + ']');



//TASK#2 Finding max, min, avg for square arrays
logger('\nTASK#2 Finding max, min, avg for square arrays');
var squareArray = [];
for(let firstIndex = 0; firstIndex < 5; firstIndex++) {
	squareArray[firstIndex] = [];
	for(let secondIndex = 0; secondIndex < 5; secondIndex++) {
		squareArray[firstIndex][secondIndex] = Math.round(Math.random() * 100);
	}
}
logger(squareArray);
var findMax = function(array) {
	let maxArray = [];
	for(let firstIndex = 0; firstIndex < array.length; firstIndex++) {
		maxArray[firstIndex] = squareArray[firstIndex].sort(function(a, b){return b - a;})[0];
	}
	return maxArray.sort(function(a, b){return b - a;})[0];
}
logger('max value = ' + findMax(squareArray));
var findMin = function(array) {
	let maxArray = [];
	for(let firstIndex = 0; firstIndex < array.length; firstIndex++) {
		maxArray[firstIndex] = squareArray[firstIndex].sort(function(a, b){return a - b;})[0];
	}
	return maxArray.sort(function(a, b){return a - b;})[0];
}
logger('min value = ' + findMin(squareArray));
var findAvg = function(array) {
	let len = 0;
	let avg = 0;
	for(let firstIndex in array) {
		for(let secondIndex in array[firstIndex]) {
			len++;
			avg += array[firstIndex][secondIndex];
		}
	}
	return avg/len;
}
logger('avg value = ' + findAvg(squareArray));



//TASK#2 Printing some triangles with zeroes and ones
logger('\nTASK#2 Printing some triangles with zeroes and ones');
var printMarix = function (matrix) {
	for(let firstIndex in matrix) {
		let strMatrix = '';
		for(let secondIndex in matrix[firstIndex]) {
			strMatrix += matrix[firstIndex][secondIndex] + ' ';
		}
		logger(strMatrix);
	}
}
var squareArray = [];
var left = 0;
var right = 4;
var mode = 1;
for(let firstIndex = 0; firstIndex < 5; firstIndex++) {
	squareArray[firstIndex] = [];
	for(let secondIndex = 0; secondIndex < 5; secondIndex++) {
		if(secondIndex >= left && secondIndex <= right) {
			squareArray[firstIndex][secondIndex] = 1;
		}else {
			squareArray[firstIndex][secondIndex] = 0;
		}
	}
	if(left >= right && mode > 0) {
		mode = -1;
	}

	left += mode;
	right -= mode;
}
printMarix(squareArray);
logger('\n\n');
for(let firstIndex = 0; firstIndex < 5; firstIndex++) {
	squareArray[firstIndex] = [];
	for(let secondIndex = 0; secondIndex < 5; secondIndex++) {
		left = firstIndex;
		if(Math.ceil((squareArray.length - 1)/2) <= left) {
			left = squareArray.length - firstIndex - 1;
		}
		if(secondIndex <= left) {
			squareArray[firstIndex][secondIndex] = 1;
		}else {
			squareArray[firstIndex][secondIndex] = 0;
		}
	}
}
printMarix(squareArray);
logger('\n\n');
for(let firstIndex = 0; firstIndex < 5; firstIndex++) {
	squareArray[firstIndex] = [];
	for(let secondIndex = 0; secondIndex < 5; secondIndex++) {
		if(secondIndex <= firstIndex) {
			squareArray[firstIndex][secondIndex] = 1;
		}else {
			squareArray[firstIndex][secondIndex] = 0;
		}
	}
}
printMarix(squareArray);



//TASK#2 Sort array of objects by properties count, ascending and descending
logger('\nTASK#2 Sort array of objects by properties count, ascending and descending');
var obj1 = { a: 2, c: 3, d: 3};
var obj2 = { a: 1 };
var obj3 = { a: 2, c: 3};
var objLogFunc = function(obj) {
	let strObj = '{';
	for(let prop in Object.keys(obj)) {
		if(typeof obj[Object.keys(obj)[prop]] === 'object') {
			let str = objLogFunc(obj[Object.keys(obj)[prop]]);
			strObj += Object.keys(obj)[prop] + ': [' + str.substring(0, str.length - 1) + ']';
		}else {
			strObj += Object.keys(obj)[prop] + ': ' + obj[Object.keys(obj)[prop]] + ', ';
		}
	}
	if(strObj.length >= 2 && strObj.substring(strObj.length - 2, strObj.length) == ', ') {
		strObj = strObj.substring(0, strObj.length - 2);
	}
	strObj += '};';
	return strObj;
}
var logFunc = function(array) {
	let res = '[';
	for(let prop in arOfObj) {
		res += arOfObj[prop].description + ", ";
	}
	if(res.length >= 2) {
		res = res.substr(0, res.length - 2);
	}
	res += '];';
	return res;
}
var strObj = 'obj1 = ';
strObj += objLogFunc(obj1);
logger(strObj);
strObj = 'obj2 = ';
strObj += objLogFunc(obj2);
logger(strObj);
strObj = 'obj3 = ';
strObj += objLogFunc(obj3);
logger(strObj);
obj1.description = 'obj1';
obj2.description = 'obj2';
obj3.description = 'obj3';
var arOfObj = [obj1, obj2, obj3];
strObj = 'arOfObj = ';
strObj += logFunc(arOfObj);
logger(strObj);
var objSort = function (array, param) {
	array.sort(function(a, b){
		let aLen = Object.keys(a).length;
		let bLen = Object.keys(b).length;
		if(param == 'asc') {
			return (aLen - bLen);
		}else {
			if(param == 'desc') {
				return (bLen - aLen);
			}
		}
	});
}
logger('\nSort by properties count ascending:');
objSort(arOfObj, 'asc');
strObj = 'res = ';
strObj += logFunc(arOfObj);
logger(strObj);
logger('Sort by properties count descending:');
objSort(arOfObj, 'desc');
strObj = 'res = ';
strObj += logFunc(arOfObj);
logger(strObj);



//TASK#3 Given two string return sum of all digits in this string (maybe separated by letters), don't forget to check if string is a hexadecimal number
logger("\nTASK#3 Given two string return sum of all digits in this string (maybe separated by letters), don't forget to check if string is a hexadecimal number");
var str1 = '654ffrt3afyy33';

var str2 = '387hfdklv875Dkvn46sdB';
logger("str1=" + str1 + ", str2=" + str2);
str1 = str1.replace(/[^0-9a-fA-F]/g,'');
var str1Dec = str1.replace(/[^0-9]/g,'');
var str1Hex = str1.replace(/[^a-fA-F]/g,'');
str2 = str2.replace(/[^0-9a-fA-F]/g,'');
var str2Dec = str2.replace(/[^0-9]/g,'');
var str2Hex = str2.replace(/[^a-fA-F]/g,'');
if(str1 != str1Dec){
	var int1 = parseInt(str1, 16);
}else {
	var int1 = parseInt(str1);
}
if(str2 != str2Dec){
	var int2 = parseInt(str2, 16);
}else {
	var int2 = parseInt(str2);
}
logger(str1 + ' + ' + str2 + ' = ' + (int1 + int2));
var strAllDec = str1Dec + str2Dec;
var strAllHex = str1Hex + str2Hex;
var sum = 0;
for(let index in strAllDec) {
	sum += parseInt(strAllDec[index]);
}
for(let index in strAllHex) {
	sum += parseInt(strAllHex[index], 16);
}
logger('Sum of all digits with hexadecimal digits are ' + sum);




//TASK#3 SemiColonSON (CommaColonSON) Given the following data, separate by commas and semicolons, parse it in JS object in following way
logger("\nTASK#3 SemiColonSON (CommaColonSON) Given the following data, separate by commas and semicolons, parse it in JS object in following way");
var data = ';key,value;key1,value;key3,value3;';
logger('data = ' + data);
var map = data.split(/;/);
var object = new Object();
for(let index = 0; index < map.length; index++) {
	if(map[index] != '') {
		let keyValue = map[index].split(/,/);
		if(keyValue.length == 2 && keyValue[0] != '') {
			object[keyValue[0]] = keyValue[1];
		}
	}
}
strObj = 'Output = ';
strObj += objLogFunc(object);
logger(strObj);
logger(object);



//TASK#3 Advanced part: if there is colon (":") next part will be treats as array of objects
logger('\nTASK#3 Advanced part: if there is colon (":") next part will be treats as array of objects');
var data = ";key,value;key1,value;arrayHere:k1,v1;k2,v2;k3,v3";
logger('data = ' + data);
var map = data.split(/;/);
var object = new Object();
for(let index = 0; index < map.length; index++) {
	if(map[index] != '') {
		let keyValue = map[index].split(/,/);
		if(keyValue.length == 2 && keyValue[0] != '') {
			isArray = keyValue[0].split(/:/);
			if(isArray.length > 1) {
				object[isArray[0]] = new Object();
				let temp = isArray[1].split(/,/);
				object[isArray[0]][temp[0]] = keyValue[1];
				for(let secondIndex = index + 1; secondIndex < map.length; secondIndex++) {
					keyValue = map[secondIndex].split(/,/);
					if(keyValue.length == 2 && keyValue[0] != '') {
						object[isArray[0]][keyValue[0]] = keyValue[1];
					}
				}
				break;
			}else {
				object[keyValue[0]] = keyValue[1];
			}
		}
	}
}
strObj = 'Output = ';
strObj += objLogFunc(object);
logger(strObj);
logger(object);