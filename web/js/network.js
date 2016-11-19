/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Functionality on the networks page.
 */


$(document).ready(function() {
  'use strict';

  var $notification = $('#notification');
  $notification.$wrapper = $notification.parent();
  $notification.$textError = $notification.find('.text-error');
  $notification.$textCost = $notification.find('.text-cost');
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

  $('form.cost-calculation').each(function() {
    var $form = $(this);

    // add a 'submit' handler that calculates the cost
    $form.submit(function(evt) {
      evt.preventDefault();
      var parameterArray = $form.serializeArray();
      var parameters = {};
      var cost;

      parameterArray.forEach(function(param) {
        parameters[param.name] = param.value;
      });

      try {
        cost = window.mmtcmath.calculate(window.network, parameters);
        notify(cost);
      } catch(ex) {
        notify(ex.message, false);
      }
    });
  });

  function notify(message, success) {
    if (typeof success === 'undefined') {
      success = true;
    }

    $notification.$wrapper.addClass('no-display');
    $notification.removeClass('alert-danger alert-success');

    if (success) {
      $notification.$textCost.text(message);
      $notification.addClass('alert-success');
    } else {
      $notification.$textError.text(message);
      $notification.addClass('alert-danger');
    }

    setTimeout(function() {
      $notification.$wrapper.addClass('animated bounceIn')
        .removeClass('no-display');
    }, 0);
  }
});
