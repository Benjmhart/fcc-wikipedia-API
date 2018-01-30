//1.Click event to swap the icon with the searchbox
$('.disappear').on('click', vanish);

function vanish(){
  $('.disappear').css("visibility","hidden");
  $('#searchBox').css("visibility","visible");
  $('#searchBox').focus();
};
//2. search events
$('#random').on('click', wikiRandom);

$('#searchBox').on('change', wikiSearch);

//3. Search function
function wikiSearch() {
  var searchTerm = $('#searchBox').val();
   $('#resultamount').empty();
   $('#results').empty();
  //3a. API call based on search term
  
  $.ajax({
    type:"GET",
    url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=%22"+searchTerm,
     //3b. success callback pushing results to console
    success:function(json){
      console.log("success");
      //console.log(json);
      //if json.error
      if(json.hasOwnProperty('error')){
        console.log("invalid");
      $('#results').html("<p> Invalid search!</p>")      
//deliver results
} else{
  var titles = json[1];
  var abstracts = json[2];
  var links = json[3];
  console.log(titles.length);
  $('#resultamount').html(
    "<p> You got "+titles.length+" results!</p>");
 for(i=0; i<titles.length; i++ ) {
    $('#results').append( "<div class='item'><a href="+links[i]+"><p class='resultTitle'>"+titles[i]+"</p></a><p class='resultAbstract'>"+abstracts[i]+"</p> </div>");
 }
 };
    },
     //3c. failure callback showing no results found
    error:function(error){
      console.log("fail");
      $('#results').html("<p> ERROR!</p>");
    },
    
  });

 
 
};
//4. random function
function wikiRandom(){
     $('#resultamount').empty();
     $('#results').empty();
     $.ajax({
        type:"GET",
        url:"https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info|extracts&inprop=url&generator=random&grnnamespace=0&grnlimit=10",
        success:function(json){
          console.log("success");
          var randomPages=json.query.pages;
          console.log(randomPages);
          var randomIDs=Object.keys(json.query.pages);
          var resultNumber=Object.keys(randomPages).length;
          var randomLinks= [];
          for (j=0;j<resultNumber;j++){
            var pusher=randomPages[randomIDs[j]].fullurl;
            randomLinks.push(pusher);
          };
          var randomTitles=[];
          for (j=0;j<resultNumber;j++){
            var pusher=randomPages[randomIDs[j]].title;
            randomTitles.push(pusher);
          };
          var randomExtracts=[];
          for (j=0;j<resultNumber;j++){
            var pusher=randomPages[randomIDs[j]].extract;
            randomExtracts.push(pusher);
          };
          
          for(k=0;k<resultNumber; k++ ){
            $('#results').append( "<div class='item'><a href="+randomLinks[k]+"><p class='resultTitle'>"+randomTitles[k]+"</p> </a></div>");
          }
            
         },
        });
  
      };