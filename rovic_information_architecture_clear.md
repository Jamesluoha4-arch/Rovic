# Rovic Sports USA 清晰版信息架构图

版本：v1.0  
日期：2026-09-07  
用途：给网页设计师、Shopify 后台执行人员和项目负责人统一理解网站结构。  
核心目标：用现有 Shopify 模板，把 Rovic Sports USA 组织成一个可上线、可购买、可维护的电商网站。

---

## 1. 一句话信息架构

Rovic Sports USA 网站只需要围绕 5 个用户任务组织：

```text
买高尔夫推车
买配件 / 替换件
了解新品 QFC
下载说明书 / 找售后资料
了解品牌并完成购买
```

因此，网站的信息层级应从“品牌展示型首页”调整为“清晰导购型电商网站”。

---

## 2. 全站信息架构总图

```text
Rovic Sports USA
│
├─ Home 首页
│  ├─ 主视觉：Rovic / QFC / Push Cart 核心卖点
│  ├─ 入口 1：Shop QFC
│  ├─ 入口 2：Shop Push Carts
│  ├─ 入口 3：Shop Accessories
│  ├─ 推荐产品：QFC + 核心推车型号 + 热门配件
│  ├─ 品牌信任：walking golf / compact / lightweight / support
│  └─ 售后入口：Downloads / Contact / Warranty
│
├─ Shop 商店
│  ├─ All Products 全部商品
│  ├─ Push Carts 推车
│  ├─ Accessories 配件
│  └─ Replacement Parts 替换件
│
├─ QFC New Arrival 新品
│  ├─ QFC Collection
│  ├─ Rovic QFC Product Page
│  └─ QFC Manual / Parts Drawing
│
├─ Push Carts 推车
│  ├─ All Push Carts
│  ├─ QFC Series
│  │  └─ Rovic QFC
│  ├─ RV Series
│  │  ├─ Rovic RV1C Compact
│  │  ├─ Rovic RV1S Swivel
│  │  └─ Rovic RV2L Lite
│  └─ Junior
│     └─ Rovic RV3J Junior
│
├─ Accessories 配件
│  ├─ All Accessories
│  ├─ Replacement Parts 替换件
│  │  ├─ Replacement Wheel Set
│  │  ├─ Replacement Bag Straps
│  │  └─ RV1C Wheel Cover
│  ├─ Weather Accessories 天气配件
│  │  ├─ Rovic Golf Umbrella
│  │  └─ Adjustable Umbrella Holder
│  ├─ Storage & Care 收纳与护理
│  │  ├─ Cart Storage Bag
│  │  ├─ Golf Bag Cover
│  │  └─ Shoe Brush
│  └─ Seats & Comfort 座椅与舒适性
│     ├─ RV1 Series Extended Seat
│     └─ RV2L Extended Seat
│
├─ Support 支持
│  ├─ Downloads & Product Guides
│  ├─ FAQs
│  ├─ Warranty
│  ├─ Shipping Policy
│  ├─ Returns & Refunds
│  └─ Contact Support
│
├─ About Our Brands 品牌介绍
│  ├─ Brand Story
│  ├─ Product Philosophy
│  └─ Why Rovic
│
├─ Search 搜索
├─ Account 账户
└─ Cart / Shopify Checkout 购物车与结账
```

---

## 3. Header 导航结构

建议电脑端 Header 只保留 6 个主要入口，避免用户不知道从哪里开始。

```text
[Rovic Logo]
    Shop ▼
    QFC New Arrival
    Push Carts ▼
    Accessories ▼
    Support ▼
    About Our Brands
                                    [Search] [Account] [Cart]
```

### 3.1 Shop 下拉

```text
Shop
├─ All Products
├─ Push Carts
├─ Accessories
└─ Replacement Parts
```

用途：给“我就是想买东西”的用户一个总入口。

### 3.2 Push Carts 下拉

```text
Push Carts
├─ All Push Carts
├─ QFC Series
├─ RV Series
├─ Compact
├─ Lightweight
└─ Junior
```

用途：给明确想买推车的用户快速分流。

### 3.3 Accessories 下拉

```text
Accessories
├─ All Accessories
├─ Replacement Parts
├─ Weather Accessories
├─ Storage & Care
└─ Seats & Comfort
```

用途：配件数量已经多于推车，应独立成为一级入口。

### 3.4 Support 下拉

```text
Support
├─ Downloads & Product Guides
├─ FAQs
├─ Warranty
├─ Shipping Policy
├─ Returns & Refunds
└─ Contact Support
```

用途：把说明书、售后、政策、联系入口统一收进支持体系。

---

## 4. 用户购买路径图

### 4.1 新用户第一次进站

```text
Home
  ↓
看懂 Rovic 卖什么
  ↓
选择入口：QFC / Push Carts / Accessories
  ↓
Collection 商品列表
  ↓
Product Detail Page 商品详情页
  ↓
Add to Cart
  ↓
Cart
  ↓
Shopify Checkout
```

### 4.2 明确想买推车的用户

```text
Header: Push Carts
  ↓
Push Carts Collection
  ↓
按系列 / 特点筛选
  ↓
进入具体型号 PDP
  ↓
选择颜色 / 数量
  ↓
加入购物车
```

### 4.3 已有 Rovic 产品、想买配件的用户

```text
Header: Accessories
  ↓
Accessories Collection
  ↓
按用途选择：替换件 / 天气配件 / 收纳护理 / 座椅舒适
  ↓
进入配件 PDP
  ↓
确认兼容型号
  ↓
加入购物车
```

### 4.4 需要售后资料的用户

```text
Header: Support
  ↓
Downloads & Product Guides
  ↓
选择产品型号
  ↓
下载 Manual / Parts Drawing
  ↓
如仍有问题，进入 Contact Support
```

---

## 5. 首页信息结构

首页不要塞满所有内容，只承担 4 件事：确认品牌、引导分类、推荐主推产品、建立购买信任。

```text
Home 首页
│
├─ 01 Hero 首屏
│  ├─ H1：Rovic / QFC / Walking Golf Push Carts
│  ├─ 核心卖点：compact / lightweight / easy handling
│  ├─ CTA 1：Shop QFC
│  └─ CTA 2：Shop Push Carts
│
├─ 02 Featured Categories 核心分类入口
│  ├─ Push Carts
│  ├─ Accessories
│  └─ Downloads & Support
│
├─ 03 QFC New Arrival 新品重点模块
│  ├─ QFC 产品图
│  ├─ 3 个核心卖点
│  └─ CTA：View QFC
│
├─ 04 Best Sellers / Featured Products 推荐商品
│  ├─ Rovic QFC
│  ├─ RV1C / RV1S / RV2L
│  └─ 热门配件
│
├─ 05 Why Rovic 品牌信任
│  ├─ Compact storage
│  ├─ Smooth walking round
│  ├─ Accessories ecosystem
│  └─ Product support
│
├─ 06 Support Shortcuts 支持入口
│  ├─ Product Guides
│  ├─ Warranty
│  └─ Contact Support
│
└─ 07 Footer 页脚
```

---

## 6. 商品分类结构

Shopify 后台建议用 Collection 来承载以下分类。

```text
All Products
│
├─ Push Carts
│  ├─ QFC Series
│  ├─ RV Series
│  ├─ Compact
│  ├─ Lightweight
│  └─ Junior
│
└─ Accessories
   ├─ Replacement Parts
   ├─ Weather Accessories
   ├─ Storage & Care
   └─ Seats & Comfort
```

### 6.1 商品卡片必须展示的信息

```text
商品图
商品名称
所属类型：Push Cart / Accessory
价格
颜色或变体数量
库存状态：In Stock / Sold Out / Coming Soon
CTA：View Product 或 Add to Cart
```

### 6.2 Collection 页基础结构

```text
Collection Page
│
├─ Breadcrumb 面包屑
├─ Collection Title 分类标题
├─ Short Description 简短说明
├─ Filter / Sort 筛选排序
├─ Product Grid 商品网格
└─ Support Link 需要帮助入口
```

---

## 7. 商品详情页信息结构

### 7.1 Push Cart PDP

```text
Push Cart Product Page
│
├─ Above the Fold 首屏购买区
│  ├─ Product Gallery 商品图
│  ├─ Product Title 商品名
│  ├─ Price 价格
│  ├─ Variant Selector 颜色 / 型号
│  ├─ Availability 库存状态
│  ├─ Quantity 数量
│  ├─ Add to Cart
│  └─ Shipping / Return 简短提示
│
├─ Key Benefits 核心卖点
│  ├─ Compact
│  ├─ Lightweight
│  ├─ Easy handling
│  └─ Stable on course
│
├─ Specifications 参数
│  ├─ Weight
│  ├─ Folded dimensions
│  ├─ Wheel type
│  ├─ Compatible accessories
│  └─ Available colors
│
├─ Included / Compatibility 包含物与兼容性
├─ Manuals & Downloads 说明书下载
├─ FAQs 常见问题
├─ Related Accessories 相关配件
└─ Related Push Carts 相关推车
```

### 7.2 Accessory PDP

```text
Accessory Product Page
│
├─ Product Gallery
├─ Product Title
├─ Price
├─ Compatibility 兼容车型
├─ Availability
├─ Add to Cart
├─ Use Case 使用场景
├─ Installation / Care 安装或护理说明
├─ Related Products
└─ Contact Support
```

配件页最重要的是“是否兼容我的推车”，这个信息必须在首屏或首屏下方立即出现。

---

## 8. Support 信息结构

```text
Support
│
├─ Downloads & Product Guides
│  ├─ Push Cart Manuals
│  │  ├─ QFC
│  │  ├─ RV1C
│  │  ├─ RV1S
│  │  ├─ RV2L
│  │  └─ RV3J
│  ├─ Parts Drawings
│  └─ Accessory Instructions
│
├─ FAQs
│  ├─ Orders
│  ├─ Shipping
│  ├─ Returns
│  ├─ Warranty
│  └─ Product Compatibility
│
├─ Warranty
├─ Shipping Policy
├─ Returns & Refunds
└─ Contact Support
```

Downloads 页面不应只是按钮列表，而应按产品型号组织。用户来这里时通常已经知道自己的型号。

---

## 9. Footer 信息结构

Footer 的任务不是重复 Header，而是提供信任、政策和售后入口。

```text
Footer
│
├─ Shop
│  ├─ All Products
│  ├─ Push Carts
│  ├─ Accessories
│  └─ Replacement Parts
│
├─ Support
│  ├─ Downloads
│  ├─ Contact
│  ├─ Warranty
│  ├─ Shipping
│  └─ Returns
│
├─ Company
│  ├─ About Our Brands
│  └─ Privacy Policy
│
├─ Newsletter
│  └─ Email signup
│
└─ Social
   ├─ Facebook
   ├─ Instagram
   ├─ YouTube
   └─ X / Twitter
```

---

## 10. Shopify 后台对应关系

这部分用于指导 Shopify 执行人员知道每个前台结构对应后台哪里。

```text
前台 Header 导航
  ↓
Shopify Admin > Online Store > Navigation

商品分类页
  ↓
Shopify Admin > Products > Collections

商品详情页内容
  ↓
Shopify Admin > Products
  ↓
Product title / description / media / variants / inventory / metafields

说明书与 PDF 下载
  ↓
Shopify Admin > Content > Files
  ↓
Downloads 页面或 Product metafields 调用

政策页面
  ↓
Shopify Admin > Settings > Policies

支付与结账
  ↓
Shopify Admin > Settings > Payments / Checkout / Shipping and delivery
```

---

## 11. 页面职责表

| 页面 | 用户问题 | 页面必须回答 | 主要 CTA |
|---|---|---|---|
| Home | 这是什么品牌，卖什么？ | Rovic 是高尔夫推车和配件品牌，当前主推 QFC 和 Push Carts | Shop QFC / Shop Push Carts |
| Shop | 有哪些商品？ | 全部商品，并能分流到推车、配件、替换件 | View Product |
| QFC New Arrival | 新品是什么？ | QFC 的卖点、颜色、价格、是否有货 | Shop QFC |
| Push Carts | 哪辆推车适合我？ | 型号、系列、用途差异 | View Product |
| Accessories | 哪些配件可买？ | 配件用途和兼容车型 | View Product |
| PDP | 我是否应该买这个？ | 图、价格、变体、库存、卖点、规格、兼容性、售后 | Add to Cart |
| Downloads | 哪里下载说明书？ | 按型号查找 Manual / Parts Drawing | Download PDF |
| Contact | 怎么联系售后？ | 邮箱、表单、服务范围、响应预期 | Submit |
| Warranty | 保修规则是什么？ | 覆盖范围、期限、申请方式 | Contact Support |
| Shipping | 运费和时效是什么？ | 配送区域、运费、时效、限制 | Continue Shopping |
| Returns | 能否退货？ | 退货期限、条件、流程 | Contact Support |

---

## 12. 上线前必须清理的信息结构问题

这些问题会直接影响用户信任和购买判断，应作为上线前 P0/P1 处理。

```text
P0 必须修
├─ 所有商品真实价格，不能保留 $999.00 测试价
├─ Sold Out / In Stock 状态必须和 Shopify 库存一致
├─ Product variants 必须补齐 SKU
├─ Contact 页面不能出现 contact@yourstore.com 等模板信息
├─ Downloads 页面不能有 disabled 的 Download PDF 按钮
├─ FAQ 不能保留 Frequently asked question 占位内容
└─ 社交链接不能继续指向 Shopify 官方账号

P1 应上线前完成
├─ Accessories 独立进入一级导航或 Shop 下拉
├─ Push Cart / Accessory PDP 使用不同内容模块
├─ 配件页增加 Compatible with 信息
├─ Footer 补齐 Support / Policy / Company
└─ Collection 删除 Example heading 等模板占位卡片
```

---

## 13. 最小可上线版本 IA

如果时间有限，首版上线至少应保留以下结构：

```text
Header
├─ Shop
├─ QFC New Arrival
├─ Push Carts
├─ Accessories
├─ Support
└─ About Our Brands

Core Pages
├─ Home
├─ All Products
├─ Push Carts Collection
├─ Accessories Collection
├─ Rovic QFC PDP
├─ Other Product PDPs
├─ Downloads & Product Guides
├─ Contact Support
├─ Warranty
├─ Shipping
├─ Returns
├─ Privacy Policy
└─ Cart / Checkout
```

这版结构的判断标准很简单：用户进入网站后，能在 3 次点击内完成“找商品、看详情、加入购物车、找到售后资料”。

---

## 14. 与 PRD 的关系

本文件回答“网站内容应该怎么组织”。  
`rovic_global_launch_prd.md` 回答“如何把这个结构做成可上线的网站”。  
`rovic_ux_bug_prd.md` 回答“现有页面有哪些具体 bug 和体验问题要修”。

