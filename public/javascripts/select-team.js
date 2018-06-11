var selectableFunctionCallback = [];
$(function () {
    $("#team")
        .selectable()
        .on("selectablestop", function () {
            console.log($('#team .ui-selected').first().data().value);
            if (selectableFunctionCallback.length) {
                selectableFunctionCallback.forEach(function (elementFunction) {
                    elementFunction($('#team .ui-selected').first().data().value);
                })
            }
        });

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
            var teamID = getUrlVars()['teamID'];
            console.log(teamID);
            if (teamID) {
                $('#team li').each(function (i, value) {
                    if ($(value).data().value == teamID)
                        $(value).addClass('ui-selected');
                });
            }
        }
    });
});