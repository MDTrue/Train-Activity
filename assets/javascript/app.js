// console.log("hello")
//declaring the firebase variable
var database = firebase.database();

//using moment to add a clock to the web page
var currentTime = function () {
    var clock = moment().format("hh:mm")
    $("#clock").html(clock)
}
$(document).ready(function () {
    currentTime();
    setInterval(currentTime, 1000)
});

//adding trains to the list
$(document).on("click", ".submitButton", function (event) {
    event.preventDefault();

    //declaring variables

    var name = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var arrival = $("#timeInput").val().trim();

    //place holder variables for math
    //convert start time to one year ago to ensure it is before current time. 
    var startTimePast = moment(arrival, "hh:mm").subtract(1, "years");
    // console.log(startTimePast);
    // console.log(clock)
    var timeDifference = moment().diff(moment(startTimePast), "minutes");
    // console.log(timeDifference);
    var timeRemainder = timeDifference % frequency;
    // console.log(timeRemainder);
    var timeTillNext = frequency - timeRemainder;
    // console.log(timeTillNext)
    var nextTrain = moment().add(timeTillNext, "minutes").format("hh:mm");
    // console.log(nextTrain)

    //store variables in firebase

    database.ref().push({
        name: name,
        destination: destination,
        arrival: arrival,
        frequency: frequency,
        timeTillNext: timeTillNext,
        nextTrain: nextTrain,
    })
    // clear input boxes
    $("#nameInput").val("")
    $("#destinationInput").val("")
    $("#frequencyInput").val("")
    $("#timeInput").val("")


});

//load the train and all in firebase into the table
database.ref().on("child_added", function (childSnapshot) {

    // console.log("hello")
    // console.log(childSnapshot)

    var newRow = $("<tr>");
    var tableName = $("<td>" + childSnapshot.val().name + "</td>");
    var tableDestination = $("<td>" + childSnapshot.val().destination + "</td>");
    var tableFrequency = $("<td>" + childSnapshot.val().frequency +"</td>");
    var nextArrival = $("<td>" + childSnapshot.val().nextTrain + "</td>");
    var minsAway = $("<td>" + childSnapshot.val().timeTillNext + "</td>")

    //append each row separately, the variables just keep it neater and easier to edit
    newRow.append(tableName, tableDestination, tableFrequency,nextArrival,minsAway)
    $(".table").append(newRow)
})


