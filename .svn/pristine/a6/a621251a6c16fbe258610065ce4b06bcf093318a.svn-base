
//管网图标
const pipeNetworkIcon: any = {
    "通信中断": require("@/assets/map/管网-掉线.png"),
    "正常": require("@/assets/map/管网-正常.png"),
    "异常": require("@/assets/map/管网-预警.png")
}

function getIcon(sbzt: string, status: string, iconMap: any): string {
    sbzt = sbzt || "通信中断";
    status = status || "正常";
    return iconMap[sbzt] || iconMap[status] || iconMap["正常"]
}

function getIconN(sbzt: string, status: string, iconMap: any): string {
    sbzt = sbzt || "通信中断";
    status = status || "N";
    return iconMap[sbzt] || iconMap[status] || iconMap["N"]
}

export const getPipeNetworkIcon = (sbzt: string, status: string) => {
    return getIcon(sbzt, status, pipeNetworkIcon)
}

//河湖图标
const lakeIcon: any = {
    "通信中断": require("@/assets/map/河湖-掉线.png"),
    "N": require("@/assets/map/河湖-正常.png"),
    "A": require("@/assets/map/河湖-警戒.png"),
    "W": require("@/assets/map/河湖-预警.png"),
    "正常": require('@/assets/map/河湖-正常.png')
}

export const getLakeIcon = (sbzt: string, status: string) => {
    sbzt = sbzt || "通信中断";
    status = status || "N";
    return lakeIcon[sbzt] || lakeIcon[status] || lakeIcon["正常"]
}
const statusLakeConst: any = {
    "通信中断": 'status-gray',
    // "N": 'status-green',
    "正常": 'status-blue',
    "A": 'status-orange',
    "W": 'status-red'
}
export const getLakeStyle = (sbzt: string, status: string) => {
    let st = sbzt || "通信中断"
    let ss = status || "N"
    return statusLakeConst[st] || statusLakeConst[ss] || statusLakeConst["N"]
}

// 沟渠排口图标
const ellIcon: any = {
    "警戒": require("@/assets/map/沟渠排口-警戒.png"),
    "TY": require("@/assets/map/沟渠排口-离线.png"),
    "预警": require("@/assets/map/沟渠排口-预警.png"),
    "ZY": require("@/assets/map/沟渠排口-正常.png")
}
export const getEllIcon = (zt: string) => {
    return ellIcon[zt]
}

// 截污井
const closureIcon: any = {
    "TY": require("@/assets/map/截污井-掉线.png"),
    "离线": require("@/assets/map/截污井-警戒.png"),
    "预警": require("@/assets/map/截污井-预警.png"),
    "ZY": require("@/assets/map/截污井-正常.png")
}
export const getClosureIcon = (zt: string) => {
    return closureIcon[zt]
}

//泵站图标
const bzIcon: any = {
    "通信中断": require("@/assets/map/泵站-掉线.png"),
    "N": require("@/assets/map/泵站-正常.png"),
    "W": require("@/assets/map/泵站-警戒.png"),
    "A": require("@/assets/map/泵站-预警.png")
}

export const getBzIcon = (sbzt: string, status: string) => {
    return getIconN(sbzt, status, bzIcon)
}

const statusBzConst: any = {
    "通信中断": 'status-gray',
    "N": 'status-green',
    "R": 'status-blue',
    "W": 'status-orange',
    "A": 'status-red'
}

export const getBzStyle = (sbzt: string, status: string) => {
    let st = sbzt || "通信中断"
    let ss = status || "N"
    return statusYjConst[st] || statusYjConst[ss] || statusYjConst["N"]
}
const bjIcon: any = {
    0: require("@/assets/monFlood/2.gif"),
    1: require("@/assets/monFlood/1.gif"),
    9: require("@/assets/monFlood/9.png")
}
export const getBjIcon = (bjzt: number) => {
    return bjIcon[bjzt]
}

//涵闸图标
const zzIcon: any = {
    "通信中断": require("@/assets/map/闸站-掉线.png"),
    "N": require("@/assets/map/闸站-正常.png"),
    "W": require("@/assets/map/闸站-警戒.png"),
    "A": require("@/assets/map/闸站-预警.png")
}

export const getZzIcon = (sbzt: string, status: string) => {
    return getIconN(sbzt, status, zzIcon)
}
const zmIcon: any = {
    "on": require("@/assets/monFlood/3.gif"),
    "off": require("@/assets/monFlood/4.gif")
}
export const getZmIcon = (zmzt: string) => {
    return zmIcon[zmzt]
}

//内涝图标
const manholeIcon: any = {
    "通信中断": require("@/assets/map/窨井-掉线.png"),
    "正常": require("@/assets/map/窨井-正常.png"),
    "提醒": require("@/assets/map/窨井-提醒.png"),
    "警戒": require("@/assets/map/窨井-警戒.png"),
    "预警": require("@/assets/map/窨井-预警.png"),
    "报警": require("@/assets/map/窨井-预警.png")
}

export const getManholeIcon = (sbzt: string, status: string) => {
    return getIcon(sbzt, status, manholeIcon)
}

const statusYjConst: any = {
    "通信中断": 'status-gray',
    "正常": 'status-green',
    "提醒": 'status-blue',
    "警戒": 'status-orange',
    "报警": 'status-red'
}

export const getManholeStyle = (sbzt: string, status: string) => {
    let st = sbzt || "通信中断"
    let ss = status || "正常"
    return statusYjConst[st] || statusYjConst[ss] || statusYjConst["正常"]
}

// 水位/河道
const hdIcon: any = {
    "通信中断": require("@/assets/map/河道-掉线.png"),
    "N": require("@/assets/map/河道-正常.png"),
    "A": require("@/assets/map/河道-预警.png"),
    "W": require("@/assets/map/河道-警戒.png")
}
export const getHdIcon = (sbzt: string, status: string) => {
    return getIconN(sbzt, status, hdIcon)
}
// 降雨
const ylIcon: any = {
    "通信中断": require("@/assets/map/雨量-掉线.png"),
    "N": require("@/assets/map/雨量-正常.png"),
    "A": require("@/assets/map/雨量-预警.png"),
    "W": require("@/assets/map/雨量-警戒.png")
}
export const getYlIcon = (sbzt: string, status: string) => {
    return getIconN(sbzt, status, ylIcon)
}