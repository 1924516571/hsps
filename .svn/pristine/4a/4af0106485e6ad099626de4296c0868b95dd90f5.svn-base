let planePath = `image://${require("@/assets/定位.png")}`

function getLines(data1: any[], data2: any[]) {
    let color = ['#a6c84c', '#ffa022', '#46bee9'];
    let series: any[] = [];
    series.push(
        {
            name: "巡查路线",
            type: 'lines',
            zlevel: 1,
            effect: {
                show: false,
                // period: 10,
                constantSpeed: 1,
                trailLength: 0,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[0],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: data1
        },
        {
            name: '走向',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'none'],
            symbolSize: 10,
            polyline: true,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15,
                // loop: false
            },
            lineStyle: {
                color: color[0],
                width: 1,
                opacity: 0,
                curveness: 0
            },
            data: data2
        },
    )
    let option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:9999',
        },
        series: series
    };
    return option;
}

export default getLines;
