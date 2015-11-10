//返回頂部按鈕
$(window).scroll(function(){
  height = $(window).scrollTop();
   	if(height > 1){
   	  $('.top').fadeIn();
   	}else{
   	  $('.top').fadeOut();
   	};
});
//圖片上傳與預覽
var result = document.getElementById("demo_result"),
	input = document.getElementById("demo_input");
if ($("#demo_result").length>0){
	if(typeof FileReader === 'undefined'){
		$("#demo_input").change(function() {
			fullPath = $("#demo_input").val();
			fullPath = fullPath.replace("/\\\g", "/");
			result.innerHTML = '<img alt="" class="img-responsive img-thumbnail" id="singlepic"/>';
			var singlePic = document.getElementById("singlepic");
			singlePic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + fullPath + "\")";
			singlePic.style.height = "250px";
			singlePic.style.width = "200px";
			singlePic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
			var fileType = (fullPath.substring(fullPath.lastIndexOf(".") + 1,
				fullPath.length)).toLowerCase();
			var suppotFile = new Array();
				suppotFile[0] = "jpg";
				suppotFile[1] = "gif";
				suppotFile[2] = "bmp";
				suppotFile[3] = "png";
				suppotFile[4] = "jpeg";
			for (var i = 0; i < suppotFile.length; i++) {
				if (suppotFile[i] == fileType) {
					return true
				}else{
					continue
				};
			};
			notSupport();
			return false;
		});
	}else{
		input.addEventListener('change',readFile,false);
	}
}else if ($("#multiple_upplad").length>0){
	document.write("<scri" + "pt src='../js/mootools.js'></sc" + "ript>");
	document.write("<scri" + "pt src='../js/Swiff.Uploader.js'></sc" + "ript>");
	document.write("<scri" + "pt src='../js/Fx.ProgressBar.js'></sc" + "ript>");
	document.write("<scri" + "pt src='../js/FancyUpload2.js'></sc" + "ript>");
	document.write("<scri" + "pt src='../js/anrufen.js'></sc" + "ript>");
};
function notSupport() {
	document.getElementById("image-form").reset();
	$("#demo_result").empty();
	alert('請選擇圖片文件');
}
//單張
function readFile(){
    var file = this.files[0];
    if(!/image\/\w+/.test(file.type)){
		notSupport();
        return false;
    };
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        result.innerHTML = '<img src="'+this.result+'" alt="" class="img-responsive img-thumbnail"/>'
    };
};
//同人選擇
if ($("#comic-doujin-themen").length>0) {
	$("#doujin").change(function() {
		$('#comic-doujin-themen').toggleClass('hidden');
	});
	$("#zasshi").change(function() {
		$('#comic-doujin-themen').addClass('hidden');
	});
	$("#tankoubon").change(function() {
		$('#comic-doujin-themen').addClass('hidden');
	});
};
//全選
$(".check-all").click(function(){
	var $choice = $("input[name='choice']");
	if($choice.is(":checked")== true){ 
		$choice.prop('checked',false);
	}else{ 
		$choice.prop('checked',true);
	} 
});
//排序
function loadDragsort() {
    var loadHead = document.getElementsByTagName('head').item(0);
    var loadScript = document.createElement("script");
    loadScript.type = "text/javascript";
    loadScript.src = "../js/jquery.dragsort-0.5.2.js";
    loadHead.appendChild(loadScript);
}
function posAktu() {
	$(".box").each(function() {
		$(this).find("input").val(($(this).index()+1));
	});
}
if ($(".picList").length>0) {
	loadDragsort();
}
$("#resort").click(function() {
	loadDragsort();
	$("#resort").after("<a href='javascript:void(0)' onclick='posAktu()'>刷新序列</a>")
	$(".name-box").after("<label><input type='text'></label>");
	posAktu();
});
$("#aktualisieren").click(function() {
	posAktu();
});
$(document).ready(function() {
	$(".box").prepend("<a href='javascript:void(0)' class='preview-ico delete'>&times;</a>");
});
$(document).on("click", ".delete", function(event) {
    var $this;
    $this = $(this);
    $this.closest('.box').remove();
	posAktu();
});
$(document).on("click", "#removePic", function(event) {
	$(".box").has("input[name='review-pic']:checked").remove();
	posAktu();
});
$(document).on("click", "#deleteall", function(event) {
	$('.box').remove();
});
$(".add-admin-input").click(function() {
	$(this).parent().find("table").append("<tr><td><input type='checkbox' name='delete'></td><td><input type='text' class='form-control'></td><td><input type='text' class='form-control'></td><td><input type='checkbox'></td></tr>");
});
$(".delete-admin-input").click(function() {
	$(this).parent().find("tr").has("input[name='delete']:checked").remove();
});
$("#addGroup").click(function() {
	$("table").append("<tr><td><input type='checkbox' name='delete'></td><td><input type='text' class='form-control'></td><td></td></tr>")
});
$(".drop-hover").mouseover(function() {
	$(this).addClass("open")
})
$(".drop-hover").mouseout(function() {
	$(this).removeClass("open")
})
//找漫畫
$(".search-box").click(function() {
	$(".search-menu").toggleClass("show");
	event.stopPropagation();
})
$(".search-menu").click(function() {
	event.stopPropagation();
})
$(".search-menu input").click(function() {
	if($(".search-menu input").is(":checked")== true){ 
		$(this).parent().toggleClass("active")
	}
})
$(document).click(function() {
	if (!$(this).is(".search-menu")&&!$(this).hasClass("search-box")){
		$(".search-menu").removeClass("show");
	}
});