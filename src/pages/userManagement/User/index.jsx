import { getUserList } from '@/domains/user'
import FormHeader from '@/shared/FormHeader'
import getTableData from '@/utils/tableApi'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './components/AddModal'
import getColumns from './configs/column.config'
import { formConfig } from './configs/form.config'
import { createUser } from '@/domains/user'
import rTablePropConfig from '@/shared/RTablePropConfig'

const User = () => {
  const [formInstance] = Form.useForm() // useForm 方法会返回一个数组，其中包含两个元素：表单实例和一个函数，这地方只返回了数组的第一个元素
  const { tableProps, refresh, search } = useAntdTable( // 用useAntdTable的hook来访问后端数据库
    getTableData(getUserList),
    { form: formInstance }
  )

  // console.log(tableProps) // 测试用
  
  const { submit, reset } = search

  const columns = getColumns({ refresh }) // 用columns来挂载映射数据库对应的列

  const MyButton = (props) =>{
    return <Button
    shape="circle"
    className="flex items-center justify-center"
    icon={<PlusOutlined />}
    {...props}
  />
  }

  return (
    <>
      <FormHeader
        formConfig={formConfig} // 定义了表单信息
        formInstance={formInstance}
        submit={submit}
        reset={reset}
        leftConfig={
          <Tooltip title="添加用户" trigger="hover" placement="right">
            <AddModal
              render={(onClick) => (
                <MyButton 
                onClick={onClick}
                />
              )}
              onOk={(params) => {
                createUser(params).then((res) => {
                  if (res?.data?.code === BACKEND_STATUS.SUCCESS) {
                    message.success('添加成功')
                    refresh?.()
                  }
                })
              }}
            />
          </Tooltip>
        }
      />
      <Table columns={columns} rowKey="_id" {...rTablePropConfig(tableProps)} />
    </> // 7.4 添加分页器功能
  )
}

export default User
