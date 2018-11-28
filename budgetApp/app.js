var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }
    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: 0,
            incomes: 0
        }
    };
    return {
        addItem: function(type, description, val) {
            var newItem, id;
            // create new id
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            // create new item based on "inc" or "exp" type
            if (type === "exp") {
                newItem = new Expense(id, description, val);
            } else
            if (type === "inc") {
                newItem = new Expense(id, description, val);
            }
            // puah it into our data structure
            data.allItems[type].push(newItem);
            // return the new element
            return newItem;
        },
        testing

    }

})();









var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn"
    }
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
                //  button: document.querySelector(DOMstrings.inputBtn).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };


})();





var controller = (function(budgetCtlr, UICtlr) {
    var setUpEventlisteners = function() {
        var DOM = UIController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.whitch === 13) {
                ctrlAddItem();
            }
        })
    };
    var ctrlAddItem = function() {
        var input, newItem;
        // get the field input data
        var input = UIController.getinput();
        // add the new item to the budget controller
        var newItem = budgetCtlr.addItem(input.type, input.description, input.value);
        //Add the item to the UI

    }
    return {
        init: function() {
            setUpEventlisteners();
        }
    }
})(budgetController, UIController);
controller.init();