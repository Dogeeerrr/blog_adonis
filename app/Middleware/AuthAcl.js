/* eslint-disable max-len */
const Database = use('Database')
const Action = use('App/Models/Action')
const NotEditableException = use('App/Exceptions/NotEditableException')

class Permission {
  async handle({ request, auth, view }, next, args) {
    const roles = (await Database.select('role')
      .from('user_roles')
      .where('user_id', auth.user.id))
      .map(({ role }) => role);

    const permissions = await Database
      .from('actions')
      .pluck('actions')
      .whereIn('role_id', roles);

    view.share({
      has: (permissionsToCheck) => !!permissions.find((p) => [].concat(permissionsToCheck).includes(p))
    })
    return next()
  }
}

module.exports = Permission
