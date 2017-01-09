$(document).ready(function () {
var $menu = $('#sidebar-wrapper');

$(document)
 .on('click', '.js-menu-open',function() {
  $menu.addClass('open');

  return false;
})
  .on('click', '.js-menu-close', function() {
    $menu.removeClass('open');

    return false;
  })

    .on("click", ".sidebar-links", function() {

      $menu.removeClass("open");

    })

    // Sidebar : Close from outside the Sidebar

    .on("mouseup", "#main-wrapper", function() {

      $menu.removeClass("open");

    });

    // Background Image

    getWeather();

      // Background Image : Local weather based on IP address

      function getWeather() {

        $.ajax({

          url : "http://api.wunderground.com/api/b8da38a9149c090b/geolookup/conditions/q/44107.json",
          dataType : "jsonp",
          success : function(parsed_json) {

            var conditions = parsed_json.current_observation.weather;
            loadImage(conditions);

          }

        });

      }

      // Background Image : Local time

      function getTimeOfDay() {

        var time = new Date();
        var hours = time.getHours();
        var timeOfDay;

        if(hours > 18 || hours < 6)
        {
          timeOfDay = "night";
        }
        else if (hours > 12)
        {
          timeOfDay = "afternoon";
        }
        else
        {
          timeOfDay = "morning";
        }

        return timeOfDay;

      }

      // Background Image : Choose based on weather + time

      function loadImage(conditions) {

        var imageSRC = "img/weather/hero-"
        var validConditions = ["clear", "cloudy", "rain", "snow"];
        var timeOfDay = getTimeOfDay();
        conditions = conditions.toLowerCase();

        if (validConditions.indexOf(conditions) == -1)
        {
          conditions = "cloudy";
        }

        imageSRC = imageSRC + conditions + "-" + timeOfDay + ".jpg";
        $("#intro").css("background-image", "url("+ imageSRC + ")");

      }

    });
