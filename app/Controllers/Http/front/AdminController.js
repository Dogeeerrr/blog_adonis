/* eslint-disable camelcase */
const DatabaseServices = use('Services/DataTables')
const Database = use('Database')
const Role = use('App/Models/Role')
const UserRole = use('App/Models/UserRole')

class AdminController {
  async index({ antl, auth, view }) {
    const roles = (await Database.select('role').from('user_roles').where('user_id', auth.user.id)).map(({ role }) => role)
    const permissions = (await Database.select('actions').from('actions').whereIn('role_id', roles)).map(({ actions }) => actions);
    return view.render('admin/manager', { permissions })
  }

  async list({ response, request }) {
    const databaseServices = new DatabaseServices(
      Database.select(['user_roles.*', 'users.*'])
        .leftJoin('users', 'user_roles.user_id', 'users.id')
        .groupBy('user_id')
        .from('user_roles'),
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
    const { id: user_id } = params;
    const roles = await Role.query().fetch();
    const user_roles = (await UserRole.query().select('role').where('user_id', user_id).fetch()).toJSON();
    return {
      title: antl.formatMessage('forms.edit'),
      body: view.render('forms.editUsersRole', { user_id, roles: roles.toJSON(), user_roles: user_roles.map(({ role }) => role) })
    }
  }
}

module.exports = AdminController
