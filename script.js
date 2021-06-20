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
    4: "Enter only numbers for Salary"
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
    alert(message[msg]);

}
//Function that shows all employees on Employee Table
function updateEmployeesTable() {
    let tableBody = $('#employeeTableBody');
    let newRow = "";
    let element = "";
    tableBody.empty();
    for (const employee of employeesArray) {
        newRow = "";
        for (const key in employee) {
            element = `<th>${employee[key]}</th>`;
            newRow += element;
        }
        newRow += `<th><button id="${employee.id}" class="button delete">Delete</button></th>`
        tableBody.append(`<tr>${newRow}</tr>`);
    }
    updateMonthlyCost();
}

//Function that deletes employee from array
function deleteEmployee(id) {
    employeesArray.splice(employeesArray.findIndex(x => x.id == id), 1);
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