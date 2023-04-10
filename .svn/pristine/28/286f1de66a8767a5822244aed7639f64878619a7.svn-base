/**
 * 一张图
 */
// 管网
interface NetWork {
    detailToggle: boolean,  //控制详情板块
    rightToggle: boolean,   //控制右侧板块
    tabTable: any,          //存储监测点tab表格数据
    row: any,               //表格行点击row数据
}
// 内涝
interface Flood {
    rightToggle: boolean,
    tabTable: any,
    row: any
}
// 人员
interface Personnel {
    rightToggle: boolean,
    tabTable: any,
    row: any
}
// 计划
interface Plan {
    planRow: any,
    problemRow: any,
    trackPath: any,
}
const netWork: NetWork = {
    detailToggle: false,
    rightToggle: false,
    tabTable: [],
    row: {}
}
const flood: Flood = {
    rightToggle: false,
    tabTable: [],
    row: {}
}
const personnel: Personnel = {
    rightToggle: false,
    tabTable: [],
    row: {}
}
const plan: Plan = {
    planRow: {},
    problemRow: {},
    trackPath: []
}
// 河湖
interface River {
    row: any,
    tabTable: any
}
const river: River = {
    row: {},
    tabTable: []
}
// 沟渠
interface Eff {
    row: any,
    tabTable: any
}
const eff: Eff = {
    row: {},
    tabTable: []
}
// 截流井
interface Well {
    row: any,
    tabTable: any
}
const well: Well = {
    row: {},
    tabTable: []
}

/**
 * 管网管理
 */
// 溯源分析/任务事件
interface Analysis {
    row: any,//溯源分析列表里的内容，如id
    taskItem: any//任务事件传给详情的信息，如id
}
const analysis: Analysis = {
    row: {},
    taskItem: {}
}

/**
 * 片长管理
 */
// 巡查记录
interface Record {
    row: any, //巡查记录列表里的内容，如id
    recordItem: any //巡查记录传给详情的信息，如id
}

const record: Record = {
    row: {},
    recordItem: {}
}

//巡查问题||任务事件/任务详情
interface Issues {
    row: any, //巡查问题列表里的内容，如id
    issuesItem: any, //巡查问题传给详情的信息，如id
    formParams: any //创建任务事件
}

const issues: Issues = {
    row: {},
    issuesItem: {},
    formParams: {
        cc: [], // 抄送人
        file: [],
        jcdid: "", // 监测点
        jcdlx:"",
        jcdmc: "",
        jd: "",
        jsrid: null, // 接收人id
        pqid: "", // 片区id
        rwbh: "", // 任务编号
        rwlx: "", //任务类型
        rwmc: "", // 任务名称
        rwms: "", // 任务描述
        rwwz: "", //任务位置
        wd: "",
    }
}

/**
 * 水环境
 */
// 水质
interface WaterQulity {
    qulity: any//水质列表内容，如sbid
}
const waterQulity: WaterQulity = {
    qulity: {}
}

// 用户
interface User {
    userInfo: any
}
const user: User = {
    userInfo: null
}

interface State {
    netWork: NetWork,
    flood: Flood,
    personnel: Personnel,
    plan: Plan,
    river: River,
    eff: Eff,
    well: Well,
    analysis: Analysis,
    waterQulity: WaterQulity,
    user: User,
    userInfo: any,
    record: any,
    issues: any,
}
const state: State = {
    netWork,
    flood,
    personnel,
    plan,
    river,
    eff,
    well,
    analysis,
    waterQulity,
    user,
    userInfo: {},
    record,
    issues,
};
const mutations: any = {
    // 获取用户信息
    getUserInfo(state: State, info: any) {
        state.user = info;
        state.userInfo = {
            uid: info.id,
            role:info.roleName,
            areaCode:info.areaCode
        }
    },
    // 一张图-管网
    setDetailToggle(state: State, toggle: any) {
        state.netWork.detailToggle = toggle;
    },
    setRightToggle(state: State, toggle: any) {
        state.netWork.rightToggle = toggle;
    },
    setTabTable(state: State, data: any) {
        state.netWork.tabTable = data;
    },
    setRow(state: State, row: any) {
        state.netWork.row = row;
    },

    // 一张图-内涝
    setFloodRightToggle(state: State, toggle: any) {
        state.flood.rightToggle = toggle;
    },
    setFloodTabTable(state: State, data: any) {
        state.flood.tabTable = data;
    },
    setFloodRow(state: State, row: any) {
        state.flood.row = row;
    },
    //一张图-河湖
    setRiverRow(state: State, row: any) {
        state.river.row = row
    },
    setRiverTabTable(state: State, tabTable: any) {
        state.river.tabTable = tabTable
    },
    // 一张图-河湖-沟渠
    setEffRow(state: State, row: any) {
        state.eff.row = row
    },
    setEffTabTable(state: State, tabTable: any) {
        state.eff.tabTable = tabTable
    },
    // 一张图-河湖-截流井
    setWellRow(state: State, row: any) {
        state.well.row = row
    },
    setWellTabTable(state: State, tabTable: any) {
        state.well.tabTable = tabTable
    },
    // 一张图-计划
    setPlanRow(state: State, row: any) {
        state.plan.planRow = row;
    },
    // 一张图-计划-问题
    setProblemRow(state: State, row: any) {
        state.plan.problemRow = row;
    },
    // 一张图-计划-巡查路径
    setTrackPath(state: State, row: any) {
        state.plan.trackPath = row;
    },


    // 管网管理-溯源分析
    setAnalysisRow(state: State, row: any) {
        state.analysis.row = row;
    },
    // 管网管理-任务事件
    setTaskItem(state: State, item: any) {
        state.analysis.taskItem = item;
    },
    // 水环境-水质
    setQulity(state: State, item: any) {
        state.waterQulity.qulity = item
    },


    //片长管理-巡查记录
    setRecordItem(state: State, item: any) {
        state.record.recordItem = item;
    },
    //片长管理-巡查问题||任务事件
    setIssuesItem(state: State, item: any) {
        state.issues.issuesItem = item;
    },
    // 创建任务事件
    setFormParams(state: State, form: any) {
        state.issues.formParams = form
    },
    // 一张图-人员
    // setPersonnelRightToggle(state: State, toggle: any) {
    //     state.personnel.rightToggle = toggle;
    // },
    setPersonnelTabTable(state: State, data: any) {
        state.personnel.tabTable = data;
    },
    setPersonnelRow(state: State, row: any) {
        state.personnel.row = row;
    },
};
const actions: any = {};

export default {
    state,
    mutations,
    actions
}
