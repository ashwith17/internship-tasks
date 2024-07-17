if(!JSON.parse(localStorage.getItem('data'))){
var myObject=[];
localStorage.setItem("data",JSON.stringify(myObject));
}

var isFormValid=true;
var checkBorder=false;
var cureentEmployeeList=[];
var viewOrEdit=JSON.parse(sessionStorage.getItem('updateDetails'));
var roleId;
var roleData=JSON.parse(localStorage.getItem('roleData'));
var role;
var currentRoles=[];
var validCombination=false;
var classNameMapProperty={
    'employee-number':'empNo',
    'first-name':'firstName',
    'last-name':'lastName',
    'date-of-birth':'dateOfBirth',
    'email-id':'emailId',
    "mobile-no":'mobieNo',
    'joining-date':'joiningDate',
    'location':'location',
    'job-title':'jobTitle',
    'department':'department',
    'assign-manager':'assignManager',
    'assign-project':'assignProject'
}
initialize();

function initialize()
{
    validDates();
    var details=JSON.parse(localStorage.getItem('data'));
    roleId=JSON.parse(sessionStorage.getItem('roleId'));
    if(roleData){
        var selectRole=document.getElementsByClassName('job-title')[0];
       
        roleData.forEach(rolename=>{
            var option=document.createElement("option");
            option.appendChild(document.createTextNode(rolename.designation));
            option.setAttribute('value',rolename.designation);
            selectRole.append(option);
        })
    }
    if(roleId){
    roleId=roleId.roleId;
    }
  
    var employee={};
    if(viewOrEdit!=null){
        viewOrEdit['isEdited']=true;
        details.forEach(ele=>{
            if(ele.empNo==viewOrEdit.employeeNumber)
            {
                employee=ele;
            }
            else{
                cureentEmployeeList.push(ele);
            }
        });        

        for(var i in classNameMapProperty)
        {
            if(i=='joining-date')
            {
                document.querySelector('.'+i).value=employee[classNameMapProperty[i]].split('-').reverse().join('-');
            }
            else{document.querySelector('.'+i).value=employee[classNameMapProperty[i]];}
        }

        if(viewOrEdit.functionality=='View Details'){
        document.getElementsByClassName('cancel-btn')[0].value="close";
        document.getElementsByClassName('heading')[0].innerHTML="View Employee";
        document.getElementsByClassName('add-btn')[0].style.display="none";
        for(var i in classNameMapProperty)
        {
            document.querySelector('.'+i).setAttribute('disabled',"");
        }
        sessionStorage.removeItem('updateDetails');
        }
        else{
            document.getElementsByClassName('add-btn')[0].value="Edit employee";
            document.getElementsByClassName('heading')[0].innerHTML="Edit Employee";
        }

    }

    if(roleId){
        roleData.forEach(ele=>{
            if(ele.id==roleId){
                role=ele;
            }
            else{
                currentRoles.push(ele);
            }
        })
        document.getElementsByClassName('job-title')[0].value=role.designation;
        document.getElementsByClassName('job-title')[0].setAttribute("disabled","");
        document.getElementsByClassName('department')[0].value=role.roleDepartment;
        document.getElementsByClassName('department')[0].setAttribute("disabled","");
        document.getElementsByClassName('location')[0].value=role.roleLocation;
        document.getElementsByClassName('location')[0].setAttribute("disabled","");
        
    }

}
function getElementValue(propertyName){
    return document.getElementsByClassName(propertyName)[0].value;
}

function validDates(){
    var currentDate=new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    var day = currentDate.getDate().toString().padStart(2, '0');
    var minYear=year-100;
    var formattedDate = year + '-' + month + '-' + day;
    var dob=document.getElementsByClassName('date-of-birth')[0];
    var joiningDate=document.getElementsByClassName('joining-date')[0];
    joiningDate.setAttribute('max',formattedDate);
    var min18Years=year-60;
    dob.setAttribute("max",formattedDate);
    currentDate.setFullYear(minYear);
    var formattedDate = minYear + '-' + month + '-' + day;
    dob.setAttribute('min',formattedDate);
    currentDate.setFullYear(min18Years);
    formattedDate = min18Years + '-' + month + '-' + day;
    joiningDate.setAttribute("min",formattedDate);
}
class employeeDetails{
    constructor(employeeObject,status){
        for(var i in employeeObject)
        {
            this[i]=employeeObject[i];
        }
        this.status=status;
    }
}

function checkDuplicate(className){
    border_change(className);
    var dataInLocalStorage=JSON.parse(localStorage.getItem('data'));
    if(dataInLocalStorage.length){
       for(var j=0;j<dataInLocalStorage.length;j++){
            if(dataInLocalStorage[j].empNo==className.value)
            {
                isFormValid=false;
                className.parentElement.appendChild(createErrorMessage("Eployee No. Already Exists"));
                break;
            }
        }
    }
    }

  function border_type_change(className){
    if(!checkBorder){
        className.type="date";
        className.style.border="2px solid rgb(0, 126, 252)";
        className.style.padding="5px";
        checkBorder=true;
    }
    else{
        className.type="text";
        className.style.border='2px solid #e2e2e2';
        className.style.padding="6px";
        checkBorder=false;
    }
    removeErrorMessage(className);
}

  function validateDetails(){
    var form=document.getElementById("employee-details");
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if(element.value.length==0 )
        {
            isFormValid=false;
            var parent=element.parentNode;
            var a=parent.getElementsByTagName("span");
            if(a.length==0){
            element.style.border="2px solid red";
            parent=parent.id;
            
            document.getElementById(parent).appendChild(createErrorMessage("This field is required"));
            }
        }
    }
    if(isFormValid){
        let employeeObject=[];
        for(var i in classNameMapProperty)
        {
            if(i=='joining-date')
            {
                employeeObject[classNameMapProperty[i]]=getElementValue(i).split('-').reverse().join('-');
            }
            else{
            employeeObject[classNameMapProperty[i]]=getElementValue(i);}
        }

    var obj=new employeeDetails(employeeObject,"Active");
    var validCombination=false;
    roleData.forEach(rolecombonation=>{
        if(rolecombonation.designation==obj.jobTitle && rolecombonation.roleDepartment==obj.department && rolecombonation.roleLocation==obj.location)
        {
            validCombination=true;
            rolecombonation.employeesList.push(obj);
        }
    })
    localStorage.setItem('roleData',JSON.stringify(roleData));
    if(validCombination)
    {
        sessionStorage.removeItem('updateDetails');
    if(viewOrEdit){
        if(viewOrEdit['isEdited']){
            var reflectOnRole=viewOrEdit['employeeNumber'];
            roleData.forEach(roles=>{
                if(roles.designation==obj.jobTitle)
                {
                    var hasExists=false;
                    (roles.employeesList).forEach(x=>{
                        if(x==reflectOnRole){
                            hasExists=true;
                        }
                    })
                    if(!hasExists){
                    roles.employeesList.push(obj);}
                }
                else{
                    for(var i=0;i<roles.employeesList.length;i++)
                    {
                        if(reflectOnRole==(roles.employeesList)[i].empNo)
                        {
                            (roles.employeesList).splice(i,1);
                        }
                    }
                }

            })
            localStorage.setItem('roleData',JSON.stringify(roleData));
            localStorage.setItem("data",JSON.stringify(cureentEmployeeList));
        }
    }
    var data=JSON.parse(localStorage.getItem('data'));
    data.push(obj);
    localStorage.setItem("data",JSON.stringify(data));
    if(roleId){
        role.employeesList.push(obj);
        currentRoles.push(role);
        localStorage.setItem('roleData',JSON.stringify(currentRoles));
        sessionStorage.removeItem('roleId');
        window.location.href="roles.html";

    }
    else{
    alert("Date added successfully!!");
    window.location.href = 'employees.html';
    }

}
else{
    window.alert("Role, Location and Department combination is not valid");
}
}}

function checkABove18(className){
    border_type_change(className);
    var birthDate=new Date(className.value);
    var currentDate=new Date();
    if( !(currentDate.getFullYear() - birthDate.getFullYear()>=18)){
        isFormValid=false;
        className.parentElement.appendChild(createErrorMessage("Age is less than 18"));
    }
}

document.getElementById('employee-details').addEventListener('submit',function(e){
    e.preventDefault();
    validateDetails();
    if(isFormValid && validCombination){
    window.location.href='employees.html';}
})

function closeAll()
{
    sessionStorage.removeItem('roleId');
     
     if(sessionStorage.getItem('updateDetails'))
     {
        sessionStorage.removeItem('updateDetails');
     }
     window.location.href = 'employees.html';
}
