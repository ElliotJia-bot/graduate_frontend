import { chooseRole } from '../repository'
class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }
  roleOptions = []
  getRoleOptions = async () => {
    if (!_.isEmpty(this.roleOptions)) return // 检查角色选项列表是否已经存在，如果已经存在则直接返回，避免重复获取
    const res = await chooseRole() // 否则调用API获取角色列表
    this.roleOptions = res?.data?.data ?? [] // 并保存到this.roleOptions中
  }
}

export const roleStore = new RoleStore()
export const roleStoreKey = 'roleStore'
