var game_id = 252134;//getUrlVars()['gameID'];
$.ajax({
    url: '/crowd-2/game_record',
    type: 'get',
    data: {'game_id':game_id},
    success: function (row) {
    var element = row.result[0];
    
    var li1 = $('<li/>')
    .attr('data-value', element['HOME_ID'])
    .appendTo($("#result"));

    $('<img/>')
    .attr('width', 200)
    .attr('height', 200)
    .attr('src', 'images/team_logo/' + element['HOME_ID'] + '.png')
    .appendTo(li1);

    var li2 = $('<li/>')
    .attr('data-value', element['HOME_S'])
    .appendTo($("#result"));

    $('<H1/>')
    .html(element['HOME_S'])
    .appendTo(li2);

    var li3 = $('<li/>')
    .appendTo($("#result"));
    
    $('<H3/>')
    .html("VS")
    .appendTo(li3);

    var li4 = $('<li/>')
    .attr('data-value', element['AWAY_S'])
    .appendTo($("#result"));

    $('<H1/>')
    .html(element['AWAY_S'])
    .appendTo(li4);

    var li5 = $('<li/>')
    .attr('data-value', element['AWAY_ID'])
    .appendTo($("#result"));

    $('<img/>')
    .attr('width', 200)
    .attr('height', 200)
    .attr('src', 'images/team_logo/' + element['AWAY_ID'] + '.png')
    .appendTo(li5);
    }
});

$.ajax({
    url: '/crowd-2/home_pitcher_record',
    type: 'get',
    data: {'game_id':game_id},
    success: function (row) {
        
        $('#home_pitcher').dataTable({
            data : row,
            columns : [{'data': 'name'},
            {'data': 'WIN_LOSE_SAVE'},
            {'data': 'INNING_PITCHED'},
            {'data': 'BATS'},
            {'data': 'EARNED_HIT'},
            {'data': 'EARNED_RUN'},
            {'data': 'ALLOWED_RUN'},
            {'data': 'WALK'},
            {'data': 'STRIKE_OUT'},
            {'data': 'EARNED_HOME_RUN'},
            {'data': 'EARNED_RUN_AVERAGE'}]
        });
    }
});

$(function () {
    
});


