import { navHelper } from '../navHelper'

// TODO: 这个组件应该由npm包引入更加合理
const AuthUrl = ({ forceAuth = false, children }) => {
  const location = useLocation()
  const navInstance = navHelper()
  const { permissionStore } = useStores()
  permissionStore.isGettenList || permissionStore.getPermissionList() // 短路表达式||
  // 如果 permissionStore 对象没有获取过权限列表数据，则调用 permissionStore.getPermissionList() 方法来获取数据，否则不执行任何操作
  if (location.pathname === '/') {
    navInstance.toUserList()
  }

  if (
    permissionStore.urlPermissionRoutes.includes(location.pathname) ||
    forceAuth
  )
    return children
  else return null
}

export default observer(AuthUrl)
