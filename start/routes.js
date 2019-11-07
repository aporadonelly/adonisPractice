'use strict'

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

// Route.on('/').render('welcome')
Route.on('/').render('index')

Route.on('/signup').render('auth.signup')
Route.post('/signup','UserController.create').validator('CreateUser')

Route.on('/login').render('auth.login')
Route.post('/login', 'UserController.login').validator('LoginUser')

Route.get('/logout', async({response, auth})=>{
    await auth.logout()
    return response.redirect('/login')
})


//Add User route
Route.on('/add-user').render('person.add-user')
Route.post('/add-user', 'UserController.create')

//Show all user added
Route.get('/user-list', 'UserController.show')


Route.group(()=>{
    Route.get('/delete/:id', 'UserController.delete')
    Route.get('/edit/:id', 'UserController.edit')
    Route.post('/update/:id', 'UserController.update')
}).prefix('/user-list')


//add post
Route.on('/add-post').render('post.add-post')
Route.post('/add-post', 'PostController.create').validator('CreatePost')

Route.get('/post-list', 'PostController.show')

Route.get('/post-list/edit/:id', 'PostController.edit')
Route.post('/post-list/update/:id', 'PostController.update')

Route.get('/post-list/delete/:id', 'PostController.delete')