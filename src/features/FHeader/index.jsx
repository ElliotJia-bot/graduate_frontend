const { Header } = Layout
import { navHelper } from '@/core/routes/navHelper'
// import { logout } from '@/domains/login'

const FHeader = () => {
  const navInstance = navHelper()
  const { permissionStore } = useStores()

  const Logout = () => {
    // logout(params)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    navInstance.toLogin()
    permissionStore.resetAllPermission()
  }

  return (
    <Header>
      <div className="flex items-center h-full justify-between">
        <h2 className="text-[#fff]">公务员考试系统</h2>
        <div className="flex items-center gap-[15px]">
          <div className="text-[#fff]">你好</div>
          <Button className="text-[#dee] bg-transparent" onClick={Logout}>
            注销
          </Button>
        </div>
      </div>
    </Header>
  )
}

export default FHeader
