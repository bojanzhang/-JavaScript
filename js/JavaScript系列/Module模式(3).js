/**
 * https://www.cnblogs.com/TomXu/archive/2011/12/30/2288372.html
 *  module基本用法
 */
var Calculator = function (eq) {
    // 声明私有成员
    var doc = document.getElementById(eq);

    return {
        add: function (a, b) {
            var sum = a + b;
            doc.innerHTML = sum;
        }
    };
};
/**
 * 使用方法
 */
var calculator = new Calculator("eq");
calculator.add(1, 2);

/**
 * 匿名闭包
 */
(function () {
    // 此处声明变量和function，并且作用域只能是这个闭包里
    //但是此处依然可以访问全局变量
}());
/**
 * 注意： 匿名函数后面的括号，必须。 如果没有， JavaScript解析器默认声明了一个function函数，
 * 有括号，就是创建一个函数表达式，即自执行。使用的时候就不用new了。
 * 下面的声明效果等同上面
 */
(function () {
})();

/**
 * 引入全局变量
 */
(function ($, waya) {
}(jQuery, WAYA));

/**
 * 声明全局变量： 通过匿名函数的返回值来返回这个全局变量
 */
let blogModule = (function () {
    let my = {}, privateName = "javaScript";

    function privateAddTopic(data) {
        // 这里是内部处理代码
    }

    my.Name = privateName;
    my.AddTopic = privateAddTopic();
    return my;
}());
// 此处可以理解为表达式, 表达式结果就是匿名函数的返回值（return my）。如果不用变量接收,返回值是无法使用的


/**
 * 扩展
 * 大型项目中，将一个功能分离成多个文件，易于合作开发。
 * 将自身传入，再返回
 */

/**
 * 松耦合扩展
 * 没办法重写你的一些属性或者函数
 * 不能在初始化的时候就是用Module的属性
 * @type {{}}
 */
var blogModule = (function (my) {
    // 添加一些功能
    return my;
}(blogModule || {}));

/**
 * 紧耦合扩展
 * 紧耦合扩展限制了加载顺序
 * 但是提供了我们重载的机会，看如下例子：
 */
var blogModule = (function (my) {
    var oldAddPhotoMethod = my.AddPhoto;// 内部仍可以调用原来的 AddPhoto(oldAddPhotoMethod)

    my.AddPhoto = function () {
        // 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
    };

    return my;
}(blogModule));

/**
 * 跨文件共享私有域对象
 * 任何文件都可以对他们的局部变量_private设属性，并且设置对其他的文件也立即生效。
 * 一旦这个模块加载结束，应用会调用 blogModule._seal()"上锁"，这会阻止外部接入内部的_private。
 * 如果这个模块需要再次增生，应用的生命周期内，任何文件都可以调用_unseal() ”开锁”，然后再加载新文件。
 * 加载后再次调用 _seal()”上锁”。
 *
 */
var blogModule = (function (my) {
    var _private = my._private = my._private || {},

        _seal = my._seal = my._seal || function () {
            delete my._private;
            delete my._seal;
            delete my._unseal;

        },

        _unseal = my._unseal = my._unseal || function () {
            my._private = _private;
            my._seal = _seal;
            my._unseal = _unseal;
        };

    return my;
}(blogModule || {}));

/**
 * 子模块
 */

blogModule.CommentSubModule = (function () {
    var my = {};
    // ...

    return my;
} ());






