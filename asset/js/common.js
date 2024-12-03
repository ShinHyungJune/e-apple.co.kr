let target;

$(document).ready(function () {
    //헤더 푸터 컴포넌트
    $("#header").load("/asset/components/header.html");
    $("#header2").load("/asset/components/header2.html");
    // 영어버전 해드 푸터
    $("#footer").load("/asset/components/footer.html");
    // 하단 bottomNav
    $("#bottomNav").load("/asset/components/bottomNav.html");

});


$(document).ready(function () {
    $(".m-script-pop").click(function () {
        target = $(this).attr("data-target");

        $(target).toggleClass("active");
    });
});

