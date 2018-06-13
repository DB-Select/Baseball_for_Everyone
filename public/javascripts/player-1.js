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

function moveToDetail(params) {
    // isPitcher / playerID / teamID
    location.href = 'player-2?playerID=' + $(params).parent().parent().data().value
        + '&isPitcher=' + $('#pitcher_box').is(':visible') + '&teamID=' + $("#inputGroupSelect04").find("option:selected").data().value;
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


var pithitHitterTable;
function setPitHitHitterTable(playerID) {
    $.ajax({
        url: "/player-1/pithit",
        type: 'get',
        data: { 'player_id': playerID },
        success: function (json) {
            if (pithitHitterTable && pithitHitterTable.destroy)
            pithitHitterTable.destroy();
            pithitHitterTable = $('#resultInfo').DataTable({
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
    $("#pitcher").click(function () {
        $("#pitcher_box").show();
        $("#pithit_box").hide();
        $("#hitter_box").hide();
    });
    $("#hitter").click(function () {
        $("#pitcher_box").hide();
        $("#pithit_box").hide();
        $("#hitter_box").show();
    });
    $("#hitversepit").click(function () {
        $("#pitcher_box").hide();
        $("#pithit_box").show();
        $("#hitter_box").hide();
    });

    var team_id = getUrlVars()['teamID'];
    $.ajax({
        url: "/player-1/pitcher_list",
        type: 'get',
        data: { 'team_id': team_id },
        success: function (json) {
            $('#pit_li').DataTable({
                data: json.result,
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-value', data.PLAYER_ID);
                },
                columns: [
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
                    { "data": null }
                ],
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button onclick='moveToDetail(this)'>Click!</button>"
                }]
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
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-value', data.player_id);
                },
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
                    { "data": null }
                ],
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button onclick='moveToDetail(this)'>Click!</button>"
                }]
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