const Database = use('Database')
const Action = use('App/Models/Action')
const NotEditableException = use('App/Exceptions/NotEditableException')

class Permission {
  async handle({ request, auth, view }, next, args) {
    const roles = (await Database.select('role')
      .from('user_roles')
      .where('user_id', auth.user.id))
      .map(({ role }) => role)
    const permissions = await Database.select('actions')
      .from('actions')
      .whereIn('role_id', roles);
    if (permissions.map((el) => el.actions).includes(args[0])) {
      throw new NotEditableException()
    }
    return next()
  }
}

module.exports = Permission
