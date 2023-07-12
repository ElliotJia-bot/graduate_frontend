import { Form, message } from 'antd';
import { sign } from '@/domains/login'
// import RoleSelector from '@/features/RoleSelector'
const RULE = [{ required: true }]
const { Item, useForm } = Form
// const shouldRenderRoleSelector = false;




const SignModal = ({ render, onOk }) => {
  const [open, setOpen] = useState(false)
  const click = () => setOpen(!open)
      // 注册模块6.15 
      const [formInstancesign] = useForm()


      // const { roleStore } = useStores()
      // const [ role ] = useState(defaultValue.roleStore.roleOptions[0])
  
      const handleRegister = () => {
        formInstancesign.validateFields().then((params) => {
          const additionalParam = { role_id : ROLE_TYPE.STUDENT }; // 添加的额外参数
          // 合并参数
          const mergedParams = { ...params, ...additionalParam };
          sign(mergedParams)?.then((res) => {
            message.success('注册成功');
            // 注册成功的处理逻辑，例如跳转到登录页面
          }).catch((error) => {
            // 注册失败的处理逻辑，例如提示错误信息
            message.error('注册失败：' + error.message);
          });
        });
      };
      // 注册模块6.15

  return (
    <>
      {render(click)}
      <Modal
        open={open}
        onOk={() => {
          handleRegister()
          click()
        }}
        onCancel={click}
        title="注册学生账号"
        destroyOnClose={true}
      >
        <Form form={formInstancesign}>
          <Item label="用户名" name="user_name" rules={RULE}>
            <Input />
          </Item>
          <Item label="账号" name="account" rules={RULE}>
            <Input />
          </Item>
          <Item label="密码" name="password" rules={RULE}>
            <Input />
          </Item>

            {/* <Item label="请选择登录角色" name="role_id" className=''>
              <RoleSelector />
            </Item> */}
          
          {/* {shouldRenderRoleSelector  && (
            <Item label="请选择登录角色" name="role_id">
              <RoleSelectorsign />
            </Item>
          )} */}
        </Form>
      </Modal>
    </>
  )
}
// 6.16添加了用户名的字段

export default SignModal
