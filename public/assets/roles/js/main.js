/* eslint-disable no-undef */
const table = $('#customer_data').DataTable({
  processing: true,
  serverSide: true,
  paging: true,
  columns: [
    { data: 'id', name: 'roles.id' },
    { data: 'name', name: 'roles.name' },
    {
      data: 'actions',
      orderable: false,
      searchable: false,
      render: (value, tmp, data) => {
        const actions = [];
        if (permissions.includes('DELETING_ROLES')) {
          actions.push(
            `<li>
              <a href="#" class="delete" data-url="/admin/role/${data.id}/delete">${delet}</a>
             </li>
       `
          )
        }

        if (permissions.includes('EDITING_ROLES')) {
          actions.push(
            ` <li>                       
               <a href="#" class="modal-ajax" data-toggle="modal" data-target="#modal_edit" data-url="/admin/role/edit/${data.id}">${edit}</a>
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
    url: '/getRoles',
  },

})
