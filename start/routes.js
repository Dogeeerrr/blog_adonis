/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Acciss = use('Config').get('permission')

Route.get('/', 'front/PostController.post')
Route.get('/blog', 'front/PostController.blog').middleware('auth')
Route.get('/post/:id', 'front/PostController.show')
Route.post('/posts/create/coment', 'back/CommentController.store')
Route.post('/login', 'back/UserController.login')
Route.get('/logout', 'back/UserController.logout')
Route.on('/login').render('login')
Route.post('/register', 'back/UserController.store').validator(['UserStore'])
Route.on('/register').render('register')

Route.group(() => {
  Route.get('/admin', 'front/PostController.index')
  Route.get('/admin/manager', 'front/AdminController.index')
  Route.get('/admin/role', 'front/RoleController.index')
  Route.get('/admin/users', 'front/UserController.index')
  Route.on('/admin/role/create').render('admin/editRole').middleware(['auth', `checkPermission:${Acciss.CREATE_ROLES}`])

  Route.get('/getPosts', 'front/PostController.list')
  Route.get('/getUsers', 'front/UserController.list')
  Route.get('/getManag', 'front/AdminController.list')
  Route.get('/getRoles', 'front/RoleController.list')

  Route.get('/switch/:lang', 'back/LocalesController.locale')

  Route.get('/user/:id', 'front/UserController.edit').middleware(['auth', `checkPermission:${Acciss.EDITING_USERS}`])
  Route.get('/posts/form/', 'front/PostController.edit').middleware(['auth', `checkPermission:${Acciss.CREATE_POSTS}`])
  Route.get('/posts/form/:id', 'front/PostController.edit').middleware(['auth', `checkPermission:${Acciss.EDITING_POSTS}`])
  Route.get('/admin/role/edit', 'front/RoleController.edit').middleware(['auth', `checkPermission:${Acciss.EDITING_ROLES}`])
  Route.get('/admin/role/edit/:id', 'front/RoleController.edit').middleware(['auth', `checkPermission:${Acciss.CREATE_ROLES}`])
  Route.get('admin/edit/:id', 'front/AdminController.edit').middleware(['auth', `checkPermission:${Acciss.EDITING_MANAGERS}`])
  Route.get('edit/:id', 'front/UserController.role')

  Route.post('/posts/create', 'back/PostController.store').middleware(['auth', `checkPermission:${Acciss.EDITING_MANAGERS}`])
  Route.post('/admin/role/create', 'back/RoleController.store').middleware(['auth', `checkPermission:${Acciss.CREATE_ROLES}`])
  Route.post('/admin/usersRole/:id', 'back/AdminController.store').middleware(['auth', `checkPermission:${Acciss.EDITING_MANAGERS}`])

  Route.get('/admin/user/:id/delete', 'back/UserController.delete').middleware(['auth', `checkPermission:${Acciss.DELETING_USERS}`])
  Route.get('/posts/:id/delete', 'back/PostController.delete').middleware(['auth', `checkPermission:${Acciss.DELETING_POSTS}`])
  Route.get('/admin/role/:id/delete', 'back/RoleController.delete').middleware(['auth', `checkPermission:${Acciss.DELETING_ROLES}`])
  Route.get('/admin/manager/:id/delete', 'back/AdminController.delete').middleware(['auth', `checkPermission:${Acciss.DELETING_MANAGERS}`])

  Route.post('/posts/:id/update', 'back/PostController.update')
  Route.post('/admin/users/:id/update', 'back/UserController.update')
  Route.put('/admin/role/update/:id', 'back/RoleController.update')
  Route.put('/admin/usersRole/update/:id', 'back/AdminController.update')
}).middleware(['auth', 'AuthAcl'])
