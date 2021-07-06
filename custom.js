$(document).ready(function () {
  
  var chat_history = "";
  var flowchat = 1;
  var username = makeid(10);
  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  function chat(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    if( flowchat==1){
      var chat = $("#message").val();
      $("#message").val('');
      var txt = `
          <div class="direct-chat-msg right">
              <div class="direct-chat-info clearfix"> 
                  <span class="direct-chat-name pull-right">
                      User
                  </span> 
                  <span class="direct-chat-timestamp pull-left">
                      ${time}
                  </span> 
              </div> 
              <img class="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="message user image">
              <div class="direct-chat-text"> 
              ${chat}
              </div>
          </div>
          `;
      chat_history += txt
      $("#direct-chat-messages").html(" ");
      $("#direct-chat-messages").html(chat_history);

      var formdata = new FormData();
      formdata.append("chatid", username);
      formdata.append("message", chat);
      $.ajax({
        url: "http://127.0.0.1:8000",
        method: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        cache: false,
        enctype: "multipart/form-data",
        dataType: "json",
        success: function (data, status) {
          var txt =`
          <div class="direct-chat-msg">
              <div class="direct-chat-info clearfix"> 
                  <span class="direct-chat-name pull-left">
                      mazamamediaBOT
                  </span> 
                  <span class="direct-chat-timestamp pull-right">
                      ${time}
                  </span> 
              </div> 
              <img class="direct-chat-img" src="chat.png" alt="message user image">
              <div class="direct-chat-text"> 
                  ${data.message}
              </div>
          </div>
        `;
          chat_history += txt;
          $("#direct-chat-messages").html(" ");
          $("#direct-chat-messages").html(chat_history);
          
          if(data.message.length==3){
            //UserConfiguration
                var formdata_userConfiguration = new FormData();
                formdata_userConfiguration.append("token", "d3a1b634-90a7-eb11-a963-005056a96ce9");

                $.ajax({
                  url: "http://127.0.0.1:8000/configurate",
                  method: "POST",
                  data: formdata_userConfiguration,
                  processData: false,
                  contentType: false,
                  cache: false,
                  enctype: "multipart/form-data",
                  dataType: "json",
                  success: function (data, status) {
                    var txt =`
                    <div class="direct-chat-msg">
                        <div class="direct-chat-info clearfix"> 
                            <span class="direct-chat-name pull-left">
                                mazamamediaBOT
                            </span> 
                            <span class="direct-chat-timestamp pull-right">
                                ${time}
                            </span> 
                        </div> 
                        <img class="direct-chat-img" src="chat.png" alt="message user image">
                        <div class="direct-chat-text"> 
                            <span>${data.message}<span/><br>
                            <span>FirstName : ${data.FirstName}</span><br>
                            <span>LastName : ${data.LastName}</span><br>
                            <span>ZipFilePassword : ${data.ZipFilePassword}</span><br>
                            <span>RequirePhoneNumber : ${data.RequirePhoneNumber}</span><br>
                            <span>RequireEmailAddress : ${data.RequireEmailAddress}</span><br>
                            <span>ReservationApiVersion : ${data.ReservationApiVersion}</span><br>
                            <span>ReservationUserCode : ${data.ReservationUserCode}</span><br>
                            <span>ReservationAgentCode : ${data.ReservationAgentCode}</span><br>
                            <span>ReservationClientCode : ${data.ReservationClientCode}</span><br>
                            <span>ReservationVendorCode : ${data.ReservationVendorCode}</span><br>
                            <span>State : ${data.State}</span><br>
                            <span>Status : ${data.Status} </span><br>
                        </div>
                    </div>
                  `;
                    chat_history += txt;
                    $("#direct-chat-messages").html(" ");
                    $("#direct-chat-messages").html(chat_history);
                    //StartOrder
                    var formdata_startOrder = new FormData();
                    formdata_startOrder.append("Token", "");
                    formdata_startOrder.append("SerialNumber", "www.zapier.com");
                    formdata_startOrder.append("Platform", "WebApp");
                    formdata_startOrder.append("AppVersion", "89.0.4389.72");
                    formdata_startOrder.append("State", "");
                    formdata_startOrder.append("SaleTypeId", "3");
                    formdata_startOrder.append("Latitude", "");
                    formdata_startOrder.append("Longitude", "");

                    

                    $.ajax({
                      url: "http://127.0.0.1:8000/order",
                      method: "POST",
                      data: formdata_startOrder,
                      processData: false,
                      contentType: false,
                      cache: false,
                      enctype: "multipart/form-data",
                      dataType: "json",
                      success: function (data, status) {
                        var txt =`
                        <div class="direct-chat-msg">
                            <div class="direct-chat-info clearfix"> 
                                <span class="direct-chat-name pull-left">
                                    mazamamediaBOT
                                </span> 
                                <span class="direct-chat-timestamp pull-right">
                                    ${time}
                                </span> 
                            </div> 
                            <img class="direct-chat-img" src="chat.png" alt="message user image">
                            <div class="direct-chat-text"> 
                                <p>${data.message}</p>
                                <span>Result : ${data.Result}</span><br>
                                <span>OrderNumber : ${data.OrderNumber}</span><br>
                                <span>OrderDate : ${data.OrderDate}</span><br>
                                <span>PackageID : ${data.PackageID}</span><br>
                                <span>Status : ${data.Status}</span><br>
                                <span>Message : ${data.Message}</span><br>
                            </div>
                        </div>
                      `;
                        chat_history += txt;
                        
                        var txt =`
                        <div class="direct-chat-msg">
                            <div class="direct-chat-info clearfix"> 
                                <span class="direct-chat-name pull-left">
                                    mazamamediaBOT
                                </span> 
                                <span class="direct-chat-timestamp pull-right">
                                    ${time}
                                </span> 
                            </div> 
                            <img class="direct-chat-img" src="chat.png" alt="message user image">
                            <div class="direct-chat-text"> 
                                <span>Here we go!!  🚘</span><br>
                            </div>
                        </div>
                      `;

                        $("#direct-chat-messages").html(" ");
                        $("#direct-chat-messages").html(chat_history);
                        // if(data.message == "Hurray that was a valid zip code! 🎉")

                        flowchat = 2;
                      },
                  });

                  },
              });
          }
              
        },
    });
    }
    if(flowchat==2){
      //TODO
      
    }
    if(flowchat==3){
      //TODO
    }
  }
  $("#message").keypress(function (e) {
    
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13'){
      chat();
    }
    
  });

  $("#sendMessage").click(function(){
      chat();
  });
});
