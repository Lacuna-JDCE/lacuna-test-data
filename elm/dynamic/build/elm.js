
(function() {___jdce_logger("/build/elm.js", 0);
'use strict';

function F2(fun)
{___jdce_logger("/build/elm.js", 1);
  function wrapper(a) {___jdce_logger("/build/elm.js", 2); return function(){___jdce_logger("/build/elm.js", 3);}; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{___jdce_logger("/build/elm.js", 4);
  function wrapper(a) {___jdce_logger("/build/elm.js", 5);
    return function(b) {___jdce_logger("/build/elm.js", 6); return function(){___jdce_logger("/build/elm.js", 7);}; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{___jdce_logger("/build/elm.js", 8);
  function wrapper(){___jdce_logger("/build/elm.js", 9);}
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{___jdce_logger("/build/elm.js", 10);
  function wrapper(){___jdce_logger("/build/elm.js", 11);}
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{___jdce_logger("/build/elm.js", 12);
  function wrapper(){___jdce_logger("/build/elm.js", 13);}
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{___jdce_logger("/build/elm.js", 14);
  function wrapper(){___jdce_logger("/build/elm.js", 15);}
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{___jdce_logger("/build/elm.js", 16);
  function wrapper(){___jdce_logger("/build/elm.js", 17);}
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{___jdce_logger("/build/elm.js", 18);
  function wrapper(){___jdce_logger("/build/elm.js", 19);}
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{___jdce_logger("/build/elm.js", 20);
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{___jdce_logger("/build/elm.js", 21);
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{___jdce_logger("/build/elm.js", 22);
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(){___jdce_logger("/build/elm.js", 23);}
function A6(fun, a, b, c, d, e, f)
{___jdce_logger("/build/elm.js", 24);
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(){___jdce_logger("/build/elm.js", 25);}
function A8(){___jdce_logger("/build/elm.js", 26);}
function A9(){___jdce_logger("/build/elm.js", 27);}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {___jdce_logger("/build/elm.js", 28);

function div(){___jdce_logger("/build/elm.js", 29);}
function rem(){___jdce_logger("/build/elm.js", 30);}
function mod(){___jdce_logger("/build/elm.js", 31);}
function logBase(){___jdce_logger("/build/elm.js", 32);}
function negate(){___jdce_logger("/build/elm.js", 33);}
function abs(){___jdce_logger("/build/elm.js", 34);}

function min(){___jdce_logger("/build/elm.js", 35);}
function max(){___jdce_logger("/build/elm.js", 36);}
function clamp(){___jdce_logger("/build/elm.js", 37);}

var ord = ['LT', 'EQ', 'GT'];

function compare(){___jdce_logger("/build/elm.js", 38);}

function xor(){___jdce_logger("/build/elm.js", 39);}
function not(b)
{___jdce_logger("/build/elm.js", 40);
	return !b;
}
function isInfinite(){___jdce_logger("/build/elm.js", 41);}

function truncate(){___jdce_logger("/build/elm.js", 42);}

function degrees(){___jdce_logger("/build/elm.js", 43);}
function turns(){___jdce_logger("/build/elm.js", 44);}
function fromPolar(){___jdce_logger("/build/elm.js", 45);}
function toPolar(){___jdce_logger("/build/elm.js", 46);}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(){___jdce_logger("/build/elm.js", 47);},
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {___jdce_logger("/build/elm.js", 48);

// COMPARISONS

function eq(x, y)
{___jdce_logger("/build/elm.js", 49);
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{___jdce_logger("/build/elm.js", 50);
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(){___jdce_logger("/build/elm.js", 51);}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(){___jdce_logger("/build/elm.js", 52);}

function chr(c)
{___jdce_logger("/build/elm.js", 53);
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{___jdce_logger("/build/elm.js", 54);
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{___jdce_logger("/build/elm.js", 55);
	var newRecord = {};
	for (var key in oldRecord)
	{
		var value = (key in updatedFields) ? updatedFields[key] : oldRecord[key];
		newRecord[key] = value;
	}
	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(){___jdce_logger("/build/elm.js", 56);}

function append(xs, ys)
{___jdce_logger("/build/elm.js", 57);
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(){___jdce_logger("/build/elm.js", 58);}

function crashCase(){___jdce_logger("/build/elm.js", 59);}

function regionToString(){___jdce_logger("/build/elm.js", 60);}


// TO STRING

function toString(v)
{___jdce_logger("/build/elm.js", 61);
	var type = typeof v;
	if (type === 'function')
	{
		var name = v.func ? v.func.name : v.name;
		return '<function' + (name === '' ? '' : ':') + name + '>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{___jdce_logger("/build/elm.js", 62);
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$uncurry = F2(
	function(){___jdce_logger("/build/elm.js", 63);});
var _elm_lang$core$Basics$curry = F3(
	function(){___jdce_logger("/build/elm.js", 64);});
var _elm_lang$core$Basics$flip = F3(
	function(){___jdce_logger("/build/elm.js", 65);});
var _elm_lang$core$Basics$snd = function(){___jdce_logger("/build/elm.js", 66);};
var _elm_lang$core$Basics$fst = function(){___jdce_logger("/build/elm.js", 67);};
var _elm_lang$core$Basics$always = F2(
	function(){___jdce_logger("/build/elm.js", 68);});
var _elm_lang$core$Basics$identity = function(){___jdce_logger("/build/elm.js", 69);};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function(){___jdce_logger("/build/elm.js", 70);});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function(){___jdce_logger("/build/elm.js", 71);});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function(){___jdce_logger("/build/elm.js", 72);});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function(){___jdce_logger("/build/elm.js", 73);});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function(){___jdce_logger("/build/elm.js", 74);};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$Never = function(){___jdce_logger("/build/elm.js", 75);};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {___jdce_logger("/build/elm.js", 76);

function log(tag, value)
{___jdce_logger("/build/elm.js", 77);
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(){___jdce_logger("/build/elm.js", 78);}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {___jdce_logger("/build/elm.js", 79);
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$oneOf = function(){___jdce_logger("/build/elm.js", 80);};
var _elm_lang$core$Maybe$andThen = F2(
	function(){___jdce_logger("/build/elm.js", 81);});
var _elm_lang$core$Maybe$Just = function (a) {___jdce_logger("/build/elm.js", 82);
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function(){___jdce_logger("/build/elm.js", 83);});
var _elm_lang$core$Maybe$map2 = F3(
	function(){___jdce_logger("/build/elm.js", 84);});
var _elm_lang$core$Maybe$map3 = F4(
	function(){___jdce_logger("/build/elm.js", 85);});
var _elm_lang$core$Maybe$map4 = F5(
	function(){___jdce_logger("/build/elm.js", 86);});
var _elm_lang$core$Maybe$map5 = F6(
	function(){___jdce_logger("/build/elm.js", 87);});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {___jdce_logger("/build/elm.js", 88);

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{___jdce_logger("/build/elm.js", 89);
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{___jdce_logger("/build/elm.js", 90);
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{___jdce_logger("/build/elm.js", 91);
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}


function range(){___jdce_logger("/build/elm.js", 92);}

function foldr(f, b, xs)
{___jdce_logger("/build/elm.js", 93);
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(){___jdce_logger("/build/elm.js", 94);}

function map3(){___jdce_logger("/build/elm.js", 95);}

function map4(){___jdce_logger("/build/elm.js", 96);}

function map5(){___jdce_logger("/build/elm.js", 97);}

function sortBy(){___jdce_logger("/build/elm.js", 98);}

function sortWith(){___jdce_logger("/build/elm.js", 99);}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,
	range: range,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function(){___jdce_logger("/build/elm.js", 100);};
var _elm_lang$core$List$drop = F2(
	function(){___jdce_logger("/build/elm.js", 101);});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {___jdce_logger("/build/elm.js", 102);
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {___jdce_logger("/build/elm.js", 103);
		return _elm_lang$core$Basics$not(
			A2(
				_elm_lang$core$List$any,
				function(){___jdce_logger("/build/elm.js", 104);},
				list));
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {___jdce_logger("/build/elm.js", 105);
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {___jdce_logger("/build/elm.js", 106);
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function(){___jdce_logger("/build/elm.js", 107);}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function(){___jdce_logger("/build/elm.js", 108);};
var _elm_lang$core$List$product = function(){___jdce_logger("/build/elm.js", 109);};
var _elm_lang$core$List$maximum = function(){___jdce_logger("/build/elm.js", 110);};
var _elm_lang$core$List$minimum = function(){___jdce_logger("/build/elm.js", 111);};
var _elm_lang$core$List$indexedMap = F2(
	function(){___jdce_logger("/build/elm.js", 112);});
var _elm_lang$core$List$member = F2(
	function (x, xs) {___jdce_logger("/build/elm.js", 113);
		return A2(
			_elm_lang$core$List$any,
			function (a) {___jdce_logger("/build/elm.js", 114);
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {___jdce_logger("/build/elm.js", 115);
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function(){___jdce_logger("/build/elm.js", 116);};
var _elm_lang$core$List$head = function(){___jdce_logger("/build/elm.js", 117);};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {___jdce_logger("/build/elm.js", 118);
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {___jdce_logger("/build/elm.js", 119);
					return A2(
						_elm_lang$core$List_ops['::'],
						f(x),
						acc);
				}),
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {___jdce_logger("/build/elm.js", 120);
		var conditionalCons = F2(
			function(){___jdce_logger("/build/elm.js", 121);});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function(){___jdce_logger("/build/elm.js", 122);});
var _elm_lang$core$List$filterMap = F2(
	function(){___jdce_logger("/build/elm.js", 123);});
var _elm_lang$core$List$reverse = function(){___jdce_logger("/build/elm.js", 124);};
var _elm_lang$core$List$scanl = F3(
	function(){___jdce_logger("/build/elm.js", 125);});
var _elm_lang$core$List$append = F2(
	function(){___jdce_logger("/build/elm.js", 126);});
var _elm_lang$core$List$concat = function(){___jdce_logger("/build/elm.js", 127);};
var _elm_lang$core$List$concatMap = F2(
	function(){___jdce_logger("/build/elm.js", 128);});
var _elm_lang$core$List$partition = F2(
	function(){___jdce_logger("/build/elm.js", 129);});
var _elm_lang$core$List$unzip = function(){___jdce_logger("/build/elm.js", 130);};
var _elm_lang$core$List$intersperse = F2(
	function(){___jdce_logger("/build/elm.js", 131);});
var _elm_lang$core$List$takeReverse = F3(
	function(){___jdce_logger("/build/elm.js", 132);});
var _elm_lang$core$List$takeTailRec = F2(
	function(){___jdce_logger("/build/elm.js", 133);});
var _elm_lang$core$List$takeFast = F3(
	function(){___jdce_logger("/build/elm.js", 134);});
var _elm_lang$core$List$take = F2(
	function(){___jdce_logger("/build/elm.js", 135);});
var _elm_lang$core$List$repeatHelp = F3(
	function(){___jdce_logger("/build/elm.js", 136);});
var _elm_lang$core$List$repeat = F2(
	function(){___jdce_logger("/build/elm.js", 137);});

var _elm_lang$core$Result$toMaybe = function(){___jdce_logger("/build/elm.js", 138);};
var _elm_lang$core$Result$withDefault = F2(
	function(){___jdce_logger("/build/elm.js", 139);});
var _elm_lang$core$Result$Err = function(){___jdce_logger("/build/elm.js", 140);};
var _elm_lang$core$Result$andThen = F2(
	function(){___jdce_logger("/build/elm.js", 141);});
var _elm_lang$core$Result$Ok = function (a) {___jdce_logger("/build/elm.js", 142);
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function(){___jdce_logger("/build/elm.js", 143);});
var _elm_lang$core$Result$map2 = F3(
	function(){___jdce_logger("/build/elm.js", 144);});
var _elm_lang$core$Result$map3 = F4(
	function(){___jdce_logger("/build/elm.js", 145);});
var _elm_lang$core$Result$map4 = F5(
	function(){___jdce_logger("/build/elm.js", 146);});
var _elm_lang$core$Result$map5 = F6(
	function(){___jdce_logger("/build/elm.js", 147);});
var _elm_lang$core$Result$formatError = F2(
	function(){___jdce_logger("/build/elm.js", 148);});
var _elm_lang$core$Result$fromMaybe = F2(
	function(){___jdce_logger("/build/elm.js", 149);});

//import //

var _elm_lang$core$Native_Platform = function() {___jdce_logger("/build/elm.js", 150);


// PROGRAMS

function addPublicModule(object, name, main)
{___jdce_logger("/build/elm.js", 151);
	var init = main ? makeEmbed(name, main) : mainIsUndefined(name);

	object['worker'] = function(){___jdce_logger("/build/elm.js", 152);}

	object['embed'] = function(){___jdce_logger("/build/elm.js", 153);}

	object['fullscreen'] = function fullscreen(flags)
	{___jdce_logger("/build/elm.js", 154);
		return init(document.body, flags, true);
	};
}


// PROGRAM FAIL

function mainIsUndefined(){___jdce_logger("/build/elm.js", 155);}

function errorHtml(){___jdce_logger("/build/elm.js", 156);}


// PROGRAM SUCCESS

function makeEmbed(moduleName, main)
{___jdce_logger("/build/elm.js", 157);
	return function embed(rootDomNode, flags, withRenderer)
	{___jdce_logger("/build/elm.js", 158);
		try
		{
			var program = mainToProgram(moduleName, main);
			if (!withRenderer)
			{
				program.renderer = dummyRenderer;
			}
			return makeEmbedHelp(moduleName, program, rootDomNode, flags);
		}
		catch (e)
		{
			rootDomNode.innerHTML = errorHtml(e.message);
			throw e;
		}
	};
}

function dummyRenderer(){___jdce_logger("/build/elm.js", 159);}


// MAIN TO PROGRAM

function mainToProgram(moduleName, wrappedMain)
{___jdce_logger("/build/elm.js", 160);
	var main = wrappedMain.main;

	if (typeof main.init === 'undefined')
	{
		var emptyBag = batch(_elm_lang$core$Native_List.Nil);
		var noChange = _elm_lang$core$Native_Utils.Tuple2(
			_elm_lang$core$Native_Utils.Tuple0,
			emptyBag
		);

		return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
			init: function(){___jdce_logger("/build/elm.js", 161);},
			view: function(){___jdce_logger("/build/elm.js", 162);},
			update: F2(function(){___jdce_logger("/build/elm.js", 163);}),
			subscriptions: function(){___jdce_logger("/build/elm.js", 164);}
		});
	}

	var flags = wrappedMain.flags;
	var init = flags
		? initWithFlags(moduleName, main.init, flags)
		: initWithoutFlags(moduleName, main.init);

	return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
		init: init,
		view: main.view,
		update: main.update,
		subscriptions: main.subscriptions,
	});
}

function initWithoutFlags(){___jdce_logger("/build/elm.js", 165);}

function initWithFlags(moduleName, realInit, flagDecoder)
{___jdce_logger("/build/elm.js", 166);
	return function init(flags)
	{___jdce_logger("/build/elm.js", 167);
		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Err')
		{
			throw new Error(
				'You are trying to initialize module `' + moduleName + '` with an unexpected argument.\n'
				+ 'When trying to convert it to a usable Elm value, I run into this problem:\n\n'
				+ result._0
			);
		}
		return realInit(result._0);
	};
}


// SETUP RUNTIME SYSTEM

function makeEmbedHelp(moduleName, program, rootDomNode, flags)
{___jdce_logger("/build/elm.js", 168);
	var init = program.init;
	var update = program.update;
	var subscriptions = program.subscriptions;
	var view = program.view;
	var makeRenderer = program.renderer;

	// ambient state
	var managers = {};
	var renderer;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {___jdce_logger("/build/elm.js", 169);
		var results = init(flags);
		var model = results._0;
		renderer = makeRenderer(rootDomNode, enqueue, view(model));
		var cmds = results._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{___jdce_logger("/build/elm.js", 170);
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {___jdce_logger("/build/elm.js", 171);
			var results = A2(update, msg, model);
			model = results._0;
			renderer.update(view(model));
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{___jdce_logger("/build/elm.js", 172);
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{___jdce_logger("/build/elm.js", 173);
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{___jdce_logger("/build/elm.js", 174);
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{___jdce_logger("/build/elm.js", 175);
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{___jdce_logger("/build/elm.js", 176);
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{___jdce_logger("/build/elm.js", 177);
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{___jdce_logger("/build/elm.js", 178);
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{___jdce_logger("/build/elm.js", 179);
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{___jdce_logger("/build/elm.js", 180);
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {___jdce_logger("/build/elm.js", 181);
			return onMessage(msg, state);
		});
		return A2(andThen, handleMsg, loop);
	}

	var task = A2(andThen, init, loop);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{___jdce_logger("/build/elm.js", 182);
	return function(value)
	{___jdce_logger("/build/elm.js", 183);
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{___jdce_logger("/build/elm.js", 184);
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{___jdce_logger("/build/elm.js", 185);
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{___jdce_logger("/build/elm.js", 186);
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{___jdce_logger("/build/elm.js", 187);
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{___jdce_logger("/build/elm.js", 188);
	function applyTaggers(x)
	{___jdce_logger("/build/elm.js", 189);
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{___jdce_logger("/build/elm.js", 190);
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{___jdce_logger("/build/elm.js", 191);
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{___jdce_logger("/build/elm.js", 192);
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {___jdce_logger("/build/elm.js", 193);
	return value;
});

function setupOutgoingPort(name)
{___jdce_logger("/build/elm.js", 194);
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{___jdce_logger("/build/elm.js", 195);
		while (cmdList.ctor !== '[]')
		{
			var value = converter(cmdList._0);
			for (var i = 0; i < subs.length; i++)
			{
				subs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{___jdce_logger("/build/elm.js", 196);
		subs.push(callback);
	}

	function unsubscribe(){___jdce_logger("/build/elm.js", 197);}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(){___jdce_logger("/build/elm.js", 198);}

var incomingPortMap = F2(function(){___jdce_logger("/build/elm.js", 199);});

function setupIncomingPort(){___jdce_logger("/build/elm.js", 200);}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	mainToProgram: mainToProgram,
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,
	addPublicModule: addPublicModule,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {___jdce_logger("/build/elm.js", 201);

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{___jdce_logger("/build/elm.js", 202);
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(){___jdce_logger("/build/elm.js", 203);}

function nativeBinding(callback)
{___jdce_logger("/build/elm.js", 204);
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(task, callback)
{___jdce_logger("/build/elm.js", 205);
	return {
		ctor: '_Task_andThen',
		task: task,
		callback: callback
	};
}

function onError(){___jdce_logger("/build/elm.js", 206);}

function receive(callback)
{___jdce_logger("/build/elm.js", 207);
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{___jdce_logger("/build/elm.js", 208);
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{___jdce_logger("/build/elm.js", 209);
	return nativeBinding(function(callback) {___jdce_logger("/build/elm.js", 210);
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{___jdce_logger("/build/elm.js", 211);
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{___jdce_logger("/build/elm.js", 212);
	return nativeBinding(function(callback) {___jdce_logger("/build/elm.js", 213);
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(){___jdce_logger("/build/elm.js", 214);}

function sleep(){___jdce_logger("/build/elm.js", 215);}


// STEP PROCESSES

function step(numSteps, process)
{___jdce_logger("/build/elm.js", 216);
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {___jdce_logger("/build/elm.js", 217);
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{___jdce_logger("/build/elm.js", 218);
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{___jdce_logger("/build/elm.js", 219);
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function(){___jdce_logger("/build/elm.js", 220);});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {___jdce_logger("/build/elm.js", 221);

function isEmpty(){___jdce_logger("/build/elm.js", 222);}
function cons(){___jdce_logger("/build/elm.js", 223);}
function uncons(){___jdce_logger("/build/elm.js", 224);}
function append(){___jdce_logger("/build/elm.js", 225);}
function concat(){___jdce_logger("/build/elm.js", 226);}
function length(){___jdce_logger("/build/elm.js", 227);}
function map(){___jdce_logger("/build/elm.js", 228);}
function filter(){___jdce_logger("/build/elm.js", 229);}
function reverse(){___jdce_logger("/build/elm.js", 230);}
function foldl(){___jdce_logger("/build/elm.js", 231);}
function foldr(){___jdce_logger("/build/elm.js", 232);}
function split(){___jdce_logger("/build/elm.js", 233);}
function join(){___jdce_logger("/build/elm.js", 234);}
function repeat(){___jdce_logger("/build/elm.js", 235);}
function slice(){___jdce_logger("/build/elm.js", 236);}
function left(){___jdce_logger("/build/elm.js", 237);}
function right(){___jdce_logger("/build/elm.js", 238);}
function dropLeft(n, str)
{___jdce_logger("/build/elm.js", 239);
	return n < 1 ? str : str.slice(n);
}
function dropRight(){___jdce_logger("/build/elm.js", 240);}
function pad(){___jdce_logger("/build/elm.js", 241);}
function padRight(){___jdce_logger("/build/elm.js", 242);}
function padLeft(){___jdce_logger("/build/elm.js", 243);}

function trim(){___jdce_logger("/build/elm.js", 244);}
function trimLeft(){___jdce_logger("/build/elm.js", 245);}
function trimRight(){___jdce_logger("/build/elm.js", 246);}

function words(){___jdce_logger("/build/elm.js", 247);}
function lines(){___jdce_logger("/build/elm.js", 248);}

function toUpper(){___jdce_logger("/build/elm.js", 249);}
function toLower(){___jdce_logger("/build/elm.js", 250);}

function any(){___jdce_logger("/build/elm.js", 251);}
function all(){___jdce_logger("/build/elm.js", 252);}

function contains(){___jdce_logger("/build/elm.js", 253);}
function startsWith(){___jdce_logger("/build/elm.js", 254);}
function endsWith(){___jdce_logger("/build/elm.js", 255);}
function indexes(){___jdce_logger("/build/elm.js", 256);}

function toInt(){___jdce_logger("/build/elm.js", 257);}

function toFloat(){___jdce_logger("/build/elm.js", 258);}

function toList(){___jdce_logger("/build/elm.js", 259);}
function fromList(){___jdce_logger("/build/elm.js", 260);}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {___jdce_logger("/build/elm.js", 261);

return {
	fromCode: function(){___jdce_logger("/build/elm.js", 262);},
	toCode: function(){___jdce_logger("/build/elm.js", 263);},
	toUpper: function(){___jdce_logger("/build/elm.js", 264);},
	toLower: function(){___jdce_logger("/build/elm.js", 265);},
	toLocaleUpper: function(){___jdce_logger("/build/elm.js", 266);},
	toLocaleLower: function(){___jdce_logger("/build/elm.js", 267);}
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function(){___jdce_logger("/build/elm.js", 268);});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function(){___jdce_logger("/build/elm.js", 269);};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function(){___jdce_logger("/build/elm.js", 270);};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {___jdce_logger("/build/elm.js", 271);

function escape(){___jdce_logger("/build/elm.js", 272);}
function caseInsensitive(){___jdce_logger("/build/elm.js", 273);}
function regex(){___jdce_logger("/build/elm.js", 274);}

function contains(){___jdce_logger("/build/elm.js", 275);}

function find(){___jdce_logger("/build/elm.js", 276);}

function replace(){___jdce_logger("/build/elm.js", 277);}

function split(){___jdce_logger("/build/elm.js", 278);}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function(){___jdce_logger("/build/elm.js", 279);});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function(){___jdce_logger("/build/elm.js", 280);};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_community$string_extra$String_Extra$leftOfBack = F2(
	function(){___jdce_logger("/build/elm.js", 281);});
var _elm_community$string_extra$String_Extra$rightOfBack = F2(
	function(){___jdce_logger("/build/elm.js", 282);});
var _elm_community$string_extra$String_Extra$leftOf = F2(
	function(){___jdce_logger("/build/elm.js", 283);});
var _elm_community$string_extra$String_Extra$rightOf = F2(
	function(){___jdce_logger("/build/elm.js", 284);});
var _elm_community$string_extra$String_Extra$stripTags = function(){___jdce_logger("/build/elm.js", 285);};
var _elm_community$string_extra$String_Extra$toSentenceHelper = F3(
	function(){___jdce_logger("/build/elm.js", 286);});
var _elm_community$string_extra$String_Extra$toSentenceBaseCase = function(){___jdce_logger("/build/elm.js", 287);};
var _elm_community$string_extra$String_Extra$toSentenceOxford = function(){___jdce_logger("/build/elm.js", 288);};
var _elm_community$string_extra$String_Extra$toSentence = function(){___jdce_logger("/build/elm.js", 289);};
var _elm_community$string_extra$String_Extra$ellipsisWith = F3(
	function(){___jdce_logger("/build/elm.js", 290);});
var _elm_community$string_extra$String_Extra$ellipsis = F2(
	function(){___jdce_logger("/build/elm.js", 291);});
var _elm_community$string_extra$String_Extra$countOccurrences = F2(
	function(){___jdce_logger("/build/elm.js", 292);});
var _elm_community$string_extra$String_Extra$unindent = function(){___jdce_logger("/build/elm.js", 293);};
var _elm_community$string_extra$String_Extra$dasherize = function(){___jdce_logger("/build/elm.js", 294);};
var _elm_community$string_extra$String_Extra$underscored = function(){___jdce_logger("/build/elm.js", 295);};
var _elm_community$string_extra$String_Extra$unsurround = F2(
	function(){___jdce_logger("/build/elm.js", 296);});
var _elm_community$string_extra$String_Extra$unquote = function(){___jdce_logger("/build/elm.js", 297);};
var _elm_community$string_extra$String_Extra$surround = F2(
	function(){___jdce_logger("/build/elm.js", 298);});
var _elm_community$string_extra$String_Extra$quote = function(){___jdce_logger("/build/elm.js", 299);};
var _elm_community$string_extra$String_Extra$camelize = function(){___jdce_logger("/build/elm.js", 300);};
var _elm_community$string_extra$String_Extra$isBlank = function(){___jdce_logger("/build/elm.js", 301);};
var _elm_community$string_extra$String_Extra$clean = function(){___jdce_logger("/build/elm.js", 302);};
var _elm_community$string_extra$String_Extra$softBreakRegexp = function(){___jdce_logger("/build/elm.js", 303);};
var _elm_community$string_extra$String_Extra$softEllipsis = F2(
	function(){___jdce_logger("/build/elm.js", 304);});
var _elm_community$string_extra$String_Extra$softBreak = F2(
	function(){___jdce_logger("/build/elm.js", 305);});
var _elm_community$string_extra$String_Extra$softWrapWith = F3(
	function(){___jdce_logger("/build/elm.js", 306);});
var _elm_community$string_extra$String_Extra$softWrap = F2(
	function(){___jdce_logger("/build/elm.js", 307);});
var _elm_community$string_extra$String_Extra$breaker = F3(
	function(){___jdce_logger("/build/elm.js", 308);});
var _elm_community$string_extra$String_Extra$break = F2(
	function(){___jdce_logger("/build/elm.js", 309);});
var _elm_community$string_extra$String_Extra$wrapWith = F3(
	function(){___jdce_logger("/build/elm.js", 310);});
var _elm_community$string_extra$String_Extra$wrap = F2(
	function(){___jdce_logger("/build/elm.js", 311);});
var _elm_community$string_extra$String_Extra$replaceSlice = F4(
	function(){___jdce_logger("/build/elm.js", 312);});
var _elm_community$string_extra$String_Extra$insertAt = F3(
	function(){___jdce_logger("/build/elm.js", 313);});
var _elm_community$string_extra$String_Extra$replace = F3(
	function(){___jdce_logger("/build/elm.js", 314);});
var _elm_community$string_extra$String_Extra$changeCase = F2(
	function(){___jdce_logger("/build/elm.js", 315);});
var _elm_community$string_extra$String_Extra$toSentenceCase = function(){___jdce_logger("/build/elm.js", 316);};
var _elm_community$string_extra$String_Extra$toTitleCase = function(){___jdce_logger("/build/elm.js", 317);};
var _elm_community$string_extra$String_Extra$classify = function(){___jdce_logger("/build/elm.js", 318);};
var _elm_community$string_extra$String_Extra$humanize = function(){___jdce_logger("/build/elm.js", 319);};
var _elm_community$string_extra$String_Extra$decapitalize = function(){___jdce_logger("/build/elm.js", 320);};

//import Native.List //

var _elm_lang$core$Native_Array = function() {___jdce_logger("/build/elm.js", 321);

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(){___jdce_logger("/build/elm.js", 322);}


function unsafeGet(){___jdce_logger("/build/elm.js", 323);}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(){___jdce_logger("/build/elm.js", 324);}


function unsafeSet(){___jdce_logger("/build/elm.js", 325);}


function initialize(){___jdce_logger("/build/elm.js", 326);}

function initialize_(){___jdce_logger("/build/elm.js", 327);}

function fromList(){___jdce_logger("/build/elm.js", 328);}

// Push a node into a higher node as a child.
function fromListPush(){___jdce_logger("/build/elm.js", 329);}

// Pushes an item via push_ to the bottom right of a tree.
function push(){___jdce_logger("/build/elm.js", 330);}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(){___jdce_logger("/build/elm.js", 331);}

// Converts an array into a list of elements.
function toList(){___jdce_logger("/build/elm.js", 332);}

function toList_(){___jdce_logger("/build/elm.js", 333);}

// Maps a function over the elements of an array.
function map(){___jdce_logger("/build/elm.js", 334);}

// Maps a function over the elements with their index as first argument.
function indexedMap(){___jdce_logger("/build/elm.js", 335);}

function indexedMap_(){___jdce_logger("/build/elm.js", 336);}

function foldl(){___jdce_logger("/build/elm.js", 337);}

function foldr(){___jdce_logger("/build/elm.js", 338);}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(){___jdce_logger("/build/elm.js", 339);}

function sliceRight(){___jdce_logger("/build/elm.js", 340);}

function sliceLeft(){___jdce_logger("/build/elm.js", 341);}

// Appends two trees.
function append(){___jdce_logger("/build/elm.js", 342);}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(){___jdce_logger("/build/elm.js", 343);}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(){___jdce_logger("/build/elm.js", 344);}

function insertLeft(){___jdce_logger("/build/elm.js", 345);}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(){___jdce_logger("/build/elm.js", 346);}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(){___jdce_logger("/build/elm.js", 347);}

function set2(){___jdce_logger("/build/elm.js", 348);}

function saveSlot(){___jdce_logger("/build/elm.js", 349);}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(){___jdce_logger("/build/elm.js", 350);}

// Returns an array of two balanced nodes.
function shuffle(){___jdce_logger("/build/elm.js", 351);}

// Navigation functions
function botRight(){___jdce_logger("/build/elm.js", 352);}
function botLeft(){___jdce_logger("/build/elm.js", 353);}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(){___jdce_logger("/build/elm.js", 354);}

// Returns how many items are in the tree.
function length(){___jdce_logger("/build/elm.js", 355);}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(){___jdce_logger("/build/elm.js", 356);}

// Recursively creates a tree with a given height containing
// only the given item.
function create(){___jdce_logger("/build/elm.js", 357);}

// Recursively creates a tree that contains the given tree.
function parentise(){___jdce_logger("/build/elm.js", 358);}

// Emphasizes blood brotherhood beneath two trees.
function siblise(){___jdce_logger("/build/elm.js", 359);}

function toJSArray(){___jdce_logger("/build/elm.js", 360);}

function toJSArray_(){___jdce_logger("/build/elm.js", 361);}

function fromJSArray(){___jdce_logger("/build/elm.js", 362);}

function fromJSArray_(){___jdce_logger("/build/elm.js", 363);}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function(){___jdce_logger("/build/elm.js", 364);};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function(){___jdce_logger("/build/elm.js", 365);});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function(){___jdce_logger("/build/elm.js", 366);});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function(){___jdce_logger("/build/elm.js", 367);};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function(){___jdce_logger("/build/elm.js", 368);});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function(){___jdce_logger("/build/elm.js", 369);});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function(){___jdce_logger("/build/elm.js", 370);});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {___jdce_logger("/build/elm.js", 371);
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {___jdce_logger("/build/elm.js", 372);
				return _elm_lang$core$Task$succeed(
					func(a));
			});
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {___jdce_logger("/build/elm.js", 373);
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {___jdce_logger("/build/elm.js", 374);
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {___jdce_logger("/build/elm.js", 375);
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					});
			});
	});
var _elm_lang$core$Task$map3 = F4(
	function(){___jdce_logger("/build/elm.js", 376);});
var _elm_lang$core$Task$map4 = F5(
	function(){___jdce_logger("/build/elm.js", 377);});
var _elm_lang$core$Task$map5 = F6(
	function(){___jdce_logger("/build/elm.js", 378);});
var _elm_lang$core$Task$andMap = F2(
	function(){___jdce_logger("/build/elm.js", 379);});
var _elm_lang$core$Task$sequence = function (tasks) {___jdce_logger("/build/elm.js", 380);
	var _p2 = tasks;
	if (_p2.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Native_List.fromArray(
				[]));
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {___jdce_logger("/build/elm.js", 381);
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_p2._0,
			_elm_lang$core$Task$sequence(_p2._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {___jdce_logger("/build/elm.js", 382);
		return A2(
			_elm_lang$core$Task$map,
			function (_p3) {___jdce_logger("/build/elm.js", 383);
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$toMaybe = function(){___jdce_logger("/build/elm.js", 384);};
var _elm_lang$core$Task$fromMaybe = F2(
	function(){___jdce_logger("/build/elm.js", 385);});
var _elm_lang$core$Task$toResult = function(){___jdce_logger("/build/elm.js", 386);};
var _elm_lang$core$Task$fromResult = function(){___jdce_logger("/build/elm.js", 387);};
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function(){___jdce_logger("/build/elm.js", 388);});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$T = function(){___jdce_logger("/build/elm.js", 389);};
var _elm_lang$core$Task$perform = F3(
	function(){___jdce_logger("/build/elm.js", 390);});
var _elm_lang$core$Task$cmdMap = F2(
	function(){___jdce_logger("/build/elm.js", 391);});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {___jdce_logger("/build/elm.js", 392);
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function(){___jdce_logger("/build/elm.js", 393);};
var _elm_lang$core$Dict$values = function(){___jdce_logger("/build/elm.js", 394);};
var _elm_lang$core$Dict$toList = function (dict) {___jdce_logger("/build/elm.js", 395);
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function(){___jdce_logger("/build/elm.js", 396);}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {___jdce_logger("/build/elm.js", 397);
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {___jdce_logger("/build/elm.js", 398);
		var stepState = F3(
			function(){___jdce_logger("/build/elm.js", 399);});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function(){___jdce_logger("/build/elm.js", 400);}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function(){___jdce_logger("/build/elm.js", 401);});
var _elm_lang$core$Dict$isBBlack = function(){___jdce_logger("/build/elm.js", 402);};
var _elm_lang$core$Dict$sizeHelp = F2(
	function(){___jdce_logger("/build/elm.js", 403);});
var _elm_lang$core$Dict$size = function(){___jdce_logger("/build/elm.js", 404);};
var _elm_lang$core$Dict$get = F2(
	function(){___jdce_logger("/build/elm.js", 405);});
var _elm_lang$core$Dict$member = F2(
	function(){___jdce_logger("/build/elm.js", 406);});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function(){___jdce_logger("/build/elm.js", 407);});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function(){___jdce_logger("/build/elm.js", 408);};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function(){___jdce_logger("/build/elm.js", 409);};
var _elm_lang$core$Dict$lessBlack = function(){___jdce_logger("/build/elm.js", 410);};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {___jdce_logger("/build/elm.js", 411);
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function(){___jdce_logger("/build/elm.js", 412);};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function(){___jdce_logger("/build/elm.js", 413);});
var _elm_lang$core$Dict$ensureBlackRoot = function(){___jdce_logger("/build/elm.js", 414);};
var _elm_lang$core$Dict$lessBlackTree = function(){___jdce_logger("/build/elm.js", 415);};
var _elm_lang$core$Dict$balancedTree = function(){___jdce_logger("/build/elm.js", 416);};
var _elm_lang$core$Dict$blacken = function(){___jdce_logger("/build/elm.js", 417);};
var _elm_lang$core$Dict$redden = function(){___jdce_logger("/build/elm.js", 418);};
var _elm_lang$core$Dict$balanceHelp = function(){___jdce_logger("/build/elm.js", 419);};
var _elm_lang$core$Dict$balance = F5(
	function(){___jdce_logger("/build/elm.js", 420);});
var _elm_lang$core$Dict$bubble = F5(
	function(){___jdce_logger("/build/elm.js", 421);});
var _elm_lang$core$Dict$removeMax = F5(
	function(){___jdce_logger("/build/elm.js", 422);});
var _elm_lang$core$Dict$rem = F3(
	function(){___jdce_logger("/build/elm.js", 423);});
var _elm_lang$core$Dict$map = F2(
	function(){___jdce_logger("/build/elm.js", 424);});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function(){___jdce_logger("/build/elm.js", 425);});
var _elm_lang$core$Dict$insert = F3(
	function(){___jdce_logger("/build/elm.js", 426);});
var _elm_lang$core$Dict$singleton = F2(
	function(){___jdce_logger("/build/elm.js", 427);});
var _elm_lang$core$Dict$union = F2(
	function(){___jdce_logger("/build/elm.js", 428);});
var _elm_lang$core$Dict$filter = F2(
	function(){___jdce_logger("/build/elm.js", 429);});
var _elm_lang$core$Dict$intersect = F2(
	function(){___jdce_logger("/build/elm.js", 430);});
var _elm_lang$core$Dict$partition = F2(
	function(){___jdce_logger("/build/elm.js", 431);});
var _elm_lang$core$Dict$fromList = function(){___jdce_logger("/build/elm.js", 432);};
var _elm_lang$core$Dict$remove = F2(
	function(){___jdce_logger("/build/elm.js", 433);});
var _elm_lang$core$Dict$diff = F2(
	function(){___jdce_logger("/build/elm.js", 434);});

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {___jdce_logger("/build/elm.js", 435);

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(){___jdce_logger("/build/elm.js", 436);});

function setInterval_(){___jdce_logger("/build/elm.js", 437);}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {___jdce_logger("/build/elm.js", 438);
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Native_Scheduler.spawn(
					A2(
						_elm_lang$core$Time$setInterval,
						_p1,
						A2(_elm_lang$core$Platform$sendToSelf, router, _p1))),
				function(){___jdce_logger("/build/elm.js", 439);});
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function(){___jdce_logger("/build/elm.js", 440);});
var _elm_lang$core$Time$inMilliseconds = function(){___jdce_logger("/build/elm.js", 441);};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function(){___jdce_logger("/build/elm.js", 442);};
var _elm_lang$core$Time$inMinutes = function(){___jdce_logger("/build/elm.js", 443);};
var _elm_lang$core$Time$inSeconds = function(){___jdce_logger("/build/elm.js", 444);};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function(){___jdce_logger("/build/elm.js", 445);});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {___jdce_logger("/build/elm.js", 446);
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {___jdce_logger("/build/elm.js", 447);
		var _p10 = _p9;
		var rightStep = F3(
			function(){___jdce_logger("/build/elm.js", 448);});
		var bothStep = F4(
			function(){___jdce_logger("/build/elm.js", 449);});
		var leftStep = F3(
			function(){___jdce_logger("/build/elm.js", 450);});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			killTask,
			function (_p20) {___jdce_logger("/build/elm.js", 451);
				return A2(
					_elm_lang$core$Task$andThen,
					A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict),
					function (newProcesses) {___jdce_logger("/build/elm.js", 452);
						return _elm_lang$core$Task$succeed(
							A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
					});
			});
	});
var _elm_lang$core$Time$Every = F2(
	function(){___jdce_logger("/build/elm.js", 453);});
var _elm_lang$core$Time$every = F2(
	function(){___jdce_logger("/build/elm.js", 454);});
var _elm_lang$core$Time$subMap = F2(
	function(){___jdce_logger("/build/elm.js", 455);});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {___jdce_logger("/build/elm.js", 456);


// CORE DECODERS

function succeed(msg)
{___jdce_logger("/build/elm.js", 457);
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(){___jdce_logger("/build/elm.js", 458);}

function decodePrimitive(tag)
{___jdce_logger("/build/elm.js", 459);
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(){___jdce_logger("/build/elm.js", 460);}

function decodeNull(value)
{___jdce_logger("/build/elm.js", 461);
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{___jdce_logger("/build/elm.js", 462);
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeKeyValuePairs(){___jdce_logger("/build/elm.js", 463);}

function decodeObject(f, decoders)
{___jdce_logger("/build/elm.js", 464);
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function decodeTuple(){___jdce_logger("/build/elm.js", 465);}

function andThen(decoder, callback)
{___jdce_logger("/build/elm.js", 466);
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function customAndThen(){___jdce_logger("/build/elm.js", 467);}

function oneOf(decoders)
{___jdce_logger("/build/elm.js", 468);
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function decodeObject1(f, d1)
{___jdce_logger("/build/elm.js", 469);
	return decodeObject(f, [d1]);
}

function decodeObject2(){___jdce_logger("/build/elm.js", 470);}

function decodeObject3(){___jdce_logger("/build/elm.js", 471);}

function decodeObject4(){___jdce_logger("/build/elm.js", 472);}

function decodeObject5(){___jdce_logger("/build/elm.js", 473);}

function decodeObject6(){___jdce_logger("/build/elm.js", 474);}

function decodeObject7(){___jdce_logger("/build/elm.js", 475);}

function decodeObject8(){___jdce_logger("/build/elm.js", 476);}


// DECODING TUPLES

function decodeTuple1(){___jdce_logger("/build/elm.js", 477);}

function decodeTuple2(){___jdce_logger("/build/elm.js", 478);}

function decodeTuple3(){___jdce_logger("/build/elm.js", 479);}

function decodeTuple4(){___jdce_logger("/build/elm.js", 480);}

function decodeTuple5(){___jdce_logger("/build/elm.js", 481);}

function decodeTuple6(){___jdce_logger("/build/elm.js", 482);}

function decodeTuple7(){___jdce_logger("/build/elm.js", 483);}

function decodeTuple8(){___jdce_logger("/build/elm.js", 484);}


// DECODE HELPERS

function ok(value)
{___jdce_logger("/build/elm.js", 485);
	return { tag: 'ok', value: value };
}

function badPrimitive(){___jdce_logger("/build/elm.js", 486);}

function badIndex(){___jdce_logger("/build/elm.js", 487);}

function badField(){___jdce_logger("/build/elm.js", 488);}

function badOneOf(){___jdce_logger("/build/elm.js", 489);}

function badCustom(){___jdce_logger("/build/elm.js", 490);}

function bad(){___jdce_logger("/build/elm.js", 491);}

function badToString(){___jdce_logger("/build/elm.js", 492);}

function jsToString(){___jdce_logger("/build/elm.js", 493);}


// DECODE

function runOnString(){___jdce_logger("/build/elm.js", 494);}

function run(decoder, value)
{___jdce_logger("/build/elm.js", 495);
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{___jdce_logger("/build/elm.js", 496);
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok')
				? result
				: badField(field, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'tuple':
			var decoders = decoder.decoders;
			var len = decoders.length;

			if ( !(value instanceof Array) || value.length !== len )
			{
				return badPrimitive('a Tuple with ' + len + ' entries', value);
			}

			var answer = decoder.func;
			for (var i = 0; i < len; i++)
			{
				var result = runHelp(decoders[i], value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'customAndThen':
			var result = runHelp(decoder.decoder, value);
			if (result.tag !== 'ok')
			{
				return result;
			}
			var realResult = decoder.callback(result.value);
			if (realResult.ctor === 'Err')
			{
				return badCustom(realResult._0);
			}
			return ok(realResult._0);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(){___jdce_logger("/build/elm.js", 497);}

function listEquality(){___jdce_logger("/build/elm.js", 498);}


// ENCODE

function encode(){___jdce_logger("/build/elm.js", 499);}

function identity(value)
{___jdce_logger("/build/elm.js", 500);
	return value;
}

function encodeObject(){___jdce_logger("/build/elm.js", 501);}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),

	decodeObject1: F2(decodeObject1),
	decodeObject2: F3(decodeObject2),
	decodeObject3: F4(decodeObject3),
	decodeObject4: F5(decodeObject4),
	decodeObject5: F6(decodeObject5),
	decodeObject6: F7(decodeObject6),
	decodeObject7: F8(decodeObject7),
	decodeObject8: F9(decodeObject8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	decodeTuple1: F2(decodeTuple1),
	decodeTuple2: F3(decodeTuple2),
	decodeTuple3: F4(decodeTuple3),
	decodeTuple4: F5(decodeTuple4),
	decodeTuple5: F6(decodeTuple5),
	decodeTuple6: F7(decodeTuple6),
	decodeTuple7: F8(decodeTuple7),
	decodeTuple8: F9(decodeTuple8),

	andThen: F2(andThen),
	customAndThen: F2(customAndThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$tuple8 = _elm_lang$core$Native_Json.decodeTuple8;
var _elm_lang$core$Json_Decode$tuple7 = _elm_lang$core$Native_Json.decodeTuple7;
var _elm_lang$core$Json_Decode$tuple6 = _elm_lang$core$Native_Json.decodeTuple6;
var _elm_lang$core$Json_Decode$tuple5 = _elm_lang$core$Native_Json.decodeTuple5;
var _elm_lang$core$Json_Decode$tuple4 = _elm_lang$core$Native_Json.decodeTuple4;
var _elm_lang$core$Json_Decode$tuple3 = _elm_lang$core$Native_Json.decodeTuple3;
var _elm_lang$core$Json_Decode$tuple2 = _elm_lang$core$Native_Json.decodeTuple2;
var _elm_lang$core$Json_Decode$tuple1 = _elm_lang$core$Native_Json.decodeTuple1;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$customDecoder = _elm_lang$core$Native_Json.customAndThen;
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$maybe = function(){___jdce_logger("/build/elm.js", 502);};
var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$array = function(){___jdce_logger("/build/elm.js", 503);};
var _elm_lang$core$Json_Decode$list = function(){___jdce_logger("/build/elm.js", 504);};
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$object8 = _elm_lang$core$Native_Json.decodeObject8;
var _elm_lang$core$Json_Decode$object7 = _elm_lang$core$Native_Json.decodeObject7;
var _elm_lang$core$Json_Decode$object6 = _elm_lang$core$Native_Json.decodeObject6;
var _elm_lang$core$Json_Decode$object5 = _elm_lang$core$Native_Json.decodeObject5;
var _elm_lang$core$Json_Decode$object4 = _elm_lang$core$Native_Json.decodeObject4;
var _elm_lang$core$Json_Decode$object3 = _elm_lang$core$Native_Json.decodeObject3;
var _elm_lang$core$Json_Decode$object2 = _elm_lang$core$Native_Json.decodeObject2;
var _elm_lang$core$Json_Decode$object1 = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode_ops = _elm_lang$core$Json_Decode_ops || {};
_elm_lang$core$Json_Decode_ops[':='] = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {___jdce_logger("/build/elm.js", 505);
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {___jdce_logger("/build/elm.js", 506);
					return A2(_elm_lang$core$Json_Decode_ops[':='], x, y);
				}),
			decoder,
			fields);
	});
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode$dict = function(){___jdce_logger("/build/elm.js", 507);};
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$dom$Native_Dom = function() {___jdce_logger("/build/elm.js", 508);

function on(node)
{___jdce_logger("/build/elm.js", 509);
	return function(eventName, decoder, toTask)
	{___jdce_logger("/build/elm.js", 510);
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {___jdce_logger("/build/elm.js", 511);

			function performTask(event)
			{___jdce_logger("/build/elm.js", 512);
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function(){___jdce_logger("/build/elm.js", 513);};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(){___jdce_logger("/build/elm.js", 514);};

function withNode(){___jdce_logger("/build/elm.js", 515);}


// FOCUS

function focus(){___jdce_logger("/build/elm.js", 516);}

function blur(){___jdce_logger("/build/elm.js", 517);}


// SCROLLING

function getScrollTop(){___jdce_logger("/build/elm.js", 518);}

function setScrollTop(){___jdce_logger("/build/elm.js", 519);}

function toBottom(){___jdce_logger("/build/elm.js", 520);}

function getScrollLeft(){___jdce_logger("/build/elm.js", 521);}

function setScrollLeft(){___jdce_logger("/build/elm.js", 522);}

function toRight(){___jdce_logger("/build/elm.js", 523);}


// SIZE

function width(){___jdce_logger("/build/elm.js", 524);}

function height(){___jdce_logger("/build/elm.js", 525);}

return {
	onDocument: F3(on(document)),
	onWindow: F3(on(window)),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom$blur = _elm_lang$dom$Native_Dom.blur;
var _elm_lang$dom$Dom$focus = _elm_lang$dom$Native_Dom.focus;
var _elm_lang$dom$Dom$NotFound = function(){___jdce_logger("/build/elm.js", 526);};

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

//import Native.Json //

var _elm_lang$virtual_dom$Native_VirtualDom = function() {___jdce_logger("/build/elm.js", 527);

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';



////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{___jdce_logger("/build/elm.js", 528);
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{___jdce_logger("/build/elm.js", 529);
	return F2(function(factList, kidList) {___jdce_logger("/build/elm.js", 530);
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{___jdce_logger("/build/elm.js", 531);
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(){___jdce_logger("/build/elm.js", 532);}


function custom(){___jdce_logger("/build/elm.js", 533);}


function map(tagger, node)
{___jdce_logger("/build/elm.js", 534);
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{___jdce_logger("/build/elm.js", 535);
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{___jdce_logger("/build/elm.js", 536);
	return thunk(fn, [a], function() {___jdce_logger("/build/elm.js", 537);
		return fn(a);
	});
}

function lazy2(fn, a, b)
{___jdce_logger("/build/elm.js", 538);
	return thunk(fn, [a,b], function() {___jdce_logger("/build/elm.js", 539);
		return A2(fn, a, b);
	});
}

function lazy3(){___jdce_logger("/build/elm.js", 540);}



// FACTS


function organizeFacts(factList)
{___jdce_logger("/build/elm.js", 541);
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{___jdce_logger("/build/elm.js", 542);
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{___jdce_logger("/build/elm.js", 543);
	return {
		key: key,
		value: value
	};
}


function attribute(){___jdce_logger("/build/elm.js", 544);}


function attributeNS(){___jdce_logger("/build/elm.js", 545);}


function on(name, options, decoder)
{___jdce_logger("/build/elm.js", 546);
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(){___jdce_logger("/build/elm.js", 547);}



////////////  RENDERER  ////////////


function renderer(parent, tagger, initialVirtualNode)
{___jdce_logger("/build/elm.js", 548);
	var eventNode = { tagger: tagger, parent: undefined };

	var domNode = render(initialVirtualNode, eventNode);
	parent.appendChild(domNode);

	var state = 'NO_REQUEST';
	var currentVirtualNode = initialVirtualNode;
	var nextVirtualNode = initialVirtualNode;

	function registerVirtualNode(vNode)
	{___jdce_logger("/build/elm.js", 549);
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextVirtualNode = vNode;
	}

	function updateIfNeeded()
	{___jdce_logger("/build/elm.js", 550);
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/core/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var patches = diff(currentVirtualNode, nextVirtualNode);
				domNode = applyPatches(domNode, currentVirtualNode, patches, eventNode);
				currentVirtualNode = nextVirtualNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return { update: registerVirtualNode };
}


var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(){___jdce_logger("/build/elm.js", 551);};



////////////  RENDER  ////////////


function render(vNode, eventNode)
{___jdce_logger("/build/elm.js", 552);
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = {
				tagger: tagger,
				parent: eventNode
			};

			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return document.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{___jdce_logger("/build/elm.js", 553);
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{___jdce_logger("/build/elm.js", 554);
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{___jdce_logger("/build/elm.js", 555);
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{___jdce_logger("/build/elm.js", 556);
	function eventHandler(){___jdce_logger("/build/elm.js", 557);};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(){___jdce_logger("/build/elm.js", 558);}

function applyAttrsNS(){___jdce_logger("/build/elm.js", 559);}



////////////  DIFF  ////////////


function diff(a, b)
{___jdce_logger("/build/elm.js", 560);
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(){___jdce_logger("/build/elm.js", 561);}


function diffHelp(a, b, patches, index)
{___jdce_logger("/build/elm.js", 562);
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(){___jdce_logger("/build/elm.js", 563);}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{___jdce_logger("/build/elm.js", 564);
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{___jdce_logger("/build/elm.js", 565);
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(){___jdce_logger("/build/elm.js", 566);}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(){___jdce_logger("/build/elm.js", 567);}


function removeNode(){___jdce_logger("/build/elm.js", 568);}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(){___jdce_logger("/build/elm.js", 569);}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(){___jdce_logger("/build/elm.js", 570);}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{___jdce_logger("/build/elm.js", 571);
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(){___jdce_logger("/build/elm.js", 572);}

function applyPatch(){___jdce_logger("/build/elm.js", 573);}


function applyPatchRedraw(){___jdce_logger("/build/elm.js", 574);}


function applyPatchReorder(){___jdce_logger("/build/elm.js", 575);}


function applyPatchReorderEndInsertsHelp(){___jdce_logger("/build/elm.js", 576);}



////////////  PROGRAMS  ////////////


function programWithFlags(details)
{___jdce_logger("/build/elm.js", 577);
	return {
		init: details.init,
		update: details.update,
		subscriptions: details.subscriptions,
		view: details.view,
		renderer: renderer
	};
}


return {
	node: node,
	text: text,

	custom: custom,

	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	programWithFlags: programWithFlags
};

}();
var _elm_lang$virtual_dom$VirtualDom$programWithFlags = _elm_lang$virtual_dom$Native_VirtualDom.programWithFlags;
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {___jdce_logger("/build/elm.js", 578);
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function(){___jdce_logger("/build/elm.js", 579);});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main$ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$svg = _elm_lang$html$Html$node('svg');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_App$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html_App$program = function(){___jdce_logger("/build/elm.js", 580);};
var _elm_lang$html$Html_App$beginnerProgram = function(){___jdce_logger("/build/elm.js", 581);};
var _elm_lang$html$Html_App$map = _elm_lang$virtual_dom$VirtualDom$map;

var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function(){___jdce_logger("/build/elm.js", 582);};
var _elm_lang$html$Html_Attributes$draggable = function(){___jdce_logger("/build/elm.js", 583);};
var _elm_lang$html$Html_Attributes$list = function(){___jdce_logger("/build/elm.js", 584);};
var _elm_lang$html$Html_Attributes$maxlength = function(){___jdce_logger("/build/elm.js", 585);};
var _elm_lang$html$Html_Attributes$datetime = function(){___jdce_logger("/build/elm.js", 586);};
var _elm_lang$html$Html_Attributes$pubdate = function(){___jdce_logger("/build/elm.js", 587);};
var _elm_lang$html$Html_Attributes$colspan = function(){___jdce_logger("/build/elm.js", 588);};
var _elm_lang$html$Html_Attributes$rowspan = function(){___jdce_logger("/build/elm.js", 589);};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {___jdce_logger("/build/elm.js", 590);
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {___jdce_logger("/build/elm.js", 591);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function(){___jdce_logger("/build/elm.js", 592);};
var _elm_lang$html$Html_Attributes$title = function(){___jdce_logger("/build/elm.js", 593);};
var _elm_lang$html$Html_Attributes$accesskey = function(){___jdce_logger("/build/elm.js", 594);};
var _elm_lang$html$Html_Attributes$dir = function(){___jdce_logger("/build/elm.js", 595);};
var _elm_lang$html$Html_Attributes$dropzone = function(){___jdce_logger("/build/elm.js", 596);};
var _elm_lang$html$Html_Attributes$itemprop = function(){___jdce_logger("/build/elm.js", 597);};
var _elm_lang$html$Html_Attributes$lang = function(){___jdce_logger("/build/elm.js", 598);};
var _elm_lang$html$Html_Attributes$tabindex = function(){___jdce_logger("/build/elm.js", 599);};
var _elm_lang$html$Html_Attributes$charset = function(){___jdce_logger("/build/elm.js", 600);};
var _elm_lang$html$Html_Attributes$content = function(){___jdce_logger("/build/elm.js", 601);};
var _elm_lang$html$Html_Attributes$httpEquiv = function(){___jdce_logger("/build/elm.js", 602);};
var _elm_lang$html$Html_Attributes$language = function(){___jdce_logger("/build/elm.js", 603);};
var _elm_lang$html$Html_Attributes$src = function(){___jdce_logger("/build/elm.js", 604);};
var _elm_lang$html$Html_Attributes$height = function(){___jdce_logger("/build/elm.js", 605);};
var _elm_lang$html$Html_Attributes$width = function(){___jdce_logger("/build/elm.js", 606);};
var _elm_lang$html$Html_Attributes$alt = function(){___jdce_logger("/build/elm.js", 607);};
var _elm_lang$html$Html_Attributes$preload = function(){___jdce_logger("/build/elm.js", 608);};
var _elm_lang$html$Html_Attributes$poster = function(){___jdce_logger("/build/elm.js", 609);};
var _elm_lang$html$Html_Attributes$kind = function(){___jdce_logger("/build/elm.js", 610);};
var _elm_lang$html$Html_Attributes$srclang = function(){___jdce_logger("/build/elm.js", 611);};
var _elm_lang$html$Html_Attributes$sandbox = function(){___jdce_logger("/build/elm.js", 612);};
var _elm_lang$html$Html_Attributes$srcdoc = function(){___jdce_logger("/build/elm.js", 613);};
var _elm_lang$html$Html_Attributes$type$ = function (value) {___jdce_logger("/build/elm.js", 614);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {___jdce_logger("/build/elm.js", 615);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function(){___jdce_logger("/build/elm.js", 616);};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {___jdce_logger("/build/elm.js", 617);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function(){___jdce_logger("/build/elm.js", 618);};
var _elm_lang$html$Html_Attributes$acceptCharset = function(){___jdce_logger("/build/elm.js", 619);};
var _elm_lang$html$Html_Attributes$action = function(){___jdce_logger("/build/elm.js", 620);};
var _elm_lang$html$Html_Attributes$autocomplete = function(){___jdce_logger("/build/elm.js", 621);};
var _elm_lang$html$Html_Attributes$autosave = function(){___jdce_logger("/build/elm.js", 622);};
var _elm_lang$html$Html_Attributes$enctype = function(){___jdce_logger("/build/elm.js", 623);};
var _elm_lang$html$Html_Attributes$formaction = function(){___jdce_logger("/build/elm.js", 624);};
var _elm_lang$html$Html_Attributes$minlength = function(){___jdce_logger("/build/elm.js", 625);};
var _elm_lang$html$Html_Attributes$method = function(){___jdce_logger("/build/elm.js", 626);};
var _elm_lang$html$Html_Attributes$name = function (value) {___jdce_logger("/build/elm.js", 627);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function(){___jdce_logger("/build/elm.js", 628);};
var _elm_lang$html$Html_Attributes$size = function(){___jdce_logger("/build/elm.js", 629);};
var _elm_lang$html$Html_Attributes$for = function (value) {___jdce_logger("/build/elm.js", 630);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$form = function(){___jdce_logger("/build/elm.js", 631);};
var _elm_lang$html$Html_Attributes$max = function(){___jdce_logger("/build/elm.js", 632);};
var _elm_lang$html$Html_Attributes$min = function(){___jdce_logger("/build/elm.js", 633);};
var _elm_lang$html$Html_Attributes$step = function(){___jdce_logger("/build/elm.js", 634);};
var _elm_lang$html$Html_Attributes$cols = function(){___jdce_logger("/build/elm.js", 635);};
var _elm_lang$html$Html_Attributes$rows = function(){___jdce_logger("/build/elm.js", 636);};
var _elm_lang$html$Html_Attributes$wrap = function(){___jdce_logger("/build/elm.js", 637);};
var _elm_lang$html$Html_Attributes$usemap = function(){___jdce_logger("/build/elm.js", 638);};
var _elm_lang$html$Html_Attributes$shape = function(){___jdce_logger("/build/elm.js", 639);};
var _elm_lang$html$Html_Attributes$coords = function(){___jdce_logger("/build/elm.js", 640);};
var _elm_lang$html$Html_Attributes$challenge = function(){___jdce_logger("/build/elm.js", 641);};
var _elm_lang$html$Html_Attributes$keytype = function(){___jdce_logger("/build/elm.js", 642);};
var _elm_lang$html$Html_Attributes$align = function(){___jdce_logger("/build/elm.js", 643);};
var _elm_lang$html$Html_Attributes$cite = function(){___jdce_logger("/build/elm.js", 644);};
var _elm_lang$html$Html_Attributes$href = function (value) {___jdce_logger("/build/elm.js", 645);
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function(){___jdce_logger("/build/elm.js", 646);};
var _elm_lang$html$Html_Attributes$downloadAs = function(){___jdce_logger("/build/elm.js", 647);};
var _elm_lang$html$Html_Attributes$hreflang = function(){___jdce_logger("/build/elm.js", 648);};
var _elm_lang$html$Html_Attributes$media = function(){___jdce_logger("/build/elm.js", 649);};
var _elm_lang$html$Html_Attributes$ping = function(){___jdce_logger("/build/elm.js", 650);};
var _elm_lang$html$Html_Attributes$rel = function(){___jdce_logger("/build/elm.js", 651);};
var _elm_lang$html$Html_Attributes$start = function(){___jdce_logger("/build/elm.js", 652);};
var _elm_lang$html$Html_Attributes$headers = function(){___jdce_logger("/build/elm.js", 653);};
var _elm_lang$html$Html_Attributes$scope = function(){___jdce_logger("/build/elm.js", 654);};
var _elm_lang$html$Html_Attributes$manifest = function(){___jdce_logger("/build/elm.js", 655);};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {___jdce_logger("/build/elm.js", 656);
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {___jdce_logger("/build/elm.js", 657);
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function(){___jdce_logger("/build/elm.js", 658);};
var _elm_lang$html$Html_Attributes$spellcheck = function(){___jdce_logger("/build/elm.js", 659);};
var _elm_lang$html$Html_Attributes$async = function(){___jdce_logger("/build/elm.js", 660);};
var _elm_lang$html$Html_Attributes$defer = function(){___jdce_logger("/build/elm.js", 661);};
var _elm_lang$html$Html_Attributes$scoped = function(){___jdce_logger("/build/elm.js", 662);};
var _elm_lang$html$Html_Attributes$autoplay = function(){___jdce_logger("/build/elm.js", 663);};
var _elm_lang$html$Html_Attributes$controls = function(){___jdce_logger("/build/elm.js", 664);};
var _elm_lang$html$Html_Attributes$loop = function(){___jdce_logger("/build/elm.js", 665);};
var _elm_lang$html$Html_Attributes$default = function(){___jdce_logger("/build/elm.js", 666);};
var _elm_lang$html$Html_Attributes$seamless = function(){___jdce_logger("/build/elm.js", 667);};
var _elm_lang$html$Html_Attributes$checked = function (bool) {___jdce_logger("/build/elm.js", 668);
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function(){___jdce_logger("/build/elm.js", 669);};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {___jdce_logger("/build/elm.js", 670);
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function(){___jdce_logger("/build/elm.js", 671);};
var _elm_lang$html$Html_Attributes$multiple = function(){___jdce_logger("/build/elm.js", 672);};
var _elm_lang$html$Html_Attributes$novalidate = function(){___jdce_logger("/build/elm.js", 673);};
var _elm_lang$html$Html_Attributes$readonly = function(){___jdce_logger("/build/elm.js", 674);};
var _elm_lang$html$Html_Attributes$required = function(){___jdce_logger("/build/elm.js", 675);};
var _elm_lang$html$Html_Attributes$ismap = function(){___jdce_logger("/build/elm.js", 676);};
var _elm_lang$html$Html_Attributes$download = function(){___jdce_logger("/build/elm.js", 677);};
var _elm_lang$html$Html_Attributes$reversed = function(){___jdce_logger("/build/elm.js", 678);};
var _elm_lang$html$Html_Attributes$classList = function(){___jdce_logger("/build/elm.js", 679);};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode_ops[':='], 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'checked']),
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'value']),
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function(){___jdce_logger("/build/elm.js", 680);};
var _elm_lang$html$Html_Events$onBlur = function(){___jdce_logger("/build/elm.js", 681);};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function(){___jdce_logger("/build/elm.js", 682);};
var _elm_lang$html$Html_Events$onCheck = function(){___jdce_logger("/build/elm.js", 683);};
var _elm_lang$html$Html_Events$onInput = function (tagger) {___jdce_logger("/build/elm.js", 684);
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function(){___jdce_logger("/build/elm.js", 685);};
var _elm_lang$html$Html_Events$onMouseOver = function(){___jdce_logger("/build/elm.js", 686);};
var _elm_lang$html$Html_Events$onMouseLeave = function(){___jdce_logger("/build/elm.js", 687);};
var _elm_lang$html$Html_Events$onMouseEnter = function(){___jdce_logger("/build/elm.js", 688);};
var _elm_lang$html$Html_Events$onMouseUp = function(){___jdce_logger("/build/elm.js", 689);};
var _elm_lang$html$Html_Events$onMouseDown = function(){___jdce_logger("/build/elm.js", 690);};
var _elm_lang$html$Html_Events$onDoubleClick = function(){___jdce_logger("/build/elm.js", 691);};
var _elm_lang$html$Html_Events$onClick = function (msg) {___jdce_logger("/build/elm.js", 692);
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function(){___jdce_logger("/build/elm.js", 693);});

var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

var _elm_lang$navigation$Native_Navigation = function() {___jdce_logger("/build/elm.js", 694);

function go(){___jdce_logger("/build/elm.js", 695);}

function pushState(){___jdce_logger("/build/elm.js", 696);}

function replaceState(){___jdce_logger("/build/elm.js", 697);}

function getLocation()
{___jdce_logger("/build/elm.js", 698);
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


return {
	go: go,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$spawnPopState = function (router) {___jdce_logger("/build/elm.js", 699);
	return _elm_lang$core$Process$spawn(
		A3(
			_elm_lang$dom$Dom_LowLevel$onWindow,
			'popstate',
			_elm_lang$core$Json_Decode$value,
			function (_p0) {___jdce_logger("/build/elm.js", 700);
				return A2(
					_elm_lang$core$Platform$sendToSelf,
					router,
					_elm_lang$navigation$Native_Navigation.getLocation(
						{ctor: '_Tuple0'}));
			}));
};
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {___jdce_logger("/build/elm.js", 701);
		return A2(
			_elm_lang$core$Task$andThen,
			task1,
			function (_p1) {___jdce_logger("/build/elm.js", 702);
				return task2;
			});
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {___jdce_logger("/build/elm.js", 703);
		var send = function (_p2) {___jdce_logger("/build/elm.js", 704);
			var _p3 = _p2;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p3._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {___jdce_logger("/build/elm.js", 705);
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function(){___jdce_logger("/build/elm.js", 706);});
var _elm_lang$navigation$Navigation$updateHelp = F2(
	function (func, _p5) {___jdce_logger("/build/elm.js", 707);
		var _p6 = _p5;
		return {
			ctor: '_Tuple2',
			_0: _p6._0,
			_1: A2(_elm_lang$core$Platform_Cmd$map, func, _p6._1)
		};
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function(){___jdce_logger("/build/elm.js", 708);};
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {___jdce_logger("/build/elm.js", 709);
		return {subs: a, process: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p7) {___jdce_logger("/build/elm.js", 710);
		var _p8 = _p7;
		var _p10 = _p8.process;
		var stepState = function () {___jdce_logger("/build/elm.js", 711);
			var _p9 = {ctor: '_Tuple2', _0: subs, _1: _p10};
			_v4_2:
			do {
				if (_p9._0.ctor === '[]') {
					if (_p9._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$core$Process$kill(_p9._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v4_2;
					}
				} else {
					if (_p9._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$navigation$Navigation$spawnPopState(router),
							function (pid) {___jdce_logger("/build/elm.js", 712);
								return _elm_lang$core$Task$succeed(
									A2(
										_elm_lang$navigation$Navigation$State,
										subs,
										_elm_lang$core$Maybe$Just(pid)));
							});
					} else {
						break _v4_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p10));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
var _elm_lang$navigation$Navigation$UserMsg = function(){___jdce_logger("/build/elm.js", 713);};
var _elm_lang$navigation$Navigation$Change = function (a) {___jdce_logger("/build/elm.js", 714);
	return {ctor: 'Change', _0: a};
};
var _elm_lang$navigation$Navigation$Parser = function (a) {___jdce_logger("/build/elm.js", 715);
	return {ctor: 'Parser', _0: a};
};
var _elm_lang$navigation$Navigation$makeParser = _elm_lang$navigation$Navigation$Parser;
var _elm_lang$navigation$Navigation$Modify = function(){___jdce_logger("/build/elm.js", 716);};
var _elm_lang$navigation$Navigation$modifyUrl = function(){___jdce_logger("/build/elm.js", 717);};
var _elm_lang$navigation$Navigation$New = function(){___jdce_logger("/build/elm.js", 718);};
var _elm_lang$navigation$Navigation$newUrl = function(){___jdce_logger("/build/elm.js", 719);};
var _elm_lang$navigation$Navigation$Jump = function(){___jdce_logger("/build/elm.js", 720);};
var _elm_lang$navigation$Navigation$back = function(){___jdce_logger("/build/elm.js", 721);};
var _elm_lang$navigation$Navigation$forward = function(){___jdce_logger("/build/elm.js", 722);};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function(){___jdce_logger("/build/elm.js", 723);});
var _elm_lang$navigation$Navigation$Monitor = function (a) {___jdce_logger("/build/elm.js", 724);
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (_p13, stuff) {___jdce_logger("/build/elm.js", 725);
		var _p14 = _p13;
		var _p16 = _p14._0;
		var location = _elm_lang$navigation$Native_Navigation.getLocation(
			{ctor: '_Tuple0'});
		var init = function (flags) {___jdce_logger("/build/elm.js", 726);
			return A2(
				_elm_lang$navigation$Navigation$updateHelp,
				_elm_lang$navigation$Navigation$UserMsg,
				A2(
					stuff.init,
					flags,
					_p16(location)));
		};
		var view = function (model) {___jdce_logger("/build/elm.js", 727);
			return A2(
				_elm_lang$html$Html_App$map,
				_elm_lang$navigation$Navigation$UserMsg,
				stuff.view(model));
		};
		var subs = function (model) {___jdce_logger("/build/elm.js", 728);
			return _elm_lang$core$Platform_Sub$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(_elm_lang$navigation$Navigation$Change)),
						A2(
						_elm_lang$core$Platform_Sub$map,
						_elm_lang$navigation$Navigation$UserMsg,
						stuff.subscriptions(model))
					]));
		};
		var update = F2(
			function (msg, model) {___jdce_logger("/build/elm.js", 729);
				return A2(
					_elm_lang$navigation$Navigation$updateHelp,
					_elm_lang$navigation$Navigation$UserMsg,
					function () {___jdce_logger("/build/elm.js", 730);
						var _p15 = msg;
						if (_p15.ctor === 'Change') {
							return A2(
								stuff.urlUpdate,
								_p16(_p15._0),
								model);
						} else {
							return A2(stuff.update, _p15._0, model);
						}
					}());
			});
		return _elm_lang$html$Html_App$programWithFlags(
			{init: init, view: view, update: update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$program = F2(
	function(){___jdce_logger("/build/elm.js", 731);});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p18) {___jdce_logger("/build/elm.js", 732);
		var _p19 = _p18;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p20) {___jdce_logger("/build/elm.js", 733);
				return func(
					_p19._0(_p20));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _evancz$elm_todomvc$Todo_Task$onFinish = F2(
	function (enterMessage, escapeMessage) {___jdce_logger("/build/elm.js", 734);
		var select = function(){___jdce_logger("/build/elm.js", 735);};
		return A2(
			_elm_lang$html$Html_Events$on,
			'keydown',
			A2(_elm_lang$core$Json_Decode$map, select, _elm_lang$html$Html_Events$keyCode));
	});
var _evancz$elm_todomvc$Todo_Task$update = F2(
	function(){___jdce_logger("/build/elm.js", 736);});
var _evancz$elm_todomvc$Todo_Task$init = F2(
	function(){___jdce_logger("/build/elm.js", 737);});
var _evancz$elm_todomvc$Todo_Task$Model = F4(
	function(){___jdce_logger("/build/elm.js", 738);});
var _evancz$elm_todomvc$Todo_Task$Delete = {ctor: 'Delete'};
var _evancz$elm_todomvc$Todo_Task$Completed = function(){___jdce_logger("/build/elm.js", 739);};
var _evancz$elm_todomvc$Todo_Task$Commit = {ctor: 'Commit'};
var _evancz$elm_todomvc$Todo_Task$Cancel = {ctor: 'Cancel'};
var _evancz$elm_todomvc$Todo_Task$Edit = function(){___jdce_logger("/build/elm.js", 740);};
var _evancz$elm_todomvc$Todo_Task$Focus = function(){___jdce_logger("/build/elm.js", 741);};
var _evancz$elm_todomvc$Todo_Task$view = function(){___jdce_logger("/build/elm.js", 742);};

var _evancz$elm_todomvc$Todo$subscriptions = function (model) {___jdce_logger("/build/elm.js", 743);
	return _elm_lang$core$Platform_Sub$none;
};
var _evancz$elm_todomvc$Todo$fromUrl = function (hash) {___jdce_logger("/build/elm.js", 744);
	var cleanHash = A2(_elm_lang$core$String$dropLeft, 2, hash);
	return _elm_lang$core$Native_Utils.eq(
		A2(
			_elm_lang$core$List$member,
			cleanHash,
			_elm_lang$core$Native_List.fromArray(
				['all', 'active', 'completed'])),
		true) ? _elm_lang$core$Maybe$Just(cleanHash) : _elm_lang$core$Maybe$Nothing;
};
var _evancz$elm_todomvc$Todo$urlParser = _elm_lang$navigation$Navigation$makeParser(
	function (_p0) {___jdce_logger("/build/elm.js", 745);
		return _evancz$elm_todomvc$Todo$fromUrl(
			function (_) {___jdce_logger("/build/elm.js", 746);
				return _.hash;
			}(_p0));
	});
var _evancz$elm_todomvc$Todo$toUrl = function(){___jdce_logger("/build/elm.js", 747);};
var _evancz$elm_todomvc$Todo$infoFooter = A2(
	_elm_lang$html$Html$footer,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html_Attributes$class('info')
		]),
	_elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Double-click to edit a todo')
				])),
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Written by '),
					A2(
					_elm_lang$html$Html$a,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$href('https://github.com/evancz')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('Evan Czaplicki')
						]))
				])),
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Part of '),
					A2(
					_elm_lang$html$Html$a,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$href('http://todomvc.com')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('TodoMVC')
						]))
				]))
		]));
var _evancz$elm_todomvc$Todo$emptyModel = {
	tasks: _elm_lang$core$Native_List.fromArray(
		[]),
	visibility: 'All',
	field: '',
	uid: 0
};
var _evancz$elm_todomvc$Todo$save = _elm_lang$core$Native_Platform.outgoingPort(
	'save',
	function (v) {___jdce_logger("/build/elm.js", 748);
		return {
			tasks: _elm_lang$core$Native_List.toArray(v.tasks).map(
				function(){___jdce_logger("/build/elm.js", 749);}),
			field: v.field,
			uid: v.uid,
			visibility: v.visibility
		};
	});
var _evancz$elm_todomvc$Todo$Model = F4(
	function(){___jdce_logger("/build/elm.js", 750);});
var _evancz$elm_todomvc$Todo$ChangeVisibility = function (a) {___jdce_logger("/build/elm.js", 751);
	return {ctor: 'ChangeVisibility', _0: a};
};
var _evancz$elm_todomvc$Todo$visibilitySwap = F3(
	function (uri, visibility, actualVisibility) {___jdce_logger("/build/elm.js", 752);
		var className = _elm_lang$core$Native_Utils.eq(visibility, actualVisibility) ? 'selected' : '';
		return A2(
			_elm_lang$html$Html$li,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Events$onClick(
					_evancz$elm_todomvc$Todo$ChangeVisibility(visibility))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$a,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class(className),
							_elm_lang$html$Html_Attributes$href(uri)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(visibility)
						]))
				]));
	});
var _evancz$elm_todomvc$Todo$CheckAll = function (a) {___jdce_logger("/build/elm.js", 753);
	return {ctor: 'CheckAll', _0: a};
};
var _evancz$elm_todomvc$Todo$DeleteComplete = {ctor: 'DeleteComplete'};
var _evancz$elm_todomvc$Todo$controls = F2(
	function (visibility, tasks) {___jdce_logger("/build/elm.js", 754);
		var tasksCompleted = _elm_lang$core$List$length(
			A2(
				_elm_lang$core$List$filter,
				function(){___jdce_logger("/build/elm.js", 755);},
				tasks));
		var tasksLeft = _elm_lang$core$List$length(tasks) - tasksCompleted;
		var item_ = _elm_lang$core$Native_Utils.eq(tasksLeft, 1) ? ' item' : ' items';
		return A2(
			_elm_lang$html$Html$footer,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('footer'),
					_elm_lang$html$Html_Attributes$hidden(
					_elm_lang$core$List$isEmpty(tasks))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('todo-count')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$strong,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(tasksLeft))
								])),
							_elm_lang$html$Html$text(
							A2(_elm_lang$core$Basics_ops['++'], item_, ' left'))
						])),
					A2(
					_elm_lang$html$Html$ul,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('filters')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(_evancz$elm_todomvc$Todo$visibilitySwap, '#/', 'All', visibility),
							_elm_lang$html$Html$text(' '),
							A3(_evancz$elm_todomvc$Todo$visibilitySwap, '#/active', 'Active', visibility),
							_elm_lang$html$Html$text(' '),
							A3(_evancz$elm_todomvc$Todo$visibilitySwap, '#/completed', 'Completed', visibility)
						])),
					A2(
					_elm_lang$html$Html$button,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('clear-completed'),
							_elm_lang$html$Html_Attributes$hidden(
							_elm_lang$core$Native_Utils.eq(tasksCompleted, 0)),
							_elm_lang$html$Html_Events$onClick(_evancz$elm_todomvc$Todo$DeleteComplete)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Clear completed (',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(tasksCompleted),
									')')))
						]))
				]));
	});
var _evancz$elm_todomvc$Todo$UpdateTask = function(){___jdce_logger("/build/elm.js", 756);};
var _evancz$elm_todomvc$Todo$taskList = F2(
	function (visibility, tasks) {___jdce_logger("/build/elm.js", 757);
		var cssVisibility = _elm_lang$core$List$isEmpty(tasks) ? 'hidden' : 'visible';
		var allCompleted = A2(
			_elm_lang$core$List$all,
			function(){___jdce_logger("/build/elm.js", 758);},
			tasks);
		var isVisible = function(){___jdce_logger("/build/elm.js", 759);};
		return A2(
			_elm_lang$html$Html$section,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('main'),
					_elm_lang$html$Html_Attributes$style(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'visibility', _1: cssVisibility}
						]))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('toggle-all'),
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$name('toggle'),
							_elm_lang$html$Html_Attributes$checked(allCompleted),
							_elm_lang$html$Html_Events$onClick(
							_evancz$elm_todomvc$Todo$CheckAll(
								_elm_lang$core$Basics$not(allCompleted)))
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$label,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$for('toggle-all')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('Mark all as complete')
						])),
					A2(
					_elm_lang$html$Html$ul,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('todo-list')
						]),
					A2(
						_elm_lang$core$List$map,
						function(){___jdce_logger("/build/elm.js", 760);},
						A2(_elm_lang$core$List$filter, isVisible, tasks)))
				]));
	});
var _evancz$elm_todomvc$Todo$Add = {ctor: 'Add'};
var _evancz$elm_todomvc$Todo$UpdateField = function(){___jdce_logger("/build/elm.js", 761);};
var _evancz$elm_todomvc$Todo$NoOp = {ctor: 'NoOp'};
var _evancz$elm_todomvc$Todo$focusTask = function(){___jdce_logger("/build/elm.js", 762);};
var _evancz$elm_todomvc$Todo$update = F2(
	function (msg, model) {___jdce_logger("/build/elm.js", 763);
		var _p4 = A2(_elm_lang$core$Debug$log, 'MESSAGE: ', msg);
		switch (_p4.ctor) {
			case 'NoOp':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'UpdateField':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{field: _p4._0});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _evancz$elm_todomvc$Todo$save(model)
				};
			case 'Add':
				var description = _elm_lang$core$String$trim(model.field);
				var newModel = _elm_lang$core$String$isEmpty(description) ? model : _elm_lang$core$Native_Utils.update(
					model,
					{
						uid: model.uid + 1,
						field: '',
						tasks: A2(
							_elm_lang$core$Basics_ops['++'],
							model.tasks,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_evancz$elm_todomvc$Todo_Task$init, description, model.uid)
								]))
					});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _evancz$elm_todomvc$Todo$save(newModel)
				};
			case 'UpdateTask':
				var _p6 = _p4._0._1;
				var updateTask = function(){___jdce_logger("/build/elm.js", 764);};
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						tasks: A2(_elm_lang$core$List$filterMap, updateTask, model.tasks)
					});
				var _p5 = _p6;
				if (_p5.ctor === 'Focus') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						newModel,
						_elm_lang$core$Native_List.fromArray(
							[
								_evancz$elm_todomvc$Todo$save(newModel),
								_evancz$elm_todomvc$Todo$focusTask(_p5._0)
							]));
				} else {
					return {
						ctor: '_Tuple2',
						_0: newModel,
						_1: _evancz$elm_todomvc$Todo$save(newModel)
					};
				}
			case 'DeleteComplete':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						tasks: A2(
							_elm_lang$core$List$filter,
							function(){___jdce_logger("/build/elm.js", 765);},
							model.tasks)
					});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _evancz$elm_todomvc$Todo$save(newModel)
				};
			case 'CheckAll':
				var updateTask = function(){___jdce_logger("/build/elm.js", 766);};
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						tasks: A2(_elm_lang$core$List$map, updateTask, model.tasks)
					});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _evancz$elm_todomvc$Todo$save(newModel)
				};
			default:
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{visibility: _p4._0});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _evancz$elm_todomvc$Todo$save(model)
				};
		}
	});
var _evancz$elm_todomvc$Todo$urlUpdate = F2(
	function (result, model) {___jdce_logger("/build/elm.js", 767);
		var _p8 = result;
		if (_p8.ctor === 'Just') {
			return A2(
				_evancz$elm_todomvc$Todo$update,
				_evancz$elm_todomvc$Todo$ChangeVisibility(
					_elm_community$string_extra$String_Extra$toSentenceCase(_p8._0)),
				model);
		} else {
			return A2(
				_evancz$elm_todomvc$Todo$update,
				_evancz$elm_todomvc$Todo$ChangeVisibility('All'),
				model);
		}
	});
var _evancz$elm_todomvc$Todo$init = F2(
	function (flags, url) {___jdce_logger("/build/elm.js", 768);
		return A2(
			_evancz$elm_todomvc$Todo$urlUpdate,
			url,
			A2(_elm_lang$core$Maybe$withDefault, _evancz$elm_todomvc$Todo$emptyModel, flags));
	});
var _evancz$elm_todomvc$Todo$taskEntry = function (task) {___jdce_logger("/build/elm.js", 769);
	return A2(
		_elm_lang$html$Html$header,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('header')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h1,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('todos')
					])),
				A2(
				_elm_lang$html$Html$input,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('new-todo'),
						_elm_lang$html$Html_Attributes$placeholder('What needs to be done?'),
						_elm_lang$html$Html_Attributes$autofocus(true),
						_elm_lang$html$Html_Attributes$value(task),
						_elm_lang$html$Html_Attributes$name('newTodo'),
						_elm_lang$html$Html_Events$onInput(_evancz$elm_todomvc$Todo$UpdateField),
						A2(_evancz$elm_todomvc$Todo_Task$onFinish, _evancz$elm_todomvc$Todo$Add, _evancz$elm_todomvc$Todo$NoOp)
					]),
				_elm_lang$core$Native_List.fromArray(
					[]))
			]));
};
var _evancz$elm_todomvc$Todo$view = function (model) {___jdce_logger("/build/elm.js", 770);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('todomvc-wrapper'),
				_elm_lang$html$Html_Attributes$style(
				_elm_lang$core$Native_List.fromArray(
					[
						{ctor: '_Tuple2', _0: 'visibility', _1: 'hidden'}
					]))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$section,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('todoapp')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_elm_lang$html$Html_Lazy$lazy, _evancz$elm_todomvc$Todo$taskEntry, model.field),
						A3(_elm_lang$html$Html_Lazy$lazy2, _evancz$elm_todomvc$Todo$taskList, model.visibility, model.tasks),
						A3(_elm_lang$html$Html_Lazy$lazy2, _evancz$elm_todomvc$Todo$controls, model.visibility, model.tasks)
					])),
				_evancz$elm_todomvc$Todo$infoFooter
			]));
};
var _evancz$elm_todomvc$Todo$main = {
	main: A2(
		_elm_lang$navigation$Navigation$programWithFlags,
		_evancz$elm_todomvc$Todo$urlParser,
		{urlUpdate: _evancz$elm_todomvc$Todo$urlUpdate, view: _evancz$elm_todomvc$Todo$view, init: _evancz$elm_todomvc$Todo$init, update: _evancz$elm_todomvc$Todo$update, subscriptions: _evancz$elm_todomvc$Todo$subscriptions}),
	flags: _elm_lang$core$Json_Decode$oneOf(
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
				A2(
				_elm_lang$core$Json_Decode$map,
				_elm_lang$core$Maybe$Just,
				A2(
					_elm_lang$core$Json_Decode$andThen,
					A2(_elm_lang$core$Json_Decode_ops[':='], 'field', _elm_lang$core$Json_Decode$string),
					function(){___jdce_logger("/build/elm.js", 771);}))
			]))
};

var Elm = {};
Elm['Todo'] = Elm['Todo'] || {};
_elm_lang$core$Native_Platform.addPublicModule(Elm['Todo'], 'Todo', typeof _evancz$elm_todomvc$Todo$main === 'undefined' ? null : _evancz$elm_todomvc$Todo$main);

if (typeof define === "function" && define['amd'])
{
  define([], function(){___jdce_logger("/build/elm.js", 772);});
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

