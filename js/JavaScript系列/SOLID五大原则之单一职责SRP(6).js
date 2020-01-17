/**
 * 1: The Single Responsibility Principle (单一职责SRP)
 * 2:The Open/Closed Principle(开闭原则OCP)
 * 3:The Liskov Substitution Principle (里氏替换原则 LSP)
 * 4:The Interface Segregation Principle(接口分离原则 ISP)
 * 5：The Dependency Inversion Principle(依赖反转原则DIP)
 */

/**
 *1: Information holder: 该对象设计为储存对象并提供对象信息给其他对象
 * 2：Structurer : 该对象设计为维护对象和信息之间的关系
 * 3:Service provider: 该对象设计为处理工作并提供服务给其他对象。
 * 4：Controller:该对象设计为控制决策一系列负责的任务处理。
 * 5:Coordinator(协调者):该对象不做任何决策处理工作，只是delegate（委派）工作到其他对象上。
 * 6：Interfacer: 该对象设计为在系统的各个部分转化消息（或请求）
 */

/**
 * https://www.cnblogs.com/TomXu/archive/2012/01/06/2305513.html
 * 事件聚合：
 * 1，Event,用于Handler回调代码
 * 2：EventAggregator 用于订阅和发布Event
 * @param name
 * @constructor
 */
function Event(name) {
    let handlers = [];
    this.getName = function () {
        return name;
    }
    this.addHandler = function (handler) {
        handlers.push(handler);
    };

    this.removeHandler = function (handler) {
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i, 1);
                break;
            }

        }

    };

    this.fire = function (eventArgs) {
        handlers.forEach(function (h) {
            h(eventArgs);
        });

    };
}

function EventAggregator() {
    let events = [];

    function getEvent(eventName) {
        return $.grep(events, function (event) {
            return event.getName() === eventName;
        })[0];

    }
    // 发布
    this.publish = function (eventName,eventArgs) {
        let event = getEvent(eventName);

        if(!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.fire(eventArgs);

    };

    // 订阅
    this.subscribe = function (eventName,handler) {
        let event = getEvent(eventName);

        if(!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.addHandler(handler);
        
    };

}




