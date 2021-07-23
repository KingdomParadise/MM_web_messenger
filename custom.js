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
      if (chat!="")
        chat_history += txt
      $("#direct-chat-messages").html(" ");
      $("#direct-chat-messages").html(chat_history);

      var formdata = new FormData();
      formdata.append("chatid", username);
      formdata.append("message", chat);
      $.ajax({
        url: "http://127.0.0.1:8000/mazamamedia_chatbotapi/",
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
              
        },
    });
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
