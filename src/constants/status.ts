
export const statusConst: any = {
    "N": { name: "正常", style: "green-state" },
    "W": { name: "预警", style: "warn-state" },
    "A": { name: "报警", style: "red-state" },
}
export const djColor: any = {
    Ⅰ: "#32bb53",
    Ⅱ: "#32bb53",
    Ⅲ: "#32bb53",
    Ⅳ: "#ffab3d",
    Ⅴ: "#ff5a47",
    劣Ⅴ: "#ce1717",
    Ⅰ类: "#32bb53",
    Ⅱ类: "#32bb53",
    Ⅲ类: "#32bb53",
    Ⅳ类: "#ffab3d",
    Ⅴ类: "#ff5a47",
    劣Ⅴ类: "#ce1717",
};
// 处理状态
export const statusNum:any = [
    {
        label: '未处理',
        value: '0'
    },
    {
        label: '已处理',
        value: '2'
    },
    {
        label: '已完成',
        value: '5'
    },
]
export const getBG = (id: string) => {
    let bgstyle = "";
    if (id === "未处理") {
      bgstyle = "orange-state";
    } else if (id === "已交办") {
      bgstyle = "blue-state";
    } else if (id === "已处理") {
      bgstyle = "blue-state";
    } else if (id === "未完成") {
      bgstyle = "green-state";
    } else if (id === "已完成") {
      bgstyle = "gray-state";
    }
    return bgstyle;
  }

  // 行业名称
export const hyName:any = [
  {
      label: '全部行业',
      value: '全部行业'
  },
  {
      label: '火电',
      value: '火电'
  },
  {
      label: '化工',
      value: '化工'
  },
  {
      label: '造纸',
      value: '造纸'
  },
  {
      label: '冶金',
      value: '冶金'
  },
  {
      label: '建材',
      value: '建材'
  },
  {
      label: '食品',
      value: '食品'
  },
  {
      label: '机械',
      value: '机械'
  },
  {
      label: '学校',
      value: '学校'
  },
  {
      label: '医疗机构',
      value: '医疗机构'
  },
  {
      label: '机关',
      value: '机关'
  },
  {
      label: '商场',
      value: '商场'
  },
  {
      label: '酒店',
      value: '酒店'
  },
  {
      label: '其他',
      value: '其他'
  },
]

//水源类型
export const waterType:any = [
    {
        label:'自来水',
        value:'自来水'
    },
    {
        label:'地下水',
        value:'地下水'
    },
    {
        label:'工业水',
        value:'工业水'
    },
    {
        label:'地表水',
        value:'地表水'
    },
]