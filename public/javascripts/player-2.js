var team_id = '1042';//getUrlVars()['team_id']
var player_id = '5';
var is_Pitcher = 1;

if(is_Pitcher){
    // request pitcher info
    $.ajax({
        url: '/player-2/pitcher_detail',
        type: 'get',
        data: {
            'team_id':team_id,
            'playser_id':player_id,
            'is_Pitcher':is_Pitcher
        },
        success: function (row) {}
    });
}else{
// request hitter info
$.ajax({
    url: 'player-2/hitter_detail',
    type: 'get',
    data: {
        'team_id':team_id,
        'playser_id':player_id,
        'is_Pitcher':is_Pitcher
    },
    success: function (row) {}
});

}

module.exports = router;