export const fromPermissionToRouteMapper = (urlPermission) => {
  const { permission_name, _id, permission_pid, api_route_name, type } =
    urlPermission
  return {
    label: permission_name,
    key: api_route_name,
    _id,
    permission_pid,
    type, // 映射到meta.permissionType属性（但是这里用的是type字段保存）
  }
  // 将权限对象中的URL、名称、图标等属性映射到路由对象中的path、name、meta等属性上
}

export const fromPermissionToTreeMapper = (permission) => {
  const { permission_name, _id, permission_pid, type } = permission
  return {
    title: permission_name,
    key: _id,
    _id,
    permission_pid,
    type,
  }
}
