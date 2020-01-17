/**
 * 声明全局变量： 通过匿名函数的返回值来返回这个全局变量
 * 此处可以理解为表达式, 表达式结果就是匿名函数的返回值（return my）。如果不用变量接收,返回值是无法使用的
 */
var blogModule = (function () {
    let my = {}, privateName = "javaScript";
    my.name = privateName;

    // 匿名函数表达式
    let  privateAddTopFu = function() {
        console.log("call privateAddTop function");
    }

    // 函数声明
    function test() {
        console.log("call test function");
    }

    my.addTop = function () {
       privateAddTopFu();
        test();
        console.log("addTop  call");
        debugger;
    };
    return my
}());