import { getPermission, getAllPermission } from '../repository'
import { PERMISSION_TYPE } from '@/public/constants'
import { permissionTree } from './utils'
import {
  fromPermissionToRouteMapper,
  fromPermissionToTreeMapper,
} from './mapper'

class PermissionStore {
  constructor() {
    makeAutoObservable(this)
  }

  permissionList = []

  urlPermission = []
  btnPermission = []

  allPermission = []

  isGettenList = false

  // 获取指定用户的权限列表
  getPermissionList = async () => {
    if (this.isGettenList) return
    // 判断是否已经获取过指定用户的权限列表（是否有缓存）
    const res = await getPermission() // API操作
    this.permissionList = (res?.data?.data ?? []).map(
      fromPermissionToRouteMapper // 使用数组map方法将每个权限对象映射为一个路由对象
      // 将每个权限对象映射为一个路由对象的目的是为了在前端应用程序中进行路由控制。
      // 在前端应用程序中，通常会使用路由来控制页面的访问权限。因此，将权限对象转换为路由对象可以方便地将权限信息与路由信息关联起来
      // 将每个权限对象映射为一个路由对象可以方便地实现前端应用程序中的页面动态权限控制
    )
    this.btnPermission = this.permissionList.filter(
      (permission) => permission.type === PERMISSION_TYPE.btn
    ) // 将属于按钮权限的放于btnPermission中
    this.urlPermission = this.permissionList.filter(
      (permission) => permission.type === PERMISSION_TYPE.url
    ) // 将属于url权限的放于urlPermission中
    this.isGettenList = true // 表明有缓存，可以直接获取
  }

  // 获取所有权限列表
  // force这个参数可能用来控制是否强制从数据源中获取所有权限，而不考虑缓存中的数据。
  // 如果 force 参数的值为 true，那么 getAllPermission 函数将强制从数据源中获取所有权限，并返回一个表示需要重新计算列信息的布尔值。
  // 否则，它将根据缓存中的数据来决定是否需要重新计算列信息。
  getAllPermission = async (force = false) => {
    if (!_.isEmpty(this.allPermission) && !force) return
    // 首先检查是否已经缓存了所有权限信息（即 this.allPermission 变量是否已经有值）
    // 如果已经缓存了并且 force 参数为 false，则直接返回缓存的权限数据，不再向服务器发送请求
    const res = await getAllPermission() // API操作
    this.allPermission = (res?.data?.data ?? []).map(fromPermissionToTreeMapper)
    // 在服务器返回数据后，这个方法将使用 map 方法对返回的权限数据进行转换，并调用 fromPermissionToTreeMapper 函数来将权限数据转换为树形结构的数据
  }

  resetAllPermission = () => {
    this.permissionList = []
    this.urlPermission = []
    this.btnPermission = []
    this.isGettenList = false
    this.allPermission = []
  }

  // 用于加载sideBar
  get permissionTree() {
    return permissionTree(this.urlPermission)
  }

  // 所有权限包括操作权限拼成一棵树，用于添加角色时的那颗权限树的加载
  get allPermissionTree() {
    return permissionTree(this.allPermission)
  }

  get urlPermissionRoutes() {
    return this.urlPermission.map((item) => item.key)
  }
}

export const permissionStore = new PermissionStore()
export const permissionKey = 'permissionStore'
