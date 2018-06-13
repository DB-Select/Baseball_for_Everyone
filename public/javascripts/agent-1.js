var teamID = getUrlVars()['teamID'];

function moveToDetail(detailBtn) {
    var is_pitcher = false;
    if ($(detailBtn).parent().parent().parent().parent().attr('id') == "team_pitcher")
        is_pitcher = 'true';

    location.href = '/agent-2?isPitcher=' + is_pitcher + '&teamID=' + teamID + '&playerID=' +
        $(detailBtn).parent().parent().data().value;
    // if (is_pitcher == true) {
    //     location.href = '/agent-2?isPitcher=true&teamID=' + teamID + '&playerID=' +
    //         $(detailBtn).parent().parent().data().value;
    // } else {
    //     location.href = '/agent-2-1?isPitcher=false&teamID=' + teamID + '&playerID=' +
    //         $(detailBtn).parent().parent().data().value;
    // }
}

$(function() {
    $.ajax({
        url: '/agent-1/team_pitcher_record',
        type: 'get',
        data: {
            'teamID': teamID
        },
        success: function(json) {
            $('#team_pitcher').DataTable({
                createdRow: function(row, data, dataIndex) {
                    $(row).attr('data-value', data.pid);
                },
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
                        defaultContent: "<button onclick='moveToDetail(this)'>Click!</button>"
                    }
                ]
            });
        }
    })

    $.ajax({
        url: '/agent-1/team_hitter_record',
        type: 'get',
        data: {
            'teamID': teamID
        },
        success: function(json) {
            $('#team_hitter').DataTable({
                createdRow: function(row, data, dataIndex) {
                    $(row).attr('data-value', data.pid);
                },
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
                        "data": "AVG"
                    },
                    {
                        "data": "SALARY"
                    },
                    {
                        "data": null,
                        defaultContent: "<button onclick='moveToDetail(this)'>Click!</button>"
                    }
                ]
            });
        }
    })
});