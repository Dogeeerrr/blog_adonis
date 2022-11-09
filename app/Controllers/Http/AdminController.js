const User = use('App/Models/User')

class AdminController {
  async index({ request, response, view }) {
    const users = await User.all();
    return view.render('admin/users', { users: users.toJSON() })
  }
}

module.exports = AdminController
