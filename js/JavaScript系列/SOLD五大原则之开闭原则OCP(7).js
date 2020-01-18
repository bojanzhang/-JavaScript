/**
 * software entities {classes,modules,functions,etc.}
 * should be oepn for extension,
 * but closed for modification
 */

/**
 * https://www.cnblogs.com/TomXu/archive/2012/01/09/2306329.html
 */
/**
 * 通用questionCreator 函数
 * @param spec 问题
 * @param my
 */
function questionCreator(spec, my) {
    let that = {};
    my = my || {};
    my.label = spec.label;

    my.renderInput = function () {
        throw "not implemented";
        // 此处renderInput 没有实现， 主要目的是让各自问题类型的实现代码覆盖这个方法
    }
    /**
     * 生成 问题描述 document
     * @param target
     */
    that.render = function (target) {
        let questionWrapper = document.createElement("div");
        questionWrapper.className = "question-wrapper";

        let questionLabel = document.createElement("div");
        questionLabel.className = "question-label";
        let label = document.createTextNode(spec.label);
        questionLabel.appendChild(label);

        let answer = my.renderInput() || document.createElement("div");
        //my.renderInput(), 不同类型的问题有不同的实现
        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        return questionWrapper;
    }

    return that;
}

// 选择类型问题
function choiceQuestionCreator(spec) {
    let my = {},
        that = questionCreator(spec, my);

    //choice类型的renderInput 实现
    my.renderInput = function () {
        let select = document.createElement("select");
        let len = spec.choices.length;
        for (let i = 0; i < len; i++) {
            let option = document.createElement("option");
            option.value = spec.choices[i];
            option.text = spec.choices[i];
            select.appendChild(option);
        }
        return select;
    }

    return that;
}

function inputQuestionCreator(spec) {
    let my = {},
        that = questionCreator(spec, my);
    my.renderInput = function () {
        let input = document.createElement("input");
        input.type = "text";
        return input;
    }
    return that;
}

let view = {
    render: function (target, questions) {
        for (let i = 0; i < questions.length; i++) {
            target.appendChild(questions[i].render());
        }
    }
};

let questions = [
    choiceQuestionCreator({
        label: 'Have you used tobacco products within the last 30 days?',
        choices: ['Yes', 'No']
    }),
    inputQuestionCreator({
        label: 'What medications are you currently using?'
    })
];

let questionRegion = document.getElementById('questions');

view.render(questionRegion, questions);
/**
 * 1: questionCreator 方法的创建，使用模板方法模式将问题的处理委派（delegate）给针对每个问题类型的扩展代码renderInput上
 * 2： 为每个类型的问题创建一个对象进行代码实现。每个实现必须包含renderInput方法以覆盖questionCreator方法里面的renderInput
 * 代码，这就是我们常用的策略模式
 */
