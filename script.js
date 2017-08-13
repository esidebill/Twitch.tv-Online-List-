$(document).ready(function() {
  $(".dropdown-toggle").dropdown();

  function add_streamer() {
    var user_id = $("#user_input").val();
    var twitch_api_user =
      "https://wind-bow.glitch.me/twitch-api/users/" + user_id;
    var twitch_api_stream =
      "https://wind-bow.glitch.me/twitch-api/streams/" + user_id;
    $.getJSON(twitch_api_stream, function(data) {
      if (data.stream === null) {
        $.getJSON(twitch_api_user, function(data) {
          $("#display").append(
            "<div class='jumbotron stream_offline'>" + "<div class='row'>" + "<div class='col-sm-4'>" +
              "<a href='https://www.twitch.tv/" +
              data.name +
              "' target='_blank'>" +
              "<img class='img-fluid rounded-circle userLogo' src='" +
              data.logo +
              "'/></a></div>" +
              "<br>" +
              "<div class='col-sm-8'><p class='streamerInfo'><strong>" +
              data.display_name +
              "</strong>" +
              "<br>Stream <span id='offline_text'>offline</span></p></div><br><button class='btn btn-secondary btn-sm remove'>Remove streamer</button></div></div>"
          );
          $(".remove").click(function() {
            $(this).parent().parent().remove();
          });
        });
      } else {
        $.getJSON(twitch_api_stream, function(data) {
          $("#display").append(
            "<div class='jumbotron stream_online'>" + "<div class='row'>" + "<div class='col-sm-4'>" +
              "<a href='https://www.twitch.tv/" +
              data.stream.channel.name +
              "'target='_blank'>" +
              "<img class='img-fluid rounded-circle userLogo' src='" +
              data.stream.channel.logo +
              "'/></a></div>" +
              "<br>" +
              "<div class='col-sm-8'><p class='streamerInfo'><strong>" +
              data.stream.channel.display_name +
              "</strong>" +
              "<br>Stream <span id='online_text'>online</span>" +
              "<br>Playing: " +
              data.stream.game +
              "</p></div><br><button class='btn btn-secondary btn-sm remove'>Remove streamer</button></div></div>"
          );
          $(".remove").click(function() {
            $(this).parent().parent().remove();
          });
        });
      }
    });
  }

  $("#all").on("click", function() {
    $(".stream_offline").show();
    $(".stream_online").show();
  });
  $("#online").on("click", function() {
    $(".stream_offline").hide();
    $(".stream_online").show();
  });
  $("#offline").on("click", function() {
    $(".stream_online").hide();
    $(".stream_offline").show();
  });
  $("#games").on("click", function() {});
  $("#player").on("click", function() {
    add_streamer();
  });
  $(".remove").on("click", function() {
    $(this).parent().parent().remove();
  });
});
