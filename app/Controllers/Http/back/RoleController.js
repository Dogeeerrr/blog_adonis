const Action = use('App/Models/Action')
const Role = use('App/Models/Role')

class RoleController {
  async store({ request, response }) {
    const data = request.only('name')
    const role = await Role.create(data)
    const { permission } = request.only(['permission'])
    await Action.createMany(permission.map((el) => ({ role_id: role.id, actions: el })));
    return response.redirect('/admin/role')
  }

  async update({
    params: { id },
    request,
    response,
    session,
    antl
  }) {
    const role = await Role.findBy('id', id)
    const data = request.only(['name'])
    const { permission } = request.only(['permission'])

    role.merge({ ...data })
    await role.save()
    await Action.query().where({ role_id: id }).delete()
    await Action.query()
      .insert(permission.map((el) => ({ role_id: id, actions: el })))
    session.flash({
      message: antl.formatMessage('message.updateRoles'),
      type: 'success'
    })
    return response.redirect('/admin/role')
  }

  async delete({
    params,
    response,
    session,
    antl
  }) {
    const { id } = params
    await Role.query().where('id', id).delete();
    await Action.query().where({ role_id: id }).delete()
    session.flash({
      message: antl.formatMessage('message.deleteRoles'),
      type: 'success'
    })
    return response.redirect('back')
  }
}

module.exports = RoleController
