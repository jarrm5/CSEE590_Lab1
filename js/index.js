$(document).ready(init);

function init(){
    //Populate the course filters
    load_options('#level-select',levels);
    load_options('#semester-select',semesters);
    load_options('#career-select',careers);

    //Display all courses when the page loads
    make_html("#result-template",courses["courses"]);
}
function load_options(tagName,names){
    /*
        Loads the <select> tag with <option> tags to filter the courses
        Called when page loads and when Reset button is clicked
        If Reset button is clicked, don't populate the <select> tags again
    */
    if($(tagName).children().length == 0){
        for(var i = 0; i < names.length; i++){
            var option = document.createElement("option");
            option.value = i.toString();
            option.innerHTML = names[i];
            $(tagName).append(option);
        }
    } 
}
function filter_courses(){
    //Save the filtering choices from the <select> tags
    var levelVal = $('#level-select option:selected').val();
    var semesterVal = $('#semester-select option:selected').val();
    var careerVal = $('#career-select option:selected').val();

    //Get all the courses that meet the user's <select> choices
    var filteredCourses = get_filtered_courses(levelVal,semesterVal,careerVal);

    //If no courses meet the user's choices, display no results.
    //else, show the list of filtered courses
    if(filteredCourses.length == 0){
        make_html("#no-result-template",null);
    }
    else{
        make_html("#result-template",filteredCourses);
    }
}
function make_html(template_id,data) {
    /*
        Generates dynamic HTML from a script template and a JSON object
        htmlMaker builds the HTML and places it in the destination tag
    */
    var template = $(template_id).html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $("#result-div").html(html);
}
function get_filtered_courses(levelVal,semesterVal,careerVal){
    /*
        Iterate over courses in the JSON object.
        If the course meets the criteria chosen in the <select> dropdowns,
        add the entry to a list
    */
    var courseList = courses["courses"];
    var selections = [];
    for(var i = 0; i < courseList.length ; i++){
        if(courseList[i]["levelVal"] === levelVal && courseList[i]["semesterVal"] === semesterVal && courseList[i]["careerVal"] === careerVal){
            var row = courseList[i];
            selections.push(row);   
        }
    }
    return selections;
}
function reset(){
    //reload the page to display all courses again
    init();
    //reset <select> dropdowns to default values
    $('#level-select').val('0');
    $('#semester-select').val('0');
    $('#career-select').val('0');
}
function navigate_to_register_page(id){
    //Pass the id of the clicked course as a queryString to the registration page
    window.location.href="../html/register.html?id=" + id;
}


