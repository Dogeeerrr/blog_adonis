const Role = use('App/Models/Role')
const UserRole = use('App/Models/UserRole')

class AdminController {
  async store({ request, response, params }) {
    const { role } = request.only(['role'])
    const data = [].concat(role)
    await UserRole.createMany(data.map((el) => ({ user_id: params.id, role: el })));
    return response.redirect('/admin/manager')
  }

  async update({
    request,
    response,
    session,
    antl
  }) {
    const role = request.all()
    const data = [].concat(role.role)
    await UserRole.query().where({ user_id: role.user_id }).delete()
    await UserRole.query()
      .insert(data.map((el) => ({ user_id: role.user_id, role: el })))
    session.flash({
      message: antl.formatMessage('message.updateRights'),
      type: 'success'
    })
    return response.redirect('/admin/manager')
  }

  async delete({
    params,
    response,
    session,
    antl
  }) {
    const { id } = params;
    await UserRole.query().where('id', id).delete();

    session.flash({
      message: antl.formatMessage('message.deleteRights'),
      type: 'success'
    })
    return response.redirect('back')
  }
}

module.exports = AdminController
