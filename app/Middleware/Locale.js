class Locale {
  async handle({ request, antl }, next) {
    // call next to advance the request
    const lang = request.cookie('lang')
    if (lang) {
      antl.switchLocale(lang)
    }
    await next()
  }
}

module.exports = Locale
