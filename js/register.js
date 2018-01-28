$(document).ready(init);

//get the course id from the queryString
var id = window.location.search.substring(1).split("=")[1];
//index the course from JSON data
var selectedCourse = courses["courses"][parseInt(id)];

function init(){
    //set the title to this course and display it on the page
    window.document.title = "Register for " + selectedCourse["name"];
    make_html("#register-template",selectedCourse);
    load_ratings();
}
function make_html(template_id,data) {
    var template = $(template_id).html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $("#register-div").html(html);
}
function register(){
    if(selectedCourse["seatstaken"] == selectedCourse["totalseats"]){
        alert("course full");
    }
    else{
        selectedCourse["seatstaken"]++;
        alert("registration succesful"); 
        init();
        $('input[value=Register]').css('display','none');
    }
}
function navigate_to_index_page(){
    window.location.href="../html/index.html";
}
function load_ratings(){
    for(var i=0;i < selectedCourse["rating"];i++){
        $('.register-ratings').children().eq(i).attr('src','../img/gold_star.png')
    }
}