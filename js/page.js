$(document).ready(function () {
                
    var inc = 8; // number of stories to show. Not zero-based.

    $("#load").attr("start", 0).attr("end", inc - 1); //set start/end items for Load More button

    var top_stories = 'http://www.marketwatch.com/news/rss/latestnews?images=true';
    var markets = 'http://www.marketwatch.com/news/rss/markets?images=true';
    var aapl = 'http://www.marketwatch.com/news/rss/aapl_news?images=true';
    var tech = 'http://www.marketwatch.com/news/rss/techfactiva?images=true';

    // xml file
    var url = 'data/curl-mw.php?url=' + top_stories;

    // load initial news items via ajax();
    $.ajax({
        url: url,
        dataType: "xml",
        success: function (data) { 
            var start = $("#load").attr("start"); // find starting index value
            var end = $("#load").attr("end"); // find ending index value
            storyData(data, start, end); // cardLoad function with start/end values passed 
        },
        error: function(){ // spit out error if unable to access feed
            $("#container").text("Error. Trouble accessing feed.")
        }
    });

    // start collecting story assets to build out each tile 
    function storyData(data, start, end) {

        // total number of stories
        var story_count = $(data).find('channel item').length;
        var page_title = $(data).find('channel > title').text();

        var page_titles = {
            "latestnews" : "Latest News", 
            "markets" : "Market News",
            "aapl_news" : "Apple News",
            "techfactiva" : "Technology News"
        }

        page_title = page_titles[page_title] + " ";                  
        var subhed = $(data).find('channel > description');

        $("h1").html(page_title);
        $("<small>").html(subhed).appendTo("h1");

        $(data).find('channel item').each(function(index,value){

            if(index >= start && index <= end){

                if(index % 4 === 0 ) {
                    $("<div>",{class:"row"}).appendTo(".tiles");
                }

                if(index % 2 === 0 ) {
                    $("<div>",{class : "clearfix visible-sm visible-md"}).appendTo(".tiles .row:last");
                }

                var title = $(this).find('title').text();
                var desc = $(this).find('description').text();
                var link = $(this).find('link').text();
                var date = new Date($(this).find('pubDate').text());
                var img = $(this).find('media\\:content, content');
                if(img.length > 0){
                    var img = img.attr('url').replace('_MC_', '_MG_');
                } else {
                    var img = 'img/mw_placeholder.png';
                } 

                var num = index+1; // Move the count away from zero-based index

                if(num == story_count){ // check if we no longer need the Load button
                    $("#load").hide(); // hide Load button
                    $("#end").show(); // show ending message
                }

                date = formatDate(date);

                $("#footer").find("p").text(num+" of "+story_count);

                createCard(num,title,link,desc,date,img,story_count); // pass data to function createCard
            } 
        });

        $("#loading").hide();
    }

    /* 
    Format the date to this format.
    Currently set to this format: 
    "Thu Jul 27 2017 18:04:08 GMT-0400 (EDT)" 
    */ 
    function formatDate(date) { 

        // array with each month listed. Used to pull back correct month
        var monthNames = [ 
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
        ];

        var day = date.getDate(); // Day set as 1-31
        var monthIndex = date.getMonth(); // Month set as 0-11
        var year = date.getFullYear(); // Year set as YYYY

        return monthNames[monthIndex] + ' '+ day + ', ' + year; // return the correctly formatted date

    }

    // Build out each news card to send back to the page
    function createCard(num,title,link,desc,date,img,story_count){

        $("<div>",{id:"story"+num,number:num,class:"col-sm-6 col-lg-3"}).appendTo(".tiles .row:last");
        $("<div>",{class:"thumbnail"}).appendTo("#story"+num);
        $("<img>",{src:img,alt:title}).appendTo("#story"+num+" .thumbnail");
        $("<div>",{class:"caption"}).appendTo("#story"+num+" .thumbnail");
        $("<h3>").text(title).appendTo("#story"+num+" .caption");
        $("<p>",{date,class:"byline"}).appendTo("#story"+num+" .caption");
        $("<p>",{text:desc}).appendTo("#story"+num+" .caption");
        $("<p>",{text:date}).appendTo("#story"+num+" .caption");
        $("<a>",{href:link,class:"btn btn-primary",role:"button"}).text('Read More').appendTo("#story"+num+" .caption");

    }

    /* 
    LOAD BUTTON
    Determine how many tiles have already been loaded and how many more to display
    */
    $("#load").click(function(){

        $("#loading").show(); // fire the loading overlay ... 

        // tile range
        var start = Number($("#load").attr("start"))+inc; // get start number using var "inc"
        var end = Number($("#load").attr("end"))+inc; // get end number using var "inc"

        // update Load button with new start/end
        $("#load").attr("start",start).attr("end",end);

        // load initial news items via ajax();
        $.ajax({
            url: url,
            dataType: "xml",
            success: function(data) {
                storyData(data,start,end); // Pass story data
            },
            error: function(){ // spit out error if unable to access feed
                $("#container").text("Error. Trouble accessing feed.")
            }
        });

    })


});