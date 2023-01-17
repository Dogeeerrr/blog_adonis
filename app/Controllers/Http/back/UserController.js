const User = use('App/Models/User')
const UserRole = use('App/Models/UserRole')

class UserController {
  async store({ request, response, session }) {
    const data = request.only(['name', 'nickname', 'email', 'password'])

    await User.create(data)
    session.flash({ message: 'Реєстрацію успішно завершено!', type: 'success' })
    return response.redirect('/login')
  }

  async login({
    request,
    response,
    session,
    auth
  }) {
    const { email, password } = request.all()
    const user = (await User.findBy({ email })).toJSON();
    const { role } = await UserRole.query().where({ user_id: user.id }).first();
    try {
      await auth.attempt(email, password)
      if (role) {
        return response.redirect('/admin')
      }
      return response.redirect('/')
    } catch (error) {
      session.flash({ message: 'Неможливо виконати аутентифікацію.', type: 'danger' })
      return response.redirect('back')
    }
  }

  async logout({ response, auth }) {
    await auth.logout()
    return response.redirect('/login')
  }

  async update({
    request,
    params,
    response,
    session,
    antl
  }) {
    const data = request.only(['name', 'nickname', 'email', 'password'])
    const user = await User.findBy('id', params.id)
    user.merge({ ...data })
    await user.save()
    session.flash({
      message: antl.formatMessage('message.updateUsers'),
      type: 'success'
    })
    return response.redirect('/admin/users')
  }

  async delete({
    params,
    response,
    session,
    antl
  }) {
    const { id } = params;

    await User.query().where('id', id).delete();

    session.flash({
      message: antl.formatMessage('message.deleteUsers'),
      type: 'success'
    })

    return response.redirect('back');
  }
}

module.exports = UserController
