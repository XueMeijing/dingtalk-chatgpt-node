# 钉钉机器人node版本
使用 [nestjs](https://github.com/nestjs/nest) 框架和 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) , 有web端和openai key (chatgpt-3.5-turbo)两种模式，[两种模式对比](https://github.com/transitive-bullshit/chatgpt-api#usage)
## 条件要求
1. 创建机器人[如何创建机器人](https://juejin.cn/post/7208885488802922556)
2. 有公网IP的服务器
3. 有chatgpt账号，使用官方key模式需要有chatgpt key(付费，需要绑定银行卡，可以用USDT买虚拟信用卡 Depay ，绑卡换美国节点台湾节点等 [Depay申请教程](https://blog.aiservices.tech/40.html))
## 快速开始
1. 当前node版本v18.16.0
2. 安装依赖
    ```shell
    pnpm install
    ```
3. 填写 ```src/app.config.ts``` 相关的key
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
## 使用
默认使用web版本 [chatgptunofficialproxyapi](https://github.com/transitive-bullshit/chatgpt-api#usage---chatgptunofficialproxyapi) ，通过 [@pengzhile](https://github.com/pengzhile) 代理请求。请求前加/official可使用官方版本 [chatgptapi](https://github.com/transitive-bullshit/chatgpt-api#usage---chatgptapi)

## 待办
- 使用数据库增记录对话id,增加上下文
