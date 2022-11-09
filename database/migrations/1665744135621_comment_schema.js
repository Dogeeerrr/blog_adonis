'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
    up() {
        this.create('comments', (table) => {
            table.increments()
            table.text('conten').notNullable()
            table
                .integer('post_id', 11)
                .unsigned()
                .references('id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
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
        this.drop('comments')
    }
}

module.exports = CommentSchema