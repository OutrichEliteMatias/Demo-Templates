// GLOBALS
var editor; // global for datatables editor

// sliderMethods();

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
  
  // passwordToggle();
  // passwordMatch();
  
  // datepickerToggle();
  
  // formBasicValidation();
  
  // dataTableMethods();
  // dataTableMethodsNested();
  
  // chartMethods();

  // toastrDefaults();

  // customInputDropdown();
  // customDatepicker();
  // customFileUpload();
});

// RESIZE
jQuery(window).on( "resize", function() {
  // mobileMenuEnable();
  adjustTopOffset();
});

// PREVENT DEFAULT BEHAVIOR
$(document).on('drop dragover', function (e) {
  e.preventDefault();
});
$('.form-field.file-upload.multiple button.btn').on('click', function (e) {
  e.preventDefault();
});


// FUNCTIONS
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
  var table = jQuery('table.data-table#example');

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
  
  // Init
  table.DataTable( {
      dom       : "<'buttons'B><'length-menu'l><'search'fr><'table-wrap't><'info'i><'pagination'p>",
      pageLength: 10,
      lengthMenu: [[1, 5, 10, 25, 50, -1], [1, 5, 10, 25, 50, "All"]],
      responsive: false,
      scrollX   : true,
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
      ],
      order: [[1, 'asc']]
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

function dataTableMethodsNested() {
  var table = jQuery('table.data-table#example_nested');

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

  /* Formatting function for row details - modify as you need */
  function format_lvl_2 () {
    // `d` is the original data object for the row
    return '<table class="data-table nowrap" cellspacing="0" width="100%" id="example_nested_lvl_2">'+
      '<thead>'+
        '<tr>'+
          '<th></th>'+
          '<th>Name</th>'+
          '<th>Product</th>'+
          '<th>Serial Number</th>'+
          '<th>Date</th>'+
          '<th>Details</th>'+
          '<th></th>'+
          '<th></th>'+
        '</tr>'+
      '</thead>'+
    '</table>';
  }

  function format_lvl_3 () {
    // `d` is the original data object for the row
    return '<table class="data-table nowrap" cellspacing="0" width="100%" id="example_nested_lvl_3">'+
      '<thead>'+
        '<tr>'+
          '<th>Name</th>'+
          '<th>Product</th>'+
          '<th>Serial Number</th>'+
          '<th>Date</th>'+
          '<th>Details</th>'+
          '<th></th>'+
          '<th></th>'+
        '</tr>'+
      '</thead>'+
    '</table>';
  }
  
  // Init
  table.DataTable( {
      dom       : "<'buttons'B><'length-menu'l><'search'fr><'table-wrap't><'info'i><'pagination'p>",
      pageLength: 10,
      lengthMenu: [[1, 5, 10, 25, 50, -1], [1, 5, 10, 25, 50, "All"]],
      responsive: false,
      scrollX   : true,
      columns   : [
          {
            data          : null,
            className     : 'dtr-control details-control',
            defaultContent: '',
            orderable     : false,
          },
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
      ],
      order: [[1, 'asc']]
  } );

  // INITIAL VALUES - LVL 1
  for (let index = 0; index < 10; index++) {
    table.DataTable().row.add( {
      "DT_RowId"     : "row_initial_" + (index + 1),
      "name"         : "John Doe 1",
      "product"      : "Product " + (index + 1),
      "serial_number": "ABCD-1234-EFGH-5678",
      "date"         : "2021-08-24",
      "details"      : "Lorem ipsum...",
    } ).draw();
  }

  // Add event listener for opening and closing details
  // LEVEL 2
  $('#example_nested tbody').on('click', 'td.details-control', function () {
    var tr  = $(this).closest('tr');
    var row = table.DataTable().row( tr );

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    }
    else {
      // Open this row
      row.child( format_lvl_2() ).show();

      var table_lvl_2 = row.child().find('table.data-table#example_nested_lvl_2');

      editor2 = new $.fn.dataTable.Editor( {
        table: table_lvl_2,
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
      table_lvl_2.on('click', 'td.editor-edit-2', function (e) {
        e.preventDefault();

        editor2.edit( $(this).closest('tr'), {
          title  : 'Edit record',
          buttons: 'Update'
        } );
      } );

      // Delete a record
      table_lvl_2.on('click', 'td.editor-delete-2', function (e) {
        e.preventDefault();

        editor2.remove( $(this).closest('tr'), {
          title  : 'Delete record',
          message: 'Are you sure you wish to remove this record?',
          buttons: 'Delete'
        } );
      } );

      // Init
      table_lvl_2.DataTable( {
        dom       : "<'buttons'B><'length-menu'l><'search'fr><'table-wrap't><'info'i><'pagination'p>",
        pageLength: 5,
        lengthMenu: [[1, 5, 10, 25, 50, -1], [1, 5, 10, 25, 50, "All"]],
        responsive: false,
        scrollX   : true,
        columns   : [
            {
              data          : null,
              className     : 'dtr-control detailz-control',
              defaultContent: '',
              orderable     : false,
            },
            { data: "name" },
            { data: "product" },
            { data: "serial_number" },
            { data: "date" },
            { data: "details" },
            {
              data          : null,
              className     : "dt-center editor-edit-2",
              defaultContent: '<i class="fal fa-pen"></i>',
              orderable     : false
            },
            {
              data          : null,
              className     : "dt-center editor-delete-2",
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
            editor   : editor2
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
        ],
        order: [[1, 'asc']],
      } );

      // INITIAL VALUES - LVL 2
      for (let index = 0; index < 10; index++) {
        table_lvl_2.DataTable().row.add( {
          "DT_RowId"     : "row_initial_2_" + (index + 1),
          "name"         : "Jane Doe 2",
          "product"      : "Product " + (index + 1),
          "serial_number": "ABCD-1234-EFGH-5678",
          "date"         : "2021-08-24",
          "details"      : "Lorem ipsum...",
        } ).draw();
      }
      
      tr.addClass('shown');

      // LEVEL 3
      $('#example_nested_lvl_2 tbody').on('click', 'td.detailz-control', function () {
        var tr  = $(this).closest('tr');
        var row = table_lvl_2.DataTable().row( tr );

        if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
        } else {
          // Open this row
          row.child( format_lvl_3() ).show();

          var table_lvl_3 = row.child().find('table#example_nested_lvl_3');

          editor3 = new $.fn.dataTable.Editor( {
            table: table_lvl_3,
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
          table_lvl_3.on('click', 'td.editor-edit-3', function (e) {
            e.preventDefault();

            editor3.edit( $(this).closest('tr'), {
              title  : 'Edit record',
              buttons: 'Update'
            } );
          } );

          // Delete a record
          table_lvl_3.on('click', 'td.editor-delete-3', function (e) {
            e.preventDefault();

            editor3.remove( $(this).closest('tr'), {
              title  : 'Delete record',
              message: 'Are you sure you wish to remove this record?',
              buttons: 'Delete'
            } );
          } );

          // Init
          table_lvl_3.DataTable( {
            dom       : "<'buttons'B><'length-menu'l><'search'fr><'table-wrap't><'info'i><'pagination'p>",
            pageLength: 5,
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
                  className     : "dt-center editor-edit-3",
                  defaultContent: '<i class="fal fa-pen"></i>',
                  orderable     : false
                },
                {
                  data          : null,
                  className     : "dt-center editor-delete-3",
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
                editor   : editor3
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
            ],
            order: [[1, 'asc']],
          } );

          // INITIAL VALUES - LVL 3
          for (let index = 0; index < 10; index++) {
            table_lvl_3.DataTable().row.add( {
              "DT_RowId"     : "row_initial_3_" + (index + 1),
              "name"         : "Jack Doe 3",
              "product"      : "Product " + (index + 1),
              "serial_number": "ABCD-1234-EFGH-5678",
              "date"         : "2021-08-24",
              "details"      : "Lorem ipsum...",
            } ).draw();
          }
          
          tr.addClass('shown');
        }

      });
    }
  } );
  
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

function customFileUpload() {
  $('.fileupload').fileupload({});

  $('#fileupload').fileupload('option', {
    dataType                : 'json',
    singleFileUploads       : false,
    limitMultiFileUploads   : 1,
    limitMultiFileUploadSize: 3000,
    acceptFileTypes         : /(\.|\/)(gif|jpe?g|png)$/i,
    dropZone                : null,
    add: function(e, data) {
      jQuery(this).parent('.input-container').find('.file').remove();

      data.context = jQuery('<p class="file">');
      data.context.append(jQuery('<a target="_blank">').text(data.files[0].name))
      data.context.append(jQuery('<span>').text('File Uploading...'))
      data.context.appendTo(jQuery(this).parent());
      data.submit();

    },
    progress: function(e, data) {
      var progress = parseInt((data.loaded / data.total) * 100, 10);
      data.context.css('background-position-x', 100 - progress + '%');
      data.context.find('span').text(0 + progress + '%');
    },
    done: function(e, data) {
      data.context.addClass('done');
      data.context.find('a').prop('href', data.result.files[0].url);
      data.context.find('span').text('File Uploaded!');
  
      jQuery(this).closest('.form-field').children('.profile-pic').css('background-image', 'url("' + data.result.files[0].url + '")');
    }
  });

  $('#fileupload_multiple').fileupload('option', {
    dataType                : 'json',
    singleFileUploads       : false,
    limitMultiFileUploadSize: 3000,
    acceptFileTypes         : /(\.|\/)(gif|jpe?g|png)$/i,
    dropZone: function(e, data) {
      var field          = jQuery(this);
      var fieldContainer = field.parent('.input-container').parent('.form-field');

      return fieldContainer;
    },
    add: function(e, data) {
      data.context = jQuery('<p class="file">');
      data.context.append(jQuery('<span class="button">'))
      data.context.append(jQuery('<a target="_blank">').text(data.files[0].name))
      data.context.append(jQuery('<span>').text('File Uploading...'))
      data.context.appendTo(jQuery(this).parent());
      data.submit();
    },
    progress: function(e, data) {
      var progress = parseInt((data.loaded / data.total) * 100, 10);
      data.context.css('background-position-x', 100 - progress + '%');
      data.context.find('span:not(.button)').text(0 + progress + '%');
    },
    done: function(e, data) {
      data.context.addClass('done');
      data.context.find('a').prop('href', data.result.files[0].url);
      data.context.find('span:not(.button)').text('File Uploaded!');
  
      jQuery(this).closest('.form-field').children('.profile-pic').css('background-image', 'url("' + data.result.files[0].url + '")');

      customFileUpload_Multiple_ChangeProfilePic();
    }
  });
}

function customFileUpload_Multiple_ChangeProfilePic() {
  var buttons = jQuery('.form-field.file-upload.multiple .file')

  buttons.each(function () {
    jQuery(this).find('span.button').on('click', function() {
      buttons.removeClass('selected');
      buttons.find('span.button').removeClass('active');
      jQuery(this).parent().addClass('selected');
      jQuery(this).addClass('active');
    });
  });

  var chooseBtn = jQuery('.form-field.file-upload.multiple .btn.choose');
  var cancelBtn = jQuery('.form-field.file-upload.multiple .btn.cancel');

  // chooseBtn.on('click', function() {
  //   var target = jQuery(this).data('target');
  //   var url    = jQuery('.form-field.file-upload.multiple .file.selected a').attr('href');

  //   jQuery(target).css('background-image', 'url("' + url + '")');
  // });

  cancelBtn.on('click', function() {
    var target = jQuery('.form-field.file-upload.multiple .file.selected');

    // NEEDS TO BE CHANGED FOR PLACEHOLDER PATH
    var url = 'https://via.placeholder.com/150';

    // jQuery(target).css('background-image', 'url("' + url + '")');
    target.remove();
  });


}

function sliderMethods() {
  var sliders = jQuery('.slider');
  if ( sliders.length > 0 ) {
    jQuery.each( sliders, function ( index, value ) {
      var sliderItems       = jQuery(this).data( 'items' ),
          sliderAutoPlay    = jQuery(this).data( 'autoplay' ),
          sliderLoop        = jQuery(this).data( 'loop' ),
          sliderSpeed       = jQuery(this).data( 'slide-speed' ) ? jQuery(this).data( 'slide-speed' ) : "300",                        // slide change transition speed
          sliderTransition  = jQuery(this).data( 'time-before-slide' ) ? jQuery(this).data( 'time-before-slide' ) + "000" : "8000",   // autoplay slide change transition speed
          slideCount        = jQuery(this).data( 'slide-count' ) ? jQuery(this).data( 'slide-count' ) : 'page',                       // number of slides to show in one click
          centerSlides      = jQuery(this).data( 'center-slides' ),                                                                   // center the slides
          controls          = jQuery(this).data( 'controls' ),                                                                        // enable next prev buttons
          sliderNav         = jQuery(this).data( 'slider-nav' ),                                                                      // enable slider nav dots
          mouseDrag         = jQuery(this).data( 'mousedrag' ),                                                                       // enable mouse drag
          edgePadding       = jQuery(this).data( 'edge-padding' ),                                                                    // outside space -- panghatak sa elements
          autoWidth         = jQuery(this).data( 'auto-width' ),                                                                      // auto width items
          startIndex        = jQuery(this).data( 'start-index' ),                                                                     // slider start
          responsiveOptions = jQuery(this).data( 'responsive-options' );

      var slider = tns( {
        container           : value,
        items               : sliderItems,
        autoplay            : sliderAutoPlay,
        startIndex          : startIndex,         // slider start
        loop                : sliderLoop,
        speed               : sliderSpeed,        // slide change transition speed
        mouseDrag           : mouseDrag,          // enable mouse drag
        center              : centerSlides,       // center the slides
        edgePadding         : edgePadding,        // outside space -- panghatak sa elements
        autoWidth           : autoWidth,          // auto width items
        slideBy             : slideCount,         // number of slides to show in one click
        controls            : controls,           // enable next prev buttons
        controlsText        : ['<i class="far fa-chevron-left"></i>', '<i class="far fa-chevron-right"></i>'],
        controlsPosition    : 'bottom',           // position of the prev next buttons
        nav                 : sliderNav,          // enable slider nav dots
        navPosition         : 'bottom',           // position of the nav dots
        autoplayPosition    : 'bottom',           // autoplay button position
        autoplayButtonOutput: false,              // hide autoplay button
        autoplayTimeout     : sliderTransition,   // autoplay slide change transition speed
        responsive          : responsiveOptions   // responsive options declared
      } );
    } )
  }


  var sliderAlt = jQuery('.slider-alt');
  if ( sliders.length > 0 ) {
    jQuery.each( sliderAlt, function ( index, value ) {
      var sliderItems       = jQuery(this).data( 'items' ),
          sliderAutoPlay    = jQuery(this).data( 'autoplay' ),
          sliderLoop        = jQuery(this).data( 'loop' ),
          sliderSpeed       = jQuery(this).data( 'slide-speed' ) ? jQuery(this).data( 'slide-speed' ) : "300",                        // slide change transition speed
          sliderTransition  = jQuery(this).data( 'time-before-slide' ) ? jQuery(this).data( 'time-before-slide' ) + "000" : "8000",   // autoplay slide change transition speed
          slideCount        = jQuery(this).data( 'slide-count' ) ? jQuery(this).data( 'slide-count' ) : 'page',                       // number of slides to show in one click
          centerSlides      = jQuery(this).data( 'center-slides' ),                                                                   // center the slides
          controls          = jQuery(this).data( 'controls' ),                                                                        // enable next prev buttons
          sliderNav         = jQuery(this).data( 'slider-nav' ),                                                                      // enable slider nav dots
          mouseDrag         = jQuery(this).data( 'mousedrag' ),                                                                       // enable mouse drag
          edgePadding       = jQuery(this).data( 'edge-padding' ),                                                                    // outside space -- panghatak sa elements
          autoWidth         = jQuery(this).data( 'auto-width' ),                                                                      // auto width items
          startIndex        = jQuery(this).data( 'start-index' ),                                                                     // slider start
          responsiveOptions = jQuery(this).data( 'responsive-options' );
    
      var slider = tns( {
        container           : value,
        items               : sliderItems,
        autoplay            : sliderAutoPlay,
        startIndex          : startIndex,         // slider start
        loop                : sliderLoop,
        speed               : sliderSpeed,        // slide change transition speed
        mouseDrag           : mouseDrag,          // enable mouse drag
        center              : centerSlides,       // center the slides
        edgePadding         : edgePadding,        // outside space -- panghatak sa elements
        autoWidth           : autoWidth,          // auto width items
        slideBy             : slideCount,         // number of slides to show in one click
        controls            : controls,           // enable next prev buttons
        controlsText        : ['<i class="far fa-chevron-left"></i>', '<i class="far fa-chevron-right"></i>'],
        controlsPosition    : 'bottom',           // position of the prev next buttons
        nav                 : sliderNav,          // enable slider nav dots
        navPosition         : 'bottom',           // position of the nav dots
        autoplayPosition    : 'bottom',           // autoplay button position
        autoplayButtonOutput: false,              // hide autoplay button
        autoplayTimeout     : sliderTransition,   // autoplay slide change transition speed
        responsive          : {                  // responsive options declared
          480 : {
            'items': 2,
          },
          768 : {
            'items': 3,
          },
          992 : {
            'items': 4,
          },
        }
      } );
    });
  }

  jQuery('.heart').on('click', function() {
    jQuery(this).toggleClass('active');
  });
}