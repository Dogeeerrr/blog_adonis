const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { view, response }) {
    if (error.status === 500) {
      return response.status(500).send('OOPS. Something was wrong...');
    }

    if (error.status === 404) {
      return response.status(200).send(view.render('404'));
    }

    return response.status(200).send(view.render('404'));
  }

  async report(error, { request }) {
    Logger.error(error, error)
  }
}

module.exports = ExceptionHandler;
