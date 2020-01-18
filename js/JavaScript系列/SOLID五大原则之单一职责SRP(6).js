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
    // 添加事件处理器
    this.addHandler = function (handler) {
        handlers.push(handler);
    };

    // 删除事件处理器
    this.removeHandler = function (handler) {
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    };

    /**
     *  触发事件处理
     * @param eventArgs 事件参数
     */
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

    /**
     *  事件发布
      * @param eventName 事件名称
     * @param eventArgs  传入事件的参数
     */
    this.publish = function (eventName, eventArgs) {
        let event = getEvent(eventName);

        if (!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.fire(eventArgs);

    };

    // 订阅
    this.subscribe = function (eventName, handler) {
        let event = getEvent(eventName);

        if (!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.addHandler(handler);

    };

}

// 商品
function Product(id, description) {
    this.getId = function () {
        return id;
    }

    this.getDescription = function () {
        return description;
    };
}

// Cart addItem 的function 需要发布一个itemAdd事件，将item 传递过去
function Cart(eventAggregator) {
    let items = [];
    this.addItem = function (item) {
        items.push(item);
        eventAggregator.publish("itemAdded", item);
    };
}

/**
 *CartController 主要接收Cart 对象和事件聚合器，
 * 通过订阅itemAdd事件，来添加一个li元素,
 * 通过订阅productSelected事件来添加product
 * @constructor
 */
function CartController(cart, eventAggregator) {
    // 订阅添加事件
    eventAggregator.subtract("itemAdded", function (eventArgs) {
        let newItem = $("<li></li>").html(eventArgs.getDeclaration())
            .attr("id-cart", eventArgs.getId()).appendTo("#cart");
    });
    // 订阅商品选中事件
    eventAggregator.subtract("productSelected", function (eventArgs) {
        cart.addItem(eventArgs.product);
    });
}

// repository 获取数据， 然后 暴露get数据的方法
function productRepository() {
    let products = [new Product(1, "Star Wars Lego Ship"),
        new Product(2, "Barbie Doll"),
        new Product(3, "Remote Control Airplane")];
    this.getProducts = function () {
        return products;
    }
}

// ProductController 定义了onProductSelect 方法，触发productSelect事件
function ProductController(eventAggregator, productRepository) {
    let products = productRepository.getProducts();

    function onProduceSelected() {
        let productId = $(this).attr("id");
        let product = $.grep(products, function (x) {
            return x.getId() == productId;
        })[0];
        // 发布商品选中事件
        eventAggregator.publish("productSelected", {product: product});
    }

    products.forEach(function (item) {
        let newItem = $("<li></li>").html(item.getDescription())
            .attr("id", item.getId())
            .dbclick(onProduceSelected)
            .appendTo("#products");
    });
}

/**
 * 最后执行的内容, 需在文档加载完毕之后执行
 */
(function () {
    let eventAggregator = new EventAggregator(),
        cart = new Cart(eventAggregator),
        cartController = new CartController(cart, eventAggregator),
        productRepository = new productRepository(),
        productController = new ProductController(eventAggregator, productRepository.getProducts());
}());







