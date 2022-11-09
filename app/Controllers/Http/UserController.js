const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const users = await User.all();
    return view.render('users', { users: users.toJSON() })
  }

  async index_m({ view }) {
    const users = await User.all();
    return view.render('/manager', { users: users.toJSON() })
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'nickname', 'email', 'password', 'role'])

    try {
      await User.create(data)
      session.flash({ message: 'Реєстрацію успішно завершено!', type: 'success' })
      return response.redirect('/login')
    } catch (error) {
      session.flash({ message: 'Щось пішло не так', type: 'danger' })
      return response.redirect('/login')
    }
  }

  async login({
    request,
    response,
    session,
    auth
  }) {
    const { email, password } = request.all()
    const user = (await User.findBy({ email })).toJSON();
    try {
      await auth.attempt(email, password)
      if (user.role === ' admin') {
        return response.redirect('/admin')
      }
      if (user.role === 'manager') {
        return response.redirect('/manager')
      }
      return response.redirect('/')
    } catch (error) {
      session.flash({ message: 'Неможливо виконати автентифікацію.', type: 'danger' })
      return response.redirect('back')
    }
  }

  async logout({ response, auth }) {
    await auth.logout()
    return response.redirect('/login')
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async edit({ params, response, view }) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      return response.redirect('back')
    }
    return view.render('/edit-role', {
      user: user.toJSON()
    })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response,
    session
  }) {
    const data = request.only(['role'])
    const user = await User.findBy('id', params.id)

    if (!user) {
      return response.redirect('back')
    }

    user.merge(data)
    await user.save()
    session.flash({
      message: 'Публікацію успішно оновлена!',
      type: 'success'
    })
    return response.redirect('/admin/users')
  }

  async destroy({
    params,
    response,
    session
  }) {
    const post = await User.findBy('id', params.id)
    if (!post) {
      return response.redirect('back')
    }

    await post.delete()
    session.flash({
      message: 'Користувач успішно видалено!',
      type: 'success'
    })
    return response.redirect('/admin/users')
  }
}
module.exports = UserController
