const LevelSelect = ({ value, onChange }) => {
  const { exerciseStore } = useStores()
  if (_.isEmpty(exerciseStore.allLevels)) exerciseStore.getAllLevels()// 在组件的渲染过程中，它首先检查 exerciseStore.allTypes 是否为空。如果为空，它调用 exerciseStore.getAllTypes() 方法，可能是向后端发送请求获取题目类型数据。
  return (
    <Select
      value={value}
      onChange={onChange}
      options={exerciseStore?.allLevels?.map((label) => ({
        label,
        value: label,
      }))}
      allowClear={true}
    />
  )
}
// 这段代码定义了一个名为 TypeSelect 的组件，它是一个下拉选择框，用于选择题目类型。它接受两个属性：value 和 onChange。
export default observer(LevelSelect)
