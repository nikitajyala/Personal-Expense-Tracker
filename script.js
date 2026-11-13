let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();

    showExpenses();
});

function showExpenses() {

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="empty">No expenses added yet.</p>';
        updateSummary();
        return;
    }

    expenses.forEach(function(expense) {

        const item = document.createElement("div");
        item.className = "expense-item";

        item.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category} | ${expense.date}</p>
            </div>

            <div class="expense-amount">
                <strong>₹${expense.amount}</strong>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(item);
    });

    updateSummary();
}

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();
}

function updateSummary() {

    let total = 0;

    let food = 0;
    let travel = 0;
    let shopping = 0;
    let bills = 0;
    let other = 0;

    expenses.forEach(function(expense) {

        total += expense.amount;

        if (expense.category === "Food") {
            food += expense.amount;
        }
        else if (expense.category === "Travel") {
            travel += expense.amount;
        }
        else if (expense.category === "Shopping") {
            shopping += expense.amount;
        }
        else if (expense.category === "Bills") {
            bills += expense.amount;
        }
        else {
            other += expense.amount;
        }
    });

    document.getElementById("totalExpense").textContent = "₹" + total;
    document.getElementById("expenseCount").textContent = expenses.length;

    document.getElementById("foodTotal").textContent = "₹" + food;
    document.getElementById("travelTotal").textContent = "₹" + travel;
    document.getElementById("shoppingTotal").textContent = "₹" + shopping;
    document.getElementById("billsTotal").textContent = "₹" + bills;
    document.getElementById("otherTotal").textContent = "₹" + other;
}

showExpenses();