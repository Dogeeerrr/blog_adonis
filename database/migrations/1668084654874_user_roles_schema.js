/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRolesSchema extends Schema {
  up() {
    this.create('user_roles', (table) => {
      table.increments()
      table.integer('user_id', 11).notNullable().index()
      table.integer('role', 11).notNullable().index()
      table.timestamps()
      table.unique(['user_id', 'role'])
    })
  }

  down() {
    this.drop('user_roles')
  }
}

module.exports = UserRolesSchema
