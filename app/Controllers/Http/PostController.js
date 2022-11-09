// eslint-disable-next-line import/no-extraneous-dependencies
const Post = use('App/Models/Post')
const CustomException = use('App/Exceptions/CustomException')
const Helpers = use('Helpers')

class PostController {
  async index({ view }) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .limit(3)
      .fetch();

    return view.render('index', {
      posts: posts.toJSON()
    })
  }

  async index_b({ request, response, view }) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .fetch()
    return view.render('blog', {
      posts: posts.toJSON(),
      substr: ((e) => String(e).substr(1, 100))
    })
  }

  async manager_index({ request, response, view }) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .fetch()
    return view.render('manager-posts', {
      posts: posts.toJSON()
    })
  }

  async store({
    request,
    response,
    session,
    view
  }) {
    const data = request.only(['title', 'content'])
    const post = new Post();

    const myPicture = request.file('image', {
      types: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb'
    })

    data.image = `${new Date().getTime()}.${myPicture.subtype}`;

    await myPicture.move(Helpers.publicPath('uploads/post'), {
      name: data.image
    });

    if (!myPicture.moved()) {
      session.withErrors([{
        field: 'image',
        message: myPicture.error().message
      }]).flashAll()

      return view.render('post-single', { post: data });
    }

    await post.merge(data)

    session.flash({ message: 'Публікацію успішно створено!', type: 'success' })

    return response.redirect('/admin')
  }

  async show({ params, view }) {
    const result = await Post.findOrFail(params.id)
    await result.loadMany({
      user: null,
      comments: (builder) => builder.with('user').orderBy('id', 'desc'),
    })

    return view.render('post-single', { post: result.toJSON() });
  }

  async edit({ params, response, view }) {
    const post = await Post.findBy('id', params.id)

    if (!post) {
      return response.redirect('back')
    }
    return view.render('/edit-post', {
      post: post.toJSON()
    })
  }

  async update({
    params,
    request,
    response,
    session
  }) {
    const data = request.only(['title', 'content'])
    const post = await Post.findBy('id', params.id)
    const myPicture = request.file('image', {
      types: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb'
    })

    if (!post) {
      return response.redirect('back')
    }

    const imageName = `${new Date().getTime()}.${myPicture.subtype}`
    await myPicture.move(Helpers.publicPath('uploads/post'), {
      name: imageName
    })

    post.merge({ ...data, image: imageName })
    await post.save()
    session.flash({
      message: 'Публікацію успішно оновлена!',
      type: 'success'
    })
    return response.redirect('/admin')
  }

  async destroy({ params, response, session }) {
    const post = await Post.findBy('id', params.id)
    if (!post) {
      return response.redirect('back')
    }

    await post.delete()
    session.flash({
      message: 'Публікацію успішно видалено!',
      type: 'success'
    })
    return response.redirect('/admin')
  }
}

module.exports = PostController
