const Post = use('App/Models/Post')
const Locale = use('App/Models/Locale')
const Helpers = use('Helpers')

class PostController {
  async store({
    request,
    response,
    session,
    view,
    auth
  }) {
    const { title, content } = request.only(['title', 'content'])
    const { titleEn, contentEn } = request.only(['titleEn', 'contentEn'])
    const { titleUa, contentUa } = request.only(['titleUa', 'contentUa'])

    const myPicture = request.file('image', {
      types: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb'
    })

    const data = {
      title,
      content,
      user_id: auth.user.id,
      image: `${new Date().getTime()}.${myPicture.subtype}`
    }

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

    const post = await Post.create(data)

    const dataEn = {
      locale: 'en',
      title: titleEn,
      content: contentEn,
      post_id: post.id
    }
    const dataUa = {
      locale: 'ua',
      title: titleUa,
      content: contentUa,
      post_id: post.id
    }
    console.log(dataEn);
    if (dataEn.title !== null || dataEn.title !== null) await Locale.create(dataEn);
    if (dataUa.title !== null || dataUa.title !== null) await Locale.create(dataUa);

    return response.redirect('/admin')
  }

  async update({
    params,
    request,
    response,
    session,
    antl
  }) {
    const { en, ua } = request.only(['en', 'ua']);
    const data = request.only(['title', 'content'])
    const post = await Post.findBy('id', params.id)

    const myPicture = request.file('image', {
      types: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb'
    })

    const imageName = `${new Date().getTime()}.${myPicture.subtype}`
    await myPicture.move(Helpers.publicPath('uploads/post'), {
      name: imageName
    })

    const dataEn = {
      locale: 'en',
      post_id: post.id,
      ...en
    }
    const dataUa = {
      locale: 'ua',
      post_id: post.id,
      ...ua
    }

    await Locale.query().where({ post_id: params.id }).delete()

    post.merge({ ...data, image: imageName })
    await post.save()
    await Locale.create(dataEn);
    await Locale.create(dataUa);
    session.flash({
      message: antl.formatMessage('message.updatePosts'),
      type: 'success'
    })
    return response.redirect('/admin')
  }

  async delete({
    params,
    response,
    session,
    antl
  }) {
    const { id } = params;

    await Post.query().where('id', id).delete();

    await Locale.query().where({ post_id: id }).delete()
    session.flash({
      message: antl.formatMessage('message.deletePosts'),
      type: 'success'
    });

    return response.redirect('/admin');
  }
}

module.exports = PostController
