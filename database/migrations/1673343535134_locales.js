const Schema = use('Schema')

class LocaleSchema extends Schema {
  up() {
    this.create('locales', (table) => {
      table.increments()
      table.string('locale').notNullable()
      table.text('title', 'longtext')
      table.text('content', 'longtext')
      table
        .integer('post_id', 11)
        .unsigned()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('locales')
  }
}

module.exports = LocaleSchema
