const Post = use('App/Models/Post')
const Locale = use('App/Models/Locale')
const DatabaseServices = use('Services/DataTables')
const Database = use('Database')
const Antl = use('Antl')

class PostController {
  async index({ request, auth, view }) {
    const roles = (await Database.select('role').from('user_roles').where('user_id', auth.user.id)).map(({ role }) => role)
    const permissions = (await Database.select('actions').from('actions').whereIn('role_id', roles)).map(({ actions }) => actions);
    return view.render('admin/posts', { permissions })
  }

  async list({ response, request }) {
    const databaseServices = new DatabaseServices(
      Database.select(['posts.*', 'users.name'])
        .leftJoin('users', 'posts.user_id', 'users.id').from('posts'),
      request.all()
    );

    const result = await databaseServices.result()

    response.ok(result)
  }

  async post({ view }) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .limit(3)
      .fetch();

    return view.render('blog/index', {
      posts: posts.toJSON()
    })
  }

  async blog({ request, response, view }) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .fetch()
    return view.render('blog/blog', {
      posts: posts.toJSON(),
      substr: ((e) => String(e).substr(1, 100))
    })
  }

  async show({ params, view }) {
    const result = await Post.findOrFail(params.id)
    await result.loadMany({
      user: null,
      comments: (builder) => builder.with('user').orderBy('id', 'desc'),
    })

    return view.render('blog/postSingle', { post: result.toJSON() });
  }

  async edit({
    params,
    view,
    antl
  }) {
    if (params.id) {
      const post = await Post.findBy('id', params.id)
      const antlDb = await Locale.query().where('post_id', params.id).fetch()
      return {
        title: antl.formatMessage('forms.edit'),
        body: view.render('forms.editPost', { post: post.toJSON(), antlsDb: antlDb.toJSON() })
      }
    }
    return {
      title: antl.formatMessage('forms.create'),
      body: view.render('forms.createPost')
    }
  }
}

module.exports = PostController
