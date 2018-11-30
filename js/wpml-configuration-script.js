// this is meant to be run in the browser console
jQuery(function() {
  var old = true;
  var xmlString = '<wpml-config><custom-fields><custom-field action="translate">_wp_attachment_image_alt</custom-field>';
  var $rows = jQuery('body.wpml_page_wpml-translation-management-menu-main #icl_cf_translation table tbody tr');
  if(!$rows.length) {
    old = false;
    $rows = jQuery('body.wpml_page_wpml-translation-management-menu-settings #icl_cf_translation .wpml-flex-table-body .wpml-flex-table-row');
  }
  if($rows.length) {
    if(old) {
      $rows.each(function(i,el) {
        var $row = jQuery(el);
        var field_name = $row.find('td').first().text();
        
        if(field_name.startsWith('_') && ! field_name.match(/yoast$/) ) {
            //return;
        }
        
        if(field_name.match(/copy$/) || field_name.match(/image_alt$/)) {
          xmlString += '<custom-field action="translate">' + field_name + '</custom-field>';
        } else {
          xmlString += '<custom-field action="copy-once">' + field_name + '</custom-field>';
        }
      });
    } else {
      $rows.each(function(i,el) {
        var $row = jQuery(el);
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
    }
    xmlString += '</custom-fields></wpml-config>';
    console.log(xmlString);
  }
});
