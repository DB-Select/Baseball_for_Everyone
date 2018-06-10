function excelTest() {
    $.ajax({
        url: '/admin/tables/hitter',
        type: 'get',
        success: function (result) {
            result = result.result;
            console.log(result);
            var columns = [];
            var colHeaders = [];
            result['tableInfo'].forEach(function (element) {
                var column = {};
                colHeaders.push(element['Field']);
                if (element['Type'].startsWith('int')) {
                    column.type = 'int';
                } else if (element['Type'].startsWith('varchar')) {
                    column.type = 'text';
                }
                columns.push(column);
            });
            var data = [];
            result['tableRows'].forEach(function (element) {
                var row = [];
                colHeaders.forEach(function (field) {
                    row.push(element[field]);
                });
                data.push(row);
            });
            $('#table').jexcel({
                data: data,
                colHeaders: colHeaders,
                // colWidths: [300, 80, 100, 60, 120],
                columns: columns
            });
        },
        error: function (result) {
            console.log(result);
        }
    });
}

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
    excelTest();
});