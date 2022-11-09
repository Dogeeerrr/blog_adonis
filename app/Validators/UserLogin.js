class UserLogin {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'password.required': 'Обовязкове поле',
      'email.required': 'Обовязкове поле',
      'email.email': 'Недійсна електронна адреса',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = UserLogin
