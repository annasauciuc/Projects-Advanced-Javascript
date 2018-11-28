var budgetController = (function() {


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
        var input = UIController.getinput();
        console.log('input :', input);

    }

})(budgetController, UIController);