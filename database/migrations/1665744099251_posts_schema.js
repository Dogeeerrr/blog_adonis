'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
    up() {
        this.create('posts', (table) => {
            table.increments()
            table.string('title', 254).notNullable()
            table.string('slug')
            table.text('content').notNullable()

            table
                .integer('user_id', 11)
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.boolean('status').defaultTo(1)
            table.timestamps()
        })
    }

    down() {
        this.drop('posts')
    }
}

module.exports = PostsSchema