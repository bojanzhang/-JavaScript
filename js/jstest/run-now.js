/**
 * 立即执行
 */

// 这个是可以用的，因为他在自执行函数表达式闭包内部
// i的值作为locked的索引存在，在循环执行结束以后，尽管最后i的值变成了a元素总数（例如10）
// 但闭包内部的lockedInIndex值是没有改变，因为他已经执行完毕了
// 所以当点击连接的时候，结果是正确的

var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    (function (lockedInIndex) {
        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, 'false');
    })(i);
}

// 你也可以像下面这样应用，在处理函数那里使用自执行函数表达式
// 而不是在addEventListener外部
// 但是相对来说，上面的代码更具可读性

var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', (function (lockedInIndex) {
        return function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        };
    })(i), 'false');
}

/**
 * 自执行匿名函数和立即执行函数表达式区别
 * arguments.callee() es5中被废弃
 */
// 这是一个自执行的函数，函数内部执行自身，递归
function foo() { foo(); }

// 这是一个自执行的匿名函数，因为没有标示名称
// 必须使用arguments.callee属性来执行自己
var foo = function () { arguments.callee(); };

// 这可能也是一个自执行的匿名函数，仅仅是foo标示名称引用它自身
// 如果你将foo改变成其它的，你将得到一个used-to-self-execute匿名函数
var foo = function () { foo(); };

// 有些人叫这个是自执行的匿名函数（即便它不是），因为它没有调用自身，它只是立即执行而已。
(function () { /* code */ } ());

// 为函数表达式添加一个标示名称，可以方便Debug
// 但一定命名了，这个函数就不再是匿名的了
(function foo() { /* code */ } ());

// 立即调用的函数表达式（IIFE）也可以自执行，不过可能不常用罢了
(function () { arguments.callee(); } ());
(function foo() { foo(); } ());

// 另外，下面的代码在黑莓5里执行会出错，因为在一个命名的函数表达式里，他的名称是undefined
// 呵呵，奇怪
(function foo() { foo(); } ());


