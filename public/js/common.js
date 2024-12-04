/*
function popupOpen(type){
	var box = $(".popup-box > .box[data-name=" + type + "]");

	$("html , body , .popup-box").addClass("fixed");
	box.addClass("active");
	box.siblings().removeClass("active");
}

function popupClose(){
	$("html , body , .popup-box").removeClass("fixed");
}
*/

function menuOpen(){
	$("html , body , .header-all").addClass("fixed");
}

function menuClose(){
	$("html , body , .header-all").removeClass("fixed");
}

// 우측 고정바 토글
function rightToggle(){
	$("header .header-fixed").toggleClass("active");
}

// 전체 카테고리 메뉴 카테고리 토글
$(document).on("click", ".header-all .all-body-my button", function(){
	var parents = $(this).parent("li");

	parents.toggleClass("active");
	parents.siblings().removeClass("active");
});

// 테이블 토글
$(document).on("click", ".table-box .table-body .toggle", function(){
	var table = $(this).closest("table");
	var parents = $(this).closest("tr");
	var row = parents.next("tr.toggle-row");

	row.toggleClass("active");
	table.find("tr.toggle-row").not(row).removeClass("active");
});

// 별점
// $(document).on("change", ".score-box .score-write input", function(){
// 	var parents = $(this).parent("li");
// 	var score  = $(this).closest(".score-box");

// 	if( $(this).is(":checked") == true ){
// 		parents.addClass("active");
// 		parents.prevAll().addClass("active");
// 		parents.nextAll().removeClass("active");
// 	}else{
// 		parents.removeClass("active");
// 		parents.nextAll().removeClass("active");
// 	}

// 	score.find("strong").text( parents.index()+1 );
// });

// 외부영역 클릭 시 특정요소 닫기
/*$(document).mouseup(function (e){
	var popupBox = $(".popup-box");		
	var menuBox = $(".header-all");	 

	if(popupBox.has(e.target).length === 0){
		$("html , body , .popup-box").removeClass("fixed");
	}	
	if(menuBox.has(e.target).length === 0){
		$("html , body , .header-all").removeClass("fixed");
	}	
});*/

// 셀렉박스 옵션선택
$(document).on("change",".select-box select",function(){
	var box = $(this).closest(".select-box");
	var opt = $(this).find("option:selected").val();
	var redex = /\s/ig;
	var value = opt.toString().replace(redex, "").length;

	// 띄어쓰기를 제외한 글자가 존재하다면
	if(value > 0){
		box.addClass("active");
	}else{
		box.removeClass("active");	   
	}
});

// 자주묻는질문
$(document).on("click", ".faq-list-box .list-head a", function(){
	var parents = $(this).closest("li");

	parents.toggleClass("active");
	parents.siblings().removeClass("active");
});

// 상품 상세 이미지 썸네일
$(document).on("click", ".view-left-list dl a", function(){
	var dl = $(this).closest(".view-left-list").find("dl");
	var parents = $(this).closest("dd");

	parents.addClass("active");
	dl.find("dd").not(parents).removeClass("active");
});

// 탭
$(document).on("click", ".tab-box .tab", function(){
	var parents = $(this).parent("li");
	var index = parents.index();
	var content = $(this).closest(".tab-box").siblings(".tab-content-box").find(".content");

	parents.addClass("active");
	parents.siblings().removeClass("active");
	content.not(content.eq(index)).removeClass("active");
	content.eq(index).addClass("active");
});

// 아이템 상세 더보기
$(document).on("click", ".item-detail-box a", function(){
	var parents = $(this).closest(".item-detail-box");

	parents.toggleClass("active");
});

// 헤더고정
$(window).scroll(function(){
	var scl = $(this).scrollTop();
	var header = $(".header-top").offset().top;

	if(scl > header){
		$("header").addClass("scroll");
	}else{
		$("header").removeClass("scroll");
	}
});

