// READY
jQuery(document).on( "ready", function() {
  adjustTopOffset();
});

// LOAD
jQuery(window).on( "load", function() {
  // mobileMenuEnable();
  adjustTopOffset();
  mobileMenuToggle();
  mobileMenuAccordion();
  passwordToggle();
  passwordMatch();
  datepickerToggle();
  formBasicValidation();
});

// RESIZE
jQuery(window).on( "resize", function() {
  // mobileMenuEnable();
  adjustTopOffset();
});

function adjustTopOffset() {
	var headerHeight = jQuery('header').outerHeight();

	jQuery('.mobile-menu').css({
		'top': headerHeight,
	});

  jQuery('main').css({
		'margin-top': headerHeight,
	});

}

function mobileMenuEnable() {
  var menu = jQuery('.menu');

  var query = Modernizr.mq('(min-width: 992px)');
  if (query) {
    menu.removeClass('mobile-menu');
  } else {
    menu.addClass('mobile-menu');
  }
}

function mobileMenuToggle() {
  var menu   = jQuery('.mobile-menu');
  var buttom = jQuery('[data=mobile-menu-trigger]');

  buttom.on( 'click', function(e) {
    e.preventDefault();
    jQuery( this ).toggleClass('is-active');
    menu.toggleClass('active');		
  });
}

function mobileMenuAccordion() {
  jQuery( '.mobile-menu .menu-item.has-children' ).append( "<div class='dropdown-arrow'></div>" );
  jQuery( '.dropdown-arrow' ).on( "click", function() {
    jQuery( this ).closest( ".menu-item" ).toggleClass( "active" );
    if ( jQuery( this ).closest( ".menu-item" ).hasClass( "active" ) ) {
      jQuery( this ).siblings( ".sub-menu" ).slideDown();
    } else {
      jQuery( this ).siblings( ".sub-menu" ).slideUp();
    }
  } );
}

function passwordToggle() {
  jQuery('.toggle-password').on('click', function() {
    jQuery(this).toggleClass('active');
    var input = jQuery(this).parent('.input-container').children('input');
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
}

function passwordMatch() {
  $('#confirm_password').on('change', function() {
    if ($(this).val() == $('#new_password').val()) {
      jQuery('.password-match').css({"display" : "block"});
    } else {
      jQuery('.password-match').css({"display" : "none"});
    }
  });
}

function datepickerToggle() {
  var dateToday = new Date();
  jQuery( ".datepicker" ).each(function() {
    jQuery(this).datepicker({
      altFormat: "d MM, yy",
      dateFormat: "yy-mm-dd"
    });
  });
}

function formBasicValidation() {
  $('form').each(function() {
    $(this).validate({
      rules: {
        alphabet: {
          alphabet: true
        },
        numbers: {
          numbers: true
        },
        alphabet_numbers: {
          alphabet_numbers: true
        },
        alphabet_special_chars: {
          alphabet_special_chars: true
        },
        numbers_special_chars: {
          numbers_special_chars: true
        },

        password: {
          password: true
        },
        new_password: {
          password: true
        },
        confirm_password: {
          password: true,
          equalTo  : '#new_password'
        },

        start_date: {
          date: true
        },
        end_date: {
          date: true,
          greaterThan: '#start_date'
        }
      },
      messages: {
          
      },
      submitHandler: function( form ) {
          
      }
    });
  });

  // Alphabet Only
  jQuery.validator.addMethod("alphabet", function( value, element ) {
		var result = this.optional(element) || /[a-z]/.test(value) || /[A-Z]/.test(value);
		return result;
	}, "Field must only include letters.");

  // Numbers Only
  jQuery.validator.addMethod("numbers", function( value, element ) {
		var result = this.optional(element) || /\d/.test(value);
		return result;
	}, "Field must only include numbers.");

  // Alphabet and Numbers Only
  jQuery.validator.addMethod("alphabet_numbers", function( value, element ) {
		var result = this.optional(element) || /\d/.test(value) && (/[a-z]/.test(value) || /[A-Z]/.test(value));
		return result;
	}, "Field must include letters and numbers.");

  // Alphabet and Special Characters Only
  jQuery.validator.addMethod("alphabet_special_chars", function( value, element ) {
		var result = this.optional(element) || (/[a-z]/.test(value) || /[A-Z]/.test(value)) && /[!@#\$%\^\&*\)\(+=._-]/.test(value);
		return result;
	}, "Field must include letters and special characters.");

  // Numbers and Special Characters Only
  jQuery.validator.addMethod("numbers_special_chars", function( value, element ) {
		var result = this.optional(element) || /\d/.test(value) && /[!@#\$%\^\&*\)\(+=._-]/.test(value);
		return result;
	}, "Field must include numbers and special characters.");

  // Password
  jQuery.validator.addMethod("password", function( value, element ) {
		var result = this.optional(element) || value.length >= 8 && /\d/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /[!@#\$%\^\&*\)\(+=._-]/.test(value);
		return result;
	}, "Password does not meet the requirements.");

  // Date
  jQuery.validator.addMethod("greaterThan", function(value, element, params) {
    if (!/Invalid|NaN/.test(new Date(value))) {
      return new Date(value) >= new Date($(params).val());
    }
    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val())); 
  }, 'Cannot be earlier than start date.');
}

var editor; // use a global for the submit and return data rendering in the examples
 
$(document).ready(function() {

    editor = new $.fn.dataTable.Editor( {
        "ajax": "../php/staff.php",
        "table": "#example",
        "fields": [ {
                "label": "First name:",
                "name": "first_name"
            }, {
                "label": "Last name:",
                "name": "last_name"
            }, {
                "label": "Position:",
                "name": "position"
            }, {
                "label": "Office:",
                "name": "office"
            }, {
                "label": "Extension:",
                "name": "extn"
            }, {
                "label": "Start date:",
                "name": "start_date",
                "type": "datetime"
            }, {
                "label": "Salary:",
                "name": "salary"
            }
        ]
    } );
 
    // New record
    $('a.editor-create').on('click', function (e) {
        e.preventDefault();
 
        editor.create( {
            title: 'Create new record',
            buttons: 'Add'
        } );
    } );
 
    // Edit record
    $('#example').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();
 
        editor.edit( $(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        } );
    } );
 
    // Delete a record
    $('#example').on('click', 'td.editor-delete', function (e) {
        e.preventDefault();
 
        editor.remove( $(this).closest('tr'), {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
        } );
    } );
 
    $('#example').DataTable( {
        columns: [
            { data: null, render: function ( data, type, row ) {
                // Combine the first and last names into a single table field
                return data.first_name+' '+data.last_name;
            } },
            { data: "position" },
            { data: "office" },
            { data: "extn" },
            { data: "start_date" },
            { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) },
            {
                data: null, 
                className: "dt-center editor-edit",
                defaultContent: '<i class="fa fa-pencil"/>',
                orderable: false
            },
            {
                data: null, 
                className: "dt-center editor-delete",
                defaultContent: '<i class="fa fa-trash"/>',
                orderable: false
            }
        ]
    } );
} );