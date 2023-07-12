import  {isBoolean}  from 'lodash'
import './index.less'

const ONE = 1

function rTablePropConfig(tableProps, postTotal = '个角色') { // postTotal指的是单位
  return {
    rowClassName: (record, index) => (index & ONE ? '' : 'bg-[rgba(229,244,254,0.3400)]'),
    // 这行代码的作用是设置表格每行的样式，使奇数行的背景色透明，偶数行的背景色为浅蓝色。
    className: 'r-pagination r-table-lightblue',
    // 用于设置表格的分页和表格颜色主题
    ...tableProps,
    // 使用展开语法 ...tableProps 将 tableProps 中指定的属性继承到 RTablePropConfig 中
    pagination: !isBoolean(tableProps?.Pagination) // 如果pagination不为布尔值，则使用默认值覆盖原有值
      ? {
          ...tableProps?.Pagination,
          className: 'r-pagination r-table-lightblue', // 用于设置分页组件的 CSS 类名
          showTotal: (total) => ( // 用于显示总数信息
            <div>
              共 <span className="text-primary">{total}</span> {postTotal}
            </div>
          ),
          showQuickJumper: true, // 一个布尔值，表示是否显示快速跳转输入框。
          showSizeChanger: true, // 一个布尔值，表示是否显示每页显示条目数下拉框。
          ...tableProps?.Pagination, // 展开语法，用于继承 tableProps?.pagination 中的其他属性
        }
      : tableProps?.Pagination, // 如果原本pagination即为布尔值，则直接使用原值
  }
}

export default rTablePropConfig

// 7.4 添加分页器实现