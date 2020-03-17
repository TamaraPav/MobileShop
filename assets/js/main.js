window.onload = function (){
    $("#sendMessage").click(function(event){
        event.preventDefault();
        checkForm();
    });
}

function checkForm() {

    var poljeName = document.querySelector("#name");
    var poljeEmail = document.querySelector("#email");   
    var poljeModel = document.querySelector("#model");
    var dropBrand = document.querySelector("#fBrend");
    var poljeMessage = document.querySelector("#message");


    var reName, reEmail, reModel;

    reName = /^[A-Z][a-z]{1,12}(\s[A-Z][a-z]{1,19})+$/;
    reModel = /^[A-Za-z0-9]{2,16}$/;
    reEmail = /^\w+([.-]?[\w\d]+)*@\w+([.-]?[\w]+)*(\.\w{2,4})+$/;


    if(poljeName.value == ""){
        poljeName.classList.add("error");
    }
    else{
        if(!reName.test(poljeName.value)){
            poljeName.classList.add("error");
        }else{
            poljeName.classList.remove("error");
        }
    }


    if(poljeEmail.value == ""){
        poljeEmail.classList.add("error");

    }
    else{
        if(!reEmail.test(poljeEmail.value)){
            poljeEmail.classList.add("error");
        }else{
            poljeEmail.classList.remove("error");
        }
    }
  

    if(poljeModel.value == ""){
        poljeModel.classList.add("error");

    }
    else{
        if(!reModel.test(poljeModel.value)){
            poljeModel.classList.add("error");
        }else{
            poljeModel.classList.remove("error");
        }
    }

    if(dropBrand.value == 0){
        dropBrand.classList.add("error");

    }
    else{        
        dropBrand.classList.remove("error");
    }

    if(poljeMessage.value == ""){
        poljeMessage.classList.add("error");
    }
    else{
        poljeMessage.classList.remove("error");
        }
}

