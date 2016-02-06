$('#contact').validate({
	errorPlacement: function(error, element) {},
	rules: {
		name: {
			required: true
		},
		email: {
			required: true,
			email: true
		},
		message: {
			required: true
		},
		answer: {
			required: true,
			answerCheck: true
		}
	},
	submitHandler: function(form) {
		$('#contact :input').prop('disabled', true);
		$('.contact-form .btn-default').text('Sending...');
		$.ajax({
			url: $(form).attr('action'),
			type: $(form).attr('method'),
			data: $(form).serialize(),
			success: function(response) {
				if (response.status==200) {
					$('#contact').trigger('reset');
					setContactQuestion();	
					$('#contact-success').fadeIn();	
				} else {
					$('#contact-error').fadeIn();	
				}
				$('#contact .form-control').removeClass('valid');
				$('#contact :input').prop('disabled', false);
				$('.contact-form .btn-default').text('Send');				
			},
			error: function() {
				$('#contact-error').fadeIn();
			}
		});
		return false;
	}
});
   
function setContactAnswer(answer) {
    $.validator.addMethod('answerCheck', function (value, element) {
        return this.optional(element) || element.value == answer;
    });
}

$('.contact-form .alert button.close').click(function() {
    $('.alert').fadeOut('slow');
});
    
setContactQuestion();

function setContactQuestion() {
    var random1 = randomInt(1, 10);
    var random2 = randomInt(1, 10);
        
    document.getElementsByName('answer')[0].placeholder = 'What is ' + random1 + ' + ' + random2 + '?';
    setContactAnswer(random1 + random2);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}