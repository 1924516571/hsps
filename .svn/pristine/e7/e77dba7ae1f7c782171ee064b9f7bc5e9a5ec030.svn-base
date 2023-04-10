import { coordinateTransform } from "@suc/monch"
import arrowPng from "@/assets/arrowup.png";
import hdarrowPng from '@/assets/hdarrowup.png'

// let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
let planePath = `image://${arrowPng}`
let path = `image://${hdarrowPng}`

// 流向每个点位的经纬度
let convertData = function (data: any[], map: any) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let coords = [];
        let coordsArr = []
        let dataItem = data[i];
        let proj = map.getView().getProjection();
        let name = dataItem.properties_.name;
        let fcoords = dataItem.flatCoordinates_;
        for (let i = 0; i < fcoords.length; i += 2) {
            coords.push(fcoords.slice(i, i + 2))
        }
        for (let j = 0; j < coords.length; j += 2) {
            coordsArr.push(coords.slice(j, j + 2))
        }
        res.push({
            name: name,
            coords: coords
        })
        let coord1 = []
        let coord2 = []
        let fromCoord = []
        let toCoord = []
        // if (coordsArr.length % 2 == 0) {
        //     for (let k = 0; k < coordsArr.length; k++) {
        //         coord1 = coordsArr[k][0];
        //         coord2 = coordsArr[k][1];
        //         fromCoord = coord1
        //         toCoord = coord2
        //         if (fromCoord && toCoord) {
        //             res.push({
        //                 name: name,
        //                 coords: [fromCoord, toCoord]
        //             })
        //         }
        //     }
        // } else {
        //     for (let k = 0; k < coordsArr.length - 1; k++) {
        //         coord1 = coordsArr[k][0];
        //         coord2 = coordsArr[k][1];
        //         fromCoord = coord1
        //         toCoord = coord2
        //         if (fromCoord && toCoord) {
        //             res.push({
        //                 name: name,
        //                 coords: [fromCoord, toCoord]
        //             })
        //         }

        //     }

        // }

    }
    return res;
};

// 水质起点和终点坐标
let riverCoord = function (data: any[], map: any) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let coords = [];
        let coordsArr = []
        let dataItem = data[i];
        let proj = map.getView().getProjection();
        let name = dataItem.properties_.name;
        let sz = dataItem.MBSZLB
        let fcoords = dataItem.flatCoordinates_;
        for (let i = 0; i < fcoords.length; i += 2) {
            coords.push(fcoords.slice(i, i + 2))
        }
        let fromCoord = [];
        let toCoord = [];
        fromCoord = coords[0];
        toCoord = coords[coords.length - 1];
        if (fromCoord && toCoord) {
            res.push({
                name: name,
                value: sz,
                coords: [fromCoord, toCoord]
            })
        }

    }
    return res;
}


function getLines(map: any, feature?: any) {
    let color = ['#ffa022', '#a6c84c', '#46bee9'];
    let series: any[] = [];
    console.log(riverCoord(feature, map))
    riverCoord(feature, map).forEach((item: any, index: number) => {
        series.push(
            {
                name: index + '水质',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: false,
                    // period: 6,
                    constantSpeed: 0,
                    trailLength: 0,
                    // color: '#fff',
                    symbolSize: 10
                },
                lineStyle: {
                    show: false,
                    normal: {
                        color: color[0],
                        width: 0,
                        curveness: 0
                    }
                },
                label: {
                    show: true,
                    position: 'middle',
                    formatter: (params: any) => {
                        let data = params.data;

                        return data.value ? `${data.value}类` : ""

                    }
                },
                data: [riverCoord(feature, map)[index]],
                animation: false
            },
            {
                name: index + '流向',
                type: 'lines',
                zlevel: 2,
                polyline: true,
                symbol: ["none", "arrow"],
                effect: {
                    show: true,
                    // period: 2,
                    constantSpeed: 10,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    show: true,
                    normal: {
                        // type: 'dashed',
                        color: color[0],
                        width: 3,
                        opacity: 0.4,
                        curveness: 0
                    },
                },
                data: [convertData(feature, map)[index]],
                animation: false
            },
            // {
            //     name: '水质',
            //     type: 'effectScatter',
            //     zlevel: 2,
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     label: {
            //         normal: {
            //             show: true,
            //             position: 'center',
            //             formatter: '{c}'
            //         }
            //     },
            //     // symbolSize: function (val: number[]) {
            //     //     return val[2] / 8;
            //     // },
            //     itemStyle: {
            //         normal: {
            //             color: color[0]
            //         }
            //     },
            //     // data: BJData.map(function (dataItem: any[]) {
            //     //     return {
            //     //         name: dataItem[1].name,
            //     //         value: coordinateTransform(geoCoordMap[dataItem[1].name as keyof typeof geoCoordMap],
            //     //             "EPSG:4326", map.getView().getProjection()).concat([dataItem[1].value])
            //     //     };
            //     // })
            // }
        );

    })
    let option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function (params: any) {
                //根据业务自己拓展要显示的内容
                let res = "";
                let name = params.name;
                if (params.value) {
                    let value = params.value;
                    res += "<span style='color:#fff;'>" + name + "</span>";
                    res += "<br/>水质：" + value + "类";
                }
                return res;
            }
        },
        series: series
    };
    console.log(option)
    return option;
}

export default getLines;
