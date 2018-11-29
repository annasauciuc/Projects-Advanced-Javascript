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
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: 0,
            incomes: 0
        },
        budget: 0,
        percetange: -1
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

        calculateBudget: function() {
            // calculate total income and expenses

            calculateTotal("exp");
            calculateTotal("inc");

            //calculate the budget: income - expenses

            data.budget = data.totals.inc - data.totals.expenses;

            // calculate the procentage of income that we spent


            if (data.totals > 0) {
                data.percetange = Math.round((data.totals.exp / data.totals.inc)) * 100
            } else {
                data.percetange = -1;
            }

            //Expense = 100 and income 300 ,spent 33.333%= 100/300 = 0.3333 * 100
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percetange: data.totals.percetange
            }
        },
        testing: function() {
            console.log('data :', data);
        }

    };

})();
var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeConyainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container"
    }
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),

            };
        },
        addListitem: function(obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeConyainer;
                html = `<div class="item clearfix" id="inc-%id%">
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
                html = ` <div class="item clearfix" id="exp-%id%">
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
        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExpenses;

            if (obj.percetange > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percetange + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "-----";
            }
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
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem)






    };
    var updateBudget = function() {
        // calculate the budget
        budgetCtrl.calculateBudget();
        // return the budget
        var budget = budgetController.getBudget();
        // display the budget on the UI
        UICtrl.displayBudget(budget);
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
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percetange: -1
            });
            console.log('aplication has started');
        }
    }
})(budgetController, UIController);


controller.init();