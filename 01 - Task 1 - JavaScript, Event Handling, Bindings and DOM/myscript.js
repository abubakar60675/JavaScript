$(function() {

    console.log("Script loaded");
    loadList();
    $("#tbodyData").on("click", "#removeLink", handleDelete);
    $("#tbodyData").on("click", "#updateLink", handleUpdate);
    $("#addBtn").click(handleAdd);
    $("#updateBtn").click(sendAjaxUpdate);
    $("#resetBtn").click(function() {
        location.reload();
    });
});

function sendAjaxUpdate() {
    console.log("Send ajax PUT request");
    var name = $("#newName").val();
    var gender = $("#newMale").is(":checked");
    var radio;
    if (radio == "Male") {
        radio == true;
    } else {
        radio == false;
    }
    var age = $("#newAge").val();
    var city = $("#newCity").val();
    var id = $("#hiddenId").html();
    console.log(id);

    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        method: "PUT",
        data: { name, gender, age, city },
        success: function() {
            $("#newName").val("");
            $(".radioBtn").prop('checked', false);
            $("#newAge").val("");
            $("#newCity").val("");
            $("#hiddenId").html("");
            $("#updateBtn").hide();

            loadList();
        },
    });
}

function handleUpdate() {
    var btn = $(this);
    var id = btn.attr("data-id");

    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        method: "GET",
        success: function(response) {
            console.log(response);
            $("#newName").val(response.name);
            $("#newMale").prop("checked", response.gender);
            $("#newFemale").prop("checked", !response.gender);
            $("#newAge").val(response.age);
            $("#newCity").val(response.city);
            $("#hiddenId").append(response._id);
            $("#updateBtn").show();
            $("#addBtn").hide();
        },
    });
}

function handleAdd() {
    console.log("addBtn");
    var name = $("#newName").val();

    var gender = $("#newMale").is(":checked");
    var radio;
    if (radio == "Male") {
        radio == true;
    } else {
        radio == false;
    }
    var age = $("#newAge").val();
    var city = $("#newCity").val();

    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person",
        method: "POST",
        data: { name, gender, age, city },
        success: function() {
            $("#newName").val("");
            $(".radioBtn").prop('checked', false);
            $("#newAge").val("");
            $("#newCity").val("");
            loadList();
        },
        error: handleError,
    });
}

function handleDelete() {
    var btn = $(this);
    var id = btn.attr("data-id");
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        method: "DELETE",
        success: loadList,
    });
}

function loadList() {
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person",
        method: "GET",
        success: getRequestData,
        error: handleError,
    });
}

function handleError() {
    $("#tbodyData").empty();
    $("#tbodyData").html("Error on Server");
}

function getRequestData(response) {
    $("#tbodyData").empty();
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        $("#tbodyData").append(
            `<tr>
            <td>${response[i].name}</td>
            <td>${response[i].gender ? "Male" : "Female"}</td>
            <td>${response[i].age}</td>
            <td>${response[i].city}</td>
            <td><a href="#" id="updateLink" data-id=${response[i]._id}>Update</a> / <a href="#" id="removeLink" data-id=${response[i]._id}>Remove</a></td>
            </tr>`


        );
    }
}