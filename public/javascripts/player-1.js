var team_id = 1041;

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
                { "data": "AVG" }
            ]
        });
    }
});
$(function () {
    $("#detail").click(function (element) {
        if ($('#team .ui-selected').first().data()) {
            location.href
             = $(element.currentTarget).find('img').attr('src').split('.')[0].split('/').pop()
             +"player-2?teamID="+$('#team .ui-selected').first().data().value;
             // http://localhost:3000/crowd-1?teamID=1046
             // 'agent-1?teamID='+teamID;
        } else {
            alert('팀을 선택해 주세요.');
        }
    });
});