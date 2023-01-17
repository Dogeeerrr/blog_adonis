/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionsSchema extends Schema {
  up() {
    this.create('actions', (table) => {
      table.increments()
      table.integer('role_id', 11).notNullable().references('id').inTable('roles')
      table.string('actions', 254).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('actions')
  }
}

module.exports = ActionsSchema
