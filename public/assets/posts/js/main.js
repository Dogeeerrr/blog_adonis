/* eslint-disable no-undef */
$('#customer_data').DataTable({
  processing: true,
  serverSide: true,
  paging: true,
  columns: [
    { data: 'title', name: 'posts.title' },
    { data: 'name', name: 'users.name' },
    { data: 'created_at', name: 'posts.created_at' },
    {
      orderable: false,
      searchable: false,
      render: (value, tmp, data) => {
        const actions = [];
        if (permissions.includes('DELETING_POSTS')) {
          actions.push(
            `<li>
        <a href="#" class="delete" data-url="/posts/${data.id}/delete">${delet}</a>
       </li>
       `
          )
        }

        if (permissions.includes('EDITING_POSTS')) {
          actions.push(
            `<li>
       <a href="#" class="modal-ajax" data-toggle="modal" 
       data-target="#modal_edit" data-url="/posts/form/${data.id}">${edit}</a>
     </li>`
          )
        }
        return `<ul class="icons-list">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i class="icon-menu9"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                ${actions}
              </ul>
            </li>
          </ul>`
      }

    }
  ],
  ajax: {
    url: '/getPosts',
  },

})
