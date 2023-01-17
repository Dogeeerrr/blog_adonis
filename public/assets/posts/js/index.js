/* eslint-disable no-undef */
$(document).ready(() => {
  $('#modal').on('hide.bs.modal', () => {
    tinymce.remove('#modal textarea');
  });
  $(document).on('click', '.modal-ajax', function (e) {
    e.preventDefault();

    $.ajax({
      url: $(this).data('url'),
      type: $(this).data('method') || 'GET',
      success(response) {
        tinymce.remove('#modal textarea');

        $('#modal h2').html(response.title);
        $('#modal .modal-body').html(response.body);

        tinymce.init({
          selector: '.editor',
          toolbar: `undo redo | styleselect | bold italic |
            alignleft aligncenter alignright alignjustify | 
            bullist numlist outdent indent | link image | 
            print preview media fullpage | forecolor backcolory | outdent indent`,
          plugins: 'code'
        });

        $('#modal').modal('show');
      }
    });
  });

  $(document).on('click', '.delete', function () {
    if (confirm(post)) {
      const url = $(this).data('url')
      window.location = url
    }
  });
});
