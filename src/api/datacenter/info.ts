import http from 'axios'
import qs from 'qs'
import { SucMessage } from '@suc/ui'
/**
 * 数据中心
 */

// 增(params为body)
export const oncreate = (params: any, url: string): Promise<any> => {
    return http.post(url, params, {
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const oncreate3 = (params: any, url: string): Promise<any> => {
    return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 新增'application/json'.
export const oncreate2 = (params: any, url: string): Promise<any> => {
    return http({
        url: url,
        method: "post",
        data: params,
        headers: {
            "Content-Type": 'application/json',
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 增(params为body 带附件)
export const oncreate1 = (params: any, data: any, url: any): Promise<any> => {
    return http({
        method: 'post',
        url: url,
        data: data,
        params: params,
        transformRequest: [
            function (data) {
                return data
            }
        ],
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}




// 删带参数
export const ondeleteWithParams = (params: any,url: string): Promise<any> => {
    return http.delete(url,{params}).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 不带参数
export const ondelete = (url: string): Promise<any> => {
    return http.delete(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

export const ondelete1 = (url: string): Promise<any> => {
    return http.delete(url).then((res: any) => res).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 删除关联负责人
export const deleteLink = (params: any, url: string): Promise<any> => {
    return http.delete(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const deleteLink1 = (url: string): Promise<any> => {
    return http.delete(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 改(params为body)
export const onupdate = (params: any, url: string): Promise<any> => {
    return http.put(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 更新传json
export const jsonUpdate = (params: any, url: string): Promise<any> => {
    return http.put(url,params).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

export const onupdate4 = (params: any, url: string): Promise<any> => {
    return http.put(url, params, {
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}


export const onlink = (data: any, url: string): Promise<any> => {
    return http.post(url, qs.stringify(data, { indices: false })).then((res: any) => res.data) 
   }
   
// 改(params为body)
export const onupdate3 = (params: any, url: string): Promise<any> => {
    return http({
        method: "put",
        url: url,
        data: params
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 改'application/json'.
export const onupdate2 = (params: any, url: string): Promise<any> => {
    return http({
        url: url,
        method: "put",
        data: params,
        headers: {
            "Content-Type": 'application/json',
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 改(params为put  带附件)
export const onupdate1 = (params: any, data: any, url: string): Promise<any> => {
    return http({
        method: 'put',
        url: url,
        data: data,
        params: params,
        transformRequest: [
            function (data) {
                return data
            }
        ],
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const wsclSubmit = (params: any): Promise<any> => {
    return http.put("jnsw/wsclc/sztb", qs.stringify(params)).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const yjzzSubmit = (params: any): Promise<any> => {
    return http.put("jnsw/yjclzz/sztb", qs.stringify(params)).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 查
export const onpage = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.desc)
    })
}

// 更新
export const approvePut = (params: any, url: string): Promise<any> => {
    return http.put(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.desc)
    })
}

// 获取更新页
export const getupdate = (url: string): Promise<any> => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 片区
export const getPq = (): any => {
    const url = 'jnsw/base/pqList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 泵站站点
export const getZd = (): any => {
    const url = 'jnsw/bj/pumpingStationList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 表格内编辑
export const onsave = (params: any, url: string): Promise<any> => {
    return http.put(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// get信息列表
export const getInfo = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// post传参数组序列化（eg:基础数据-窨井信息-关联）
export const getSerializer = (params: any, url: string): Promise<any> => {
    return http({
        url: url,
        method: 'post',
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        }
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// put,post传参数组序列化以及FormData（eg:基础数据-窨井信息-编辑）
export const onSerializer = (params: any, data: any, url: string, method: any): Promise<any> => {
    return http({
        url: url,
        method: method,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        },
        data: data,
        transformRequest: [function (data) {
            return data;
        }],
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 窨井类型
export const getyjlx = (): Promise<any> => {
    const url = 'jnsw/base/yjlx'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 窨井材质
export const getyjcz = (): Promise<any> => {
    const url = 'jnsw/base/yjcz'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 井盖类型
export const getjglx = (): Promise<any> => {
    const url = 'jnsw/base/jglx'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 井盖材质
export const getjgcz = (): Promise<any> => {
    const url = 'jnsw/base/jgcz'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 排涝片区
export const getplpq = (): Promise<any> => {
    const url = 'jnsw/base/plpqList'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//视频详情
export const getVideoInfo = (id: string): Promise<any> => {
    const url = 'jnsw/spsb/baseInfo?id=' + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//视频新增
export const getVideoAdd = (params: any): Promise<any> => {
    const url = 'jnsw/spsb/';
    return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//视频编辑
export const getVideoEdit = (params: any): Promise<any> => {
    const url = 'jnsw/spsb/';
    return http.put(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//视频添加关联
export const getVideoGl = (params: any): Promise<any> => {
    const url = 'jnsw/spsb/addRel';
    return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//视频取消关联
export const getVideoGldel = (params: any): Promise<any> => {
    const url = 'jnsw/spsb/delRel';
    return http.delete(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 河道下拉列表
export const getRiverList = (): Promise<any> => {
    const url = 'jnsw/water/model/riverList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 河道水质
export const getRiverQulity = (params: any): Promise<any> => {
    const url = 'hjzl/siteTotal/riverQuality';
    return http.get(url, {
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        },
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 自动站下拉列表
export const getAutoList = (): Promise<any> => {
    const url = 'hjzl/siteTotal/options';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 泵站涵闸下拉列表
export const getHzBz = (): Promise<any> => {
    const url = 'jnsw/water/model/options';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取状态下拉列表
export const getFsZt = (): Promise<any> => {
    const url = 'jnsw/drain/ztOption';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 获取班组分页
export const getBzPage = (params: any) => {
    const url = "jnsw/ywdw/bzPage";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

// 获取班组详情页
export const getBzDetail = (id: string) => {
    const url = "jnsw/ywdw/getBz/" + id;
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}



/**
 * 
 *惠山水利
 */
// 


// 行政区域
export const getAreaCode = (): any => {
    const url = 'wjBaseServer/system/organization/queryWxD3Tree';
    return http.get(url).then((res: any) => res.data);
}

// 河流等级
export const getRiverGrade = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.desc)
    }).catch((err: any) => {
        SucMessage.error(err.desc)
    })
}
//养护内容
export const getYhnr = ():any =>{
     const url = "wjServer/hs/template/getYhnrList";
     return http.get(url).then((res:any)=>res.data);
}

//获取河道名称
export const getRiverName = ():any =>{
     const url = 'wjServer/dataCenter/baseinfo/riverinfo/getAllRiver';
     return http.get(url).then((res:any)=>res.data);
}

// 设备类型
export const getDevice = ():any =>{
    const url = "wjServer/hs/fault/getDeviceType";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 惠山区域
export const getHsqy = ():any =>{
    const url = "wjBaseServer/system/organization/wxList";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 获取下拉框的数据
export const getSelect = ( url: string): Promise<any> => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.desc)
    })
}// get请求带参数
export const getWithParam = (url: string,params: any): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.desc)
    })
}
