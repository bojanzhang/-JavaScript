/**
 * Subtypes must be substitutable for  their base types.
 * 派生类型必须可以替换它的基类型
 * The Liskov Substitution Principle 里氏替换原则 LSP
 */

/**
 * 减少LSP妨碍
 * 1： 契约：执行说明书（executable specifications）和错误处理
 * 2：避免继承， Favor object composition over class inheritance (尽量使用对象组合而不是继承)
 *
 */

/**
 * json : 所有属性名称和它的值都必须用双引号引住，不能使用单引号,转义以后的单引号也是不合法的
 *  { prop: "val" }和{ 'prop': 'val' }确实不合法的
 *  JSON.parse用来将JSON字符串反序列化成对象，
 *  JSON.stringify用来将对象序列化成JSON字符串
 */

// 这是JSON字符串
var foo = '{ "prop": "val" }';

// 这是对象字面量
var bar = { "prop": "val" };