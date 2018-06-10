function getTable() {
    $.ajax({
        url: '/player-1/tables/' + $("#tables").val(),
        type: 'get',
        success: function (result) {
            result = result.result;
            console.log(result);
            var columns = [];
            var colHeaders = [];
            result['tableInfo'].forEach(function (element) {
                var column = {};
                colHeaders.push(element['Field']);
                // text, numeric, hidden, dropdown, autocomplete, checkbox, calendar
                if (element['Type'].startsWith('int')) {
                    column.type = 'numeric';
                } else if (element['Type'].startsWith('float')) {
                    column.type = 'numeric';
                } else if (element['Type'].startsWith('tinyint')) {
                    column.type = 'checkbox';
                } else if (element['Type'].startsWith('enum')) { //"enum('W','L','S','H')"
                // { type: 'dropdown', source:[ {'id':'1', 'name':'Fruits'}, {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'}, ] },
                    column.type = 'dropdown';
                    column.source = [];
                    if (element['Null'] == 'YES') {
                        column.source.push('');
                    }
                    var enumVal = element['Type'];
                    enumVal = enumVal.split('(').pop();
                    enumVal = enumVal.split(')')[0];
                    enumVal = enumVal.split(',');
                    for (var i = 0; i < enumVal.length; i++) {
                        // column.source.push({id:i, name:enumVal[i].slice(1, enumVal[i].length-1)});
                        column.source.push(enumVal[i].slice(1, enumVal[i].length-1));
                    }
                } else if (element['Type'].startsWith('date')) {
                    column.type = 'calendar';
                    column.options = {
                        format: 'DD/MM/YYYY'
                    };
                } else { //if (element['Type'].startsWith('varchar')) {
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
            // data.splice(100, data.length - 100);
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
        url: '/player-1/tables',
        type: 'get',
        success: function (row) {
            row.result.forEach(element => {
                $('<option/>')
                    .html(element['Tables_in_baseball'])
                    .appendTo($("#tables"));
            });
            getTable();
            $("#tables").change(function () {
                getTable();
                // console.log($(this).val());
            })
        }
    });
});