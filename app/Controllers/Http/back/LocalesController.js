class LocalesController {
  async locale({ response, antl, params }) {
    const locales = antl.availableLocales()
    if (locales.indexOf(params.lang) > -1) {
      response.cookie('lang', params.lang, { path: '/' })
    }
    return response.redirect('back')
  }
}
module.exports = LocalesController
