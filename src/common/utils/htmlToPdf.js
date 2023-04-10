import html2canvas from "html2canvas"
import JsPDF from "jspdf"



/**
 * @param ele要生成 pdf 的DOM元素（容器）
 * @param padfName     PDF文件生成后的文件名字
 * */

export const getPdfFromHtml = function (ele, pdfFileName) {
    let eleW = ele.offsetWidth// 获得该容器的宽
    //   let eleH = ele.offsetHeight // 获得该容器的高
    let eleH = ele.scrollHeight// 获得该容器的高
    let eleOffsetTop = ele.offsetTop// 获得该容器到文档顶部的距离
    let eleOffsetLeft = ele.offsetLeft// 获得该容器到文档最左的距离
    var canvas = document.createElement("canvas")
    var abs = 0
    let win_in = document.documentElement.clientWidth || document.body.clientWidth// 获得当前可视窗口的宽度（不包含滚动条）
    let win_out = window.innerWidth// 获得当前窗口的宽度（包含滚动条）
    if (win_out > win_in) {
        // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
        abs = (win_out - win_in) / 2// 获得滚动条宽度的一半
    }
    canvas.width = eleW// 将画布宽&&高
    canvas.height = eleH
    var context = canvas.getContext("2d")
    context.scale(2, 2) // 增强图片清晰度
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
    html2canvas(ele, {
        dpi: 300,
        useCORS: true//允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
    }).then(canvas => {
        var contentWidth = canvas.width
        var contentHeight = canvas.height
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 592.28) * 841.89 // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
        //未生成pdf的html页面高度
        var leftHeight = contentHeight
        //页面偏移
        var position = 0
        //a4纸的尺寸[595.28,841.89],单位像素，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28
        var imgHeight = (595.28 / contentWidth) * contentHeight
        var pageData = canvas.toDataURL("image/jpeg", 1.0)
        var pdf = new JsPDF("", "pt", "a4")
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight)
            // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
        } else {
            // 分页
            while (leftHeight > 0) {
                pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage()
                }
            }
        }
        pdf.save(pdfFileName + ".pdf")
    })
}