$( document ).ready(function() {

// This is the beguining of SAAD's code :
// This is the beguining of SAAD's code :
// This is the beguining of SAAD's code :

    // Initialize Firebase
   var config = {
     apiKey: "AIzaSyDQTc_si8YvekLacrxRkg18wuMpyNIEcTw",
     authDomain: "project1group-558b9.firebaseapp.com",
     databaseURL: "https://project1group-558b9.firebaseio.com",
     projectId: "project1group-558b9",
     storageBucket: "project1group-558b9.appspot.com",
     messagingSenderId: "363089048268"
   };
   firebase.initializeApp(config);
 
   var database = firebase.database();
 
    
 // This is the slide animation code part : 
 
     $( "#theResults" ).hide();
     var msp=0;
     var stp=0;
     var x =0;
     var y=0;
     var mspWidth;
     var stpWidth;
     var intMsp;
     var intStp;
     var totalVotes;
     var Tmsp=50;
     var Tstp;
     var totalWidth;
 
 
 function CompareVotes() {
 
 if (totalWidth > 100 ) {
 
    
     mspWidthF = Math.floor((100/totalVotes)*msp);
     stpWidthF = Math.floor((100/totalVotes)*stp);
     mspfloor = ((100/totalVotes)*msp)-mspWidthF ;
     stpfloor = ((100/totalVotes)*stp)-stpWidthF ;
 
     console.log("floor of msp/stp :"+mspfloor,stpfloor)
 
     if (mspfloor>stpfloor) {
 
         mspWidth = Math.round((100/totalVotes)*msp);
         stpWidth = Math.floor((100/totalVotes)*stp);
 
     } else if (mspfloor<stpfloor) {
   
         mspWidth = Math.floor((100/totalVotes)*msp);
         stpWidth = Math.round((100/totalVotes)*stp);
 
     }
     else if (mspfloor === stpfloor) {
 
         if (msp>stp) {
 
             mspWidth = Math.round((100/totalVotes)*msp);
         stpWidth = Math.floor((100/totalVotes)*stp);
         } else if (stp>msp) {
 
             mspWidth = Math.floor((100/totalVotes)*msp);
         stpWidth = Math.round((100/totalVotes)*stp);
         }
     }
 }
 }
 
 
 // We retrieve data from firebase :
  database.ref("/vote").on("value", function (snapshot) {
 
    
         
       
         msp = snapshot.child("/msp").val();
         stp = snapshot.child("/stp").val();
 
         totalVotes = msp+stp;
         mspWidth = Math.round((100/totalVotes)*msp);
         stpWidth = Math.round((100/totalVotes)*stp);
         CompareVotes();
         console.log("msp/stp goes : " + msp,stp);
         totalWidth = mspWidth+stpWidth;
         console.log("mspWidth/stpWidth goes : " + mspWidth,stpWidth);
         console.log("totalVotes goes : " + totalVotes);
         console.log("totalWidht goes : " + totalWidth);
 
         
     
 
  });

// Retrieving users comments :

database.ref("/user").on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var Name = childSnapshot.val().name;
    var CommentUser = childSnapshot.val().comment;
    
// MIKE YOUNG THIS IS FOR YOU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MIKE YOUNG THIS IS FOR YOU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MIKE YOUNG THIS IS FOR YOU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var space = $("<br>")
    var nama = $("<div>").text(Name+" : ").addClass("name col-4");
    var com = $("<div>").text(CommentUser).addClass("comment col-8");
    var userDiv = $("<div>").addClass("row").append(nama,com,space);
    $("#resultsDisplayComments").append(userDiv);
    
});
  
  
     $( "#submitBtn" ).click(function() {
    
        event.preventDefault();
 
    
       $( "#theResults" ).toggle( 'slide', { direction : "up" } , 300 );
    
       $( "#castYourVote" ).hide();
 
       if ($('input[name=voteFor]:checked').val() ==="MSP") {
 
        msp++;
        database.ref("vote/msp").set(msp);
     }
    
     if ($('input[name=voteFor]:checked').val() ==="STP") {
 
         stp++;
         database.ref("vote/stp").set(stp);
     }
 
     CompareVotes();
     Tstp = Math.round((stpWidth*Tmsp)/mspWidth);
 
     console.log("This is Tstp :"+Tstp);
    
     intMsp = setInterval(progressBarMSP,Tstp);
     intStp = setInterval(progressBarSTP,Tmsp);
 
     console.log("In the submit button :"+msp,stp);

     // comments here :

     var userName = $("#userName").val().trim();
     var userComment = $("#userComment").val().trim();

    var user = {

        name : userName,
        comment : userComment
    }

    database.ref("/user").push(user);
    
    //clear the inputs :

    $("#userName").val("");
    $("#userComment").val("");
 
    
     });
 
 
 
 function progressBarMSP() {
    
     if (mspWidth === 0) {
 
         clearInterval(intMsp);
 
     }
 
     else {
 
     x+=1;
     $("#voteCountMpls").css("width",x+"%");
     // y=Math.round((x/700)*100);
     $("#voteCountMpls").text("Minneapolis "+x+"%");
 
     if (x >= mspWidth) {
         clearInterval(intMsp);
         console.log("first x :"+x);
     }
     }
 }
 
 
 function progressBarSTP() {
    
     if (stpWidth === 0) {
 
         clearInterval(intStp);
 
     }
    
     else {
     y+=1;
     $("#VoteCountStp").css("width",y+"%");
     // y2=Math.round((x2/700)*100);
     $("#VoteCountStp").text(y+"% St.Paul");
 
     if (y >= stpWidth) {
         clearInterval(intStp);
         console.log("second y :"+y);
     }
     }
 }
 
// This is the end of SAAD's code 
// This is the end of SAAD's code 
// This is the end of SAAD's code 
 
 });