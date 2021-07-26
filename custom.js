
  var chat_history = "";
  var username = makeid(10);
  var user_info_option = "";
  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  function chat(username, chat){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    var txt = '';
    var oldscrollHeight = $("#direct-chat-messages")[0].scrollHeight - 20; //Scroll height before the request
    if (chat=="" && $("#message").val()!="" )
      {
        chat = $("#message").val();
        txt = `
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

    }

    $("#message").val('');
    $("#direct-chat-messages").html(" ");
    $("#direct-chat-messages").html(chat_history);
    console.log(chat);
    var formdata = new FormData();
    formdata.append("chatid", username);
    formdata.append("message",chat);
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
        var header = `
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
          `;
        
        var footer = `
          </div>
          `;      
        txt = '';
        console.log(data.message)
        if (data.message.length==2){
          if(data.message[1]=="url"){
            txt +=(header+ `<div class="direct-chat-text"> <a href = "${data.message[0]}" target="_blank">
                          Click here</a>
                   </div>
                `+footer);
          }
          else if (data.message[1] =="normal_restart_help"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="direct-chat-text"><button  class="btn btn-warning btn-flat" onclick="restart()">Restart</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="help()">Help</button></div>'+footer);
          }
          else if (data.message[1]=="normal_yes_no"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="direct-chat-text"><button  class="btn btn-warning btn-flat" onclick="send_yes()">Yes</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="send_no()">No</button></div>'+footer);
          }
          else{
              txt +=(header+`<div class="direct-chat-text"> ${data.message[0]}</div>`+footer);
          }
        }
        else{
          if(data.message[0]=="Confirm your information again?"){
            txt +=(header+`<div class="direct-chat-text"><span>⚠️Attention! Review your inputs⚠️</span> <br><br>
              <span>FirstName : ${data.message[1]}</span><br>
              <span>MiddleName/Initial : ${data.message[2]}</span><br>
              <span>LastName : ${data.message[3]}</span><br>
              <span>Suffix : ${data.message[4]}</span><br><br>
              <span>DateOfBirth : ${data.message[5]}</span><br><br>
              <span>SSN : ${data.message[6]}</span><br><br>
              <span>Residence Address : ${data.message[7]}</span><br>
              <span>Apartment/Floor/Other : ${data.message[8]}</span><br>
              <span>City : ${data.message[9]}</span><br>
              <span>State : ${data.message[10]}</span><br>
              <span>ZipCode : ${data.message[11]}</span><br><br>
              <span>Make sure to click "Continue Application" if all of your information is correct!</span><br>
              <div class="direct-chat-text"><button  class="btn btn-warning btn-flat" onclick="send_yes()">Let me know</button><br><br><button  class="btn btn-warning btn-flat" onclick="send_no()">Continue Application</button></div>'</div>`+footer)
          }
          else if(data.message[0]=="What would you like to edit?"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt +=(header+`<div class="direct-chat-text"><button  class="btn btn-warning btn-flat" onclick="edit_firstname()">${data.message[1]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_middlename()">${data.message[2]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_lastname()">${data.message[3]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_suffix()">${data.message[4]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_dateofbirth()">${data.message[5]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_ssn()">${data.message[6]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_address()">${data.message[7]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_apart()">${data.message[8]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_city()">${data.message[9]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_state()">${data.message[10]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_zipcode()">${data.message[11]}</button>&nbsp;</div>'
            </div>`+footer)
          }
        }
          chat_history += txt;
  
          $("#direct-chat-messages").html(" ");
          $("#direct-chat-messages").html(chat_history);
          var newscrollHeight = $("#direct-chat-messages")[0].scrollHeight - 20; //Scroll height after the request
          if(newscrollHeight > oldscrollHeight){
              $("#direct-chat-messages").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
          }  
          //auto enter
          if (data.message.length==2){
            if (data.message[1]=="normal_autoPass")
            {
              AutoEnter();
            }  
          }
          else{
            
          }
            

        },
    });   
  }
  $("#message").keypress(function (e) {
    
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13'){
      chat(username,"");
    }
    
  });

$("#sendMessage").click(function(){
    chat(username,"");
});

function AutoEnter(){
  chat(username,"");
}
 
function restart(){
  chat(username,"restart");
}

function help(){
  chat(username,"help");
}
function send_yes(){
  chat(username,"yes");
}

function send_no(){
  chat(username,"no");
}

function edit_firstname(){
  chat(username,"FirstName");
}
function edit_middlename(){
  chat(username,"MiddleName");
}
function edit_lastname(){
  chat(username,"LastName");
}
function edit_suffix(){
  chat(username,"Suffix");
}
function edit_dateofbirth(){
  chat(username,"DateOfBirth");
}
function edit_ssn(){
  chat(username,"Socical Security Number");
}
function edit_address(){
  chat(username,"ResidenceAddress");
}
function edit_apart(){
  chat(username,"Apt");
}
function edit_city(){
  chat(username,"ResidenceCity");
}
function edit_state(){
  chat(username,"State");
}
function edit_zipcode(){
  chat(username,"ZipCode");
}

