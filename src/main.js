import App from './server/app.js'
const app = new App()

const puerto = 8080
const server = app.app.listen(puerto, () => {
    // eslint-disable-next-line no-console
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})