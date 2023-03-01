let form = document.getElementById("main-form").getElementsByClassName("form")[0];
let submit = form.submit;
let issues = document.getElementsByName("invalid-label");

submit.addEventListener('click', validateForm);

function checkContactField(){
    var valid = true;
    var type = form.contacttype;
    var issue = issues[3];
    var fields = form.contactfield;
    if (fields[0].value != fields[1].value){
        issue.innerHTML = "Fields do not match.";
        return false;
    }

    else {
        issue.innerHTML = "";
        
        if(type.value == "a"){
            if (fields[0].value.match("^[0-9]+$")){
                return fields[0].value;
            }

            else{
                issue.innerHTML = "Enter a vaild phone number.";
                return false;
            }
        }

        else{
            if (fields[0].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                return fields[0].value;
            }

            else{
                issue.innerHTML = "Enter a vaild email address.";
                return false;
            }
        }
    }
}

function checkMeetingTime(){
    var issue = issues[2];
    var time = new Date();
    var duration = form.duration.value;

    time.setHours(parseInt(form.time.value));
    var intialHour = time.getHours();

    const description = time.getHours() + ":" + time.getMinutes() + ", for " + duration + " minutes";

    time.setMinutes(time.getMinutes() + parseInt(duration));

    if (!(duration.match("^[0-9]+$")) || isNaN(time.getHours() || time.getMinutes())){
        issue.innerHTML = "Enter a valid time.";
        return false;
    }

    else if (intialHour < 9 || time.getHours() > 20){
        issue.innerHTML = "Time/Duration is not within working hours.";
        return false;
    }

    else if (duration > 180){
        issue.innerHTML = "Duration cannot be longer than 180 mins."
    }

    else{
        issue.innerHTML = "";
        return description;
    }
    
 
}

function checkMeetingDate(){
    var issue = issues[1];
    var type = form.datetype;
    var date = new Date(form.date.value);
    
    if (date.toDateString() == new Date().toDateString() || date < new Date() || date.getDay() == 0 || form.date.value == ""){
        issue.innerHTML = "Enter a vaild date.";
        return false;
    }

    else if (type.value == "b" && date.getDay() != 1){
        issue.innerHTML = "Enter a date that occurs on a Monday.";
        return false;
    }

    else {
        valid = true;
        issue.innerHTML = "";
        
        return date.toDateString();
    }
}

function validateForm(){
    var date = checkMeetingDate();
    var time = checkMeetingTime();
    var contactInfo = checkContactField();
    var proposaltext = form.proposal.value;

    if (date != false && time != false && contactInfo != false){
        var contactName = form.name[0].value + " " + form.name[1].value;
        
        if (form.name[0].value + form.name[1].value == ""){
            contactName = "Not Given";
        }
        form.innerHTML = "";
        document.getElementById("main-form").innerHTML = (
            "<h2>Thank you.</h2>"+
            "<h3>Review Details:</h3>"+
            "<p><strong>Name: </strong>"+ contactName +"</p>"+
            "<p><strong>Phone Number/Email: </strong>" + contactInfo + "</p>"+
            "<p><strong>Date/Week: </strong>" + date + "</p>" +
            "<p><strong>At: </strong>"+ time +"</p>"
        );

        if(proposaltext != ""){
            document.getElementById("main-form").innerHTML += (
                "<h3>Project Summary: </h3>"+
                "<p>" + "\"" + proposaltext + "\"" + "</p>"
            );
        }

        alert("Submission Recieved, See Details Below");
    }
}