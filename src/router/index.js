import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes/router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const router =  new Router({
  mode: 'hash',
  routes,
})

export default router
