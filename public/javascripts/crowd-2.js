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
    .html('\n')
    .html(element['HOME_S'])
    .appendTo(li2);

    var li3 = $('<li/>')
    .appendTo($("#result"));
    
    $('<H3/>')
    .html('\n')
    .html("VS")
    .appendTo(li3);

    var li4 = $('<li/>')
    .attr('data-value', element['AWAY_S'])
    .appendTo($("#result"));
   
    $('<H1/>')
    .html('\n')
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
        // adding header
        var header = $('<thead/>')
        .appendTo($("#home_pitcher"));

        var head_record = $('<tr/>')
        .appendTo(header);

        $('<th/>')
        .html('NM')
        .appendTo(head_record);
        $('<th/>')
        .html('WLS')
        .appendTo(head_record);        
        $('<th/>')
        .html('IP')
        .appendTo(head_record);
        $('<th/>')
        .html('B')
        .appendTo(head_record);
        $('<th/>')
        .html('EH')
        .appendTo(head_record);
        $('<th/>')
        .html('ER')
        .appendTo(head_record);
        $('<th/>')
        .html('AR')
        .appendTo(head_record);
        $('<th/>')
        .html('W')
        .appendTo(head_record);
        $('<th/>')
        .html('SO')
        .appendTo(head_record);
        $('<th/>')
        .html('EHR')
        .appendTo(head_record);
        $('<th/>')
        .html('ERA')
        .appendTo(head_record);
        // end of adding header
        
        var body = $('<tbody/>')
        .appendTo($("#home_pitcher"));     

        row.result.forEach(function(temp) {
            var body_record = $('<tr/>')
            .appendTo(body);            
            $.each(temp, function (i, item){
            $('<td/>')
            .html(item)
            .appendTo(body_record);
            });
        });
    }
});

$.ajax({
    url: '/crowd-2/away_pitcher_record',
    type: 'get',
    data: {'game_id':game_id},
    success: function (row) { 
        // adding header
        var header = $('<thead/>')
        .appendTo($("#away_pitcher"));

        var head_record = $('<tr/>')
        .appendTo(header);

        $('<th/>')
        .html('NM')
        .appendTo(head_record);
        $('<th/>')
        .html('WLS')
        .appendTo(head_record);        
        $('<th/>')
        .html('IP')
        .appendTo(head_record);
        $('<th/>')
        .html('B')
        .appendTo(head_record);
        $('<th/>')
        .html('EH')
        .appendTo(head_record);
        $('<th/>')
        .html('ER')
        .appendTo(head_record);
        $('<th/>')
        .html('AR')
        .appendTo(head_record);
        $('<th/>')
        .html('W')
        .appendTo(head_record);
        $('<th/>')
        .html('SO')
        .appendTo(head_record);
        $('<th/>')
        .html('EHR')
        .appendTo(head_record);
        $('<th/>')
        .html('ERA')
        .appendTo(head_record);
        // end of adding header
        
        var body = $('<tbody/>')
        .appendTo($("#away_pitcher"));     

        row.result.forEach(function(temp) {
            var body_record = $('<tr/>')
            .appendTo(body);            
            $.each(temp, function (i, item){
            $('<td/>')
            .html(item)
            .appendTo(body_record);
            });
        });
    }
});

$.ajax({
    url: '/crowd-2/home_hitter_record',
    type: 'get',
    data: {'game_id':game_id},
    success: function (row) { 
        // adding header
        var header = $('<thead/>')
        .appendTo($("#home_hitter"));

        var head_record = $('<tr/>')
        .appendTo(header);

        $('<th/>')
        .html('PS')
        .appendTo(head_record);
        $('<th/>')
        .html('NM')
        .appendTo(head_record);        
        $('<th/>')
        .html('AB')
        .appendTo(head_record);
        $('<th/>')
        .html('H')
        .appendTo(head_record);
        $('<th/>')
        .html('HR')
        .appendTo(head_record);
        $('<th/>')
        .html('RBI')
        .appendTo(head_record);
        $('<th/>')
        .html('RS')
        .appendTo(head_record);
        $('<th/>')
        .html('W')
        .appendTo(head_record);
        $('<th/>')
        .html('SO')
        .appendTo(head_record);
        $('<th/>')
        .html('HBP')
        .appendTo(head_record);
        $('<th/>')
        .html('AVG')
        .appendTo(head_record);
        // end of adding header
        
        var body = $('<tbody/>')
        .appendTo($("#home_hitter"));     

        row.result.forEach(function(temp) {
            var body_record = $('<tr/>')
            .appendTo(body);            
            $.each(temp, function (i, item){
            $('<td/>')
            .html(item)
            .appendTo(body_record);
            });
        });
    }
});

$.ajax({
    url: '/crowd-2/away_hitter_record',
    type: 'get',
    data: {'game_id':game_id},
    success: function (row) { 
        // adding header
        var header = $('<thead/>')
        .appendTo($("#away_hitter"));

        var head_record = $('<tr/>')
        .appendTo(header);

        $('<th/>')
        .html('PS')
        .appendTo(head_record);
        $('<th/>')
        .html('NM')
        .appendTo(head_record);        
        $('<th/>')
        .html('AB')
        .appendTo(head_record);
        $('<th/>')
        .html('H')
        .appendTo(head_record);
        $('<th/>')
        .html('HR')
        .appendTo(head_record);
        $('<th/>')
        .html('RBI')
        .appendTo(head_record);
        $('<th/>')
        .html('RS')
        .appendTo(head_record);
        $('<th/>')
        .html('W')
        .appendTo(head_record);
        $('<th/>')
        .html('SO')
        .appendTo(head_record);
        $('<th/>')
        .html('HBP')
        .appendTo(head_record);
        $('<th/>')
        .html('AVG')
        .appendTo(head_record);
        // end of adding header
        
        var body = $('<tbody/>')
        .appendTo($("#away_hitter"));     

        row.result.forEach(function(temp) {
            var body_record = $('<tr/>')
            .appendTo(body);            
            $.each(temp, function (i, item){
            $('<td/>')
            .html(item)
            .appendTo(body_record);
            });
        });
    }
});

$(function () {
    $(".btn-primary").click(function () {
        if (getUrlVars['amIHome']== 1) {
            document.location.href
             = '/crowd-1?teamID=' + getUrlVars['homeID'];
        } else {
            document.location.href
             = '/crowd-1?teamID=' + getUrlVars['awayID'];
        }
    });
});

module.exports = router;