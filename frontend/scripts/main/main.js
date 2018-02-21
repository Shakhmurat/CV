
'use strict';

$(document).ready(function() {
	
	$('.btn-print-js').on('click', function() {
		window.print();
	});

	$('.editable-field-js').on('click', function(e) {		

		var	editableField = $(this),
				editableFieldVal = $(this).text().trim(),
				formGroup = $(this).siblings('.form-group'),
				input = formGroup.children('.form-control');
		
		formGroup.removeClass('hidden');
		
		input.on('keydown', function(e) {
			if (e.which == 13) {
	      if (!$(this).val()) {
	      	return false;
	      }
	      $(this).siblings('.btn-group').find('.btn-success-js, .btn-add-js').click();
	    } else if (e.which == 27) {
	    	$(this).siblings('.btn-group').find('.btn-cancel-js').click();
	    }
		});

		if ($(e.target).is('.editable-tag-js')) {
			input.focus();
			$('.tag-list').addClass('tag-list-edit');
		} else {
			input.val(editableFieldVal).focus();
		}

		$('.btn-edit-js').on('click', function() {
			
			if ($(this).is('.btn-cancel-js')) {
				$(this).parents('.form-group').addClass('hidden');
				if ($(this).parents('.header-content-editable--tag')) {
					$('.tag-list').removeClass('tag-list-edit');
				}
			} else if ($(this).is('.btn-add-js')) {

				var newTagVal = $('.new-tag-js').val(),
						skillValue = $('.select-skill-level-js').val(),
						skillLevel = (skillValue == 1) ? 'bg-black' :
												 (skillValue == 2) ? 'bg-gray-dark' :
												 										 'bg-gray-light',

						newTagItem = '<li class="tag-item '+ skillLevel +'">'
								  			    + newTagVal +
								  					'<button type="button" class="btn btn--rounded bg-danger btn-edit-js btn-remove-js">'
								  				+		'<svg class="icon-svg fill-white">'
													+			'<use xlink:href="#icon-close"></use>'
													+		'</svg>'
								  				+	'</button>'
								  				+'</li>'

				if (!newTagVal) {
					return false;
				}

				var firstMatchSkill = $('.tag-item.'+ skillLevel +'').first();
			
				if ($('.tag-item.'+ skillLevel +'').first().length) {
					firstMatchSkill.before(newTagItem);
				} else {
					$('.tag-list').append(newTagItem);
				}

				$('.new-tag-js').val('');

			}

			else if ($(this).is('.btn-remove-js')) {
				$(this).parent().remove();
			}

			else {
				if (!input.val()) {
	      	return false;
	      }
				editableField.text(input.val());
				$(this).parents('.form-group').addClass('hidden');
			}
			
		});
	});

	$('.tag-list').on('click', '.btn-remove-js', function() {
		$(this).parent().remove();
	});

	function checkObjectFitSupport (containerClass, imgSelector, bgSize, bgPosition) {
    if ('objectFit' in document.documentElement.style === false) {
	    $(containerClass).each(function () {
        var imageSource = $(this).find(imgSelector).attr('src');
        $(containerClass).find(imgSelector).css('opacity', '0');
        $(this).css({
          'background-image': 'url(' + imageSource + ')',
          'background-size': bgSize,
          'background-position': bgPosition,
          'background-repeat': 'no-repeat'
        });
      });
    }
  }

  checkObjectFitSupport('.header-img', 'img', 'cover', 'center');
  checkObjectFitSupport('.about-item-img', 'img', 'cover', 'left');

	if (navigator.userAgent.indexOf('MSIE 10.0') >= 0) {
		console.log('so sad');
		$(':root').attr('data-useragent', navigator.userAgent);
	}
  
});
