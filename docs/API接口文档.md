# API接口文档

## 📡 接口基础信息

- **基础URL**：`https://test.acture-hub.com/api/` (测试环境) 或 `https://mini.acture-hub.com/api/` (生产环境)
- **请求方式**：GET / POST / PUT / DELETE
- **数据格式**：JSON
- **认证方式**：Bearer Token（请求头：`Authori-zation: Bearer {token}`）
- **超时时间**：10秒

---

## 🔐 认证说明

### Token获取
1. 用户登录后，后端返回Token
2. Token存储在 `store.state.app.token`
3. 请求时自动添加到请求头

### 无需认证的接口
接口定义中标注了 `noAuth: true` 的接口无需Token，例如：
```javascript
export function getIndex(data) {
  return request.get('index/index', data, {
    noAuth: true  // 无需认证
  });
}
```

---

## 📂 API文件结构

```
api/
├── api.js        # 通用API（首页、登录、优惠券等）
├── gxhc.js       # 核心业务API（理事、项目、BP诊断等）
├── public.js     # 公共API（微信授权、配置等）
├── user.js       # 用户相关API
├── order.js      # 订单相关API
├── kefu.js       # 客服相关API
└── game.js       # 游戏相关API
```

---

## 🎯 核心业务接口 (api/gxhc.js)

### 理事成员相关

#### 1. 获取理事成员列表
```javascript
getDirectorMember(data)
```
- **方法**：GET
- **路径**：`get_director_membe/list`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    page: 1,      // 页码
    limit: 10     // 每页数量
  }
  ```

#### 2. 获取理事成员详情
```javascript
getDirectorDetails(data)
```
- **方法**：GET
- **路径**：`get_director_membe/details`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    id: 123  // 成员ID
  }
  ```

#### 3. 添加理事成员（管理员）
```javascript
directorMemberAdd(data)
```
- **方法**：POST
- **路径**：`director_member/add`
- **认证**：无需认证（实际应该需要管理员权限）

---

### 项目相关

#### 1. 保存投资项目
```javascript
investProjectsSave(data)
```
- **方法**：POST
- **路径**：`invest_projects/save`
- **认证**：需要认证
- **参数**：项目信息对象

#### 2. 获取项目详情
```javascript
investProjectsDetails(data = {})
```
- **方法**：GET
- **路径**：`invest_projects/details`
- **认证**：需要认证
- **参数**：
  ```javascript
  {
    id: 123  // 项目ID
  }
  ```

#### 3. 更新项目BP
```javascript
investProjectsUpdateBP(data)
```
- **方法**：POST
- **路径**：`invest_projects/update_bp`
- **认证**：需要认证
- **参数**：BP文件信息

#### 4. 更新项目供需信息
```javascript
investProjectsUpdateSupply(data)
```
- **方法**：POST
- **路径**：`invest_projects/update_supply`
- **认证**：需要认证

#### 5. 更新项目评分
```javascript
investProjectsUpdateScore(data)
```
- **方法**：POST
- **路径**：`invest_projects/update_score`
- **认证**：需要认证

#### 6. 撤销项目
```javascript
investProjectsRevoke(data)
```
- **方法**：POST
- **路径**：`invest_projects/revoke`
- **认证**：需要认证

---

### BP诊断相关

#### 1. 运行BP诊断
```javascript
runBp(data)
```
- **方法**：POST
- **路径**：`runBp`
- **认证**：需要认证
- **参数**：BP文件信息

#### 2. 获取BP信息
```javascript
getBpInfo(data)
```
- **方法**：GET
- **路径**：`getBpInfo`
- **认证**：需要认证
- **参数**：
  ```javascript
  {
    id: 123  // BP ID
  }
  ```

#### 3. 获取BP诊断结果列表
```javascript
getBpResultList(data)
```
- **方法**：GET
- **路径**：`getBpResultList`
- **认证**：需要认证
- **参数**：
  ```javascript
  {
    page: 1,
    limit: 10
  }
  ```

#### 4. 获取BP诊断结果详情
```javascript
getBpResultInfo(data)
```
- **方法**：GET
- **路径**：`getBpResultInfo`
- **认证**：需要认证
- **参数**：
  ```javascript
  {
    id: 123  // 结果ID
  }
  ```

---

### BP直播申请相关

#### 1. 申请直播诊断
```javascript
applyLiveApply(data)
```
- **方法**：POST
- **路径**：`apply_live/apply`
- **认证**：需要认证
- **参数**：申请信息（时间、BP ID等）

#### 2. 获取申请列表
```javascript
getApplyLiveList(data)
```
- **方法**：GET
- **路径**：`apply_live/list`
- **认证**：需要认证

#### 3. 获取申请详情
```javascript
getApplyLiveDetail(id, data = {})
```
- **方法**：GET
- **路径**：`apply_live/detail/{id}`
- **认证**：需要认证

#### 4. 获取用户已申请的直播
```javascript
getUserApplyLive()
```
- **方法**：GET
- **路径**：`apply_live/user_live`
- **认证**：需要认证

#### 5. 取消申请
```javascript
cancelApplyLive(id, data = {})
```
- **方法**：POST
- **路径**：`apply_live/cancel/{id}`
- **认证**：需要认证

#### 6. 获取已预订的时间槽
```javascript
getBookedTimeSlots(data)
```
- **方法**：GET
- **路径**：`apply_live/booked_slots`
- **认证**：需要认证

---

### 能量系统

#### 1. 获取用户能量
```javascript
userEnergy()
```
- **方法**：GET
- **路径**：`userEnergy`
- **认证**：需要认证

#### 2. 获取能量明细列表
```javascript
energyList(data)
```
- **方法**：GET
- **路径**：`energyList`
- **认证**：需要认证
- **参数**：
  ```javascript
  {
    page: 1,
    limit: 10
  }
  ```

---

### 行业分类

#### 1. 获取行业分类列表
```javascript
getIndustryCategories(data)
```
- **方法**：GET
- **路径**：`get_industry_categories/list`
- **认证**：需要认证

#### 2. 获取行业子分类列表
```javascript
getIndustrySubCategories(data)
```
- **方法**：GET
- **路径**：`get_industry_sub_categories/list`
- **认证**：需要认证

---

### 用户认证

#### 用户认证
```javascript
userAuth(data)
```
- **方法**：POST
- **路径**：`user/auth`
- **认证**：需要认证

---

### 订单和支付

#### 1. 创建订单
```javascript
createOrder(data)
```
- **方法**：POST
- **路径**：`createOrder`
- **认证**：需要认证

#### 2. 支付
```javascript
pay(data)
```
- **方法**：POST
- **路径**：`pay`
- **认证**：需要认证

---

### 分享相关

#### 1. 获取分享信息
```javascript
getShare(data)
```
- **方法**：GET
- **路径**：`get_share`
- **认证**：无需认证

#### 2. 设置分享
```javascript
shareSet(data)
```
- **方法**：GET
- **路径**：`share_set`
- **认证**：无需认证

---

### 反馈

#### 提交反馈
```javascript
feedBack(data)
```
- **方法**：POST
- **路径**：`feedback`
- **认证**：需要认证

---

## 👤 用户相关接口 (api/user.js)

#### 1. 获取用户信息
```javascript
getUserInfo()
```
- **方法**：GET
- **路径**：`user`
- **认证**：需要认证

#### 2. 设置用户分享
```javascript
userShare()
```
- **方法**：POST
- **路径**：`user/share`
- **认证**：需要认证

#### 3. H5用户登录
```javascript
loginH5(data)
```
- **方法**：POST
- **路径**：`login`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    account: "用户名",
    password: "密码"
  }
  ```

#### 4. 手机号登录
```javascript
loginMobile(data)
```
- **方法**：POST
- **路径**：`login/mobile`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    phone: "手机号",
    code: "验证码"
  }
  ```

---

## 🌐 公共接口 (api/public.js)

### 微信相关

#### 1. 获取微信SDK配置
```javascript
getWechatConfig()
```
- **方法**：GET
- **路径**：`wechat/config`
- **认证**：无需认证

#### 2. 微信授权
```javascript
wechatAuth(code, spread, login_type)
```
- **方法**：GET
- **路径**：`wechat/auth`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    code: "微信授权code",
    spread: "推广人ID",
    login_type: "登录类型"
  }
  ```

#### 3. 小程序用户登录
```javascript
login(data)
```
- **方法**：POST
- **路径**：`wechat/mp_auth`
- **认证**：无需认证
- **参数**：小程序登录信息

#### 4. 静默授权
```javascript
silenceAuth(data)
```
- **方法**：GET
- **路径**：`v2/wechat/silence_auth` (小程序) 或 `v2/wechat/auth_type` (H5)
- **认证**：无需认证

#### 5. 小程序绑定手机号
```javascript
routineBindingPhone(data)
```
- **方法**：POST
- **路径**：`v2/routine/auth_binding_phone`
- **认证**：无需认证

#### 6. 公众号绑定手机号
```javascript
wechatBindingPhone(data)
```
- **方法**：POST
- **路径**：`v2/wechat/auth_binding_phone`
- **认证**：无需认证

---

### 配置相关

#### 1. 获取基础配置
```javascript
basicConfig()
```
- **方法**：GET
- **路径**：`basic_config`
- **认证**：无需认证
- **说明**：应用启动时调用，保存到本地存储

#### 2. 获取高校列表
```javascript
getColleges()
```
- **方法**：GET
- **路径**：`get_colleges`
- **认证**：无需认证

#### 3. 获取企业列表
```javascript
getEnterprise()
```
- **方法**：GET
- **路径**：`get_enterprise`
- **认证**：无需认证

---

## 🏠 通用接口 (api/api.js)

### 首页相关

#### 1. 获取首页数据
```javascript
getIndex(data)
```
- **方法**：GET
- **路径**：`index/index`
- **认证**：无需认证

#### 2. 获取主页数据（V2）
```javascript
getIndexData()
```
- **方法**：GET
- **路径**：`v2/index`
- **认证**：无需认证

---

### 登录注册

#### 1. 手机号注册
```javascript
phoneRegister(data)
```
- **方法**：POST
- **路径**：`register`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    phone: "手机号",
    code: "验证码",
    password: "密码"
  }
  ```

#### 2. 手机号登录
```javascript
phoneLogin(data)
```
- **方法**：POST
- **路径**：`login`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    phone: "手机号",
    password: "密码"
  }
  ```

#### 3. 获取验证码KEY
```javascript
verifyCode()
```
- **方法**：GET
- **路径**：`verify_code`
- **认证**：无需认证

#### 4. 发送验证码
```javascript
registerVerify(phone, reset, key, captchaType, captchaVerification)
```
- **方法**：POST
- **路径**：`register/verify`
- **认证**：无需认证
- **参数**：
  ```javascript
  {
    phone: "手机号",
    type: "reset" | "register",
    key: "验证码KEY",
    captchaType: "验证码类型",
    captchaVerification: "验证码验证"
  }
  ```

#### 5. 绑定手机号
```javascript
bindingPhone(data)
```
- **方法**：POST
- **路径**：`binding`
- **认证**：无需认证

#### 6. 退出登录
```javascript
logout()
```
- **方法**：GET
- **路径**：`logout`
- **认证**：需要认证

---

## 📝 使用示例

### 示例1：调用需要认证的接口

```javascript
import { getUserInfo } from "@/api/user.js";

// 获取用户信息
getUserInfo().then(res => {
  console.log('用户信息：', res.data);
  // 更新到Vuex
  this.$store.commit('UPDATE_USERINFO', res.data);
}).catch(err => {
  console.error('获取失败：', err);
});
```

### 示例2：调用无需认证的接口

```javascript
import { getDirectorMember } from "@/api/gxhc.js";

// 获取理事成员列表
getDirectorMember({
  page: 1,
  limit: 10
}).then(res => {
  console.log('理事成员列表：', res.data);
});
```

### 示例3：上传BP进行诊断

```javascript
import { runBp } from "@/api/gxhc.js";

// 上传BP文件
uni.chooseFile({
  count: 1,
  type: 'file',
  success: (res) => {
    const file = res.tempFiles[0];
    
    // 上传到云存储或服务器
    // ... 上传逻辑 ...
    
    // 调用诊断接口
    runBp({
      file_id: fileId,
      file_name: file.name
    }).then(res => {
      console.log('诊断结果：', res.data);
      // 跳转到结果页面
      uni.navigateTo({
        url: `/subpackage1/bp/detail/index?id=${res.data.id}`
      });
    });
  }
});
```

### 示例4：发起项目

```javascript
import { investProjectsSave } from "@/api/gxhc.js";

// 保存项目
investProjectsSave({
  name: "项目名称",
  description: "项目描述",
  industry_id: 1,
  // ... 其他项目信息
}).then(res => {
  uni.showToast({
    title: '项目发起成功',
    icon: 'success'
  });
  // 跳转到项目详情
  uni.navigateTo({
    url: `/pages/project/detail/index?id=${res.data.id}`
  });
});
```

---

## ⚠️ 错误处理

### 常见错误码

- **200**：成功
- **110002/110003/110004**：Token过期，需要重新登录
- **100103**：需要弹窗提示用户

### 错误处理示例

```javascript
import { getUserInfo } from "@/api/user.js";

getUserInfo().then(res => {
  // 成功处理
}).catch(err => {
  // 错误处理
  if (typeof err === 'string') {
    uni.showToast({
      title: err,
      icon: 'none'
    });
  } else if (err.status === 110002) {
    // Token过期，跳转登录
    uni.navigateTo({
      url: '/pages/mine/login/index'
    });
  }
});
```

---

## 🔍 调试技巧

### 1. 查看请求详情
在 `utils/request.js` 中可以添加日志：

```javascript
console.log('请求URL：', newUrl);
console.log('请求参数：', data);
console.log('请求头：', header);
```

### 2. 查看响应数据
在接口调用处添加日志：

```javascript
getUserInfo().then(res => {
  console.log('响应数据：', res);
  console.log('响应状态：', res.status);
  console.log('响应内容：', res.data);
});
```

### 3. 使用开发者工具
- 打开微信开发者工具
- 查看"网络"面板，可以看到所有API请求
- 查看请求和响应的详细信息

---

## 📚 注意事项

1. **Token管理**：Token会自动添加到请求头，无需手动处理
2. **错误处理**：建议统一处理错误，提供友好的用户提示
3. **请求超时**：默认10秒，可在 `config/app.js` 中修改
4. **环境切换**：修改 `config/app.js` 中的 `env` 变量切换环境
5. **分页参数**：列表接口通常需要 `page` 和 `limit` 参数

---

**文档更新时间**：2024年

