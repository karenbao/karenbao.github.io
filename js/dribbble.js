// Set the Access Token
const accessToken = "5807a4d3557c1a55036845de28c061e657c05ccef5b710e2cb2d2ebeff17f50e";

// Sorting Function Latest First
const compare = ( a, b ) => {
  if ( a.published_at < b.published_at ){
    return -1;
  }
  if ( a.published_at > b.published_at ){
    return 1;
  }
  return 0;
};

// Call Dribble v2 API
$.ajax({
  url: `https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`,
  dataType: 'json',
  type: 'GET',
  success: function(data) {  
    if (data.length > 0) {
      const sortedData = data.sort(compare);
      $.each(sortedData.reverse(), function(i, val) {
        if(i === 0 ) {
          $('#leftShot').append('<div class="leftshot col-md-12" target="_blank" href="'+val.html_url +'" title="' + val.title + '"><video autoplay name="media"><source src="'+ val.video.url +'" type="video/mp4"></video></div>')
        } else if(i >= 5) {
          // NOTE: anything after this will not show
        }
        else {
          $('#rightShot').append('<div class="rightshot col-md-6" target="_blank" href="'+val.html_url +'" title="' + val.title + '"><img src="'+ val.images.hidpi +'"/></div>')
        }
      })
    }
    else {
      // TODO: add css, handle nothing returned
      $('.dribbble-feed').append('<p class="dribbble-placeholder">Sorry, no shots yet.</p>');
    }
  }
});
