const DatabaseServices = use('Services/DataTables')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Database = use('Database')

class UserController {
  async index({ request, auth, view }) {
    const roles = (await Database.select('role').from('user_roles').where('user_id', auth.user.id)).map(({ role }) => role)
    const permissions = (await Database.select('actions').from('actions').whereIn('role_id', roles)).map(({ actions }) => actions);
    return view.render('admin/users', { permissions })
  }

  async list({ request, response, view }) {
    const databaseServices = new DatabaseServices(
      Database.from('users').select(
        'id',
        'name',
        'nickname',
        'email',
      ),
      request.all()
    );

    const result = await databaseServices.result()

    return response.ok(result)
  }

  async edit({ params, view }) {
    const user = await User.findBy('id', params.id)
    return {
      title: 'Edit',
      body: view.render('forms.editUser', user.toJSON())
    }
  }

  async role({ params, view, antl }) {
    const role = await Role.query().fetch()
    const user = await Database
      .select([
        'users.*',
        'user_roles.role',
        Database.raw('GROUP_CONCAT(actions.actions) AS actions')
      ])
      .where('users.id', params.id)
      .leftJoin('user_roles', 'user_roles.user_id', 'users.id')
      .leftOuterJoin('actions', 'actions.role_id', 'users.id')
      .from('users')
      .first();
    return {
      title: antl.formatMessage('tables.roles'),
      body: view.render('forms.createUsersRole', { user, roles: role.toJSON() })
    }
  }
}

module.exports = UserController
