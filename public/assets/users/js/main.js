/* eslint-disable no-undef */
const table = $('#customer_data').DataTable({
  processing: true,
  serverSide: true,
  paging: true,
  columns: [
    { data: 'name', name: 'users.name' },
    { data: 'nickname', name: 'users.nickname' },
    { data: 'email', name: 'users.email' },
    {
      data: 'actions',
      orderable: false,
      searchable: false,
      render: (value, tmp, data) => {
        const actions = [];
        if (permissions.includes('DELETING_USERS')) {
          actions.push(
            `<li>
              <a href="#" class="delete" data-url="user/${data.id}/delete">${delet}</a>
             </li>
       `
          )
        }

        if (permissions.includes('EDITING_USERS')) {
          actions.push(
            ` <li>
               <a href="#" class="modal-ajax" data-toggle="modal" data-target="#modal_edit" data-url="/user/${data.id}">${edit}</a>
              </li>`
          )
        }
        if (permissions.includes('GRANT_OF_RIGHTS')) {
          actions.push(
            ` <li>
               <a href="#" class="modal-ajax" data-toggle="modal" data-target="#modal_edit" data-url="/edit/${data.id}">${roles}</a>
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
    url: '/getUsers',
  },

})
