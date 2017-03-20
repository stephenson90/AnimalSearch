var giphyLink ="http://api.giphy.com/v1/gifs/search?q=";
var keyPass = "&api_key=dc6zaTOxFJmzC&limit=5";

var animals = [ "chicken", "cow", "goat", "pig","horse", "donkey"];

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
        	var aniData = response.data

        	for (var i = 0; i<aniData.length; i++){
        	var urlPhoto = aniData[i].images.fixed_height.url;
        	var unePlace = $("<div>");
        	//var rating = information.
        	var photo = $("<img>").attr("src", urlPhoto); 
        	console.log(urlPhoto);       	
        	unePlace.append(photo);
        	$(".displayThings").prepend(unePlace);

          //$(".displayThings").html(JSON.stringify(response));
          addButtons();
          }
     
        });

    	
      }

      $(document).on("click", ".anim", animalInfo);
