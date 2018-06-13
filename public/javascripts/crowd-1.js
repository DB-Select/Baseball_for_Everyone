function moveToDetail(detailBtn) {
    var isHome = 'false';
    if ($('#team .ui-selected').first().data().value == $(detailBtn).parent().parent().data().home)
        isHome = 'true';

    location.href = '/crowd-2?gameID=' + $(detailBtn).parent().parent().data().value +
        '&homeID=' + $(detailBtn).parent().parent().data().home + '&awayID=' + $(detailBtn).parent().parent().data().away +
        '&amIHome=' + isHome;

}

var relativeRecordTable;

function getVersus(_teamID, _oppID) {
    $.ajax({
        url: '/crowd-1/versus_this_team',
        type: 'get',
        data: {
            'teamID': _teamID,
            'oppID': _oppID
        },
        success: function (json) {
            if (relativeRecordTable && relativeRecordTable.destroy)
                relativeRecordTable.destroy();
            relativeRecordTable = $('#relative-record').DataTable({
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-value', data.gameID);
                    $(row).attr('data-home', data.homeID);
                    $(row).attr('data-away', data.awayID);
                },
                data: json.result,
                "columns": [{
                    "data": "DATE"
                },
                {
                    "data": "HOME_TEAM"
                },
                {
                    "data": "HOME_S"
                },
                {
                    "data": null,
                    "defaultContent": 'vs'
                },
                {
                    "data": "AWAY_S"
                },
                {
                    "data": "AWAY_TEAM"
                },
                {
                    "data": null,
                    defaultContent: "<button onclick='moveToDetail(this);'>Click!</button>"
                }
                ]
            });
        }
    });
}


var recentRecordTable;
function getRecentRecord(teamID) {
    $.ajax({
        url: '/crowd-1/recent_record',
        type: 'get',
        data: {
            'teamID': teamID
        },
        success: function (json) {
            if (recentRecordTable && recentRecordTable.destroy)
                recentRecordTable.destroy();
            recentRecordTable = $('#recent-record').DataTable({
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-value', data.gameID);
                    $(row).attr('data-home', data.homeID);
                    $(row).attr('data-away', data.awayID);
                },
                data: json.result,
                "columns": [{
                    "data": "GADATE"
                },
                {
                    "data": "HOME"
                },
                {
                    "data": "HOME_S"
                },
                {
                    "data": null,
                    "defaultContent": 'vs'
                },
                {
                    "data": "AWAY_S"
                },
                {
                    "data": "AWAY"
                },
                {
                    "data": null,
                    defaultContent: "<button onclick='moveToDetail(this);'>Click!</button>"
                }
                ]
            });
        }
    });
}

function changeTeam(_teamID) {
    getVersus(_teamID, $("#oppSelect1").find("option:selected").data().value);
    getRecentRecord(_teamID);
}

$(function () {
    getRecentRecord(getUrlVars()['teamID']);
    selectableFunctionCallback.push(changeTeam);

    $.ajax({
        url: '/select-team',
        type: 'get',
        success: function (row) {
            row.forEach(element => {
                console.log(element);
                $('<option/>')
                    .attr('data-value', element['id'])
                    .html(element['name'])
                    .appendTo($("#oppSelect1"));
            });
            getVersus(getUrlVars()['teamID'], row[0]['id']);
        }
    });

    //팀이 변경 되었을때
    $("#oppSelect1").change(function (element) {
        getVersus($('#team .ui-selected').first().data().value, $(this).find("option:selected").data().value);
    });

    // $(".ui-selectee").click(function(element) {

    // });
    // $("#check").click(function (element) {
    //     getVersus(teamID, oppID);
    // });

});