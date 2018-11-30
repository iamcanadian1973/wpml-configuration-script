(function (document, window, $) {

	'use strict';
    
    $( 'body.wpml_page_wpml-translation-management-menu-settings #wpbody-content .icl_tm_wrap .wpml-navigation-links')
        .after( '<div class="wpml-section wpml-section-notice"><div class="updated below-h2"><h2>Following these instructions to generate the WPML XML:</h2><p>1. Go to <a href="#ml-content-setup-sec-cf">Custom Fields Translation</a> and click "Show system fields"</p><p>2. Go to <a href="#ml-content-setup-sec-cf">Custom Fields Translation</a> and click "Display all results"</p><p>3. Right click mouse and choose "inspect element" and then view console</p><p>4. Click the button "Generate XML"</p></div></div>' ); 
    
    $( 'body.wpml_page_wpml-translation-management-menu-settings #icl_cf_translation' ).append( '<button id="generate-xml" class="button-primary">Generate XML</button>' );  
    $( "#generate-xml" ).on( "click", function(event) {
        _s_execute_xml();
        event.preventDefault();
    });

  function _s_execute_xml() {
      var xmlString;
                  
      var $rows = $('body.wpml_page_wpml-translation-management-menu-settings #icl_cf_translation .wpml-translation-setup-table .wpml-flex-table-row');
            
      if($rows.length) {
          xmlString += '<wpml-config><custom-fields><custom-field action="translate">_wp_attachment_image_alt</custom-field>';
          
          $rows.each(function(i,el) {
            var $row = $(el);
            var field_name = $row.find('.wpml-flex-table-cell.name').text();
            field_name = field_name.trim();
            
            if(field_name.startsWith('_') && ! field_name.match(/yoast$/) ) {
                //return;
            }
            
            if( field_name.match(/copy$/) || 
                field_name.match(/image_alt$/) || 
                field_name.match(/text$/) || 
                field_name.match(/caption$/) || 
                field_name.match(/header$/) ) {
              xmlString += '<custom-field action="translate">' + field_name + '</custom-field>';
            } else {
              xmlString += '<custom-field action="copy-once">' + field_name + '</custom-field>';
            }
          });
          
        xmlString += '</custom-fields></wpml-config>';
        console.log(xmlString);
      }
  }

}(document, window, jQuery));
