/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Functionality on the networks page.
 */


$(document).ready(function() {
  'use strict';

  var $select = $('.select-class');

  $select.on('change', function() {
    return tableActivate(this);
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
    var selects = $(this).find('.select-class');
    if (selects.length === 0) return;
    return tableActivate(selects[0]);
  });

  function tableActivate(select) {
    var $option = $($(select).find('option:selected')[0]);
    $('.tab-pane.active .table-ranges.active').removeClass('active');
    $($option.data('table')).addClass('active');
  }
});
