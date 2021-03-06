import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getSingerList() {
  const url = "https://szc.y.qq.com/v8/fcg-bin/v8.fcg"

  const data = Object.assign({}, commonParams, {
    channel:"singer",
    page:"list",
    key: "all_all_all", //获取所以排行歌手信息，all_all_A获取A字母开头的歌手信息
    pagesize: 100, //获取100条数据
    pagenum: 1,
    // g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: "jsonp",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
  })

  return jsonp(url,data,options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    singermid: singerId,
    format: "jsonp",
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    platform: "h5page",
    needNewCode: 1,
    order: "listen",
    from: "h5",
    num: 100, //获取歌曲数量
    begin: 0
  })

  return jsonp(url, data, options)
}
