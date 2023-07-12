import { requestType } from '@/public/constants'
import originAxios from 'axios'

// 创建请求实例
const instance = originAxios.create({
  baseURL: `${import.meta.env.VITE_INTERVIEW_BASEURL}/api`,
  timeout: 30000,
})

/* 这段代码使用 Axios 库创建了一个 Axios 实例，该实例被赋值给名为 `instance` 的常量。

具体来说，`originAxios.create()` 是 Axios 库提供的方法，用于创建一个自定义配置的 Axios 实例。它接受一个配置对象作为参数，其中可以设置以下选项：

- `baseURL`：用于指定请求的基本 URL。在这里，使用了模板字符串和环境变量来动态设置基本 URL。`import.meta.env.VITE_INTERVIEW_BASEURL` 表示从环境变量中获取名为 `VITE_INTERVIEW_BASEURL` 的值，它被用作基本 URL 的一部分。基本 URL 的最终值将是 `${import.meta.env.VITE_INTERVIEW_BASEURL}/api`。

- `timeout`：用于设置请求的超时时间，单位为毫秒。在这里，超时时间被设置为 30,000 毫秒（30 秒）。

通过创建实例时提供的配置，`instance` 对象将具有这些配置设置，并且后续通过该实例发送的请求将继承这些配置。

这个实例可以用于发送 HTTP 请求，比如通过调用 `instance.get()`、`instance.post()` 等方法来发送 GET、POST 请求等。实例还可以根据需要进行其他的配置，例如设置请求拦截器、响应拦截器等。

通过创建一个自定义的 Axios 实例，可以灵活地配置请求的基本 URL、超时时间和其他选项，以满足项目的需求。这样可以避免在每次发送请求时都需要重复设置相同的配置，提高了代码的可维护性和复用性。*/


const request = (url, params = {}, type) => {
  let realData = {
    data: params,
  }
  if (type === requestType.get) {
    realData = {
      params,
    }
  }

  return new Promise((resolve, reject) => {
    instance?.({
      method: type,
      url,
      ...realData,
      validateStatus: () => true,
    })
      .then((res) => {
        if ([res?.data?.code].includes(BACKEND_STATUS.SUCCESS)) resolve(res)
        else
          message.error(
            res?.data?.msg ?? res?.data?.message ?? '系统错误，请联系管理员'
          )
      })
      .catch((err) => {
        message.error('网络错误请求异常，请稍后再试')
        reject(err)
      })
      .finally(() => {
        // TODO: 添加加载spin特效
      })
  })
}

export const interGet = (url, params) => request(url, params, requestType.get)
export const interPost = (url, params) => request(url, params, requestType.post)
export const interPatch = (url, params) =>
  request(url, params, requestType.patch)
export const interDeleted = (url, params) =>
  request(url, params, requestType.delete)
export const interPut = (url, params) => request(url, params, requestType.put)
