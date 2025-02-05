# Figma-Chrome-Proxy
## 前提条件
> - 内核要求：使用 Chrome 内核的浏览器
> - 网络要求：局域网下至少一台设备能科学上网
> - 插件下载：获取最新 [Releases 版本](https://github.com/leefanv/Figma-Chrome-Proxy/releases)

## 如何安装
1. 下载并解压 [Releases 版本](https://github.com/leefanv/Figma-Chrome-Proxy/releases) 插件
2. 复制 `chrome://extensions/` 并粘贴到地址栏，按回车键进入扩展程序页
3. 点击 **加载已解压的扩展程序**，选择插件目录目录地址安装插件

![如何安装](https://img.seergb.com/Figma-Chrome-Proxy-01.jpg "如何安装")
   
## 如何使用
### 管理员
1. 使用代理工具，并且打开 **允许局域网访问** 的选项
2. 复制本机的`IP`+`端口`（eg:10.12.194.16:7890），给到用户方进行配置

### 用户
1. 启用插件，打开配置面板，粘贴获取到的 `IP`+`端口`，点击保存
2. 根据需要在插件面板，启用/禁用插件功能
   
![如何设置](https://img.seergb.com/Figma-Chrome-Proxy-02.jpg "如何设置")
   
## 备注
- 关于如何优化 Figma 网络加载，市面上已有很多解决方案，本插件旨在快速解决内网环境下，部分同事访问困难的问题， 并主动权在于发起者本身，不受其他因素影响
- 请结合自身公司环境，选择不同的解决方案，插件原理本身很简单，也可以通过系统网络设置解决，插件本身目的快速、简单、易操作帮助其他同事解决问题