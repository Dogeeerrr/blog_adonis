const { ServiceProvider } = require('@adonisjs/fold')

class ServicProvider extends ServiceProvider {
  register() {
    this.app.bind('Services/DataTables', () => require('./index'))
  }
}

module.exports = ServicProvider;
