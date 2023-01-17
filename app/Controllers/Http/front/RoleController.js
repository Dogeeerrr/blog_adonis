/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const DatabaseServices = use('Services/DataTables')
const Database = use('Database')
const Permissions = use('Config').get('permission')
const Action = use('App/Models/Action')
const Role = use('App/Models/Role')

class RoleController {
  async index({ request, auth, view }) {
    const roles = (await Database.select('role').from('user_roles').where('user_id', auth.user.id)).map(({ role }) => role)
    const permissions = (await Database.select('actions').from('actions').whereIn('role_id', roles)).map(({ actions }) => actions);
    return view.render('admin/role', { permissions })
  }

  async list({ response, request }) {
    const databaseServices = new DatabaseServices(
      Database.from('roles').select(
        'id',
        'name',
      ),
      request.all()
    );

    const result = await databaseServices.result()
    return response.ok(result)
  }

  async edit({
    params,
    view,
    antl
  }) {
    const permissions = []
    for (const permission in Permissions) {
      permissions.push({
        name: Permissions[permission],
        key: permission
      })
    }
    if (params.id) {
      const actions = await Action.query().where('role_id', params.id).fetch()
      const actions_map = (actions.toJSON()).map(({ actions }) => actions)
      const role = await Role.findBy('id', params.id)
      return {
        title: antl.formatMessage('forms.edit'),
        body: view.render('forms.editRole', { permissions, actions: actions_map, role })
      }
    }
    return {
      title: antl.formatMessage('forms.create'),
      body: view.render('forms.createRole', { permissions })
    }
  }
}

module.exports = RoleController
