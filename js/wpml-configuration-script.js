(function (document, window, $) {

	'use strict';
    
    // WPML > Settings > Multilingual Content Setup - Navigation Links (this allows us to add info to the top of the page)
    var $mcs_navigation_links = $( 'body.wpml_page_wpml-translation-management-menu-settings #wpbody-content .icl_tm_wrap .wpml-navigation-links');
    
    // WPML > Settings > Multilingual Content Setup - Custon Fields Translation Section
    var $mcs_custom_fields_translation_section = $('#ml-content-setup-sec-tcf');
    
    $mcs_navigation_links
        .after( '<div class="wpml-section wpml-section-notice"><div class="updated below-h2"><h2>Following these instructions to generate the WPML XML:</h2><p>1. Go to <a href="#ml-content-setup-sec-cf">Custom Fields Translation</a> and click "Show system fields"</p><p>2. Go to <a href="#ml-content-setup-sec-cf">Custom Fields Translation</a> and click "Display all results"</p><p>3. Right click mouse and choose "Inspect" and then view console</p><p>4. Click the <a href="#ml-content-setup-sec-generate-xml">Generate XML Button</a></p><p>5. Click the copy button inside the "Console" to grab the XML</p></div></div>' ); 
    
    $mcs_custom_fields_translation_section
        .before( '<div class="wpml-section wpml-section-tcf-translation" id="ml-content-setup-sec-generate-xml"><div class="wpml-section-header"><h3>Generate XML</h3><p>Make sure system fields are set to "show" and that "Custom Fields" are set to "Display all results"</p></div><div class="wpml-section-content wpml-section-content-wide"><p><button id="mh-generate-xml-button" class="button-primary">Generate XML</button></p><p><textarea name="mh-wpml-xml-config-copy" id="mh-wpml-xml-config-copy" rows="10" style="width: 100%";"></textarea></p></div></div>' );  
    
    $( "#mh-generate-xml-button" ).on( "click", function(event) {                    
        _s_execute_xml();
        event.preventDefault();
    });

    function _s_execute_xml() {
      var xmlString = '';
    
      var $rows = $('#icl_cf_translation > .wpml-translation-setup-table > .wpml-flex-table-body .wpml-flex-table-row' );
      
      console.log($rows.html());
            
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
        $('#mh-wpml-xml-config-copy').val(xmlString);
      }
    }

}(document, window, jQuery));
