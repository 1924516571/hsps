import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"


// 所属排水系统编码
export const  getSystemid = (): Promise<any> => {
    const url = 'server/dataCenter/psSystem/getAll'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
  }


