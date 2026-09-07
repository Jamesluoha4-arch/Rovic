# Rovic Shopify 备份与开发环境方案

版本：v1.0  
日期：2026-09-07  
对象：https://www.rovicsportsusa.com/  
目标：在不影响当前线上店铺的前提下，按信息架构和 PRD 修复网站、填充内容、重做页面结构，并保证随时可回退。

---

## 1. 推荐结论

当前最推荐的工作方式：

```text
不要先新开一个独立 Shopify 店铺。

先在当前 Shopify 店铺里：
1. 复制当前主题，保留一份原始备份。
2. 再复制一份作为开发主题。
3. 所有页面设计、导航、模板、Section、CSS/JS 修复都在“未发布主题”里完成。
4. 产品、库存、价格、Collection、PDF、政策页面在 Shopify 后台修正。
5. 全部验收通过后，再发布新主题。
```

原因：

1. 当前店铺已经有真实商品、域名、密码页、产品结构、图片和部分页面内容。
2. 在同一个店铺的未发布主题里修改，可以直接使用真实 Shopify 后台数据。
3. 风险更低，发布前可以通过预览链接测试。
4. 新开店铺会产生数据迁移、主题授权、域名、支付、配送、库存同步等额外成本。

---

## 2. 推荐环境结构

```text
当前 Shopify 店铺
│
├─ Live Theme 当前线上主题
│  └─ 保持不动，用户仍访问当前网站
│
├─ Backup Theme 原始备份主题
│  └─ 只保存，不编辑，用于回退
│
└─ Dev Theme 开发主题
   ├─ 修改导航结构
   ├─ 重排首页
   ├─ 重做 Collection 模板
   ├─ 重做 Product Page 模板
   ├─ 清理占位内容
   ├─ 修复前端 bug
   └─ 验收通过后发布为 Live Theme
```

建议命名：

```text
Backup - Rovic current live - 2026-09-07
Dev - Rovic IA rebuild - 2026-09-07
```

---

## 3. 需要备份什么

Shopify 网站不是一个单独文件，至少要备份以下 8 类内容。

| 类型 | 是否必须备份 | 备份方式 |
|---|---:|---|
| 当前主题 | 必须 | Shopify 后台 Duplicate + Download theme ZIP |
| 商品数据 | 必须 | Products 导出 CSV |
| 商品图片 | 必须 | CSV 中保留图片 URL，重要图片另存一份 |
| Collections | 必须 | 截图/记录规则；自动集合记录条件 |
| 导航菜单 | 必须 | 截图或手动记录 Online Store > Navigation |
| Pages 页面内容 | 必须 | 复制页面文本，或逐页截图 |
| PDF / Files | 必须 | 从 Content > Files 下载或记录文件链接 |
| Policies / Shipping / Returns / Warranty | 必须 | 后台设置页截图 + 文案备份 |
| Apps 设置 | 如有则必须 | 每个 App 后台单独截图或导出 |
| 支付、配送、税务 | 不建议随意修改 | 只截图记录，不在开发阶段乱动 |

---

## 4. Shopify 后台操作步骤

### 4.1 复制并备份当前主题

路径：

```text
Shopify Admin
→ Online Store
→ Themes
→ 当前 Live Theme
→ ...
→ Duplicate
```

复制后，把主题改名为：

```text
Backup - Rovic current live - 2026-09-07
```

然后再复制一份作为开发主题：

```text
Dev - Rovic IA rebuild - 2026-09-07
```

开发期间只编辑 `Dev - Rovic IA rebuild - 2026-09-07`。

### 4.2 下载主题 ZIP 作为本地备份

路径：

```text
Shopify Admin
→ Online Store
→ Themes
→ Backup Theme
→ ...
→ Download theme file
```

下载后的文件建议保存为：

```text
rovic-theme-backup-2026-09-07.zip
```

注意：主题 ZIP 主要包含主题代码、模板、Section、样式和主题配置，不等于完整店铺数据备份。商品、订单、后台设置、支付、配送、部分页面内容和 App 数据需要单独备份。

### 4.3 导出产品 CSV

路径：

```text
Shopify Admin
→ Products
→ Export
→ All products
→ CSV for Excel, Numbers, or another spreadsheet program
```

建议保存为：

```text
rovic-products-export-2026-09-07.csv
```

这个文件用于备份和批量修正：

```text
产品标题
描述
价格
SKU
变体
库存
标签
Vendor
Product type
图片 URL
SEO 字段
```

### 4.4 备份导航菜单

路径：

```text
Shopify Admin
→ Online Store
→ Navigation
```

需要记录：

```text
Main menu
Footer menu
任何自定义菜单
每个菜单项名称
每个菜单项链接
下拉层级
```

建议直接截图，并额外复制为文本。

### 4.5 备份页面内容

路径：

```text
Shopify Admin
→ Online Store
→ Pages
```

需要备份：

```text
About Our Brands
Downloads & Product Guides
Contact
其他自定义页面
```

重点备份页面正文、SEO title、SEO description、所用模板。

### 4.6 备份文件资源

路径：

```text
Shopify Admin
→ Content
→ Files
```

需要备份：

```text
PDF manuals
Parts drawings
产品图片
品牌图片
视频或其他媒体
```

如果不能批量下载，至少要记录文件名、文件 URL、对应产品型号。

### 4.7 备份政策和结账相关设置

路径：

```text
Shopify Admin
→ Settings
→ Policies

Shopify Admin
→ Settings
→ Shipping and delivery

Shopify Admin
→ Settings
→ Checkout

Shopify Admin
→ Settings
→ Payments
```

这些设置先只备份，不建议在页面重构早期频繁修改。

---

## 5. 我可以直接参与的方式

我不能只凭 storefront 密码直接备份 Shopify 后台，因为 storefront 密码只能访问前台，不等于 Shopify Admin 权限。

你可以选择下面任一方式让我继续推进：

### 方式 A：你创建 Shopify Collaborator / Staff 权限

适合：希望我直接进入 Shopify 后台协助主题、页面、产品结构和内容修改。

建议权限：

```text
Online Store / Themes
Products
Collections
Content / Files
Online Store / Navigation
Online Store / Pages
Settings / Policies
Discounts，如需要
Apps，如涉及当前主题 App
```

不建议一开始开放：

```text
Payments
Billing
敏感财务信息
订单退款权限
```

### 方式 B：你先导出文件给我

适合：你不想开放后台权限，但希望我先整理内容和开发方案。

需要提供：

```text
主题 ZIP
Products CSV
Navigation 截图
Pages 页面内容截图
Files/PDF 列表
当前使用的主题名称
当前已安装 App 列表
```

我可以基于这些文件继续做：

```text
主题代码审查
页面模板结构规划
商品字段修正表
Collection 规则
导航重构清单
上线 QA checklist
给设计师/开发者的任务拆分
```

### 方式 C：用 Shopify CLI 做本地主题开发

适合：需要更系统地修改主题代码、版本管理和预览。

流程：

```text
1. Shopify 后台创建 Dev Theme。
2. 使用 Shopify CLI 拉取主题代码到本地。
3. 在本地 Git 管理修改。
4. 本地预览或推送到未发布主题。
5. 验收后发布。
```

这个方式最工程化，但需要 Shopify Admin 权限或授权登录。

---

## 6. 是否需要新开 Shopify 店铺

### 不建议新开店铺的情况

当前项目属于这种情况：

```text
已有真实域名
已有商品
已有图片
已有页面
已有 Collection 基础
目标是修复和重构现有网站
希望尽快上线售卖
```

这种情况下，开新店会增加额外迁移工作。

### 可以考虑新开开发店的情况

只有在以下场景才建议新开：

```text
当前店铺后台非常混乱，想完全重建
需要测试大量 App 或自定义功能
想做一个全新的主题结构，暂时不碰原店
需要给外包团队完全隔离的测试环境
当前主题授权或 App 会影响开发
```

### 新开开发店的基本流程

```text
Shopify Partner / Dev Dashboard
→ Stores
→ Create store
→ 选择 Dev store 或 client transfer store
→ 创建空白店铺
→ 导入主题
→ 导入产品 CSV
→ 重建 Collections
→ 重建 Navigation
→ 上传 Files / PDF
→ 配置 Pages / Policies
→ 完成后迁移域名或转移店铺
```

注意：新店不是完整复制当前店铺。很多内容需要手动迁移或通过 App/工具迁移。

---

## 7. 本项目推荐执行顺序

```text
第 1 步：备份
├─ Duplicate 当前主题
├─ Download theme ZIP
├─ Export Products CSV
├─ 备份 Navigation / Pages / Files / Policies
└─ 记录当前主题和 App

第 2 步：建立开发环境
├─ 创建 Dev Theme
├─ 不发布
├─ 生成 preview link
└─ 所有修改只在 Dev Theme 中进行

第 3 步：后台数据修正
├─ 商品价格
├─ SKU
├─ 库存状态
├─ Product type
├─ Tags
├─ Collections
├─ PDF 文件
└─ Policy 页面

第 4 步：前台信息架构重构
├─ Header
├─ Home
├─ Shop / Collection
├─ PDP
├─ Downloads
├─ Contact
└─ Footer

第 5 步：上线前 QA
├─ Desktop
├─ Mobile
├─ Add to Cart
├─ Checkout
├─ Search
├─ Product filters
├─ PDF links
├─ Policy links
└─ SEO / analytics

第 6 步：发布
├─ 保留旧 Live Theme
├─ 发布 Dev Theme
├─ 重新测试核心购买路径
└─ 记录发布时间和回退方案
```

---

## 8. 回退方案

如果发布后发现严重问题：

```text
Shopify Admin
→ Online Store
→ Themes
→ Backup - Rovic current live - 2026-09-07
→ Publish
```

这样可以快速恢复到改版前主题。

但注意：

```text
主题回退只能恢复前台主题表现。
如果产品价格、库存、SKU、Pages、Policies、Files 等后台数据被改过，需要单独按备份记录恢复。
```

---

## 9. 立即需要你确认的事项

为了继续进入实际修复阶段，需要先决定工作方式：

```text
推荐选择：方式 A 或方式 B

方式 A：给 Shopify 后台 Collaborator / Staff 权限，我直接协助搭 Dev Theme 和修复。
方式 B：你先导出主题 ZIP + 产品 CSV + 后台截图，我在本地继续做方案和代码审查。
```

如果目标是尽快上线，我建议选择方式 A；如果你现在还不想开放后台权限，就先选择方式 B。

---

## 10. 参考 Shopify 官方文档

1. Shopify 主题管理、复制主题、下载主题：  
   https://help.shopify.com/en/manual/online-store/themes/managing-themes

2. Shopify 产品导出 CSV：  
   https://help.shopify.com/en/manual/products/import-export/export-products

3. Shopify Partner 开发店创建：  
   https://help.shopify.com/partners/building-stores-for-merchants/create-a-development-store

4. Shopify client store / collaborator access：  
   https://help.shopify.com/en/partners/manage-clients-stores/working-on-client-stores

