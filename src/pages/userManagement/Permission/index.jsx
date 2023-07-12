import { addPermission } from '@/domains/permission/repository'
import { PlusCircleOutlined } from '@ant-design/icons'
import AddChildrenModal from './components/AddChildrenModal'
import getColumns from './configs/column.config'

const iconStyle =
  'cursor-pointer text-[#fff] bg-[red] text-[18px] w-[30px] h-[30px] flex justify-center items-center rounded-[15px]'
const Permission = () => {
  const { permissionStore } = useStores() // 调用useContext()方法访问上下文数据
  permissionStore.getAllPermission()
  const columns = getColumns({ refresh: permissionStore.getAllPermission })
  // 如果 refresh 参数为 true，那么 getColumns 函数将重新计算列信息，否则它可能会从缓存中读取之前计算好的列信息，从而提高函数的性能和可复用性
  // 根据师兄的意思，这里的refresh只是传入一个函数的栈地址，通过执行那个函数来判断是否需要刷新列信息（师兄做的是强制重刷）
  return (
    <>
      <AddChildrenModal
        render={(click) => (
          <PlusCircleOutlined className={iconStyle} onClick={click} />
        )}
        onOk={(res) => {
          addPermission({ ...res }).then(() => {
            message.success('创建成功')
            permissionStore.getAllPermission?.(true) // 指定force为true，强制重新读取数据库信息（因为刚刚添加了新内容）
          })
        }}
      />
      <Table columns={columns} dataSource={permissionStore.allPermissionTree} />
    </>
  )
  //  此处与其他地方不同的是，以树状结构显示数据，所以保存时也用到了树状结构
}

export default observer(Permission)
