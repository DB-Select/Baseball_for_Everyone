$(function () {
    changeTeam(getUrlVars()['teamID']);
    selectableFunctionCallback.push(changeTeam);
});

function changeTeam(teamID) {
    $.ajax({
        url: '/team-info/' + teamID,
        type: 'get',
        success: function (row) {
            $("#teamInfoTable").html('');
            row = row.result;
            // console.log(row);
            var head = $('<thead/>')
                .appendTo($("#teamInfoTable"));
            var trHead = $('<tr/>')
                .appendTo(head);
            var body = $('<tbody/>')
                .appendTo($("#teamInfoTable"));
            var trBody = $('<tr/>')
                .appendTo(body);

            var data = {
                Name: '',
                NoG: 0,
                WR: 0,
                Runs: 0,
                RunsAllowed: 0,
                AverageRuns: 0,
                Hit: 0,
                HomeRun: 0,
                Win: 0,
                Draw: 0,
                Lose: 0,
                latest10Win: 0,
                latest10Draw: 0,
                latest10Lose: 0
            };

            var i = 0;
            row.forEach(element => {
                data.Name = element.name;
                data.Runs += element.homeScore;
                data.RunsAllowed += element.sumScore - element.homeScore;
                data.Hit += element.Hit;
                data.HomeRun += element.Home_Run;
                data.Win += (element.homeScore > element.sumScore - element.homeScore) ? 1 : 0;
                data.Draw += (element.homeScore == element.sumScore - element.homeScore) ? 1 : 0;
                data.Lose += (element.homeScore < element.sumScore - element.homeScore) ? 1 : 0;
                if (i < 10) {
                    data.latest10Win += element.homeScore > element.sumScore - element.homeScore ? 1 : 0;
                    data.latest10Draw += element.homeScore == element.sumScore - element.homeScore ? 1 : 0;
                    data.latest10Lose += element.homeScore < element.sumScore - element.homeScore ? 1 : 0;
                    i++;
                }
            });
            data.NoG = row.length;
            data.WR = (data.Win / data.NoG).toFixed(2);
            data.AverageRuns = (data.Runs / data.NoG).toFixed(2);

            $.each(data, function (k, v) {
                $('<th/>')
                    .attr('style','width:0px;')
                    .html(k)
                    .appendTo(trHead);
                $('<td/>')
                    .html(v)
                    .appendTo(trBody);
            });
        }
    });
}