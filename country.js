var countryDetail = "https://restcountries.eu/rest/v2/name/"


$('.btn').on('click',function () {
    function emptyTable() {
        $('tbody').empty(); 
    }
    $(document).ajaxStart(function(){
        $('.btn').attr("disabled",true);
        $('.btn').css('background-color','red');
        $('#spinner').show();
        emptyTable();
    });
    $(document).ajaxStop(function(){
        $('.btn').attr("disabled",false);
        $('.btn').css('background-color','green');
        $('#spinner').hide();
        // emptyTable();
    })
    emptyTable();
    var search = $("#name").val().toLowerCase();
    $.ajax({
        url: countryDetail + search,
        type: "GET",
        Datatype:"json",
        error:function(e){
            if (e.status == 404) {
                $('#error').show() 
            }
        },
        success: function (result) {
            // var count = document.getElementById('counter');
            // var counter = 0;
           
            $('#error').hide()
            // console.log(result);
            // console.log(result[0]["flag"]);
            if (result.length != 0) {
                for (var i = 0; i < result.length; ++i) {
                    if (result[i].name.toLowerCase().substring(0, search.length) == search) {
                        addRow(result[i].name, result[i].flag, result[i].alpha2Code, result[i].population);
                        // counter ++;
                        var rows = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                        document.getElementById('counter').value = "RESULTS: "+rows;
                    }
                }
            }
        }
    })
})