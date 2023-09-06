document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.getElementById('searchButton');
    var searchInput = document.getElementById('searchInput');
    var result = document.getElementById('result');
  
    searchButton.addEventListener('click', function() {
      var word = searchInput.value.trim();
      var searchQueries = [];
  
      if (word.length > 1) {
        for (var i = word.length; i >= 1; i--) {
          var slicedWord = word.slice(0, i);
          searchQueries.push(slicedWord);
        }
      } else {
        searchQueries.push(word);
      }
  
      performSearches(searchQueries);
    });
  
    function performSearches(queries) {
      if (queries.length > 0) {
        var query = queries.shift();
        var searchUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
        chrome.tabs.update({ url: searchUrl }, function() {
          setTimeout(function() {
            performSearches(queries);
          }, 500); // Retraso de 1 segundo entre cada búsqueda
        });
      } else {
        result.textContent = 'Busquedas realizadas';
      }
    }
  });
  