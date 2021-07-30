
  var chat_history = "";
  var username = makeid(10);
  var adult = "";
  
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
        if (data.message.length==2){
          if(data.message[1]=="url"){
            txt +=(header+ `<div class="direct-chat-text"> <a href = "${data.message[0]}" target="_blank">
                          Click here</a>
                   </div>
                `+footer);
          }
          else if (data.message[1] =="normal_restart_help"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="restart()">Restart</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="help()">Help</button></div>'+footer);
          }
          else if (data.message[1] == "normal_help"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="help">Help</button> </div>'+footer);
          }
          else if(data.message[1] == "normal_check"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="check_status">Check Status</button> </div>'+footer);
          }
          else if (data.message[1]=="normal_yes_no"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="send_yes()">Yes</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="send_no()">No</button></div>'+footer);
          }
          else if(data.message[1] == "normal_language_ES"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="send_English()">English</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="send_Spanish()">Spanish</button>&nbsp;&nbsp;<button  class="btn btn-warning btn-flat" onclick="more_language()">More</button> </div>'+footer);
          }
          else if(data.message[1] == "normal_language_CK"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="send_Chinese()">Chinese</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="send_Korean()">Korean</button>&nbsp;&nbsp;<button  class="btn btn-warning btn-flat" onclick="more_language()">More</button> </div>'+footer);
          }
          else if(data.message[1] == "normal_language_JV"){ 
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt+=('<div class="button-div"><button  class="btn btn-warning btn-flat" onclick="send_Japanese()">Japanaese</button> <span>&nbsp;&nbsp;<span><button  class="btn btn-warning btn-flat" onclick="send_Vietnames()">Vietnames</button> </div>'+footer);
          }
          
          else{
              txt +=(header+`<div class="direct-chat-text"> ${data.message[0]}</div>`+footer);
          }
        }
        else if(data.message.length==3){
          if(data.message[2]=="normal_check"){
            txt+=(header+`<div class="direct-chat-text">`);

            txt+=(`<div class="button-div"><button style="white-space:normal;width:100%;" class="btn btn-warning btn-flat" onclick="lifeline_check()"> ${data.message[0]} </button><br><button style="white-space:normal;width:100%;" class="btn btn-warning btn-flat" onclick="lifeline_check()">${data.message[1]} </button> </div></div>`+footer);
          }
          if(data.message[1]=="LifelinePlans"||data.message[1]=="otherAdult"){
            txt+=(header+`<div class="direct-chat-text">${data.message[0][0]}<br>`);

            for(var i = 1;i<data.message[0].length;i++)
              {
                adult = data.message[0][i].replace(" ","");
                console.log(adult);
                txt+=(`<button style="white-space:normal;width:100%;" class="btn btn-warning btn-flat" onclick="select_option("${adult}")"> ${data.message[0][i]} </button><br>`);
              }

            txt+=(`</div>` + footer);
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
              <div class="button-div"><button  class="btn btn-warning " onclick="send_yes()">Let me know</button><br><button  class="btn btn-warning btn-flat" onclick="send_no()">Continue Application</button></div></div>`+footer)
          }
          else if(data.message[0]=="What would you like to edit?"){
            txt+=(header+`<div class="direct-chat-text"> ${data.message[0]}</div><br>`);

            txt +=(header+`<div class="direct-chat-text"><div class="button-div"><button  class="btn btn-warning btn-flat" onclick="edit_firstname()">${data.message[1]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_middlename()">${data.message[2]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_lastname()">${data.message[3]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_suffix()">${data.message[4]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_dateofbirth()">${data.message[5]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_ssn()">${data.message[6]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_address()">${data.message[7]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_apart()">${data.message[8]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_city()">${data.message[9]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_state()">${data.message[10]}</button>&nbsp;<button  class="btn btn-warning btn-flat" onclick="edit_zipcode()">${data.message[11]}</button>&nbsp;</div>
            </div></div>`+footer)
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
            if (data.message.length==3){
              if (data.message[2]=="normal_autoPass")
              {
                AutoEnter();
              }  
            }
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
function send_English(){
  chat(username,"English");
}
function send_Spanish(){
  chat(username,"Spanish");
}
function send_Chinese(){
  chat(username,"Chinese");
}
function send_Korean(){
  chat(username,"Korean");
}
function send_Vietnames(){
  chat(username,"Vietnamese");
}
function send_Japanese(){
  chat(username,"Japanese");
}
function more_language(){
  chat(username,"more languages");
}
function lifeline_check(){
  chat(username,"");
}
function check_status(){
  chat(username,"")
}
function select_option(adult){  
  console.log(adult);
  // if (data=="Parent"||data=="Child(+18)"||data=="Other Adult Relative"||data=="Adult Rommate"||data=="Other Adult"||data=="No Adult")
  chat(username,adult);
}