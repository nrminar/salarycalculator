//this script takes in input from the DOM
//it then creates an object and uses that information to display the information on the DOM as well as monthly cost
//if you hit the delete button, the monthly cost will be changed and the employee will be deleted
$(document).ready(readyNow);
let totalCost = 0;
//assigns a var to keep track of the totalCost
let employees = [];
function readyNow(){
    $('#submitBtn').on('click',addEmployee)
}//this function readies the submit button and calls the addEmployee functin on click
function addEmployee(){
    let firstName = $('#empFirst').val();
    let lastName = $('#empLast').val();
    let empId = $('#empNum').val();
    let jobTitle = $('#empTitle').val();
    let annSalary = $('#empSalary').val();
    let newObject = {
        fName: firstName,
        lName: lastName,
        idNum: empId,
        empTitle: jobTitle,
        empSalary: annSalary
    }//this creates a new object with the keys that take in the input fields
    let $tr = `<tr id="${newObject.empSalary}" ><td>${newObject.fName}</td><td>${newObject.lName}</td><td>${newObject.idNum}</td><td>${newObject.empTitle}</td><td>${newObject.empSalary}</td><td><button id="deleteBtn" onclick="removeEmp(this)">Delete</button></tr>`
    $('#tableBody').append($tr);
    //the above two liines assigns a variable to the value of new html elements with the keys inside to display the info
    //crucially important to functionality is assigning the id of newObject.employeesSalary to the html elements so that you can call them later
    employees.push(newObject);
    totalCost += (parseInt(newObject.empSalary)) / 12;
    //calculates the monthly cose and increments totalCost by that amount
    let $mCost = `<h3>Monthly Cost: ${totalCost}</h3>`
    let dataId = '#'+newObject.empSalary
    //two variables are created. the first one is the new html element that we want to append below the table
    //the second var concats newObject.empSalary to a # so that we can use it to call the element based on the objects salary
    $(dataId).data('empId',newObject.empSalary);
    //using the dataId to target the element that we created this sets a data called empId with the value of newObject.empSalary
    $('#monthCost').empty();
    $('#monthCost').append($mCost);
    //appends the new h3 element to the page
    if(totalCost>20000){
        $('#monthCost').toggleClass('red');
    }//toggles the red class based on the value of totalCost
    $('#empFirst').val('');
    $('#empLast').val('');
    $('#empNum').val('');
    $('#empTitle').val('');
    $('#empSalary').val('');
    //empties the input fields
}
function removeEmp(who){
    let thatOne = $(who).parent().parent().data("empId");
    //assigns a var to the value of the parent of the parent of this. the newObject.empSalary data
    totalCost -= thatOne/12;
    //decrements totaCost by the value of the data(newObject.empSalary of this)
    let $mCost = `<h3>Monthly Cost: ${totalCost}</h3>`
    $('#monthCost').empty();
    $('#monthCost').append($mCost);
    //assigns a var to a new html element and appends it after emptying
    $(who).parent().parent().remove();
    //removes the parent of the parent of this which will be the entire row
    if(totalCost<=20000){
        $('.red').toggleClass('red');
    }//if conditional: if totaCost is less than or equal to 20000 then it targets an elemnt by the red class. The only way this will happen is if it is already red. It then toggles the red class. TURNS OFF RED
}//function that is called onclick of the deleteBtn.(inline onclick="removeEmp(this") this is the argument. 