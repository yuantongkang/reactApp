import AV from 'leancloud-storage'
var APP_ID = 'ngEhR7Y6r7y7CWYRGnsPlfzR-gzGzoHsz';
var APP_KEY = 'i4WgHC2o1DqbijKUaVoTiDqe';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default AV

export function signUp(email,username, password, successFn, errorFn){
    // 新建 AVUser 对象实例
   var user = new AV.User()
   // 设置用户名
   user.setUsername(username)
   // 设置密码
   user.setPassword(password)
   // 设置邮箱
   user.signUp().then(function (loginedUser) {
     let user = getUserFromAVUser(loginedUser)
     successFn.call(null, user)
   }, function (error) {
     errorFn.call(null, error)
   })
    user.setEmail(email)
   return undefined
 
 }
 export function sendPasswordResetEmail(email, successFn, errorFn){
   AV.User.requestPasswordReset(email).then(function (success) {
     successFn.call() 
   }, function (error) {
     errorFn.call(null, error)
   })
 }
 
 
 function getUserFromAVUser(AVUser){
   console.log(...AVUser.attributes)
   return {
     id: AVUser.id,
     ...AVUser.attributes
   }
 }
export function signOut(){
   AV.User.logOut()
   return undefined
 }
 export function getCurrentUser(){
   let user = AV.User.current()
   if(user){
     return getUserFromAVUser(user)
   }else{
     return null
   }
 }
 
 export function signIn(username, password, successFn, errorFn){
   AV.User.logIn(username, password).then(function (loginedUser) {
     let user = getUserFromAVUser(loginedUser)
     successFn.call(null, user)
   }, function (error) {
     errorFn.call(null, error)
   })
 }