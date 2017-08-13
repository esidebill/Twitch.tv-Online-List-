$(document).ready(function() {
  $(".dropdown-toggle").dropdown();

  function add_streamer() {
    var user_id = $("#user_input").val();
    var twitch_api_user =
      "https://wind-bow.glitch.me/twitch-api/users/" + user_id;
    var twitch_api_stream =
      "https://wind-bow.glitch.me/twitch-api/streams/" + user_id;

    $.getJSON(twitch_api_stream, function(data) {
      if ($("#" + user_id).length == 1) {
        $("#alert_box").html("<button type='button' id='close_button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Whoops!</strong> That streamer's already been added");
            $("#alert_box").css("display", "block");
            $("#close_button").on("click", function() {
    $("#alert_box").css("display", "none");
              $("#alert_box").html("")
  });
        $("#user_input").val("");
      } else if (data.stream === null) {
        $.getJSON(twitch_api_user, function(data) {
          if (data.error === "Not Found") {
            $("#alert_box").html("<button type='button' id='close_button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Whoops!</strong> No such streamer");
            $("#alert_box").css("display", "block");
            $("#close_button").on("click", function() {
    $("#alert_box").css("display", "none");
              $("#alert_box").html("")
  });
          
            $("#user_input").val("");
          } else {
            $("#user_input").val("");
            $("#display").append(
              "<div id='" + user_id + "' style='display:none;'></div>"
            );
            $("#" + user_id)
              .append(
                "<div class='jumbotron stream_offline'>" +
                  "<div class='row'>" +
                  "<div class='col-sm-4'>" +
                  "<a href='https://www.twitch.tv/" +
                  data.name +
                  "' target='_blank'>" +
                  "<img class='img-fluid rounded-circle userLogo circle' alt='' src='" +
                  data.logo +
                  "'/></a></div>" +
                  "<br>" +
                  "<div class='col-sm-8'><p class='streamerInfo'><strong>" +
                  data.display_name +
                  "</strong>" +
                  "<br>Stream <span id='offline_text'>offline</span></p></div><br><button class='btn btn-secondary btn-sm remove'>Remove streamer</button></div></div>"
              )
              .slideDown("slow");
          }
          $(".remove").click(function() {
            $(this).slideUp("slow", function() {
            $(this).parent().parent().parent().remove();
            });
          });
        });
      } else {
        $.getJSON(twitch_api_stream, function(data) {
          $("#user_input").val("");
$("#display").append(
              "<div id='" + user_id + "' style='display:none;'></div>"
            );
          $("#" + user_id).append(
            "<div class='jumbotron stream_online'>" +
              "<div class='row'>" +
              "<div class='col-sm-4'>" +
              "<a href='https://www.twitch.tv/" +
              data.stream.channel.name +
              "'target='_blank'>" +
              "<img class='img-fluid userLogo rounded-circle' alt='' src='" +
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
          ).slideDown("slow");
          $(".remove").click(function() {
            $(this).slideUp("slow", function() {
            $(this).parent().parent().parent().remove();
            });
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
   

  $(document).bind("keypress", function(e) {
    if (e.keyCode == 13) {
      $("#player").trigger("click");
    }
  });
});
