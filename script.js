$(readyNow);

function readyNow() {
    eventListener();
}
//Array for all employees
const employeesArray = [];

//Function that creates new Employee object
function Employee(firstName, lastName, id, title, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.title = title;
    this.salary = salary;
}
//Function that saves all data from Employee Form to an array as an object
function eventListener() {
    $('#submitEmployeeButton').on("click", addEmployee);
    $('#employeeTableBody').on('click', '.delete', function() { deleteEmployee($(this).attr('id')); });
}
//Function that listens to submit Employee button
function addEmployee() {
    const employee = new Employee(
        $('#employeeFirstName').val(),
        $('#employeeLastName').val(),
        $('#employeeId').val(),
        $('#employeeTitle').val(),
        $('#employeeSalary').val()
    );
    employeesArray.push(employee);
    clearInputs();
    updateEmployeesTable();
}
//Function that shows all employees on Employee Table
function updateEmployeesTable() {
    console.log(employeesArray);
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
    console.log(id);
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

function updateMonthlyCost() {
    let monthlyCost = 0;
    for (const employee of employeesArray) {
        monthlyCost += parseInt(employee.salary);
    }
    monthlyCost /= 12;
    $('#totalMonthly').removeClass('exceeded')
    if (monthlyCost > 20000) { $('#totalMonthly').addClass('exceeded') }
    $('#totalMonthly').empty().text(`$${ monthlyCost }`);
}