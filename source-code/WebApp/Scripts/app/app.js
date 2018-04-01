function getBase64FromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

//var file = document.querySelector('#files > input[type="file"]').files[0];
//getBase64FromFile(values.profile_image_new[0]).then(
//    data => console.log(data)
//);

//I have solved this issue...I converted base64 string to Blob then get the url using URL.createObjectURL()
//then open a new window the set the blob's url as the window's url.
function convBase64ToFile(strBase64) {
    debugger;
    var tmp = strBase64.split(",");
    var prefix = tmp[0];
    var contentType = prefix.split(/[:;]+/)[1];
    var byteCharacters = atob(tmp[1]);

    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: contentType });
    var blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
    //window.open(blobUrl, "popup", "width=1000,height=500,scrollbars=1,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0");
};

function convBase64ToFileDetails(strBase64) {
    var tmp = strBase64.split(",");
    var prefix = tmp[0];
    var contentType = prefix.split(/[:;]+/)[1];
    var byteCharacters = atob(tmp[1]);

    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return {
        contentType: contentType,
        byteCharacters: byteCharacters
    };
};

$(document).ready(function () {

    console.log("Ready!");

    document.getElementById('button').addEventListener('click', function () {

        var files = document.getElementById('file').files;
        if (files.length > 0) {

            //getBase64FromFile(files[0]).then(
            //    //data => console.log(data)
            //    data => convBase64ToFile(data)
            //);
            getBase64FromFile(files[0]).then(
                function (response) {

                    console.log(response.length);
                    var file = convBase64ToFileDetails(response);
                    debugger;

                    $.ajax({
                        url: '../home/PostBase64',
                        type: 'POST',
                        timeout: 50000,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({
                            file: file
                        }),
                        success: function (data) {
                            alert('success');
                        },
                        error: function (result) {
                            alert(result.status + ': ' + result.statusText);
                        },
                        complete: function (result) {
                            console.log(result.status + ': ' + result.statusText);
                        }
                    });
                });
        }
    });
});