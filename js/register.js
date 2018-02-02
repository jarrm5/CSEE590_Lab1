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
    hide_register_btn(true);
}
function make_html(template_id,data) {
    var template = $(template_id).html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $("#register-div").html(html);
}
function register(){
    /*
        Register for the course by incrementing the number of registered students.
        Reload the page to reflect the changes and hide the register button.
    */
    
    selectedCourse["seatstaken"]++;
    alert("registration succesful"); 
    init();
    hide_register_btn(false);
}
function navigate_to_index_page(){
    window.location.href="../html/index.html";
}
function load_ratings(){
    /*
        The register.html page loads hollow stars by default.
        Based on the rating number given to each course, we overwrite the hollow stars
        i number of times after the page loads.
    */
    for(var i=0;i < selectedCourse["rating"];i++){
        $('.register-ratings').children().eq(i).attr('src','../img/gold_star.png')
    }
}
function hide_register_btn(isPageLoad){
    /*
        Hiding the register button
        If this function is called after the page loads and the course is full,
        hide the register button
        If this function is called after someone registers for it, hide the register button
        Otherwise keep the register button displayed.
    */
    if(isPageLoad){
        if(selectedCourse["seatstaken"] == selectedCourse["totalseats"]){
            $('input[value=Register]').css('display','none');
        }
    }
    else{
        $('input[value=Register]').css('display','none');
    }
    
}