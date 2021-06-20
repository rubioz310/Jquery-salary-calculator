$(readyNow);

function readyNow() {
    console.log('Salary Calculator')
    submitEmployee();
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
function submitEmployee() {
    $('#submitEmployeeButton').on("click", addEmployee);
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
}
//Function that deletes employee from array