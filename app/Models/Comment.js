/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  static get table() {
    return 'comments'
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
