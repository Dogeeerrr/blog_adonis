/* eslint-disable import/no-extraneous-dependencies */
const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'The server is down!'
const status = 500
const code = 'E_NOT_EDITABLE'

class NotEditableException extends LogicalException {
  constructor() {
    super(message, status, code)
  }
}

module.exports = NotEditableException
