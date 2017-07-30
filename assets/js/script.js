$(document).ready(function() {
    $('select').material_select();
  });

$("#submit").click(function(event){
    var apikey="6ef554a8ac544c06913583bdf51b3973";
    var url="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+apikey+"&";
    var flag=1;

    event.preventDefault();

    if($("#searchTerm").val() == ""){
        flag=0;
    }
    else{
        url+="q="+$("#searchTerm").val() + "&";
    }
    if($("#numItems").val() == ""){
        flag=0;
    }
    else{
        url+="page="+$("#numItems").val() + "&";
    }
    if($("#start").val() != ""){
        url+="begin_date="+$("#start").val() + "&";
    }
    if($("#end").val() != ""){
        url+="end_date="+$("#end").val() + "&";
    }

    console.log(url);

    if(flag){
        callAPI(url);
        console.log("callAPI");
    }

});
function callAPI(url){

    $.ajax({
          url: url,
          method: 'GET',
    }).done(function(result) {
          console.log(result.response.docs);
          populate(result.response.docs);
    }).fail(function(err) {

        throw err;

    });

};
$("#clear").click(function(){
    $("#articles").empty();
});
function populate(data){
    for(var i=0;i<data.length;i++){
        // var v=$("#articles").append("<div><span class='article-number'>"+(i+1)+"</span><h2>"+data[i].lead_paragraph+"</h2><p>"+data[i].byline.original+"</p><p>Section: "+data[i].section_name+"</p><p>"+data[i].pub_date+"</p><p><a href="+data[i].web_url+">"+data[i].web_url+"</a></p></div>");

        var tempArticle = $("<div>").addClass("article");
        var articleNumber = $(".article-number").text(i+1);
        var title = $("<h2>").text(data[i].lead_paragraph);
        var author = $("<p>").text(data[i].byline.original);
        var type = $("<p>").text("Section: " + data[i].section_name);
        var date = $("<p>").text(data[i].pub_date);
        var url = $("<a>").attr("href", data[i].web_url).text(data[i].web_url);

        tempArticle.append(articleNumber);
        tempArticle.append(title);
        tempArticle.append(author);
        tempArticle.append(type);
        tempArticle.append(date);
        tempArticle.append(url);
        tempArticle.append("<hr>")
        $("#articles").append(tempArticle);
    };
};
