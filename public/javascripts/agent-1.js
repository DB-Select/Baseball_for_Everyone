function getHitter(teamID) {
    $.ajax({
        url: '/agent-1/team_hitter_record',
        type: 'get',
        data: {
            'teamID': teamID
        },
        success: function (json) {
            $('#team_hitter').DataTable({
                data: json.result,
                "columns": [{
                        "data": "NAME"
                    },
                    {
                        "data": "PA"
                    },
                    {
                        "data": "AB"
                    },
                    {
                        "data": "DOBLE"
                    },
                    {
                        "data": "TRIPLE"
                    },
                    {
                        "data": "SB"
                    },
                    {
                        "data": "CS"
                    },
                    {
                        "data": "SH"
                    },
                    {
                        "data": "SF"
                    },
                    {
                        "data": "SALARY"
                    },
                    {
                        "data": "AVG"
                    },
                    {
                        "data": null,
                        defaultContent: "<button onclick=''>Click!</button>"
                    }
                ]
            });
        }
    });
}

function getPitcher(teamID) {
    $.ajax({
        url: '/agent-1/team_pitcher_record',
        type: 'get',
        data: {
            'teamID': teamID
        },
        success: function (json) {
            $('#team_pitcher').DataTable({
                data: json.result,
                "columns": [{
                        "data": "NAME"
                    },
                    {
                        "data": "WIN"
                    },
                    {
                        "data": "LOSE"
                    },
                    {
                        "data": "SAVE"
                    },
                    {
                        "data": "HOLD"
                    },
                    {
                        "data": "ER"
                    },
                    {
                        "data": "IP"
                    },
                    {
                        "data": "CG"
                    },
                    {
                        "data": "H"
                    },
                    {
                        "data": "NP"
                    },
                    {
                        "data": "ERA"
                    },
                    {
                        "data": "DOBLE"
                    },
                    {
                        "data": "TRIPLE"
                    },
                    {
                        "data": "G"
                    },
                    {
                        "data": "SALARY"
                    },
                    {
                        "data": null,
                        defaultContent: "<button onclick=''>Click!</button>"
                    }
                ]
            });
        }
    });
}

$(function () {
    var teamID = getUrlVars()['teamID'];
    getPitcher(teamID);
    getHitter(teamID);

    selectableFunctionCallback.push(getPitcher);
    selectableFunctionCallback.push(getHitter);
});