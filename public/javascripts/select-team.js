$(function () {
    $("#team")
        .selectable()
        .on("selectablestop", function () {
            console.log($('#team .ui-selected').first().data().value);
        });
});