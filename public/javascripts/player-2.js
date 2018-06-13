var team_id = getUrlVars()['teamID'];
var player_id = getUrlVars()['playerID'];
var is_Pitcher = getUrlVars()['isPitcher'];
$(function() {
    var s_headerList1 = [];
    var r_headerList1 = [];
    if (is_Pitcher == "true") {
        // for this season
        s_headerList = [
            { "data": "ID" },
            { "data": "NAME" },
            { "data": "G" },
            { "data": "WIN" },
            { "data": "LOSE" },
            { "data": "SAVE" },
            { "data": "HOLD" },
            { "data": "ER" },
            { "data": "IP" },
            { "data": "H" },
            { "data": "ERA" }
        ];

        $.ajax({
            url: '/player-2/season_pitches',
            type: 'get',
            data: {
                'team_id': team_id,
                'player_id': player_id,
                'is_Pitcher': is_Pitcher
            },
            success: function(json) {
                console.log(json);
                $('#seasonResult').DataTable({
                    data: json.result,
                    "columns": s_headerList
                });


            }
        });


        //for recent
        r_headerList = [
            { "data": "name" },
            { "data": "WIN_LOSE_SAVE" },
            { "data": "INNING_PITCHED" },
            { "data": "BATS" },
            { "data": "EARNED_HIT" },
            { "data": "ALLOWED_RUN" },
            { "data": "EARNED_RUN" },
            { "data": "EARNED_HOME_RUN" },
            { "data": "WALK" },
            { "data": "STRIKE_OUT" },
            { "data": "ERA" }
        ];

        $.ajax({
            url: '/player-2/recent_pitches',
            type: 'get',
            data: {
                'team_id': team_id,
                'player_id': player_id,
                'is_Pitcher': is_Pitcher
            },
            success: function(json) {
                console.log(json);
                $('#recentResult').DataTable({
                    data: json.result,
                    "columns": r_headerList
                });
            }
        });
        s_headerList.forEach(function(param) {
            $('<th/>').html(param.data).appendTo($("#seasonResult").find("tr"));
        });
        r_headerList.forEach(function(param) {
            $('<th/>').html(param.data).appendTo($("#recentResult").find("tr"));
        });
    } else {
        // request hitter info

        s_headerList = [
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
        ];

        $.ajax({
            url: '/player-2/season_hits',
            type: 'get',
            data: {
                'team_id': team_id,
                'player_id': player_id,
                'is_Pitcher': is_Pitcher
            },
            success: function(json) {
                console.log(json);
                $('#seasonResult').DataTable({
                    data: json.result,
                    "columns": s_headerList
                });
            }
        });

        r_headerList = [
            { "data": "name" },

            { "data": "AT_BAT" },


            { "data": "HIT" },
            { "data": "HOME_RUN" },

            { "data": "RUN_SCORE" },
            { "data": "STRIKE_OUT" },
            { "data": "WALK" },
            { "data": "RUN_BATTED_IN" },
            { "data": "HIT_BY_PITCHING" },
            { "data": "BATTING_AVERAGE" }
        ];

        $.ajax({
            url: '/player-2/recent_hits',
            type: 'get',
            data: {
                'team_id': team_id,
                'player_id': player_id,
                'is_Pitcher': is_Pitcher
            },
            success: function(json) {
                console.log(json);
                $('#recentResult').DataTable({
                    data: json.result,
                    "columns": r_headerList
                });


            }
        });
        s_headerList.forEach(function(param) {
            $('<th/>').html(param.data).appendTo($("#seasonResult").find("tr"));
        });
        r_headerList.forEach(function(param) {
            $('<th/>').html(param.data).appendTo($("#recentResult").find("tr"));
        });
    }

    $(".col-sm-3").click(function(element) {
        location.href = "/player-1?teamID=" + team_id;
    });
});

$(function() {
    $("#bbbutton").click(function() {
        location.href = '/player-1?teamID=' + team_id;
    });
});