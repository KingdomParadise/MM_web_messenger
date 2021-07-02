<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Web Messenger</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css'>
    <link rel="stylesheet" type="text/css" href="custom.css">
</head>
<body>
    <div class="page-content page-container" id="page-content">
        <div class="padding">
            <div class="row container d-flex justify-content-center">
                <div class="col-md-4">
                    <div class="box box-warning direct-chat direct-chat-warning" style="height: 550px;">
                        <div class="box-header with-border">
                            <h3 class="box-title">Chat Messages</h3>
                            <div class="box-tools pull-right"> 
                                
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="direct-chat-messages" id = "direct-chat-messages">
                                
                            </div> 
                        </div>
                        <div class="box-footer">
                            <!-- <form> -->
                                <div class="input-group"> 
                                    <input type="text" id="message" name="message" placeholder="Type Message ..." class="form-control"> 
                                    <span class="input-group-btn"> 
                                        <button type="submit" class="btn btn-warning btn-flat" id = "sendMessage">
                                            Send
                                        </button> 
                                    </span> 
                                </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
    <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js'></script>
    <script src="custom.js"></script>
</html>