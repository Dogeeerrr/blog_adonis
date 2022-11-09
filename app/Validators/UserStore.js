class UserStore {
  get rules() {
    return {
      // validation rules
      name: 'required',
      nickname: 'required|unique:users,nickname',
      email: 'required|email|unique:users,email',
      password: 'required|min:6|confirmed',
    }
  }

  get messages() {
    return {
      'name.required': 'Обовязкове поле',
      'email.required': 'Обовязкове поле',
      'nickname.required': 'Обовязкове поле',
      'nickname.unique': 'Псевдонім уже існує',
      'email.email': 'Недійсна електронна адреса',
      'email.unique': 'Електронна адреса вже існує',
      'password.required': 'Обовязкове поле'
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = UserStore
