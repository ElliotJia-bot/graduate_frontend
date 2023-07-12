import { login } from '@/domains/login'
// import { sign } from '@/domains/login'
import RoleSelector from '@/features/RoleSelector'
import { navHelper } from '@/core/routes/navHelper'
import SignModal from './SignModal'

const RULE = [{ required: true }]
const { Item, useForm } = Form
const Login = () => {
  const [formInstance] = useForm()
  const navInstance = navHelper()
  const submit = () => {
    formInstance.validateFields().then((params) => {
      // TODO: 账号密码的预先检查
      login(params)?.then((res) => {
        message.success('登录成功')
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        localStorage.setItem('loginData', JSON.stringify(res.data.data.user))
        localStorage.setItem('access_token', res.data.data.access_token)
        navInstance?.toUserList()
      })
    })
  }

  // 注册模块6.15 
  // const handleRegister = () => {
  //   formInstance.validateFields().then((params) => {
  //     sign(params)?.then((res) => {
  //       message.success('注册成功');
  //       // 注册成功的处理逻辑，例如跳转到登录页面
  //     }).catch((error) => {
  //       // 注册失败的处理逻辑，例如提示错误信息
  //       message.error('注册失败：' + error.message);
  //     });
  //   });
  // };
  // 注册模块6.15 这里有问题传递的是login页面的实体

  return (
    <div className="h-[100vh] bg-gradient-to-r from-blue-400 to-green-500 flex justify-center items-center">
      <div className="bg-[#fff] w-[400px] h-[400px] rounded-[8px] backdrop-filter-hover flex justify-center items-center flex-col gap-[20px]">
        <h1>登录</h1>
        <Form form={formInstance}>
          <Item label="账号" name="account" rules={RULE}>
            <Input placeholder='请输入账号'/>
          </Item>
          <Item label="密码" name="password" rules={RULE}>
            <Input placeholder='请输入密码'/>
          </Item>
          <Item label="请选择登录角色" name="role_id"required='true' message='请选择角色！'>
            <RoleSelector />
          </Item>
          <div className="flex gap-[10px]">
            <Button onClick={submit}>登录</Button>
            <SignModal
              render={(click) => <Button onClick={click}>注册</Button>}
              // onOk={handleRegister/*注册模块6.15*/}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}
// 6.16登录部分添加了placeholder和增加了登录角色选择的必要规则rules,但是发现提示信息无法正常显示，如果按照之前的rules={RULE}写，提示“请输入请选择登录角色”，不符合常理

export default Login
