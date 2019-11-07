'use strict'

const Post = use('App/Models/Post')

class PostController {
    async create({request, response, session, auth}){
        await Post.create(request.only(['title', 'description']))
        
        session.flash({message:'Post has been created!'})
        return response.redirect('back')
    }
    
    // async showToAll({view}){
    //     const posts = await Post.all()        
    //     return view.render('post.post-list', { posts: posts.toJSON() })
    // }
    async show({view, auth}){
        const posts = await auth.user.posts().fetch()
        return view.render('post.post-list', {posts: posts.toJSON()})
    }

    async edit({view, params}){
        const post = await Post.find(params.id)
        return view.render('post.edit-post', {post:post})
    }
    async update({params, request, session, response}){
        const post = await Post.find(params.id)

        post.title = request.input('title'),
        post.description = request.input('description'),

        await post.save()

        session.flash({message: 'Post has been updated!'})
        return response.redirect('back')
    }

    async delete({params, session, response}){
        const post = await Post.find(params.id)
        await post.delete()

        session.flash({message: 'Post deleted!'})
        return response.redirect('back')
    }
 
}

module.exports = PostController
