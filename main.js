let reposTemplateString = document.getElementById('results-template').innerHTML;
let renderRepos = Handlebars.compile(reposTemplateString);

Handlebars.registerHelper('comma-format', function(number){
  return number.toLocaleString();
});

$('#searchbutton').on('click', function(event) {
  event.preventDefault();
  $('#results').html('<div class="loader">Loading...</div>');

  var searchinput =  $('#searchinput').val();

  let url = `https://www.reddit.com/r/${searchinput}.json`;

  let promise = $.ajax({
    type: 'GET',
    url: url
  });

//fetch function using jquery
  let promises = fetch(url).then(function(response) {
    let prom = response.json(); //convert to json, the return promise
    return prom;
  });

  promise.then(function(response) {
    console.log(response);
    let renderedRepos = renderRepos ({
      repos: response.data.children
    });
    $('body').append(renderedRepos);

  }, function (error) {
    console.error('Oops! Something went wrong!');
  });
  });
