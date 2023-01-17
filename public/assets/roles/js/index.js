/* eslint-disable no-undef */
$(document).on('click', '.modal-ajax', function () {
  $.ajax({
    url: $(this).data('url'),
    type: $(this).data('method') || 'GET',
    success(response) {
      $('#modal h2').html(response.title);
      $('#modal .modal-body').html(response.body);

      $('#modal').modal('show');
    }
  })
});

$(document).on('click', '.delete', function () {
  if (confirm(role)) {
    const url = $(this).data('url')
    window.location = url
  }
});
