import { fetch } from 'zx'

const requestUrl = 'http://npm-web.cestc.cn/browse/keyword/@zhangwj0520/'

const pkgs = ['tailwind-base', 'tailwind-plugin']

const requestUrls = pkgs.map(item => requestUrl + item)

async function sync() {
  await Promise.all(requestUrls.map(url => fetch(url)))
}

sync()
