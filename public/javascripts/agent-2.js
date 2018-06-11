var is_pitcher = 1; //getUrlVars()["is_pitcher"]
var player_id = 101;
if(is_pitcher){
    /*$('#pit_sal').DataTable({
        "processing": true,
        "ajax": {
            "url": "/agent-2/pitcher_salary_list",
            "type": 'get',
            "data" : {'player_id': player_id}
        },
        "columns":[
            {"data":"NAME"},
            {"data":"G"},
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
            {"data":"HR"},
            {"data":"SALARY"}
            ]
    });
    */
   $.ajax({
        url : "/agent-2/pitcher_salary_list",
        type: 'get',
        data : {'player_id': player_id},
        success: function(row){
            console.log('##############');
            console.log(row.json);
            $('#pit_sal').DataTable({
                "ajax":row,
                "columns":[
                {"data":"NAME"},
                {"data":"G"},
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
                {"data":"HR"},
                {"data":"SALARY"}
                ]
            })
        }
    })
}
else{
    $.ajax({
        url : "/agent-2/hitter_salary_list)",
        type: 'get',
        data : {'player_id': player_id},
        success: function(row){
            
        }
    })
}