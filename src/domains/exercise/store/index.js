import { levelList, typeList } from '../repository'
class ExerciseStore {
  constructor() {
    makeAutoObservable(this)
  }
  allTypes = []
  allLevels = []

  getAllLevels = async () => {
    const { data } = await levelList()
    this.allLevels = data?.data ?? []
  }

  getAllTypes = async () => {
    const { data } = await typeList()
    this.allTypes = data?.data ?? []
  }
}

export const exerciseStore = new ExerciseStore()
export const exerciseKey = 'exerciseStore'


/* 这段代码定义了一个名为 `ExerciseStore` 的类，表示一个题目存储库。它使用 MobX 库提供的 `makeAutoObservable` 函数来自动创建可观察的属性和动作。

`ExerciseStore` 类具有以下属性和方法：

- `allTypes`: 一个数组属性，用于存储所有的题目类型。

- `allLevels`: 一个数组属性，用于存储所有的题目难度级别。

- `getAllLevels`: 一个异步方法，用于从后端获取题目难度级别列表，并将结果存储在 `allLevels` 属性中。它调用 `levelList()` 方法来发送请求，并通过解构赋值从响应中获取数据。如果响应的 `data` 属性存在，则将其赋值给 `allLevels`，否则将其设为一个空数组。

- `getAllTypes`: 一个异步方法，用于从后端获取题目类型列表，并将结果存储在 `allTypes` 属性中。它调用 `typeList()` 方法来发送请求，并通过解构赋值从响应中获取数据。如果响应的 `data` 属性存在，则将其赋值给 `allTypes`，否则将其设为一个空数组。

此外，代码最后通过 `new ExerciseStore()` 创建了一个 `exerciseStore` 的单例对象，表示题目存储库的实例。通过导出 `exerciseStore`，其他模块可以使用这个单例对象来访问和修改题目类型和难度级别的数据。

总结来说，这段代码实现了一个题目存储库的类，其中包含了获取题目类型和难度级别列表的异步方法，并使用 MobX 进行状态管理。它提供了一个单例对象 `exerciseStore`，供其他模块使用来获取和更新题目相关的数据。*/ 