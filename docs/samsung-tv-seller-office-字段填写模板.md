# Samsung TV Seller Office 字段填写模板

适用项目：`MoneTV / GoMaxShort`

配套文档：
- [上线流程](E:/code/workspace/MoneTV/docs/samsung-tv-seller-office-上线流程.md)
- [UI Description PPTX 中文大纲](E:/code/workspace/MoneTV/docs/samsung-tv-ui-description-pptx-中文大纲.md)

当前可直接使用的文件：
- 安装包：[GoMaxShort.wgt](E:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt)
- 截图目录：[store-screenshots](E:/code/workspace/MoneTV/store-screenshots)
- 配置文件：[config.xml](E:/code/workspace/MoneTV/config.xml)

注意：
- 当前包内应用名是 `GoMaxShort`，见 [config.xml](E:/code/workspace/MoneTV/config.xml#L9)。
- Samsung 官方要求默认语言下的标题与包内名称一致。为了先顺利提审，默认标题建议填写 `GoMaxShort`。
- 如果商店最终想展示 `Mone TV`，建议先改 [config.xml](E:/code/workspace/MoneTV/config.xml#L9) 后重新打包，再统一填写。

## 1. Create App

页面：`Applications > Create App`

建议填写：

| 字段 | 建议值 | 备注 |
|---|---|---|
| Application Name | `GoMaxShort` | Seller Office 内部管理名，建议与包名一致 |
| Application Type | `TV App` / `Web App` | 根据页面实际选项选择 |
| Default Language | `English` | 当前 UI 为英文 |

## 2. App Package

页面：`Applications > App Package`

填写/上传：

| 字段 | 建议值 | 备注 |
|---|---|---|
| Package File | [GoMaxShort.wgt](E:/code/workspace/MoneTV/.buildResult/GoMaxShort.wgt) | 上传最新包 |
| Version | `1.0.0` | 当前 [config.xml](E:/code/workspace/MoneTV/config.xml#L2) 为 `1.0.0` |
| Required Version | `3.0` | 当前 [config.xml](E:/code/workspace/MoneTV/config.xml#L4) 为 `3.0` |

上传后重点确认：

- `Pre-Test` 通过
- `feature` 中已包含 `screen.size.normal.1080.1920`
- 包内签名正常

## 3. App Images

页面：`Applications > App Images`

### 3.1 必传素材

| 字段 | 建议文件 | 备注 |
|---|---|---|
| Logo Image | `待补` | `1920x1080`，透明 Logo 推荐 |
| Background Image | `待补` | `1920x1080` |
| 512x423 PNG Icon | `待补` | PNG |

### 3.2 Screenshot Images

建议直接上传：

1. [01-home-hero.jpg](E:/code/workspace/MoneTV/store-screenshots/01-home-hero.jpg)
2. [02-home-popular.jpg](E:/code/workspace/MoneTV/store-screenshots/02-home-popular.jpg)
3. [03-discover-top.jpg](E:/code/workspace/MoneTV/store-screenshots/03-discover-top.jpg)
4. [04-discover-new-this-week.jpg](E:/code/workspace/MoneTV/store-screenshots/04-discover-new-this-week.jpg)

已验证：

- 都是 `1920x1080`
- 都是 `JPG`
- 都小于 `500KB`

## 4. Title/Description on TV

页面：`Applications > Title/Description on TV`

### 4.1 默认语言

建议先填写：

| 字段 | 建议值 |
|---|---|
| Language | `English` |
| App Title | `GoMaxShort` |
| Short Description | `Watch free short dramas and mini-series on your Samsung TV.` |
| Full Description | `GoMaxShort brings short-form drama entertainment to Samsung TV. Browse featured titles, explore new stories, open drama detail pages, and watch episodes in a TV-friendly player optimized for remote control navigation.` |
| Keywords | `short drama, mini series, drama, streaming, TV` |

说明：
- 这套文案是为了先通过提审和建立商店页。
- 如果你们最终品牌名确定为 `Mone TV`，建议统一改包名后再同步更新标题和描述。

### 4.2 可选中文版文案

如果 Seller Office 支持中文语言包，可以追加：

| 字段 | 建议值 |
|---|---|
| Language | `Chinese (Simplified)` |
| App Title | `GoMaxShort` |
| Short Description | `在三星电视上观看免费短剧与迷你剧集。` |
| Full Description | `GoMaxShort 为三星电视提供短剧内容浏览与播放体验。你可以在首页与发现页浏览内容，进入剧集详情页查看剧集列表，并在适配电视遥控器的播放器中直接播放。` |
| Keywords | `短剧, 迷你剧, 电视剧, 视频, 三星电视` |

## 5. Service Info

页面：`Applications > Service Info`

### 5.1 基础服务信息

| 字段 | 建议值 | 备注 |
|---|---|---|
| Service Category | `Video` | 推荐 |
| Age Rating | `待确认` | 按实际内容评级 |
| Supported Language | `English` | 当前 UI 为英文 |
| Privacy Policy URL | `待补` | 建议必须准备 |
| Terms of Use URL | `可选 / 待补` | 如果页面要求则补 |

### 5.2 Seller Information

直接使用你提供的信息：

| 字段 | 值 |
|---|---|
| Seller Name (Company Name) | `MATICONE LTD` |
| Customer Support E-mail | `bd@maticone.net` |
| Seller Homepage | `https://maticone.net/` |
| Representative's Name | `db` |
| Phone Number | `+44 7536 337266` |
| Address | `Suite 3366, 5 Brayford Square, London, England E1 0SG` |

待补字段：

| 字段 | 当前状态 | 备注 |
|---|---|---|
| Registration Number / Company Number | `待补` | 企业账号通常会要求 |
| VAT / Tax Number | `待确认` | 按页面要求填写 |
| D-U-N-S Number | `待确认` | 如果页面要求 |

## 6. Service Country/Region

页面：`Applications > Service Country/Region`

建议填写策略：

- 只选择你们已经确认内容版权和运营支持的国家/地区
- 如果客服邮箱、公司信息、隐私政策都已是英文，优先上英语市场更稳

建议先内部确认后再填：

| 字段 | 建议值 |
|---|---|
| Countries / Regions | `待你确认` |

如果只是先走提审流程，建议从少量目标市场开始，不要一次铺太多地区。

## 7. App Feature Info

页面：`Applications > App Feature Info`

建议按当前项目实际能力填写：

| 字段 | 建议内容 |
|---|---|
| App Type | `Video streaming / VOD` |
| Login Required | `No` |
| In-App Purchase | `No` |
| Ads | `待确认` |
| Main Features | `Browse dramas, explore discovery page, open detail pages, play episode videos, remote-control navigation` |
| Network Required | `Yes` |

不要填写当前没有实现的功能，例如：

- 账号体系
- 收藏同步
- 支付订阅
- 真正可用的搜索

## 8. Verification Information / Test Information

页面：`Applications > Verification Information` 或 `Test Information`

可直接填写的测试说明模板：

### 8.1 Test Account

| 字段 | 建议值 |
|---|---|
| Test Account Required | `No` |
| ID | `N/A` |
| Password | `N/A` |

### 8.2 Test Steps

建议填写：

```text
1. Launch the app.
2. The app opens on the Home page.
3. Use the remote directional keys to move focus across the top navigation and content cards.
4. Open a drama card from the Home page to enter the detail page.
5. Select Play Episode 1 to open the player page.
6. Verify episode playback starts correctly.
7. Use Play/Pause, Fast Forward, Rewind, and Back keys on the remote.
8. Go back to the previous page and open the Discover page.
9. Browse trending and new-this-week sections.
```

### 8.3 Additional Notes

```text
This application does not require account login.
An internet connection is required because video content is streamed online.
```

## 9. Billing

页面：`Applications > Billing`

当前项目建议：

| 字段 | 建议值 |
|---|---|
| Billing Supported | `No` |
| In-App Purchase | `No` |

如果后续做订阅或单集付费，再单独补这部分。

## 10. Distribute

页面：`Applications > Distribute`

提交前自查：

- 最新包已上传
- Pre-Test 已通过
- 4 张截图已上传
- 图标素材已上传
- 默认语言标题与包名一致
- 隐私政策已填写
- Seller Information 已填写
- UI Description `PPTX` 已上传
- 测试说明已填写

## 11. 当前提审风险

这项很重要，建议在提交前处理：

### 风险 1：顶部导航存在未实现入口

当前 [index.html](E:/code/workspace/MoneTV/index.html#L37) 到 [index.html](E:/code/workspace/MoneTV/index.html#L49) 显示了这些导航：

- `Home`
- `Discover`
- `Series`
- `Featured`
- `My Library`

但当前路由实际只实现了这些页面：

- `home`
- `discover`
- `detail`
- `player`
- `settings`

见 [router.js](E:/code/workspace/MoneTV/js/router.js#L8) 到 [router.js](E:/code/workspace/MoneTV/js/router.js#L14)。

也就是说，`Series / Featured / My Library` 当前很可能会落到无效页或回退逻辑。Samsung QA 如果点这些菜单，可能会判定：

- 无效入口
- 空页面
- 功能与说明不一致

建议二选一：

1. 提审前先隐藏这 3 个菜单
2. 或者补齐对应页面

### 风险 2：搜索框目前更像展示 UI

顶部有搜索框 UI，但当前代码里没有完整搜索结果页和搜索逻辑。提审文案和 Feature Info 里不要把“搜索”写成核心功能。

## 12. 你还需要补的内容

- 公司注册号
- 隐私政策 URL
- Logo 图
- 背景图
- 512x423 PNG 图标
- 最终商店展示名是否改为 `Mone TV`
- 是否存在广告
- 目标上线国家/地区
