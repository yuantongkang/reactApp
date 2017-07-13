import AV from 'leancloud-storage'
var APP_ID = 'ngEhR7Y6r7y7CWYRGnsPlfzR-gzGzoHsz';
var APP_KEY = 'i4WgHC2o1DqbijKUaVoTiDqe';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default AV
export const TodoModel = {
  getByUser(user, successFn, errorFn){
     // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
     let query = new AV.Query('Todo')
     query.find().then((response) => {
       let array = response.map((t) => {
         return {id: t.id, ...t.attributes}
       })
       successFn.call(null, array)
     }, (error) => {
       errorFn && errorFn.call(null, error)
     })
   },
  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo') // 记得把多余的分号删掉，我讨厌分号
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)

    todo.setACL(acl);
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });

  },
  update() {

  },
  destroy() {
    let todo = AV.Object.createWithoutData('Todo', todoId)
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  }
}
export function signUp(email, username, password, successFn, errorFn) {
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
export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}


function getUserFromAVUser(AVUser) {
  console.log(...AVUser.attributes)
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}
export function signOut() {
  AV.User.logOut()
  return undefined
}
export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}