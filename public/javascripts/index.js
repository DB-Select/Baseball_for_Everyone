$(function () {
    $(".col-sm-4").click(function (element) {
        if ($('#team .ui-selected').first().data()) {
            document.location.href
             = $(element.currentTarget).find('img').attr('src').split('.')[0].split('/').pop()
             +"-1?teamID="+$('#team .ui-selected').first().data().value;
       } else {
            alert('팀을 선택해 주세요.');
        }
    });
});