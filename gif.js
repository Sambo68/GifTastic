// Initial array of emotions
$(document).ready(function(){
    var topics = ['ADELE', 'DRAKE', 'PAUL MCCARTNEY', 'BRUNO MARS', 'COLDPLAY', 'JAY Z', 'SHAKIRA', 'MC HAMMER'];

    // ========================================================

    //  create topics array buttons
    function buttonMusic(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('music');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonMusic();
   

  //Event listner for all button elements
  $(document).on('click', '.music', function() {
    //The "this" keyword refers to the button that was clicked
    var music = $(this).html();
    //Constructing a URL to search Giphy for the singer or band still and animate images    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + music + "&api_key=dc6zaTOxFJmzC&limit=10";
        //Performing the AJAX GET request
        $.ajax({
            url: queryURL, 
            method: 'GET'
        })
        //After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the the results variable
            var results = response.data;
            //Empties the div before adding more gifs
            $('#musicView').empty();
                //Loops through the data
                for ( var j=0; j < results.length; j++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                    var imageDiv = $('<div>');
                        // Storing the result item's rating
                        var rating = results[j].rating;
                        // Creating a paragraph tag with the result item's rating
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#musicView').prepend(displayRated);
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    // Creating an image tag
                    var musicImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    musicImage.attr('data-state', 'still');
                    $('#musicView').prepend(musicImage);
                    musicImage.on('click', playGif);
                    
                        
            
                } //for loop
            }
        }); // done response

        function playGif() { 
                    var state = $(this).attr('data-state');
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click music
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addMusic', function(){
    if ($('#music-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var music = $('#music-input').val().trim();
    topics.push(music);
    $('#music-input').val('');
    buttonMusic();
    return false;

    }

});

});  //document ready