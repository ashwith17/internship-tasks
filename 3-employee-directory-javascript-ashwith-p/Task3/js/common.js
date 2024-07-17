var isSidebarToggled=false;
var changeBorder=false;
var mobileView=false;
function toggleSideBar(){
    var toogleBtn=document.getElementsByClassName("horizantal-content");
    if(!isSidebarToggled)
    { 
        toogleBtn[0].classList.add("toggle");
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="Role";
        document.getElementsByClassName('handle')[0].style.rotate="180deg";   
        document.getElementsByClassName("handle")[0].style.left="55px";
        document.getElementsByClassName("side-arrow-roles")[0].style.display='none';
        document.getElementsByClassName("side-arrow-user")[0].style.display='none';     
        if(!mobileView){
       
        document.getElementsByClassName('container')[0].style.width="calc(100% - 75px)";


        }
        else{
            document.getElementsByClassName('horizantal-content')[0].style.position="static";
            document.getElementsByClassName('container')[0].style.width="calc(89% - 30px)";
            //document.getElementsByClassName('container')[0].style.paddingLeft="92px";
            document.getElementsByClassName("handle")[0].style.left="55px";
            document.getElementsByClassName("handle")[0].style.top="2%";
        }
        
        isSidebarToggled=true;
    }
    else{
        if(!mobileView){
        document.getElementsByClassName('horizantal-content').style.position="static";
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="ROLE/USER MANAGEMENT";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 230px)";
        document.getElementsByClassName("handle")[0].style.left="175px";
        
        }
        else{
            document.getElementsByClassName('horizantal-content')[0].style.position='absolute';
            document.getElementsByClassName('horizantal-content')[0].style.backgroundColor='white';
            document.getElementsByClassName('horizantal-content')[0].style.zIndex=10;
            document.getElementsByClassName('container')[0].style.width="calc(100% - 30px)";
            document.getElementsByClassName("handle")[0].style.left="175px";
            document.getElementsByClassName("handle")[0].style.top="2%";
            document.getElementsByClassName("handle")[0].style.zIndex="12";
        }
        toogleBtn[0].classList.remove("toggle");
        document.getElementsByClassName('handle')[0].style.rotate="0deg";
        isSidebarToggled=false;
        
    }
    
}
window.onresize = function() {
    if(window.screen.width<665 && !mobileView){
        toggleSideBar();
        mobileView=true;
    }
    else if(window.screen.width>=665 && mobileView){
        toggleSideBar();
        document.getElementsByClassName('horizantal-content')[0].style.position="static";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 230px)";
        document.getElementsByClassName("handle")[0].style.left="175px";
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="ROLE/USER MANAGEMENT";
        mobileView=false;
    }
};

function createErrorMessage(text)
{
    var span=document.createElement("span");
    var text=document.createTextNode(text);
    span.setAttribute("class","warning");
    span.appendChild(text);
    return span;
}

function border_change(className)
{
    
    if(!checkBorder){
    className.style.border="2px solid rgb(0, 126, 252)";
    checkBorder=true;
    }
    else{
        className.style.border='2px solid #e2e2e2';
        checkBorder=false;
    }
    removeErrorMessage(className);
}

function removeErrorMessage(className)
{
    var x=className.parentNode;
    var a=x.getElementsByTagName("span");
    if(a.length>0){
        a[0].remove();
    }
}