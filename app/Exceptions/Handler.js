const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { view, response }) {
    if (error.status === 500) {
      return response.status(500).send('Ocsss');
    }

    if (error.status === 401) {
      return response.status(301).redirect('/login');
    }

    if (error.status === 404) {
      return response.status(200).send(view.render('404'));
    }

    if (error.status === 403) {
      return response.status(403).send('У вас немає прав на цю дію');
    }
    return response.status(200).send(view.render('404'));
  }

  async report(error, { request }) {
    Logger.error(error, error)
  }
}

module.exports = ExceptionHandler;
