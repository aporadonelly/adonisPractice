'use strict'

const User = use('App/Models/User')

class UserController {
    async create({request, response, auth, session}){
        const user = await User.create(request.only([
            'firstname',
            'lastname',
            'email',
            'username',
            'password'
        ]))
        session.flash({message: 'User has been created. '})
        return response.redirect('/login')        
    }

    async login({request, response, auth, session}){
        const {email, password} = request.all();

        try{
            await auth.attempt(email, password)
            return response.redirect('/')
        }catch(error){
            session.flash({loginError:'Given credentials do not exists.'})
            return response.redirect('back')
        }
    }


    // to show all users
    async show({view}){
        const users = await User.all()
        return view.render('person.user-list', {users: users.toJSON()})
    }

    //to delete specific user
    async delete({response, session, params}){
        const user = await User.find(params.id)

        await user.delete()

        session.flash({message: 'User has been removed!'})
        return response.redirect('back')
    }

    //to edit 
    async edit({view, params}){
        const user = await User.find(params.id)
        return view.render('person.edit', {user:user})
    }

    async update({params, session, response, request}){
        const user = await User.find(params.id)

        user.firstname = request.all().firstname,
        user.lastname = request.all().lastname,
        user.username = request.all().username,
        user.email = request.all().email,
        user.password = request.all().password

        await user.save()

        session.flash({message: 'User has been updated!'})
        return response.redirect('back')
    }
}

module.exports = UserController
