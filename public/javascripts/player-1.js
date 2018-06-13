function setPitcherTeamOption(teamID) {
    $.ajax({
        url: "/player-1/pitcher_list",
        type: 'get',
        data: { 'team_id': teamID },
        success: function (json) {
            //팀에 속한 pitcher_list 옵션에 넣기
            $("#inputGroupSelect05").html('');
            for (let index = 0; index < json.result.length; index++) {
                const record = json.result[index];
                $('<option/>')
                    .attr('data-value', record.PLAYER_ID)
                    .html(record.NAME)
                    .appendTo($("#inputGroupSelect05"));
            }
            setPitHitPitcherTable(json.result[0]['PLAYER_ID']);
        }
    });
}

//팀아이디와 pitcher_id로 정보 출력하기
var pithitPitcherTable;
function setPitHitPitcherTable(playerID) {
    $.ajax({
        url: "/player-1/pitcher",
        type: 'get',
        data: { 'player_id': playerID },
        success: function (json) {
            if (pithitPitcherTable && pithitPitcherTable.destroy)
                pithitPitcherTable.destroy();
            pithitPitcherTable = $('#resultInfo').DataTable({
                searching: false,
                paging: false,
                data: json.result,
                "columns": [
                    { "data": "NAME" },
                    { "data": "WIN" },
                    { "data": "LOSE" },
                    { "data": "SAVE" },
                    { "data": "HOLD" },
                    { "data": "ER" },
                    { "data": "IP" },
                    { "data": "CG" },
                    { "data": "H" },
                    { "data": "NP" },
                    { "data": "ERA" },
                    { "data": "DOBLE" },
                    { "data": "TRIPLE" },
                    { "data": "G" },
                    { "data": "SALARY" }
                ]
            });
        }
    });
}


$(function () {
    var team_id = getUrlVars()['teamID'];
    $.ajax({
        url: "/player-1/pitcher_list",
        type: 'get',
        data: { 'team_id': team_id },
        success: function (json) {
            $('#pit_li').DataTable({
                data: json.result,
                "columns": [
                    { "data": "NAME" },
                    { "data": "WIN" },
                    { "data": "LOSE" },
                    { "data": "SAVE" },
                    { "data": "HOLD" },
                    { "data": "ER" },
                    { "data": "IP" },
                    { "data": "CG" },
                    { "data": "H" },
                    { "data": "NP" },
                    { "data": "ERA" },
                    { "data": "DOBLE" },
                    { "data": "TRIPLE" },
                    { "data": "G" },
                    { "data": "SALARY" },
                    { "data": null,
                defaultContent:"<button onclick=''>Click!</button>"}
                ]
            });
        }
    });

    $.ajax({
        url: "/player-1/hitter_list",
        type: 'get',
        data: { 'team_id': team_id },
        success: function (json) {
            $('#hit_li').DataTable({
                data: json.result,
                "columns": [
                    { "data": "NAME" },
                    { "data": "PA" },
                    { "data": "AB" },
                    { "data": "DOBLE" },
                    { "data": "TRIPLE" },
                    { "data": "SB" },
                    { "data": "CS" },
                    { "data": "SH" },
                    { "data": "SF" },
                    { "data": "SALARY" },
                    { "data": "AVG" },
                    { "data": null,
                defaultContent:"<button onclick=''>Click!</button>"}
                ]
            });
        }
    });

    //팀이 변경 되었을때
    $("#inputGroupSelect04").change(function (element) {
        setPitcherTeamOption($(this).find("option:selected").data().value);
    });

    $("#inputGroupSelect05").change(function (element) {
        setPitHitPitcherTable($(this).find("option:selected").data().value);
    });

    //확인 버튼
    $("#check").click(function (element) {
        $.ajax({
            url: "/player-1/pitcher_list",
            type: 'get',
            data: { 'team_id': team_id },
            success: function (json) {
                $('#pit_li').DataTable({
                    data: json.result,
                    "columns": [
                        { "data": "NAME" },
                        { "data": "WIN" },
                        { "data": "LOSE" },
                        { "data": "SAVE" },
                        { "data": "HOLD" },
                        { "data": "ER" },
                        { "data": "IP" },
                        { "data": "CG" },
                        { "data": "H" },
                        { "data": "NP" },
                        { "data": "ERA" },
                        { "data": "DOBLE" },
                        { "data": "TRIPLE" },
                        { "data": "G" },
                        { "data": "SALARY" }
                    ]
                });
            }
        });
    });


    $(".col-sm-4").click(function (element) {
        if ($('#team .ui-selected').first().data()) {
            document.location.href
                = $(element.currentTarget).find('img').attr('src').split('.')[0].split('/').pop()
                + "-1?teamID=" + $('#team .ui-selected').first().data().value;
            // http://localhost:3000/crowd-1?teamID=1046
            // 'agent-1?teamID='+teamID;
        } else {
            alert('팀을 선택해 주세요.');
        }
    });

    $.ajax({
        url: '/select-team',
        type: 'get',
        success: function (row) {
            row.forEach(element => {
                $('<option/>')
                    .attr('data-value', element['id'])
                    .html(element['name'])
                    .appendTo($("#inputGroupSelect04"));
            });
            setPitcherTeamOption(row[0]['id']);
        }
    });
});

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
