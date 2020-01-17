/**
 * JavaScript 不包含传统的类继承模型，而是使用 prototypal 原型模型。
 *
 */
var Calculator = function (decimalDigits, tax) {
    this.decimalDigits = decimalDigits;
    this.tax = tax;
}
/**
 * 方式1：
 * 通过给Calculator对象的prototype 属性赋值 对象字面量 设定Calculator对象的原型
 */
Calculator.prototype = {
    add: function (x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    }
}
// alert(new Calculator().add(120,12));

/**
 * 方式2：
 * 赋值原型prototype的时候使用function立即执行的表达式来赋值
 * 可以封装私有的function，
 * 通过return的形式暴露出简单的使用名称，以达到public/private的效果
 */
Calculator.prototype = function () {
    let add = function () {
    }
    let subtract = function () {

    }
    return {
        add: add,
        subtract: subtract
    }
}();

/**
 * 分步声明 prototype
 */
var BaseCalculator = function () {
    //为每个实例都声明一个小数位数
    this.decimalDigits = 2;
};

//使用原型给BaseCalculator扩展2个对象方法
BaseCalculator.prototype.add = function (x, y) {
    return x + y;
};

BaseCalculator.prototype.subtract = function (x, y) {
    return x - y;
};

/**
 *Calculator 原型指向到BaseCalculator实例,
 * 目的是让Calculator集成BaseCalculator中的方法。
 * 注意： 由于Calculator原型是BaseCalculator的一个实例。
 *  所以不管你创建多少个 Calculator对象，他们的原型都指向同一个实例。
 *
 * @constructor
 */
var BaseCalculator = function () {
    this.decimalDigits = 2;
};
BaseCalculator.prototype = {
    add: function (x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    }
};
var Calculator = function () {
    //为每个实例都声明一个税收数字
    this.tax = 5;
};
Calculator.prototype = new BaseCalculator();

/**
 * 重写原型
 * 通过继续声明的同样的add代码的形式来达到覆盖重写前面的add功能
 * 重写的代码需要放在最后，这样才能覆盖前面的代码。
 */
//覆盖前面Calculator的add() function
Calculator.prototype.add = function (x, y) {
    return x + y + this.tax;
};

var calc = new Calculator();
alert(calc.add(1, 1));

/**
 * 原型链
 */

function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';

// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;

var test = new Bar() // 创建Bar的一个新实例

// 原型链
/**
 test [Bar的实例]
    Bar.prototype [Foo的实例]
            { foo: 'Hello World' }
             Foo.prototype
                 {method: ...};
                 Object.prototype
                   {toString: ... etc. }
 *
 */
/**
 * 需要注意的是，我们可以赋值任何类型的对象到原型上，但是不能赋值原子类型的值，比如如下代码是无效的：
 * function Foo() {}
   Foo.prototype = 1; // 无效
 */
/**
 * hasOwnProperty函数：
 * hasOwnProperty是Object.prototype的一个方法
 *  判断一个对象是否包含自定义属性而不是原型链上的属性
 *  hasOwnProperty 是 JavaScript 中唯一一个处理属性但是不查找原型链的函数
 *  JavaScript 不会保护 hasOwnProperty 被非法占用
 */

var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 总是返回 false

// 使用{}对象的 hasOwnProperty，并将其上下为设置为foo
let da ={};
da.hasOwnProperty.call(foo, 'bar'); // true



