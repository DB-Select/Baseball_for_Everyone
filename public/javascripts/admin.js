var current_state;
function getTable() {
    current_state=$("#table").val();
    $.ajax({
        url: '/admin/tables/' + $("#tables").val(),
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
                onchange: changeCell,
                onselection: selectionActive,
                // colWidths: [300, 80, 100, 60, 120],
                columns: columns
            });
        },
        error: function (result) {
            console.log(result);
        }
    });
}

var input =[];
var deleted_cell;
var changed_cell = [];
var isChanged;


var setButtonEvent = function(){
    if(isChanged == true) {
        update();
    }
    else {
        insert();
    }
}

var changeCell = function(instance, cell, value) {
    isChanged = true;
    var columnCode = $(instance).jexcel('getColumnNameFromId', $(cell).prop('id')).substr(0,1).charCodeAt(0) - 65;
    var rowCode = $(instance).jexcel('getColumnNameFromId', $(cell).prop('id'));
    rowCode = rowCode.substr(1, rowCode.length-1) - 1;
    var cellName = $(instance).jexcel('getHeader', columnCode);
    var rowData =  $(instance).jexcel('getRowData', rowCode);

    console.log({
        player_id: rowData[0],
        cellName: cellName,
        value: value
    });
    changed_cell=
        {player_id: rowData[0],
        cellName: cellName,
        value: value}
}

var selectionActive = function(instance, firstColumn, lastColumn) {
    var cellName1 = $(instance).jexcel('getData', $(firstColumn).prop('id'));
    console.log(cellName1[0][0]);
    deleted_cell = cellName1[0][0];
}

var deleteHitter = function() {
    var inputData = {
        hitter_id: deleted_cell
    }
    console.log(inputData)
    console.log('aa')
    $.ajax({
        url: '/admin/tables/' + $("#tables").val(),
        type: 'DELETE',
        data: inputData,
        success: function (result) {
            console.log(inputData);      
        },
        error: function (err) {
            console.log(err);
        }
    });
}

var update = function(){
    var inputData = changed_cell;
    /*
    changeData : [
        {"player_id":5,"cellName":'doble,val},
        {"player_id":5,"cellName":'doble,val},
    ]
    */
    $.ajax({
        url: '/admin/tables/' + $("#tables").val(),
        type: 'PUT',
        dataType:"json",
        data: inputData,
        success: function (result) {
            console.log(inputData);
            console.log('aaaa');
            console.log(input[1]);
            
        },
        error: function (result) {
            console.log(result);
        }
    });
}

var insert = function(){
    input=$('#table').jexcel('getRowData', -1);

    inputData = {
        NAME: input[1],
        TEAM_ID: input[2],
        PLATE_APPEARANCE: input[3],
        AT_BAT: input[4],
        DOBLE: input[5],
        TRIPLE: input[6],
        STOLEN_BASE: input[7],
        CAUGHT_STEALING: input[8],
        SACRIFICE_HIT: input[9],
        SACRIFICE_FLY: input[10],
        SALARY: input[11]
    };
    
    console.log('aa')
    $.ajax({
        url: '/admin/tables/' + $("#tables").val(),
        type: 'post',
        data: inputData,
        success: function (result) {
            console.log(inputData);
            console.log('aaaa');
            console.log(input[1]);
            
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
                if(element['Tables_in_baseball']=='hitter'){
                    $('<option/>')
                    .html(element['Tables_in_baseball'])
                    .prop("selected",true)
                    .appendTo($("#tables"));
                }else{
                    $('<option/>')
                    .html(element['Tables_in_baseball'])
                    .appendTo($("#tables"));
                }
               
            });
            getTable();
            $("#tables").change(function () {
                getTable();
                // console.log($(this).val());
            })
        }
    });
});