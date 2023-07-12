import { deleteUser, updateUser, setActivation } from '@/domains/user'
import PermissionWrapper from '@/features/PermissionWrapper'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DeleteModal from '../components/DeleteModal'
import UpdateModal from '../components/UpdateModal'

const iconStyle =
  'cursor-pointer text-[#fff] text-[18px] w-[30px] h-[30px] flex justify-center items-center rounded-[15px]'

const getColumns = ({ refresh }) => {
  return [
    { title: '名称', dataIndex: 'user_name', key: 'user_name' },
    { title: '账户', dataIndex: 'account', key: 'account' },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const [{ role_name }] = role
        return role_name
      },
    },
    {
      title: '激活状态',
      dataIndex: 'activation_status', // 数据源中用来索引的字段名
      key: 'activation_status', // 数据源的
      render: (activation_status, { account }) => { // 第二个传入的是对象，{ account }用于解构传入的对象参数并取出account属性的值，以便在render函数中使用
        return (
          <Switch
            checkedChildren="激活" // 开关状态为选中时，显示文本为“激活”
            unCheckedChildren="未激活" // 开关状态为未选中时，显示文本为“未激活”
            defaultChecked={Number(activation_status)} // defaultChecked是Ant Design的Switch组件的属性，用于指定Switch组件的默认选中状态。
            // 在这个例子中，defaultChecked被设置为当前行的activation_status字段的值，并将其转换为数字类型（只在第一次渲染时生效）
            onChange={(checked) => { // 用来动态控制按钮的开关,checked表示的是当前按钮的值，打开为true，关闭为false
              setActivation(account,checked).then((success) => { // success是前面函数的返回值作为后面回调函数的传入参数，表示执行是否成功
                if (success) {
                  if (checked) {
                    message.success('激活成功');
                  } else {
                    message.success('取消激活成功');
                  }
                  refresh();
                } else {
                  message.error('操作失败，请稍后重试');
                }
              })
            }} // 2023.6.30修改，添加了从激活->未激活的提示信息，以及修改失败的提示信息
          />
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'account',
      key: 'account',
      render: (account, record) => {
        return (
          <div className="flex gap-[5px]">
            <PermissionWrapper token="deleteUser">
              <DeleteModal
                render={(onClick) => (
                  <DeleteOutlined
                    className={`${iconStyle} bg-[red]`}
                    onClick={onClick}
                  />
                )}
                onOk={() => {
                  deleteUser?.(account)?.then((res) => {
                    if (res?.data?.code === BACKEND_STATUS.SUCCESS) {
                      message.success('删除用户成功')
                      refresh?.()
                    }
                  })
                }}
              ></DeleteModal>
            </PermissionWrapper>

            <PermissionWrapper token="updateUser">
              <UpdateModal
                render={(onClick) => (
                  <EditOutlined
                    className={`${iconStyle} bg-[blue]`}
                    onClick={onClick}
                  />
                )}
                onOk={(params) => {
                  updateUser?.(params).then((res) => {
                    if (res?.data?.code === BACKEND_STATUS.SUCCESS) {
                      message.success('修改用户成功')
                      refresh?.()
                    }
                  })
                }}
                defaultValue={record}
              />
            </PermissionWrapper>
          </div>
        )
      },
    },
  ]
}

export default getColumns
