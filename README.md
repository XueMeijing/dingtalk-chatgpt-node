# 钉钉机器人node版本
使用 [nestjs](https://github.com/nestjs/nest) 框架和 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) , 有web端和openai key (chatgpt-3.5-turbo)两种模式，[两种模式对比](https://github.com/transitive-bullshit/chatgpt-api#usage)

## 条件要求
1. 创建钉钉机器人[如何创建机器人](https://juejin.cn/post/7208885488802922556)
2. 有公网IP的服务器
3. 有chatgpt账号或者session(此项目 [pandora](https://github.com/pengzhile/pandora) 有免费体验账号 https://chat-shared1.zhile.io/shared.html)
4. 使用官方key模式需要有chatgpt key(付费，需要绑定银行卡，可以用USDT买虚拟信用卡 Depay ，绑卡换美国节点台湾节点等 [Depay申请教程](https://blog.aiservices.tech/40.html))，需要外网服务器

## 快速开始
**当前node版本v18.16.0**
1. 克隆本仓库
    ```
    git clone https://github.com/XueMeijing/dingtalk-chatgpt-node.git
    ```
2. 安装依赖
    ```shell
    pnpm install
    ```
3. 填写 ```src/app.config.ts``` 内相关的key

    APP_SECRET、GPT_SESSION、GPT_KEY

4. 运行
    ```shell
    pnpm start
    ```
5. 使用pm2监控(可选)

    **pnpm start或者pnpm run build之后，会生成dist文件**
    ```
    pm2 start dist/main.js
    ```
6. 查看输出
    ```
    pm2 logs
    ```
7. 钉钉机器人开发管理配置地址为(服务器防火墙记得开3000端口)
    ```
    http://<YOUR IP>:3000/chatgpt/unofficial
    ```

## 待办
- 使用数据库增记录对话id,增加上下文

## 使用
默认使用web版本 [chatgptunofficialproxyapi](https://github.com/transitive-bullshit/chatgpt-api#usage---chatgptunofficialproxyapi) ，通过 [@pengzhile](https://github.com/pengzhile) 代理请求。请求前加/official可使用官方版本 [chatgptapi](https://github.com/transitive-bullshit/chatgpt-api#usage---chatgptapi)

![image](https://user-images.githubusercontent.com/35559153/237013286-7d52066d-5b40-45f4-91e4-fe6e042a96a0.png)

![image](https://user-images.githubusercontent.com/35559153/237012436-b5273e16-e959-4121-95e3-6ae1c7d1be7a.png)
