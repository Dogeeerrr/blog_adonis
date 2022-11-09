'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments()
            table.string('name', 254).notNullable()
            table.string('nickname', 80).notNullable().unique()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.boolean('can_post').defaultTo(1)
            table.text('role', 10).defaultTo('user')
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema