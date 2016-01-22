$(document).ready(function() {

  // smooth scroll between page sections
  $('a').click(function(){
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 500);
    return false;
  });

});
