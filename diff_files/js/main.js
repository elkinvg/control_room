$(document).ready(function () {
$("#test").append("<br>HAVE<br>");
$("#test").append("<br>HAVE2<br>");
$.ajax({
method: "POST",
timeout: 3000,
url: "tango/sys/tg_test/1/DevVarStringArray()",
// data: {argin: '{"argin": ["first", "second", "third"]} '}
// data: {argin: '["first", "second", "third"]'}
// data: {argin: ['{"argin": ["first", "second", "third"]} '}
data: {argin: ["first", "second", "third"]}
})
.done(function(){$("#test").append("<br>done<br>");})
.fail(function(jqXHR, textStatus){
$("#test").append("<br>alert<br>");
$("#test").append(textStatus);
});

/*   //$.post("tango/sys/tg_test/1/DevVarStringArray()", {argin: '{"argin": ["first", "second", "third"]} '}, function(data){
   $.post("tango/sys/tg_test/1/DevVarStringArray()", {argin: '["first", "second", "third"]'}, function(data){
//  $.post("tango/sys/tg_test/1/DevFloat()", {argin: [23.3 , 24.32, 56.66 ], arg2: 23, arg3: ppp, arg4: dbp}, function(data){
	//var nn = data.val.lenth;
	var text = "<br>TANGO TEST<br>";
	$("#test").append("-----------------------------------------");
	$("#test").append(text);
	if (data!=null) $("#test").append("HAVE DATA");
	else $("#test").append("HAVE NOT DATA");
	$("#test").append("<br>");
	var fromjson = JSON.stringify(data);
	$("#test").append(fromjson);
    },"json").fail(function() {
	$("#test").append("<br>ERROR MES:<br>");	
	alert( "second finished" );
  }); // post*/
}); 


