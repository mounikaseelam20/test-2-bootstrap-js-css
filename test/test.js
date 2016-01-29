$(document).ready(function() {
    /***************** modal for different dashboard********************/
    $('#viewdetail1').click(function() {
        $('#mydetails').html($('.details').eq(0).find('p').text());
    });
    $('#viewdetail2').click(function() {
        $('#mydetails').html($('.details').eq(1).find('p').text());
    });
    $('#viewdetail3').click(function() {
        $('#mydetails').html($('.details').eq(2).find('p').text());
    });
    $('#viewdetail4').click(function() {
        $('#mydetails').html($('.details').eq(3).find('p').text());
    });

    $('#createEmp').click(function() {
        $('#btnsave').show();
        $('#updateEmp').hide();
    });
    /* ***************************** ajax call to get data from json **********************/
    var O = $.ajax({
        url: 'test.json',
        type: 'GET',
        dataType: 'JSON'

    });
    O.success(function(data) {
        var pics = data;
        for (var i = 0; i < pics.pictures.length; i++) {
            $('#profile img').eq(i).attr("src", pics.pictures[i].path);
            $('#profile p').eq(i).html(pics.pictures[i].caption);

        }
        for (var j = 0; j < pics.icons.length; j++) {
            $('#tab1 b').eq(j).html(pics.icons[j].header);
            $('#tab1 img').eq(j).attr("src", pics.icons[j].icon);
            $('#tab1 p').eq(j).html(pics.icons[j].description);
        }
        for (var k = 0; k < pics.dashboard.length; k++) {
            $('#dashboard p').eq(k).html(pics.dashboard[k].content);
        }
    });
    /********************** to create employee *****************/
    $("#btnsave").click(function() {
        $("#mytable").append('<tr><td >' + $("#eSn").val() + '</td><td>' +
            $("#eName").val() + '</td><td>' + $("#eId").val() + '</td><td>' +
            $("#eAdd").val() +
            '</td><td><button type="button"id="editRow">Edit</button></td><td><button type="button" id="delRow">Delete</button></td><td><button type="button" id="viewRow" data-toggle="modal" data-target="#viewemployee">View</button></td><td><span id="eInfo" data-toggle="tooltip" data-placement="top" aria-hidden="true"><img src="https://cdn4.iconfinder.com/data/icons/sketchdock-ecommerce-icons/info-square-blue.png"></span></td></tr>');
    });
    /*************************** to delete row *************************/
    $("#mytable").on('click', '#delRow', function() {
        $(this).parent().parent().remove();
    });
    /************************* to edit the details *****************************/
    var cell1, cell2, cell3, cell4;
    $(document).on("click", "#editRow", function() {
        $('#myemployee').modal('show');
        $('#btnsave').hide();
        $('#updateEmp').show();
        var tr = $(this).closest('td').parent();
        td1 = tr.find('td').eq(0);
        td2 = tr.find('td').eq(1);
        td3 = tr.find('td').eq(2);
        td4 = tr.find('td').eq(3);
        $('#eSn').val(td1.text());
        $('#eName').val(td2.text());
        $('#eId').val(td3.text());
        $('#eAdd').val(td4.text());
    });
    $('#updateEmp').click(function() {
        td1.text($('#eSn').val());
        td2.text($('#eName').val());
        td3.text($('#eId').val());
        td4.text($('#eAdd').val());
        $('#myemployee').modal('hide');
    });
    /* *********************** to view the details *****************************/
    $(document).on("click", "#viewRow", function() {
            var row = $(this).closest('td').parent();
            $('#viewdetails').html('serail No : ' + row.find('td').eq(0).text() + '<br> Name : ' + row.find('td').eq(1).text() + '<br> Id : ' + row.find('td').eq(2).text() + '<br> Address : ' + row.find('td').eq(3).text());
        })
        /************************ to grt info using tooltip ***********************/
    $(document).on("mouseover", "#eInfo", function() {
        var tr = $(this).parent().parent();
        $(this).tooltip({
            title: 'S.no :' + tr.find('td').eq(0).text() + ', Name :' + tr.find('td').eq(1).text() + ', id :' + tr.find('td').eq(2).text() + ', Address :' + tr.find('td').eq(3).text(),
            placement: "top"
        });
    });
    /********************* for sorting the table **********************************/
    var f_sl = 1;
    $('#snBtn').click(function() {
        $('#snBtn span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        f_sl *= -1;
        var n = $(this).prevAll().length;
        sortTable(f_sl, n);
    });

    function sortTable(f, n) {
        var rows = $('#mytable tbody  tr').get();

        rows.sort(function(a, b) {

            var A = Number($(a).children('td').eq(n).text());

            var B = Number($(b).children('td').eq(n).text());

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        $.each(rows, function(index, row) {
            $('#mytable').children('tbody').append(row);
        });
    }
});
