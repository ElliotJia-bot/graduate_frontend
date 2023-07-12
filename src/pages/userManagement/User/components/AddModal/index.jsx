const { Item } = Form
const RULE = [{ required: true }]
const PW_RULE = [
  () => ({
    validator: (_, value) => { // _为占位符，value为要验证的字段值
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) // 如果字符串 value 包含与正则表达式 regex 匹配的文本，则该方法将返回 true，否则将返回 false
        return Promise.reject(new Error('密码不符合要求'))
      return Promise.resolve()
    },
  }),
] // 密码必须包含至少一个字母（区分大小写）和一个数字，且长度必须在 8 到 16 个字符之间，且只能由字母和数字组成
// ^ 表示匹配字符串的开头。
// (?=.*[A-Za-z]) 表示必须包含至少一个字母，其中 .* 表示可以包含任意字符，[A-Za-z] 表示字母区分大小写。
// (?=.*\d) 表示必须包含至少一个数字，其中 .* 表示可以包含任意字符，\d 表示数字。
// [A-Za-z\d]{8,16} 表示密码长度必须在 8 到 16 个字符之间，且只能由字母和数字组成。

const AddModal = ({ render, onOk }) => {
  const [open, setOpen] = useState(false)
  const [formInstance] = Form.useForm()
  const click = () => {
    setOpen(!open)
  }
  return (
    <>
      {render?.(click)}
      <Modal
        open={open}
        onOk={() => {
          formInstance?.validateFields()?.then((res) => {
            onOk?.(res)
            click?.()
          })
          // validateFields遍历所有的表单字段，并对它们进行验证。
          // 验证规则可以在表单字段的 rules 属性中定义，规则可以是一个对象或一个数组，用于表示该字段的验证规则
          // 需要注意的是，validateFields 方法只会验证表单中的可见字段。如果表单中某个字段被设置为隐藏或不可见，则该字段的值不会被验证
          // 如果发现某个字段的值不符合规则，则会将该字段的验证错误信息添加到一个对象中，并将该对象作为 Promise 对象的 reject 值返回。
          // 如果所有字段的值都符合规则，则会将该字段的值添加到一个对象中，并将该对象作为 Promise 对象的 resolve 值返回
        }}
        onCancel={click}
        title="添加用户"
      >
        <Form form={formInstance}>
          <Item name="account" label="手机号" rules={RULE}>
            <Input />
          </Item>
          <Item name="user_name" label="用户名" rules={RULE}>
            <Input />
          </Item>
          <Item name="password" label="新密码" rules={PW_RULE}>
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddModal
