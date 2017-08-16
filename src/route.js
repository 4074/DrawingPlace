import {
    HomeController,
    AuthController
} from './controllers'

export default function route(app) {
    app.use('/home', HomeController)
    app.use('/auth', AuthController)
}