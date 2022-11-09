/* eslint-disable import/no-extraneous-dependencies */
const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  handle(error, { response }) {
    response
      .status(500)
      .send('Custom exception handled!')
  }
}

module.exports = CustomException
