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
        addItem: function(type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },


    }

})();









var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeConyainer: ".income__list",
        expensesContainer: ".expenses__list"
    }
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
                //  button: document.querySelector(DOMstrings.inputBtn).value
            };
        },
        addListitem: function(obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeConyainer;
                html = `<div class="item clearfix" id="income-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                  <div class="item__value">%value%</div>
                 <div class="item__delete">
                              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                </div>
                        </div>`;


            } else if (type === "exp") {
                element.DOMstrings.expensesContainer
                html = ` <div class="item clearfix" id="expense-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }




            // replace the placeholder text with some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);

            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue)

            fieldsArr = Array.prototype.slice.call(fields);
            fiedsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };


})();





var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        // calculate the budget


        // return the budget


        // display the budget on the UI

    };
    var ctrlAddItem = function() {
        var input, newItem;
        // get the field input data
        var input = UIController.getinput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // add the new item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //Add the item to the UI
            UICtlr.addListitem(newItem, input.type);
            // clear the fields
            UICtlr.clearFields();
            //calculate and update budget
            updateBudget();
        }
    };
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
    return {
        init: function() {
            setupEventListeners();
            console.log('aplication has started');
        }
    }
})(budgetController, UIController);


controller.init();