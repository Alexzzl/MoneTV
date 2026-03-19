# Samsung TV Seller Office 上线流程

适用项目：`MoneTV`

Seller Office 地址：<https://seller.samsungapps.com/>

官方参考：
- <https://developer.samsung.com/tv-seller-office/application-publication-process.html>
- <https://developer.samsung.com/tv-seller-office/guides/applications/registering-application.html>
- <https://developer.samsung.com/tv-seller-office/guides/applications/entering-application-information.html>
- <https://developer.samsung.com/tv-seller-office/checklists-for-distribution/launch-checklist.html>
- <https://developer.samsung.com/smarttv/design/app-icons-and-screenshots.html>
- <https://developer.samsung.com/tv-seller-office/checklists-for-distribution/application-ui-description.html>

## 1. 上线前准备

在登录 Seller Office 之前，先准备好以下文件和信息：

- 应用包：[`GoMaxShort.wgt`](/e:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt)
- 4 张商店截图：[`store-screenshots`](/e:/code/workspace/MoneTV/store-screenshots)
- 应用配置文件：[`config.xml`](/e:/code/workspace/MoneTV/config.xml)
- 透明 Logo 图和背景图
- `512x423` 的应用图标 PNG
- App UI Description 文档，格式必须是 `PPTX`
- 默认语言下的应用标题、描述、关键词
- 隐私政策 URL
- 测试账号或测试说明

Samsung 官方要求：

- 应用包格式：`WGT`
- 截图必须是 4 张，`JPG`，`1280x720` 或 `1920x1080`，每张小于 `500KB`
- 应用图标需要两套：
  - `1920x1080` Logo + Background
  - `512x423` PNG
- 提审时需要 UI Description 文档

## 2. 当前项目已准备好的文件

本项目当前可以直接用于提审的文件：

- 安装包：[`GoMaxShort.wgt`](/e:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt)
- 截图 1：[`01-home-hero.jpg`](/e:/code/workspace/MoneTV/store-screenshots/01-home-hero.jpg)
- 截图 2：[`02-home-popular.jpg`](/e:/code/workspace/MoneTV/store-screenshots/02-home-popular.jpg)
- 截图 3：[`03-discover-top.jpg`](/e:/code/workspace/MoneTV/store-screenshots/03-discover-top.jpg)
- 截图 4：[`04-discover-new-this-week.jpg`](/e:/code/workspace/MoneTV/store-screenshots/04-discover-new-this-week.jpg)

注意：

- 当前 `config.xml` 已补上屏幕尺寸 `feature`，用于通过 Pre-Test。
- 当前包内应用名是 `GoMaxShort`，Seller Office 默认语言里的 `App Title` 最好与 `config.xml` 中的 `<name>` 保持一致，否则可能在预检时报错。
- 如果最终商店展示名想用 `Mone TV`，建议在提交前统一确认 `config.xml`、Seller Office 默认语言标题、以及实际产品名的命名策略。

## 3. 卖家信息填写

在 `Membership > Group Information` 或应用级 `Applications > Service Info > Seller Information` 中，填写以下信息：

- Seller Name (Company Name): `MATICONE LTD`
- Customer Support E-mail: `bd@maticone.net`
- Seller Homepage: `https://maticone.net/`
- Representative's Name: `db`
- Phone Number: `+44 7536 337266`
- Address:

```text
Suite 3366, 5 Brayford Square,
London, England E1 0SG
```

补充说明：

- 官方说明里提到，如果账号类型是 `Company or Business`，通常还需要填写公司注册号，例如 `VAT Number`、`Company Number`、`DUNS` 等。
- 如果 Seller Office 页面要求 `Registration Number`，这里需要补充你们公司的正式注册号，当前信息里还没有。

## 4. Seller Office 实际操作流程

### Step 1：登录并创建应用

进入 Seller Office 后：

1. 打开 `Applications`
2. 点击 `Create App`
3. 填写：
   - `Application Name`
   - `Application Type`
   - `Default Language`
4. 点击 `Done`

注意：

- `Application Name` 是 Seller Office 内部管理名，不是 TV 上展示给用户的最终标题。
- 创建后会生成新的 `App ID`，不能重复，也不能随便改。

### Step 2：上传应用包

进入 `Applications > App Package`：

1. 上传 [`GoMaxShort.wgt`](/e:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt)
2. 等待 Seller Office 自动执行 Pre-Test
3. 如果有报错，先修配置或资源，再重新打包上传

这一步重点检查：

- 包内必须有 `config.xml`
- 包内必须有 `author-signature.xml`
- 包内必须有 `signature1.xml`
- `required_version` 格式要正确
- 屏幕尺寸要在 `feature` 中声明
- 包版本号必须高于已上传版本

### Step 3：填写应用图片

进入 `Applications > App Images`：

1. 上传 `1920x1080` 的 Logo 图
2. 上传 `1920x1080` 的背景图
3. 上传 `512x423` 的 PNG 图标
4. 上传 4 张商店截图

本项目截图建议直接用：

1. [`01-home-hero.jpg`](/e:/code/workspace/MoneTV/store-screenshots/01-home-hero.jpg)
2. [`02-home-popular.jpg`](/e:/code/workspace/MoneTV/store-screenshots/02-home-popular.jpg)
3. [`03-discover-top.jpg`](/e:/code/workspace/MoneTV/store-screenshots/03-discover-top.jpg)
4. [`04-discover-new-this-week.jpg`](/e:/code/workspace/MoneTV/store-screenshots/04-discover-new-this-week.jpg)

注意：

- 截图顺序可以拖拽调整
- 官方说明里提到截图 3 在部分 TV 型号上可能不显示
- 如果应用有内购，建议第 4 张放价格信息页

### Step 4：填写标题和描述

进入 `Applications > Title/Description on TV`：

1. 填默认语言的 `App Title`
2. 填 `Description`
3. 填至少 3 个搜索关键词
4. 如果要上多个国家，继续补多语言

注意：

- 默认语言下的 `App Title` 要和包里的 `config.xml` 名称一致
- 没用到的语言不要保留空白项，否则可能导致无法提交

### Step 5：填写服务信息

进入 `Applications > Service Info`：

需要填写：

- `Service Category`
- `Rating`
- `Language`
- `Privacy Policy`
- `Seller Information`
- `DoC for EAA`

建议：

- 类目优先选 `Video`
- 年龄评级按内容实际情况选择
- 如果有收集用户信息，必须填写隐私政策 URL
- 如果要上欧盟国家，需要确认是否要补 EAA 相关声明文件

### Step 6：填写服务国家/地区

进入 `Applications > Service Country/Region`：

1. 选择要上线的国家或地区
2. 保存

注意：

- 某些国家需要额外合规信息
- 如果后面改国家范围，Seller Office 可能会要求填写变更原因并重新审核

### Step 7：填写功能和测试信息

进入相关菜单，补充：

- `App Feature Info`
- `Test Information`
- `Billing`
- 其他与内购、广告、账号登录相关的字段

如果应用有以下能力，要额外确认：

- 登录功能
- 订阅或支付
- 广告
- 区域限制
- 必须使用测试账号才能进入主流程

建议准备：

- 测试账号
- 测试密码
- 测试步骤说明
- 如有验证码、白名单、地区限制，也要写清楚

### Step 8：上传 UI Description

按官方要求准备 `PPTX` 文档，并在对应位置上传。

文档里通常需要包含：

- 页面结构图
- 核心流程
- 各页面截图
- 遥控器按键说明
- 菜单与功能说明
- 多语言切换方式

这个文档不完整，是很常见的驳回原因。

### Step 9：提交发布

进入 `Applications > Distribute`：

1. 选择 TV Model Group
2. 检查 Pre-Test 结果
3. 预览提交内容
4. 点击 `Submit`

提交后：

- Samsung 会继续做验证和审核
- 有问题会在 Seller Office 返回缺陷或驳回意见
- 需要修复后重新上传包并再次提交

## 5. 这次项目最容易踩的坑

### 5.1 屏幕尺寸 feature 缺失

这个项目之前已经碰到过。

现在 [config.xml](/e:/code/workspace/MoneTV/config.xml) 里已经补上：

```xml
<feature name="http://tizen.org/feature/screen.size.normal.1080.1920"/>
```

如果之后重新生成包，必须确保这个标签还在。

### 5.2 默认语言标题不一致

官方要求：

- 包里的 `name` 或 `label`
- Seller Office 默认语言下的 `App Title`

这两个要一致，否则 Pre-Test 可能失败。

当前 [config.xml](/e:/code/workspace/MoneTV/config.xml) 中是：

```xml
<name>GoMaxShort</name>
```

所以上线时要么：

- Seller Office 默认标题填 `GoMaxShort`

要么：

- 先把包里的 `<name>` 改成你最终想展示的标题，再重新打包上传

### 5.3 截图、图标、UI 文档不完整

Seller Office 最常见的卡点不是代码，而是物料不完整：

- 图标尺寸不对
- 截图不足 4 张
- 截图超 500KB
- UI Description 缺页
- 没有测试账号

## 6. 推荐提交流程

建议按下面顺序做，最省时间：

1. 先上传应用包，确认 Pre-Test 通过
2. 再填 `App Images`
3. 再填 `Title/Description`
4. 再填 `Service Info`
5. 再填国家、测试信息、功能信息
6. 最后上传 UI Description
7. 去 `Distribute` 提交

## 7. 提交前自查清单

- 已登录正确的 Seller Group
- 应用包已使用最新版本
- 包路径正确：[`GoMaxShort.wgt`](/e:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt)
- `config.xml` 已包含屏幕尺寸 `feature`
- 默认语言标题与包内 `name` 一致
- 已上传 4 张截图
- 截图尺寸和大小符合要求
- 图标两套尺寸已上传
- `Privacy Policy URL` 已填写
- `Seller Information` 已填写
- `Registration Number` 如页面要求则已填写
- `UI Description.pptx` 已上传
- 测试账号和测试步骤已填写

## 8. 本项目当前待你补的内容

当前还需要你确认或补齐：

- 公司注册号：如果 Seller Office 要求 `Registration Number`
- 隐私政策 URL
- 应用默认展示名：到底用 `GoMaxShort` 还是 `Mone TV`
- `1920x1080` Logo 图
- `1920x1080` 背景图
- `512x423` PNG 图标
- UI Description 的 `PPTX`
- 测试账号说明

## 9. 快速结论

这个项目现在已经具备基础提审条件：

- 包已能生成
- 屏幕尺寸 `feature` 已修正
- 4 张截图已准备好

接下来最关键的是把 Seller Office 的元信息补齐，尤其是：

- 默认标题一致性
- 卖家信息
- 隐私政策
- 图标素材
- UI Description

如果你需要，我下一步可以继续帮你做两件事：

1. 直接再写一份 `Seller Office 字段填写模板`
2. 帮你生成 `UI Description.pptx` 的中文大纲
