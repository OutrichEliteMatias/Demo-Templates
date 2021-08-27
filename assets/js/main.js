// GLOBALS
var editor; // global for datatables editor

// READY
jQuery(document).on( "ready", function() {
  adjustTopOffset();
});

// LOAD
jQuery(window).on( "load", function() {
  // mobileMenuEnable();
  adjustTopOffset();
  
  // mobileMenuToggle();
  mobileMenuToggleAlt();
  // mobileMenuAccordion();
  
  passwordToggle();
  passwordMatch();
  
  datepickerToggle();
  
  formBasicValidation();
  
  dataTableMethods();
  
  chartMethods();

  toastrDefaults();

  customInputDropdown();
  customDatepicker();
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
  
  jQuery('.mobile-menu-alt').css({
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

function mobileMenuToggleAlt() {
  var MobileMenu = new MobileNav({
    initElem: "nav",
    menuTitle: "",
  });
  
  jQuery('[data=mobile-menu-trigger]').on('click', function(e) {
    e.preventDefault();
    jQuery( this ).toggleClass('is-active');
    jQuery('.nav-wrapper').toggleClass('show-menu');
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
          equalTo : '#new_password'
        },

        start_date: {
          date: true
        },
        end_date: {
          date       : true,
          greaterThan: '#start_date'
        }
      },
      messages: {
          
      },
      invalidHandler: function( form ) {
        toastr["error"]("This is an error message.")

      },
      submitHandler: function( form ) {
        toastr["success"]("This is a success message.")
      }
    });
  });

  // Alphabet Only
  jQuery.validator.addMethod("alphabet", function( value, element ) {
		var result = (this.optional(element) || /[a-z]/.test(value) || /[A-Z]/.test(value)) && (!/\d/.test(value) && !/[!@#\$%\^\&*\)\(+=._-]/.test(value));
		return result;
	}, "Field must only include letters.");

  // Numbers Only
  jQuery.validator.addMethod("numbers", function( value, element ) {
		var result = (this.optional(element) || /\d/.test(value)) && (!/[a-z]/.test(value) && !/[A-Z]/.test(value) && !/[!@#\$%\^\&*\)\(+=._-]/.test(value));
		return result;
	}, "Field must only include numbers.");

  // Alphabet and Numbers Only
  jQuery.validator.addMethod("alphabet_numbers", function( value, element ) {
		var result = (this.optional(element) || /\d/.test(value) && (/[a-z]/.test(value) || /[A-Z]/.test(value))) && !/[!@#\$%\^\&*\)\(+=._-]/.test(value);
		return result;
	}, "Field must include letters and numbers.");

  // Alphabet and Special Characters Only
  jQuery.validator.addMethod("alphabet_special_chars", function( value, element ) {
		var result = (this.optional(element) || (/[a-z]/.test(value) || /[A-Z]/.test(value)) && /[!@#\$%\^\&*\)\(+=._-]/.test(value)) && !/\d/.test(value);
		return result;
	}, "Field must include letters and special characters.");

  // Numbers and Special Characters Only
  jQuery.validator.addMethod("numbers_special_chars", function( value, element ) {
		var result = (this.optional(element) || /\d/.test(value) && /[!@#\$%\^\&*\)\(+=._-]/.test(value)) && (!/[a-z]/.test(value) && !/[A-Z]/.test(value));
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



  // Password Requirements
  $(".pr-password").passwordRequirements({
    numCharacters: 8,
    useLowercase: true,
    useUppercase: true,
    useNumbers: true,
    useSpecial: true,
  });
}

function dataTableMethods() {
  var table = jQuery('table.data-table');

  editor = new $.fn.dataTable.Editor( {
    table: table,
    fields: [
      {
        label: "Name:",
        name: "name"
      },
      {
        label: "Product:",
        name: "product"
      },
      {
        label: "Serial Number:",
        name: "serial_number"
      },
      {
        label: "Date:",
        name: "date",
        type: "datetime"
      },
      {
        label: "Details:",
        name: "details"
      }
    ]
  } );
  
  // Edit record
  table.on('click', 'td.editor-edit', function (e) {
      e.preventDefault();
  
      editor.edit( $(this).closest('tr'), {
          title: 'Edit record',
          buttons: 'Update'
      } );
  } );
  
  // Delete a record
  table.on('click', 'td.editor-delete', function (e) {
      e.preventDefault();
  
      editor.remove( $(this).closest('tr'), {
          title: 'Delete record',
          message: 'Are you sure you wish to remove this record?',
          buttons: 'Delete'
      } );
  } );
  
  table.DataTable( {
      dom       : "<'buttons'B><'length-menu'l><'search'fr><'table-wrap't><'info'i><'pagination'p>",
      pageLength: 10,
      lengthMenu: [[1, 5, 10, 25, 50, -1], [1, 5, 10, 25, 50, "All"]],
      responsive: true,
      columns   : [
          { data: "name" },
          { data: "product" },
          { data: "serial_number" },
          { data: "date" },
          { data: "details" },
          {
            data          : null,
            className     : "dt-center editor-edit",
            defaultContent: '<i class="fal fa-pen"></i>',
            orderable     : false
          },
          {
            data          : null,
            className     : "dt-center editor-delete",
            defaultContent: '<i class="fal fa-trash"></i>',
            orderable     : false
          }
      ],
      select : true,
      buttons: [
        { 
          extend   : "create",
          text     : "Add New",
          className: 'btn btn-grey-lighter',
          editor   : editor
        },
        // { extend: "edit",   editor: editor },
        // { extend: "remove", editor: editor },
        { 
          extend   : "csv",
          text     : "<i class='fas fa-file-csv'></i>",
          className: 'btn btn-grey-lighter',
        },
        {
          extend   : "excel",
          text     : "<i class='fas fa-file-excel'></i>",
          className: 'btn btn-grey-lighter',
        },
        {
          extend   : "pdf",
          text     : "<i class='fas fa-file-pdf'></i>",
          className: 'btn btn-grey-lighter',
        },
        {
          extend   : "print",
          text     : "<i class='fas fa-print'></i>",
          className: 'btn btn-grey-lighter',
        },
      ]
  } );

  // INITIAL VALUES
  for (let index = 0; index < 15; index++) {
    table.DataTable().row.add( {
      "DT_RowId"     : "row_initial_" + (index + 1),
      "name"         : "John Doe",
      "product"      : "Product " + (index + 1),
      "serial_number": "ABCD-1234-EFGH-5678",
      "date"         : "2021-08-24",
      "details"      : "Lorem ipsum...",
    } ).draw();
  }
}

function chartMethods() {
  // Line Chart Start
  const line_labels = [
    'Column 1',
    'Column 2',
    'Column 3',
    'Column 4',
    'Column 5',
    'Column 6',
  ];
  const line_data = {
    labels: line_labels,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: '#336799',
        borderColor: '#336799',
        data: [0, 10, 5, 2, 20, 30],
      },
      {
        label: 'Dataset 2',
        backgroundColor: '#80c487',
        borderColor: '#80c487',
        data: [20, 15, 25, 20, 10, 12],
      },
    ]
  };
  const line_config = {
    type: 'line',
    data: line_data,
    options: {}
  };
  var lineChart = new Chart(jQuery('canvas#lineChart'), line_config);
  // Line Chart End

  // Pie Chart Start
  const pie_data = {
    labels: [
      'Dataset 1',
      'Dataset 2',
      'Dataset 3'
    ],
    datasets: [{
      label: 'Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        '#336799',
        '#80c487',
        '#ff8081'
      ],
      hoverOffset: 4
    }]
  };
  const pie_config = {
    type: 'pie',
    data: pie_data,
  };
  var pieChart = new Chart(jQuery('canvas#pieChart'), pie_config);
  // Pie Chart End

  // Bar Chart Start
  const bar_labels = [
    'Column 1',
    'Column 2',
    'Column 3',
    'Column 4',
    'Column 5',
    'Column 6'
  ];
  const bar_data = {
    labels: bar_labels,
    datasets: [{
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  const bar_config = {
    type: 'bar',
    data: bar_data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  var barChart = new Chart(jQuery('canvas#barChart'), bar_config);
  // Bar Chart End
}

function toastrDefaults() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}

function customInputDropdown() {
  dselect(document.querySelector('#select_creatable'), {
    search   : true,
    creatable: true,
    clearable: true,
    maxHeight: '360px',
    size     : '',
  });
}

function customDatepicker() {
  var datePicker = jQuery('.form-field.custom-datepicker');
  var date       = datePicker.children('.input-container.date');
  var month      = datePicker.children('.input-container.month');
  var year       = datePicker.children('.input-container.year');

  var monthSelect = month.find('select');
  var yearSelect = year.find('select');

  var startYr = 1970;
  var endYr   = 2040;

  ily = function(y) {return !(y & 3 || !(y % 25) && y & 15);};

  var monthNames = [
    { month: "January", days: 31},
    { month: "February", days: 28},
    { month: "March", days: 31},
    { month: "April", days: 30},
    { month: "May", days: 31},
    { month: "June", days: 30},
    { month: "July", days: 31},
    { month: "August", days: 31},
    { month: "September", days: 30},
    { month: "October", days: 31},
    { month: "November", days: 30},
    { month: "December", days: 31},
  ];

  // Render Year Options
  yearSelect.empty().append(function() {
    var output = '';
    output += '<option value"">Select Year</option>';
    for (let index = startYr; index <= endYr; index++) {
      output += '<option value"'+ index +'">' + index + '</option>';      
    }
    return output;
  });

  // Render Month Options
  monthSelect.empty().append(function() {
    var output = '';
    output += '<option value"">Select Month</option>';
    for (let index = 0; index < monthNames.length; index++) {
      output += '<option value"'+ monthNames[index]['month'] +'">' + monthNames[index]['month'] + '</option>';      
    }
    return output;
  });

  // Render Day On Month/Year Change
  jQuery(document).on('change', '.custom-datepicker .year select, .custom-datepicker .month select', function() {
    var currentMonth = month.find('select').val();
    var currentYear  = year.find('select').val();

    if (currentMonth != '' || currentMonth != 'Select Month') {
      for (let i = 0; i < monthNames.length; i++) {
        if (currentMonth == monthNames[i]['month']) {
          date.find('select').empty().append(function() {
            var output = '';
            output += '<option value"">Select Date</option>';

            if (currentYear != '' || currentYear != 'Select Year') {
              if (ily(currentYear)) {
                monthNames[1]['days'] = 29;
              } else {
                monthNames[1]['days'] = 28;
              }
            }

            for (let index = 1; index <= monthNames[i]['days']; index++) {
              output += '<option value"'+ index +'">' + index + '</option>';      
            }
            return output;
          });
        }
      }
    }
  });
}