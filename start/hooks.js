const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const View = use('View')

  // eslint-disable-next-line no-shadow
  View.global('actionsInLine', ({ actions }) => actions.map(({ actions }) => actions).join(', '))

  View.global('permissions', () => {
    this.app.get('config/permission')
  })

})
