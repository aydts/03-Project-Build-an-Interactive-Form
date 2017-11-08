//define variable
var emailAddress = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var creditCard =  /^\d{13,16}D*$/;
var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;
var errorMessage ="";



//If "other" option is selected  text field is displayed
$("#title").change(function(){
  if ($("#title").val() === "other") {
      $("#other-title").removeClass("is-hidden");
  } else {
    $("#other-title").addClass("is-hidden");
  }
});

//Only display the color options that match the design selected in the Design Menu
$('#colors-js-puns').hide();
$("#design").change(function(){
  if($("#design").val()==="js puns"){
    $("#color").val('cornflowerblue');
    $(".jsPuns").show();
    $(".heartJs").hide();
    $('#colors-js-puns').show();
  }
  else if ($("#design").val()==="heart js") {
    $("#color").val('tomato');
    $(".jsPuns").hide();
    $(".heartJs").show();
    $('#colors-js-puns').show();
  }
});

//diasble confliciting activities general function
function registerforActivities(activityId, acitiviyConflict) {
  $(".activities").change(function() {
  if ($(activityId).is(':checked')) {
      $(acitiviyConflict).prop('disabled', true).parent().css('color', '#686868');
    }  else {
      $(acitiviyConflict).prop('disabled', false).parent().css('color', '#000');
    }
  })};

//pit conflicting events head to head
function jsFrameworks () {
  return registerforActivities('#js-frameworks', '#express');
}
function express () {
  return registerforActivities('#express', '#js-frameworks');
}
function jsLibs () {
  return registerforActivities('#js-libs', '#node');
}
function node () {
  return registerforActivities('#node', '#js-libs');
}

//Creating a running total for checkboxes
function register() {
  let $runningTotal = $('<h3 class="totalDiv"></h3>').insertAfter('.activities').hide();
  $('.activities input').click(function() {
    let $total = 0;
      $('.activities input:checked').each(function(){
      $total += parseFloat($(this).val());
  });
  //displaying the div if the total is not 0
  $('.totalDiv').append().html('Total: $' + $total);
    if ($total !== 0) {
      $runningTotal.show();
    } else {
      $runningTotal.hide();
      }});}

//payment option information
$("#payment").change(function(){
   if($("#payment").val() === "credit card"){
     $("#credit-card").show();
     $("#paypal").hide();
     $("#bitcoin").hide();
   } else if ($("#payment").val() === "paypal"){
     $("#credit-card").hide();
     $("#paypal").show();
     $("#bitcoin").hide();
   } else if ($("#payment").val() === "bitcoin"){
     $("#credit-card").hide();
     $("#paypal").hide();
     $("#bitcoin").show();
   }
});

// beign form Validations
$('#name, #mail, #cc-num, #zip, #cvv, #other-field').keyup(function (){
	if ( $(this).val() === "")  {
		$(this).removeClass('success');
		$(this).addClass('error');
	} else {
		$(this).removeClass('error');
		$(this).addClass('success');
	}
});
//////////Currently Some inputs dispaly "success" class//////////////////////////
//////////However, imput field will display error ////////////////////
////////////////only after form is submitted////////////////////
$('form').prepend('<p id="error-message"></p>');
$('#error-message').hide();
$('form').submit(function (e){
	e.preventDefault();

	if ( $('#name').val() === "" ) {
		console.log("Error!");
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please ensure you have entered all required fields.";
		$('#name').addClass('error');
		$('#name').focus();
	} else if ( !emailAddress.test($('#mail').val()) ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please enter a valid email.";
		$('#mail').focus();
	} else if ( $(".activities > label > input:checked").length === 0 ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please select at least one activity.";
		$('.activities').focus();
	} else if ( $("#payment").val() === "select_method" )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please select a payment method.";
		$('#payment').focus();
	} else if ( $("#payment").val() === "credit card" && $("#cc-num").val() === "") {
    $("html, body").animate({scrollTop: 0}, "slow");
    errorMessage = "<h2>Error!</h2>Please enter a credit card number.";
    $('#cc-num').focus();
 }  else if ( $("#payment").val() === "credit card" && !creditCard.test($("#cc-num").val()) )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a number that is between 13 and 16 digits long.";
		$('#cc-num').focus();
	} else if ( $("#payment").val() === "credit card" && !zipCode.test($("#zip").val()) ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter your zip code.";
		$('#zip').focus();
	} else if ( $("#payment").val() === "credit card" && $("#cvv").val().length < 3)  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a 3 digit CVV";
		$('#cvv').focus();
	} else {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "";
		alert("Thanks for registering!");
	}
	document.getElementById('error-message').innerHTML = errorMessage;
	$('#error-message').show();
});



//run all functions
jsFrameworks ();
express ();
jsLibs ();
node ();
register();
