'use strict'

class CreatePost {
  get rules () {
    return {
      // validation rules
      title: 'required:posts',
      description: 'required'
    }
  }

  get messages(){
    return{
      required: '{{field}} is required.'
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = CreatePost
