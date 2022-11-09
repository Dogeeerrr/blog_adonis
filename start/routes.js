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

Route.get('/', 'PostController.index')
Route.get('/blog', 'PostController.index_b')
Route.on('/post').render('post-single')
Route.post('/login', 'UserController.login')
Route.get('/logout', 'UserController.logout')
Route.on('/login').render('login').middleware('guest')

Route.post('/register', 'UserController.store').validator(['UserStore'])
Route.on('/register').render('register')
Route.get('/admin', 'PostController.manager_index')
Route.get('/manager_p', 'PostController.manager_index')
Route.on('/create-post').render('create-post')
Route.post('/posts/create', 'PostController.store')
Route.get('/post/:id', 'PostController.show')
Route.get('/post/:id/destroy', 'PostController.destroy')
Route.get('/post/:id/edit', 'PostController.edit')
Route.post('/post/:id/update', 'PostController.update')
Route.get('/admin/users', 'UserController.index')
Route.get('/admin/users/:id/destroy', 'UserController.destroy')
Route.get('/post/coment', 'CommentController.show')
Route.post('/posts/create/coment', 'CommentController.store')
Route.get('/admin/users', 'UserController.index')
Route.get('/admin/manadger', 'UserController.index_m')
Route.get('/admin/:id/edit', 'UserController.edit')
Route.post('/admin/:id/update', 'UserController.update')
Route.get('/manager', 'UserController.index_m')
