# Samsung TV UI Description PPTX 中文大纲

适用项目：`MoneTV / GoMaxShort`

用途：用于 Samsung Seller Office 提交 `App UI Description` 时制作 `PPTX`。

配套文档：
- [上线流程](E:/code/workspace/MoneTV/docs/samsung-tv-seller-office-上线流程.md)
- [Seller Office 字段填写模板](E:/code/workspace/MoneTV/docs/samsung-tv-seller-office-字段填写模板.md)

官方要求参考：
- <https://developer.samsung.com/tv-seller-office/checklists-for-distribution/application-ui-description.html>

## 1. 使用建议

Samsung 的 `UI Description` 建议你按“审核员最关心的信息”去写，不要只放漂亮截图。核心目标是让审核员快速理解：

- 应用主要做什么
- 页面结构是什么
- 遥控器怎么操作
- 有无登录、计费、广告、限制国家
- 如何完成核心流程

建议最终输出为 `PPTX`，并尽量遵循官方模板的结构。如果 Seller Office 提供了模板，优先使用官方模板，不要自定义过度复杂的版式。

## 2. 推荐页数

建议做成 10 到 12 页，足够完整又不会太冗长。

推荐结构：

1. 封面
2. 应用概览
3. 信息架构 / 页面流转图
4. Home 页面
5. Discover 页面
6. Detail 页面
7. Player 页面
8. 遥控器操作说明
9. 网络 / 加载 / 异常说明
10. 测试说明
11. 卖家与支持信息
12. 提审备注

## 3. 每页中文大纲

### 第 1 页：封面

标题：

```text
GoMaxShort
Samsung TV App UI Description
```

副标题建议：

```text
Version: 1.0.0
Platform: Samsung Smart TV Web App
Seller: MATICONE LTD
```

页面内容：

- 应用 Logo
- 背景图
- 版本号
- 日期

### 第 2 页：应用概览

标题：

```text
1. App Overview
```

建议内容：

```text
GoMaxShort is a short-drama streaming application for Samsung Smart TV.
Users can browse drama content on the Home and Discover pages, open a detail page to view episodes, and play selected episodes in a TV-friendly player.
The app is designed for remote-control navigation and online streaming playback.
```

页面建议列出：

- 应用定位：短剧 / 迷你剧 TV 端播放器
- 核心功能：
  - 首页内容浏览
  - 发现页内容浏览
  - 剧集详情页
  - 选集播放
  - 遥控器导航
- 不包含的功能：
  - 登录
  - 支付
  - 内购

### 第 3 页：信息架构 / 页面流转图

标题：

```text
2. Screen Flow
```

建议画一个简单流程图：

```text
Launch
  -> Home
      -> Detail
          -> Player
  -> Discover
      -> Detail
          -> Player
  -> Settings / Category
```

说明文字：

```text
The app starts on the Home page.
Users can browse content from Home or Discover, enter a detail page, and start playback from the player page.
```

### 第 4 页：Home 页面

标题：

```text
3. Home Screen
```

建议放图：

- [01-home-hero.jpg](E:/code/workspace/MoneTV/store-screenshots/01-home-hero.jpg)
- [02-home-popular.jpg](E:/code/workspace/MoneTV/store-screenshots/02-home-popular.jpg)

建议文案：

```text
The Home screen provides the main entry point of the app.
It includes a hero banner and multiple content rows such as popular and recently added dramas.
Users can move focus with the remote and open a drama detail page by pressing Enter.
```

说明点：

- 页面顶部导航
- Hero 推荐位
- 横向内容卡片列表
- Enter 进入详情页

### 第 5 页：Discover 页面

标题：

```text
4. Discover Screen
```

建议放图：

- [03-discover-top.jpg](E:/code/workspace/MoneTV/store-screenshots/03-discover-top.jpg)
- [04-discover-new-this-week.jpg](E:/code/workspace/MoneTV/store-screenshots/04-discover-new-this-week.jpg)

建议文案：

```text
The Discover screen helps users explore additional drama content.
It includes genre filters, trending content, category-based browsing, and a new-this-week section.
Users can move between cards and sections using the remote directional keys.
```

说明点：

- Genre Filters
- Trending
- Browse by Genre
- New This Week

### 第 6 页：Detail 页面

标题：

```text
5. Detail Screen
```

建议放图：

- [05-detail-page.jpg](E:/code/workspace/MoneTV/ui-description-screenshots/05-detail-page.jpg)

建议文案：

```text
The Detail screen shows the selected drama’s poster, metadata, description, episode list, and related recommendations.
Users can start playback from Episode 1 or choose a specific episode from the episode list.
```

说明点：

- 海报与标题
- 元信息
- 剧情描述
- Episode List
- More Like This

### 第 7 页：Player 页面

标题：

```text
6. Player Screen
```

建议放图：

- [06-player-page.jpg](E:/code/workspace/MoneTV/ui-description-screenshots/06-player-page.jpg)

建议文案：

```text
The Player screen is used for episode playback.
It contains the main video area and an episode list sidebar.
Users can play, pause, rewind, fast-forward, and switch episodes using the remote.
```

说明点：

- 视频区
- 选集侧边栏
- 自动播放下一集
- Back 返回上一页

### 第 8 页：遥控器操作说明

标题：

```text
7. Remote Control Behavior
```

结合当前 [remote.js](E:/code/workspace/MoneTV/js/remote.js) 可写：

```text
Supported remote keys:
- Up / Down / Left / Right: move focus
- Enter: confirm selection
- Back: return to previous screen
- Play / Pause: control playback
- Fast Forward / Rewind: seek video
- Exit: close the app
```

补充说明：

```text
The app is optimized for directional focus navigation.
Focusable cards and buttons are highlighted when selected.
```

### 第 9 页：网络、加载与异常说明

标题：

```text
8. Loading / Network / Error Handling
```

建议文案：

```text
The app requires an internet connection to stream video content.
A loading screen is shown during app startup.
If a drama or episode cannot be loaded, the app falls back to a previous or safe state instead of crashing.
```

这里不要写太夸张的容错能力，只写当前真实行为。

### 第 10 页：测试说明

标题：

```text
9. Test Instructions
```

建议内容：

```text
Login is not required.
No in-app purchase is included.
Test steps:
1. Launch the app
2. Open a drama from Home
3. Open the detail page
4. Start playback
5. Use playback controls
6. Return to Discover and browse additional content
```

### 第 11 页：卖家与支持信息

标题：

```text
10. Seller Information
```

建议直接填：

```text
Seller Name: MATICONE LTD
Support E-mail: bd@maticone.net
Homepage: https://maticone.net/
Representative: db
Phone: +44 7536 337266
Address: Suite 3366, 5 Brayford Square, London, England E1 0SG
```

### 第 12 页：提审备注

标题：

```text
11. Additional Notes
```

建议内容：

```text
This app is a Samsung TV web application package (.wgt).
The current release does not require login or billing.
The app is designed for remote-control navigation and online video playback.
```

## 4. 已补充的两张 UI Description 截图

为了让 UI Description 更完整，当前已经额外生成两张补充截图：

1. [05-detail-page.jpg](E:/code/workspace/MoneTV/ui-description-screenshots/05-detail-page.jpg)
2. [06-player-page.jpg](E:/code/workspace/MoneTV/ui-description-screenshots/06-player-page.jpg)

这样 PPTX 在讲解页面流转时会更完整，也更容易过审。

## 5. 当前需要特别注意的风险

### 风险 1：导航与实际页面能力要一致

当前应用顶部显示：

- Home
- Discover
- Series
- Featured
- My Library

但实际路由只明确支持：

- home
- discover
- detail
- player
- settings

这意味着在 UI Description 中，不要把 `Series / Featured / My Library` 写成已经完整实现的功能，除非你在提交前已经补齐它们。

更稳妥的处理方式：

1. 提审前隐藏未完成菜单
2. 或者在 PPTX 中只描述已稳定可用的核心流程

### 风险 2：搜索框不要写成已完成核心能力

当前页面顶部有搜索 UI，但还没有完整搜索流程。PPTX 里建议不要把搜索写成主功能。

## 6. 可直接复制到 PPT 的英文文案汇总

### App Overview

```text
GoMaxShort is a short-drama streaming application for Samsung Smart TV.
Users can browse content, open detail pages, and play episodes with remote-control navigation.
```

### Home

```text
The Home screen contains the main featured content and content rows for browsing.
Users can open a drama detail page from a content card.
```

### Discover

```text
The Discover screen provides additional browsing options including trending content, genre filters, and new-this-week content.
```

### Detail

```text
The Detail screen displays drama information, episode list, and related content recommendations.
```

### Player

```text
The Player screen supports online video playback and episode switching with remote control.
```

### Test Notes

```text
No login is required.
No billing is included.
Internet connection is required for content playback.
```

## 7. 下一步建议

如果你继续让我往下做，最顺手的是这两项：

1. 帮你补拍 `detail` 和 `player` 两张图
2. 直接按这个大纲生成一份 `PPTX` 用文案
