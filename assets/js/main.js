// READY
jQuery(document).on( "ready", function() {
  adjustTopOffset();
});

// LOAD
jQuery(window).on( "load", function() {
  // mobileMenuEnable();
  mobileMenuToggle();
  adjustTopOffset();
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

// MOBILE MENU ADD ARROW
jQuery( '.mobile-menu .menu-item.has-children' ).append( "<div class='dropdown-arrow'></div>" );
jQuery( '.dropdown-arrow' ).on( "click", function() {
  jQuery( this ).closest( ".menu-item" ).toggleClass( "active" );
  if ( jQuery( this ).closest( ".menu-item" ).hasClass( "active" ) ) {
    jQuery( this ).siblings( ".sub-menu" ).slideDown();
  } else {
    jQuery( this ).siblings( ".sub-menu" ).slideUp();
  }
} );