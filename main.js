$(document).ready(function() {
  $('#search').click(function() {
    $('.bordered').remove();
    var searchTerm = $('#searchTerm').val();
    var api =
      'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    var url = api + searchTerm + cb;
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      data: {
        format: 'json'
      },
      dataType: 'jsonp',
      success: function(data) {
        var results = [data.query.pages];
        //        console.log(results.pages.length);
        for (var key in results[0]) {
          //console.log(key, results[0][key].pageid, results[0][key].title);
          $('#output').prepend(`<a class=" bordered" href= ${page + results[0][key].pageid}><li><h1>${results[0][key]
            .title}</h1>
                <p>${results[0][key].extract}</p></li>  <hr/> </a>`);
        }
        $('#searchTerm').text('');
      },
      error: function(errorMessage) {
        alert('Error');
      }
    });
  });
});
