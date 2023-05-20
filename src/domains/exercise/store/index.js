import { levelList, typeList } from '../repository'
class ExerciseStore {
  constructor() {
    makeAutoObservable(this)
  }
  allTypes = []
  allLevels = []

  getAllLevels = async () => {
    const { data } = await levelList()
    this.allTypes = data
  }

  getAllTypes = async () => {
    const { data } = await typeList()
    this.allLevels = data
  }
}

export const exerciseStore = new ExerciseStore()
export const exerciseKey = 'exerciseStore'
