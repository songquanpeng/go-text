# Go Text
> 开箱即用的终端风格多人聊天工具。

## 特点
1. 无需配置环境，仅单个可执行文件，直接双击即可开始使用。
2. 终端极客风格。

![demo](https://user-images.githubusercontent.com/39998050/180441565-5fe85c89-9f89-45c3-8492-6dd2178b2a11.png)

## 使用方法
直接双击即可使用，默认端口为 `3000`。

如果需要修改端口，加参数即可：`./go-text.exe --port 80`

当前支持以下命令：
1. `help`：获取帮助信息；
2. `nickname your_nickname`：设置前缀（用于聊天）；


## 演示
https://go-txt.herokuapp.com/

## 其他
打包编译：`go build -ldflags "-s -w"`