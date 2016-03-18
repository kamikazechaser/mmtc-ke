(function() {

  $(document).ready(function() {
    var $select = $('.select-class');

    $select.on('change', function() {
      return tableActivate(this);
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var selects = $(this).find('.select-class');
      if (selects.length === 0) return;
      tableActivate(selects[0]);
    })
  });

  function tableActivate(select) {
      var $option = $($(select).find('option:selected')[0]);
      $('.tab-pane.active .table-ranges.active').removeClass('active');
      $($option.data('table')).addClass('active');
  }

})();
