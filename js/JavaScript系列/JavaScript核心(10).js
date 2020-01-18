/**
 * 对象 Object
 * An object is a collectioni of properties and has a single prototype object.
 * The prototype may be either an object or the null value.
 */
// 原型继承
var a = {
    x: 10,
    calculate: function (z) {
        return this.x + this.y + z
    }
};

var b = {
    y: 20,
    __proto__: a
};

var c = {
    y: 30,
    __proto__: a
};

// 调用继承过来的方法
b.calculate(30); // 60
/**
 * this这个值在一个继承机制中，仍然是指向它原本属于的对象，而不是从原型链上找到它时，它所属于的对象.
 *
 */

/**
 * 构造函数：
 *  除了构造对象，还自动为创建的对象设置原型对象(prototype object)
 *  原型对象存放于 ConstructorFunction.prototype 属性中
 */
// 构造函数
function Foo(y) {
    // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
    this.y = y;
}

// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：

// 继承属性"x"
Foo.prototype.x = 10;

// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
    return this.x + this.y + z;
};

// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);

// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80

// 让我们看看是否使用了预期的属性

console.log(
    b.__proto__ === Foo.prototype, // true
    c.__proto__ === Foo.prototype, // true
    // "Foo.prototype"自动创建了一个特殊的属性"constructor"
    // 指向a的构造函数本身
    // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
    b.constructor === Foo, // true
    c.constructor === Foo, // true
    Foo.prototype.constructor === Foo,// true
b.calculate === b.__proto__.calculate, // true
b.__proto__.calculate === Foo.prototype.calculate // true
);
