var is_pitcher = true;
var team_id = 1041;
if(is_pitcher){
    $.ajax({
        url : "/player-1/pitcher_list",
        type: 'get',
        data : {'team_id': team_id},
        success: function(json){
            $('#pit_li').DataTable({
                data:json.result,
                "columns":[
                {"data":"NAME"},
                {"data":"WIN"},
                {"data":"LOSE"},
                {"data":"SAVE"},
                {"data":"HOLD"},
                {"data":"ER"},
                {"data":"IP"},
                {"data":"CG"},
                {"data":"H"},
                {"data":"NP"},
                {"data":"ERA"},
                {"data":"DOBLE"},
                {"data":"TRIPLE"},
                {"data":"G"},
                {"data":"SALARY"}
                ]
            });
        }
    });

}
else{
    $.ajax({
        url:"/player-1/hitter_list)",
        type:'get',
        data: {'team_id':team_id},
        success:function(row){

        }
    })

}