#### 前言

响应式布局我觉得分2大部分：

1. 我们为什么要使用响应式，一套固定的css布局为什么不满足不同屏幕尺寸？
2. 第二个就是实现响应式布局的方案有哪些以及怎么使用。

对于第一个问题，应该要弄清楚这些概念： 像素，分辨率，PPI，物理像素，css像素/设备独立像素，视口等等

### 一，分辨率

#### 屏幕尺寸

一般说手机是多大的尺寸，指的是对角线的长度，单位使用的是英寸，如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d28f4ea50cf64ad4b7a94c15a67484f5~tplv-k3u1fbpfcp-watermark.awebp)

以上是从苹果官网截取的对iPhone 12 的屏幕描述。可以看到主要有 尺寸、像素分辨率、ppi 这三个词。

单位换算：1英寸 = 2.54 厘米

#### 分辨率和物理像素

iPhone 12 的分辨率2532 x 1170 ，是什么意思呢？在这之前我们先了解一个概念。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe60446886344abcb143a5196b0fc83b~tplv-k3u1fbpfcp-watermark.awebp)

这张图是由特定的小方块拼接而成的，这个小方块就是我们说的像素。

分辨率分屏幕分辨率和图片分辨率。

屏幕分辨率是指屏幕由多少个像素组成。图片同理。所以iPhone 12 的分辨率2532 x 1170是指：横向上有1170个像素点，竖向上有2532个像素点。

所以设备的分辨率像素称为物理像素或者设备像素，它是显示设备中的最小单位。

#### PPI

`PPI(Pixel Per Inch)`：每英寸包括的像素数。它的计算方式如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36a759ceb3ba455c80b7259f5b7496ab~tplv-k3u1fbpfcp-watermark.awebp)

一个屏幕并不是分辨率像素越大它就越清晰。而是PPI越高，屏幕越清晰。

#### 设备独立像素

设备独立像素：device-independent pixels  简称：DIPs

在不同分辨率像素的设备上，必须要有一个单位来体现元素显示的大小。这个单位就是设备独立像素。

我们把375px 667px这样的尺寸称为独立设备像素尺寸或者css像素，就是开发日常使用的css的px大小。

#### DPR- 设备像素比

devicePixelRatio 简称 DPR

它用来描述物理像素和设备独立像素的比例，其值"物理像素/设备独立像素"。

iPhone 12 的设备独立像素为390x844，分辨率像素宽高为1170×2532， 所以 iPhone12 的 DPR 为 1170/390=3。

标准屏的DPR为1，即物理像素点和显示大小的设备像素是相等的。当DPR为2时，则是2倍屏，3则是3倍屏。

在`web`中，浏览器为我们提供了`window.devicePixelRatio`来帮助我们获取`dpr`。

在`css`中，可以使用媒体查询`min-device-pixel-ratio`，区分`dpr`：

```css

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }

```

### 二，视口

视口代表当前可见的计算机图像区域。在pc端的浏览器上，这个视口一般就是浏览器的可见范围（不包括菜单栏）。

但是在手机端为了适配浏览器上的内容，分了三种视口：布局视口、视觉视口和理想视口。

#### 布局视口

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce11243ea8b54da68c1b899a235c83d2~tplv-k3u1fbpfcp-watermark.awebp)

在移动端，布局视口被赋予一个默认值，大部分为`980px`，这保证`PC`的网页可以在手机浏览器上呈现，但是非常小，用户可以手动对网页进行放大。

我们可以通过调用`document.documentElement.clientWidth / clientHeight`来获取布局视口大小。

#### 视觉视口

视觉视口就是用户真实看到的区域。

上图中手机屏幕显示的区域为视觉视口。

我们可以通过调用`window.innerWidth / innerHeight`来获取视觉视口大小。

手机一般会让浏览器不产生滚动条，会缩放布局视口到视觉视口大小，所以会导致页面整体看起来非常小。

#### 理想视口

因为手机端展示的效果有缩小的效果，所以理想视口出现了，让布局视口等于理想视口就是理想视口了。

在css中怎么设置呢？简单的meta标签即可。

```css
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

每个字段的含义如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6aab5f910ca46588476ef7e2978d701~tplv-k3u1fbpfcp-zoom-1.image)

**其中user-scalable设置为no 可以解决移动端点击事件延迟问题**

### 适配方案

#### 媒体查询

css3的媒体查询可以使我们在不同的媒体设备上展示不同效果。当浏览器窗口大小改变的时候，会根据浏览器的大小重新渲染页面。

#### 如何确定屏幕大小的分割点

如果我们选择`600px`,`900px`,`1200px`,`1800px`作为分割点，可以适配到常见的14个机型：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5deab03c6ff445daf9bc342ad5ed8d0~tplv-k3u1fbpfcp-zoom-1.image)

当然这只是其中的一种分割方案，我们还可以这样划分：`480px`,`800px`,`1400px`,`1400px`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08bc0cdeb607418e97b0ec455394343d~tplv-k3u1fbpfcp-zoom-1.image)

#### 基本用法

语法：

##### meta标签

```css
/* 首先是meta标签 */
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

```

参数具体意思：

- width 设置的是 layoutviewport 的宽度
- initial-scale 设置页面的初始缩放值，并且这个初始缩放值是相对于 idealviewport 缩放的，最终得到的结果不仅会决定 visualviewport，还会影响到 layoutviewport
- user-scalable 是否允许用户进行缩放的设置

##### css3的@media

```css
@media mediaType and|not|only (media feature) {
     /*CSS-Code;*/
}
/* 加载兼容文件JS
因为IE8既不支持HTML5也不支持CSS3 @media ，所以我们需要加载两个JS文件，来保证我们的代码实现兼容效果 */
<!--[if lt IE 9]>
　　<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
　　<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
```

###### 媒体类型

- all 所有媒体
- braille 盲文触觉设备
- embossed 盲文打印机
- print 手持设备
- projection 打印预览
- screen 彩屏设备
- speech '听觉'类似的媒体类型
- tty 不适用像素的设备
- tv 电视

###### 关键字

- and
- not ，not关键字是用来排除某种制定的媒体类型
- only ，only用来定某种特定的媒体类型

###### 所有参数

- width:浏览器可视宽度。
- max-width: 浏览器最大可视宽度
- min-width: 浏览器最小可视宽度
- height:浏览器可视高度。
- device-width:设备屏幕的宽度。
- device-height:设备屏幕的高度。
- orientation:检测设备目前处于横向还是纵向状态。
- aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)
- device-aspect-ratio:检测设备的宽度和高度的比例。
- color:检测颜色的位数。（例如：min-color:32就会检测设备是否拥有32位颜色）
- color-index:检查设备颜色索引表中的颜色，他的值不能是负数。
- monochrome:检测单色楨缓冲区域中的每个像素的位数。（这个太高级，估计咱很少会用的到）
- resolution:检测屏幕或打印机的分辨率。(例如：min-resolution:300dpi或min-resolution:118dpcm)。
- orientation: portrait横屏/landscape竖屏
- -webkit-min-device-pixel-ratio：number /dpr 设备像素比

#### rem适配

rem是css3新增的单位，在移动端基本都支持。rem的大小是根据根元素html的大小来决定大小的。即html的font-size值改变，其大小也会随着改变。大小关系：1rem = html/font-size.

   一个简单的根据屏幕大小改变font-size的方法：

```javascript
/*容器分为10份，font-size用十分之一的宽度来表示，最后在header标签中执行这段代码，就可以动态定义font-size的大小，从而1rem在不同的视觉容器中表示不同的大小，用rem固定单位可以实现不同容器内布局的自适应。*/
function refreshRem() {
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
win.addEventListener('resize', refreshRem);
```

Webpack插件：同时为了书写方便可以直接通过 px 布局，然后在打包时利用 pxtorem 库转化为基于 rem 的布局

#### vw，vh布局

vh、vw方案即将视觉视口宽度 window.innerWidth和视觉视口高度 window.innerHeight 等分为 100 份。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4e95db63e8c47e2bd3275cb454d6336~tplv-k3u1fbpfcp-zoom-1.image)

单位定义：

- `vw(Viewport's width)`：`1vw`等于视觉视口的`1%`
- `vh(Viewport's height)` :` 1vh` 为视觉视口高度的`1%`
- `vmin` : `vw` 和 `vh` 中的较小值
- `vmax` : 选取 `vw` 和 `vh` 中的较大值

缺陷：

- `px`转换成`vw`不一定能完全整除，因此有一定的像素差。



# 参考致谢

- [一文读懂屏幕尺寸、分辨率、PPI、设备独立像素、Retina](https://juejin.cn/post/6992595716820434981)
- [关于移动端适配，你必须要知道的](https://juejin.cn/post/6844903845617729549#heading-29)
- [面试官：你了解过移动端适配吗？](https://juejin.cn/post/6844903631993454600)
- [移动端适配总结](https://juejin.cn/post/6844903734347055118#heading-11)
- [前端响应式布局原理与方案（详细版）](https://juejin.cn/post/6844903814332432397#heading-6)

