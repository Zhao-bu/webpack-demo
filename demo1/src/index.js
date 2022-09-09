import {str} from "./hello.js"
import backImg from './image/background.png'
import './static/hxb-font.otf'
import './static/style.css'
//js模块
let body =  document.querySelector('body');
body.innerHTML = `<h1>${str}</h1>`

//图片资源
body.innerHTML += `<img id='img'>`
let img = document.getElementById('img');
img.src = backImg
img.style.width = '360px';
img.style.height = '200px';
console.log(backImg)

body.innerHTML += `<p id='font'>胡晓波男神字体</p>`
let font =  document.getElementById('font')
font.style.fontFamily = 'hxb'