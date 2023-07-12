import { exerciseList } from '@/domains/exercise/repository'
import { create } from '@/domains/exercise/repository'
import FormHeader from '@/shared/FormHeader'
import getTableData from '@/utils/tableApi'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './components/AddModal'
import getColumns from './configs/column.config'
import { formConfig } from './configs/form.config'

// 面试题库管理(专家端才有)
const Exercise = () => {
  const [formInstance] = Form.useForm()// 使用 Form.useForm() 创建一个表单实例，并将其赋值给 formInstance 变量
  const { exerciseStore } = useStores()// 使用 useStores() 钩子函数获取应用程序的状态管理对象，并将其解构为 exerciseStore 变量
  const { tableProps, refresh, search } = useAntdTable(
    getTableData(exerciseList),
    {
      form: formInstance,
    }
  )
  const columns = getColumns({ refresh, typeMap: exerciseStore.allTypes })
  const { submit, reset } = search
  return (
    <>
      <FormHeader
        formConfig={formConfig}
        formInstance={formInstance}
        submit={submit}
        reset={reset}
        leftConfig={
          <Tooltip title="添加题目" trigger="hover" placement="right">
            <AddModal
              render={(onClick) => (
                <Button
                  shape="circle"
                  className="flex items-center justify-center"
                  icon={<PlusOutlined />}
                  onClick={onClick}
                />
              )}
              onOk={(params) => {
                create(params).then((res) => {
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
      <Table columns={columns} {...tableProps} rowKey="_id" />
    </>
  )
}

export default observer(Exercise)
