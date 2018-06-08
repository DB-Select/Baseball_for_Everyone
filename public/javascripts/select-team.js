$.ajax({
    url: '/select-team',
    type: 'get',
    success: function (row) {
        row.forEach(element => {
            var list = $('<li/>')
                .attr('data-value', element['id'])
                .appendTo($("#team"));
            $('<img/>')
                .attr('width', 283)
                .attr('height', 100)
                .attr('src', 'images/team_logo/' + element['id'] + '.png')
                .appendTo(list);
        });
        $("#team")
        .selectable()
        .on("selectablestop", function () {
            console.log($('#team .ui-selected').first().data().value);
        });
    }
});