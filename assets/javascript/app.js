var giphyLink ="http://api.giphy.com/v1/gifs/search?q=";
var keyPass = "&api_key=dc6zaTOxFJmzC&limit=6";

var animals = [ "chicken", "cow", "goat", "pig","horse", "donkey"];


//displaying the buttons on the page
function addButtons(){

	$("#button").empty();

	for(var i = 0; i<animals.length; i++){
		var aniBut = $("<button>");
		aniBut.addClass("anim");
		aniBut.attr("data-name", animals[i]);
		aniBut.text(animals[i]);
		$("#button").append(aniBut);


	}
}

  addButtons();

// adding user input to the array and then display all the buttons
$("#addedAni").on("click", function(event){
	event.preventDefault();
	var animal = $("#animals").val().trim();
	animals.push(animal);
	addButtons();
	$("#animals").val("");

});


function animalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = giphyLink+animal+keyPass;
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var aniData = response.data;
          var picRate="";
          
        	for (var i = 0; i<aniData.length; i++){
        		var urlPhoto = aniData[i].images.fixed_height.url;
            var urlStill = aniData[i].images.fixed_height_still.url;
            var urlAnimate = urlPhoto;
        		picRate = aniData[i].rating;
        		var unePlace = $("<div>");           
        		var paragr = $("<p class='forma'>");
        		//$(".forma").css({"font-size":"16px", "color":"white ","padding":"5px" });            
        		var photo = $("<img class='leftLea'>").attr({"src": urlPhoto, "data-still":urlStill, "data-animate":urlAnimate, "data-state":"still"}); 
        		paragr.append("Rating: "+picRate);
        		unePlace.append(paragr);
        		console.log(urlPhoto);       	
        		unePlace.append(photo);
        		//$(".leftLea").css("padding","5px");
        		$(".displayThings").prepend(unePlace);
          
          addButtons();
          }
     $(".forma").css({"font-size":"16px", "color":"white ","padding":"5px" });
     $(".leftLea").css({"padding":"5px"}); 

        $(".leftLea").on("click", function() {
      var state = $(this).attr("data-state");    
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


        });    	
      }

      $(document).on("click", ".anim", animalInfo);

   
