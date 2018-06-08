$(function () {
    $.ajax({
        url: '/admin/tables',
        type: 'get',
        success: function (row) {
            row.result.forEach(element => {
                $('<option/>')
                    .html(element['Tables_in_baseball'])
                    .appendTo($("#tables"));
            });

            $("#tables").change(function () {
                console.log($(this).val());
            })
        }
    });
});