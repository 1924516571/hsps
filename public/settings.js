window.mapConfig = {
  map: {
    id: "baseMap",
    view: {
      center: {
        coord: [119.9395121120892, 31.703167754790485], //武进经纬度
      },
      zoom: 13,
      maxZoom: 18,
    },
    // controls: [{
    //     name: 'zoom',
    //     zoomInTipLabel: '放大',
    //     zoomOutTipLabel: '缩小'
    // }],
    events: ["singleclick", "pointermove"],
  },
  baseLayer: [
    {
      name: "tdt_sl_base",
      source: {
        type: "XYZ",
        url:
          "http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&" +
          "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ae71200b042bdb608eca53d1e50c20c8",
        crossOrigin: "Anonymous",
      },
    },
    {
      name: "tdt_sl_txt",
      source: {
        type: "XYZ",
        url:
          "http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&" +
          "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ae71200b042bdb608eca53d1e50c20c8",
        crossOrigin: "Anonymous",
      },
    },
  ],
  // 影像图
  tdt2: [
    //影像图
    {
      name: "tdt_yx_base",
      source: {
        type: "XYZ",
        url:
          "http://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&" +
          "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ae71200b042bdb608eca53d1e50c20c8",
      },
    },
    {
      name: "tdt_yx_txt",
      source: {
        type: "XYZ",
        url:
          "http://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&" +
          "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ae71200b042bdb608eca53d1e50c20c8",
      },
    },
  ],
};
