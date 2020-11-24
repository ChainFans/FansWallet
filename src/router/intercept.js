import router from "./index"
import { Toast } from 'vant'; 
import "../assets/style/css/load.scss"
router.beforeEach((to, from, next) => {
    // Toast.clear();

    setTimeout(() => {

        let walletData;
        if (window.plus) {
            walletData = plus.storage.getItem("walletInfo")
        } else {
            walletData = localStorage.getItem('walletInfo')
        }
    
        if (!walletData) {
            const rolesRouter = [
                '/login',
                '/register',
                '/forgetpassword',
                '/download',
                '/firstScreenLoad',
                '/linkreg',
                '/gesture_login',
                '/fingerprint',
                '/identity',
                '/addToken',
            ]
            if (!rolesRouter.find(n => n == to.path)) { 
               next('/login'); 
            } 
        }
        next()
    },30)
})


router.afterEach((to, from) => {

})