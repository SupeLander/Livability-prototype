document.addEventListener('DOMContentLoaded', function() {
  // ----- Login Functionality Simulation -----
  if (document.querySelector('#login-form')) {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      
      // Retrieve stored user data from localStorage
      const storedUser = localStorage.getItem('livabilityUser');
      if (!storedUser) {
        alert("User not registered. Please sign up.");
      } else {
        const user = JSON.parse(storedUser);
        if (user.username === username && user.password === password) {
          localStorage.setItem('loggedIn', 'true');
          alert("Login successful!");
          window.location.href = "budget.html";
        } else {
          alert("Incorrect username or password!");
        }
      }
    });
  }

  // ----- Sign-Up Functionality Simulation -----
  if (document.getElementById('signup-form')) {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newUsername = document.getElementById('new-username').value.trim();
      const newPassword = document.getElementById('new-password').value;
      
      if(newUsername === "" || newPassword === ""){
        alert("Please enter both a username and password.");
        return;
      }
      
      const user = { username: newUsername, password: newPassword };
      localStorage.setItem('livabilityUser', JSON.stringify(user));
      alert("Sign up successful! Please log in.");
      window.location.href = "index.html";
    });
  }
  
  // ----- Budget Form Submission Handler -----
  const budgetForm = document.getElementById('budget-form');
  if (budgetForm) {
    budgetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const income = parseFloat(document.getElementById('income').value) || 0;
      const balance = parseFloat(document.getElementById('balance').value) || 0;
      document.getElementById('total-income').textContent = income.toFixed(2);
      const expenses = 0;
      document.getElementById('total-expenses').textContent = expenses.toFixed(2);
      const remaining = income - expenses;
      document.getElementById('remaining-budget').textContent = remaining.toFixed(2);
    });
  }

  // ----- Expense Form Submission Handler -----
  const expenseForm = document.getElementById('expense-form');
  if (expenseForm) {
    expenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('expense-amount').value) || 0;
      const category = document.getElementById('expense-category').value;
      
      // Update total amounts based on category
      if (category === 'needs') {
        let currentNeeds = parseFloat(document.getElementById('total-needs').innerText) || 0;
        document.getElementById('total-needs').innerText = (currentNeeds + amount).toFixed(2);
      } else if (category === 'wants') {
        let currentWants = parseFloat(document.getElementById('total-wants').innerText) || 0;
        document.getElementById('total-wants').innerText = (currentWants + amount).toFixed(2);
      }
      
      // Update total expenses
      const totalNeeds = parseFloat(document.getElementById('total-needs').innerText) || 0;
      const totalWants = parseFloat(document.getElementById('total-wants').innerText) || 0;
      document.getElementById('total-expenses').innerText = (totalNeeds + totalWants).toFixed(2);
      
      expenseForm.reset();
    });
  }

  // ----- Bill Form Submission Handler -----
  const billForm = document.getElementById('bill-form');
  if (billForm) {
    billForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const billName = document.getElementById('bill-name').value;
      const billDate = document.getElementById('bill-date').value;
      const li = document.createElement('li');
      li.textContent = `${billName} - Due: ${billDate}`;
      const ul = document.querySelector('#bill-list ul');
      if (ul) {
        ul.appendChild(li);
      }
      billForm.reset();
    });
  }

  // ----- Comparison Form Submission Handler -----
  const comparisonForm = document.getElementById('comparison-form');
  if (comparisonForm) {
    comparisonForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const product1 = parseFloat(document.getElementById('product1').value) || 0;
      const product2 = parseFloat(document.getElementById('product2').value) || 0;
      let resultText = "";
      if (product1 < product2) {
        resultText = "Product 1 is more affordable.";
      } else if (product1 > product2) {
        resultText = "Product 2 is more affordable.";
      } else {
        resultText = "Both products have the same price.";
      }
      document.getElementById('result-text').textContent = resultText;
    });
  }
});