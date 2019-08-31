//this script takes in input from the DOM
//it then creates an object and uses that information to display the information on the DOM as well as monthly cose
//if you hit the delete button, the monthly cost will be changed and the employee will be deleted
$(document).ready(readyNow);
let totalCost = 0;
let employees = [];
function readyNow(){
    $('#submitBtn').on('click',addEmployee)
}
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
    }
    let $tr = `<tr id="${newObject.empSalary}" ><td>${newObject.fName}</td><td>${newObject.lName}</td><td>${newObject.idNum}</td><td>${newObject.empTitle}</td><td>${newObject.empSalary}</td><td><button id="deleteBtn" onclick="removeEmp(this)">Delete</button></tr>`
    $('#tableBody').append($tr);
    employees.push(newObject);
    totalCost += (parseInt(newObject.empSalary)) / 12;
    let $mCost = `<h3>Monthly Cost: ${totalCost}</h3>`
    let dataId = '#'+newObject.empSalary
    $(dataId).data('empId',newObject.empSalary);
    $('#monthCost').empty();
    $('#monthCost').append($mCost);
    if(totalCost>20000){
        $('#monthCost').toggleClass('red');
    }
    $('#empFirst').val('');
    $('#empLast').val('');
    $('#empNum').val('');
    $('#empTitle').val('');
    $('#empSalary').val('');
}
function removeEmp(who){
    let thatOne = $(who).parent().parent().data("empId");
    totalCost -= thatOne/12;
    let $mCost = `<h3>Monthly Cost: ${totalCost}</h3>`
    $('#monthCost').empty();
    $('#monthCost').append($mCost);
    $(who).parent().parent().remove();
    if(totalCost<=20000){
        $('.red').toggleClass('red');
    }
}