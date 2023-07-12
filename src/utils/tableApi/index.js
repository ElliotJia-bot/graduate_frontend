const getTableData =
  (myApi, defaultData = {}) =>
  (pages, formData) => {
    const params = {
      page: pages.current,
      size: pages.pageSize,
      ...defaultData,
      ...formData,
    }
    return myApi?.(params).then((res) => {
      const {
        data: {
          data: { list, count:total }, // 修改为调试
        },
      } = res
      return {
        list,
        total,
      }
    })
  }

export default getTableData
