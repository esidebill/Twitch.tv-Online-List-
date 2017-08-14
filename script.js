$(document).ready(function() {
  $(".dropdown-toggle").dropdown();

  //call function to add a new streamer
  function showError(user_id,message) {
    $("#alert_box").html(
    "<button type='button' id='close_button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Whoops!</strong> " + message);
        $("#alert_box").css("display", "block");
        $("#close_button").on("click", function() {
          $("#alert_box").css("display", "none");
          $("#alert_box").html("");
        });
  }
  
  function add_streamer() {
    //set variables for input bar and APIs
    var user_id = $("#user_input").val();
    var twitch_api_user =
      "https://wind-bow.glitch.me/twitch-api/users/" + user_id;
    var twitch_api_stream =
      "https://wind-bow.glitch.me/twitch-api/streams/" + user_id;

    //gets JSON info from the twitch API
    $.getJSON(twitch_api_stream, function(data) {
      //if the user entered a streamer that exists an error appears
      if ($("#" + user_id).length == 1) {
        showError(user_id, "You've already added this streamer");
        //if theres no stream information, the user is offline
      } else if (data.stream === null) {
        //gets JSON info for the offline user
        $.getJSON(twitch_api_user, function(data) {
          //if there is no such user an error appears
          if (data.error === "Not Found") {
            showError(user_id, "No such streamer exists");
            //if it is a valid ID it displays their information in a new div
          } else {
            $("#user_input").val("");
            $("#display").prepend(
              "<div id='" + user_id + "' style='display:none;'></div>"
            );
            $("#" + user_id)
              .prepend(
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
                  "<br>Stream <span id='offline_text'>offline</span></p></div><br><button data-user='" +
                  user_id +
                  "' class='btn btn-secondary btn-sm remove'>Remove streamer</button></div></div>"
              )
              .slideDown("slow");
          }
          //button removes streamer from list
          $(".remove").click(function() {
            $("#" + $(this).attr("data-user")).slideUp("slow", function() {
              this.remove();
            });
          });
        });
      } else {
        //if user is online, gets stream information
        $.getJSON(twitch_api_stream, function(data) {
          //adds new div with stream information
          $("#user_input").val("");
          $("#display").prepend(
            "<div id='" + user_id + "' style='display:none;'></div>"
          );
          $("#" + user_id)
            .prepend(
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
                "</p></div><br><button data-user='" +
                user_id +
                "' class='btn btn-secondary btn-sm remove'>Remove streamer</button></div></div>"
            )
            .slideDown("slow");
          //button to remove streamer
          $(".remove").click(function() {
            $("#" + $(this).attr("data-user")).slideUp("slow", function() {
              this.remove();
            });
          });
        });
      }
    });
  }
  //in sort dropdown to show all streamers
  $("#all").on("click", function() {
    $(".stream_offline").show();
    $(".stream_online").show();
  });
  //in sort dropdown to only show online
  $("#online").on("click", function() {
    $(".stream_offline").hide();
    $(".stream_online").show();
  });
  //in sort dorpdown to only show offline
  $("#offline").on("click", function() {
    $(".stream_online").hide();
    $(".stream_offline").show();
  });
  //clicking Go will run this function
  $("#games").on("click", function() {});
  $("#player").on("click", function() {
    add_streamer();
  });
  //allows enter to use Go button
  $(document).bind("keypress", function(e) {
    if (e.keyCode == 13) {
      $("#player").trigger("click");
    }
  });
});
