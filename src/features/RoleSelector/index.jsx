// 默认选择学生
// const RoleSelector = ({ value, onChange }) => {
//   const { roleStore } = useStores()
//   useEffect(() => {
//     roleStore.getRoleOptions()
//   }, [])
//   const defaultValue = roleStore.roleOptions[0];
//   return (
//     <Select
//       options={roleStore.roleOptions}
//       value={value||defaultValue}
//       onChange={onChange}
//       placeholder="请选择角色"
//     />
//   )
// }


// //原版的角色选择器，在需要选择角色的时候利用（下拉框）
const ZERO = 0 // 7.5添加，防止直接引用常量，解决报错问题

const RoleSelector = ({ value, onChange }) => {
  const { roleStore } = useStores() // 访问数据库
  useEffect(() => {
    roleStore.getRoleOptions() // 获取所有角色信息
  }, [])
  let defaultValue = value; // 默认值为传入的 value 属性

  if (!defaultValue && roleStore.roleOptions.length > ZERO) {
    defaultValue = roleStore.roleOptions[ZERO]; // 如果 value 为空，且 roleOptions 非空，则使用第一个选项作为默认值
  }

  return (
    <Select
      // key={defaultValue}
      // defaultValue={defaultValue}
      options={roleStore.roleOptions} // options 属性值为传递进来的角色信息数组
      value={value} // value 属性值为当前选中的角色信息对象
      onChange={onChange} // onChange 属性值为传递进来的回调函数
      placeholder="请选择角色" // 占位符文本
    />
  )
}

export default observer(RoleSelector)


