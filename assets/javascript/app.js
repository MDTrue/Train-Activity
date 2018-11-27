// console.log("hello")

var database = firebase.database();

$(document).on("click","submitButton", function(event){
    event.preventDefault();

    //declaring variables

    var name = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = $("#timeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    //store variables in firebase

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency:frequency,
    });
    
    database.ref().on("child_added",function(childSnapshot){
        
        console.log("hello")

        console.log(childSnapshot)

        var newRow = $("<tr>");
        var tableName = $("<td>" + childSnapshot.val().name + "</td>");
        var tableDestination = $("<td>" + childSnapshot.val().destination + "</td>");
        var tableTime = $("<td>" + childSnapshot.val().time + "</td>");
        var tableFrequency = $("<td>" + childSnapshot.val().frequency + "</td>");

        newRow.append(tableName,tableDestination,tableTime,tableFrequency)
        $(".table").append(newRow)
   })
})

