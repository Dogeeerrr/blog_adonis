/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
  static get table() {
    return 'roles'
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Role
