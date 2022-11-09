const Comment = use('App/Models/Comment')
const Helpers = use('Helpers')
class CommentController {
  async store({ request, response, }) {
    const { _csrf, ...data } = request.all()
    await Comment.create(data)

    return response.redirect('back')
  }
}

module.exports = CommentController
