# 选你妹

一个用来治选择困难的小网页。

把几个选项写进去，点一下按钮，它就随机替你选一个。界面做成了复古小票风格，像把纠结打印成一张收据。

<img width="2240" height="1651" alt="CleanShot 2026-06-24 at 16 23 07@2x" src="https://github.com/user-attachments/assets/c0a220b3-6524-4ed2-9288-0f4645f2e2a2" />


体验网址：https://kanshao2077.github.io/xuan-ni-mei/

## 能干什么

- 自己输入候选项
- 随机抽一个结果
- 保存最近抽过的结果
- 支持手机浏览器打开
- 支持 PWA，部署到 HTTPS 后可以添加到手机主屏幕

## 怎么用

每行写一个选项，比如：

```text
火锅
烧烤
麻辣烫
```

然后点 `PRINT MY CHOICE`。

## 本地打开

这个项目不需要安装依赖。

在项目目录里运行：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

## 部署

这是一个纯静态网页，直接部署整个目录就行。

适合部署到：

- Netlify
- CloudBase 静态网站托管
- Webify
- GitHub Pages

入口文件是：

```text
index.html
```

不需要构建命令。

## 文件说明

```text
index.html              页面结构
styles.css              页面样式
app.js                  随机选择逻辑
manifest.webmanifest    PWA 配置
sw.js                   离线缓存
icons/                  手机主屏幕图标
```

## 一句话

别纠结，打印出来就按它办。
