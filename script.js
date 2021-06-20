$(readyNow);

function readyNow() {
    eventListener();
}

//Array for all employees
const employeesArray = [];

//Object for warning messages
const message = {
    1: "Employee added successfully",
    2: "Fill out all empty fields",
    3: "ID already in use",
    4: "Enter only numbers for Salary",
    5: "Employee deleted successfully"
}

//Function that creates new Employee object
function Employee(firstName, lastName, id, title, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.title = title;
    this.salary = salary;
}

//Function that listens to submit Employee button
function eventListener() {
    $('#submitEmployeeButton').on("click", addEmployee);
    $('#employeeTableBody').on('click', '.delete', function() { deleteEmployee($(this).attr('id')); });
    $('#myPopup').hide();

}

//Function that saves all data from Employee Form to an array as an object
function addEmployee() {
    const employee = new Employee(
        $('#employeeFirstName').val(),
        $('#employeeLastName').val(),
        $('#employeeId').val(),
        $('#employeeTitle').val(),
        $('#employeeSalary').val()
    );
    let msg = fieldValidation(employee)
    if (msg == 1) {
        employeesArray.push(employee);
        clearInputs();
        updateEmployeesTable();
    }
    $('#myPopup').slideUp();
    $('#myPopup').text(message[msg]);
    $('#myPopup').slideDown();
}
//Function that shows all employees on Employee Table
function updateEmployeesTable() {
    let tableBody = $('#employeeTableBody');
    let newRow = "";
    let element = "";
    let salary = 0;
    tableBody.empty();
    for (const employee of employeesArray) {
        newRow = "";
        for (const key in employee) {
            if (key == 'salary') {
                salary = parseInt(employee[key]).toFixed(2)
                element = `<td>$${salary}</td>`;
            } else {
                element = `<td>${employee[key]}</td>`;
            }

            newRow += element;
        }
        newRow += `<td><button id="${employee.id}" class="button delete">Delete</button></td>`
        tableBody.append(`<tr>${newRow}</tr>`);
    }
    updateMonthlyCost();
}

//Function that deletes employee from array
function deleteEmployee(id) {
    employeesArray.splice(employeesArray.findIndex(x => x.id == id), 1);
    $('#myPopup').slideUp();
    $('#myPopup').text(message[5]);
    $('#myPopup').slideDown();
    updateEmployeesTable();
}

//Function that clears all inputs after submit
function clearInputs() {
    $('#employeeFirstName').val('');
    $('#employeeLastName').val('');
    $('#employeeId').val('');
    $('#employeeTitle').val('');
    $('#employeeSalary').val('');
}

//Function that updates monthly cost
function updateMonthlyCost() {
    let monthlyCost = 0;
    for (const employee of employeesArray) {
        monthlyCost += parseInt(employee.salary);
    }
    monthlyCost /= 12;
    monthlyCost = monthlyCost.toFixed(2);
    $('#totalMonthly').removeClass('exceeded');
    if (monthlyCost > 20000) { $('#totalMonthly').addClass('exceeded'); }
    $('#totalMonthly').empty().text(`$${ monthlyCost }`);
}

function fieldValidation(newEmployee) {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.id || !newEmployee.title || !newEmployee.salary) {
        return 2;
    }
    if ((employeesArray.findIndex(x => x.id == newEmployee.id) != -1)) {
        return 3;
    }
    if (!parseInt(newEmployee.salary)) { return 4; }
    return 1;
}