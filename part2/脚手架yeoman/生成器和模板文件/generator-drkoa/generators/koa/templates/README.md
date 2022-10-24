# 发布会

### 域名
 #待定

## 接口
### 用户鉴权流程
1. 如果 header 中没有 token，前端发起授权流程拿到 code 和 userInfo 信息
2. 带上 code 和 userInfo参数，调用登录接口，接口返回token 和用户信息
3. 前端吧 token 设置到 header请求中
4. 之后每个请求的 header 中均带上 token

### 通用错误码
|错误码|描述|
|---|---|
|0|成功| （其他都是错误）
|-50014|登录过期|
|-50008|无效token|

### 登录接口
POST /briefing/login
#### 参数
|参数|类型|描述|
|---|---|---|
|code|string|code|
|encryptedData|string|encryptedData|
|iv|string|iv|
#### 返回
```json
{
    "ret": 0,
    "msg": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im9wZW5pZCI6Im9kTzRaNDM0a3ozZWNUTzVUckRVOHlsWEt3WUkiLCJ1aWQiOjF9LCJleHAiOjE1NjMyNzE3NTIsImlhdCI6MTU2MzI2OTk1Mn0.GBQdoGpRMHViF74ZGOk64h6kM4e8zu0bQPHxbE66upQ",
    "data": {
        "id": 1,
        "nickname": "随风行",
        "avatar": "https://wx.qlogo.cn/mmopen/vi_32/CbWoicyQbY0JiaRNNKPXfKOD98AiboawXbV3iaKo8ygYklmm1cJ1rGxqS0EOV9BD9AyzUkLYZOWujLHJZYVzqChjsg/132",
        "mobile": null,
        "cat_type": 0
    }
}
```
