var is_pitcher = getUrlVars()["isPitcher"];
var player_id = getUrlVars()['playerID'];
var team_id = getUrlVars()['teamID'];



$(function() {
    var headerList = [];
    if (is_pitcher == 'true') {
        headerList = [
            { "data": "NAME" },
            { "data": "G" },
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
            { "data": "HR" },
            { "data": "SALARY" }
        ];

        $.ajax({
            url: "/agent-2/pitcher_salary_list",
            type: 'get',
            data: { 'player_id': player_id },
            success: function(json) {
                $('#tableResult').DataTable({
                    data: json.result,
                    "columns": headerList
                });
            }
        });
    } else {

        headerList = [
            { "data": "NAME" },
            { "data": "PLATE_APPEARANCE" },
            { "data": "AT_BAT" },
            { "data": "doble" },
            { "data": "TRIPLE" },
            { "data": "STOLEN_BASE" },
            { "data": "SACRIFICE_HIT" },
            { "data": "SACRIFICE_FLY" },
            { "data": "H" },
            { "data": "HR" },
            { "data": "RBI" },
            { "data": "R" },
            { "data": "SO" },
            { "data": "WK" },
            { "data": "SALARY" }
        ];

        $.ajax({
            url: "/agent-2/hitter_salary_list",
            type: 'get',
            data: { 'player_id': player_id },
            success: function(json) {
                $('#tableResult').DataTable({
                    data: json.result,
                    "columns": headerList
                });
            }
        });
    }
    headerList.forEach(function(param) {
        $('<th/>').html(param.data).appendTo($("#tableResult").find("tr"));
    });
    $(".col-sm-3").click(function(element) {
        location.href = "agent-1?teamID=" + team_id;
    });
});