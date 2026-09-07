# Rovic Sports USA Shopify 官网上线全局 PRD

版本：v1.0  
日期：2026-09-07  
站点：https://www.rovicsportsusa.com/  
关联文档：

1. `rovic_information_architecture.md`：定义站点信息架构和内容层级。
2. `rovic_ux_bug_prd.md`：定义当前已发现的页面、内容、配置和体验修复项。

## 1. 项目背景

Rovic Sports USA 当前已在 Shopify 上搭建了品牌站，使用 Concept 主题模板，并已上传部分产品、图片、页面和下载资源。现阶段核心目标不是重做网站，而是基于现有 Shopify 模板完成站点内容结构、商品结构、支持体系和后台交易配置，让网站可以真实上线售卖 Rovic 高尔夫推车及配件。

当前站点主要问题不是素材不足，而是信息层级和上线配置尚未收敛：

1. 首页、集合页、商品页、支持页之间的用户路径不够清晰。
2. Push Cart、Accessories、Replacement Parts 的分类关系没有充分表达。
3. 商品详情页缺少统一的规格、兼容性、支持文档和购买决策结构。
4. Shopify 后台商品、价格、库存、SKU、政策、配送、下载文件等上线基础项需要统一验收。
5. 部分模板占位内容、禁用按钮和默认品牌信息仍会影响正式上线可信度。

## 2. 项目目标

### 2.1 业务目标

1. 使用现有 Shopify 主题模板完成可上线的 Rovic Sports USA 官方销售站。
2. 支持用户浏览、筛选、比较、购买 Rovic 推车和配件。
3. 支持售后用户下载手册、查看配件兼容性、联系支持。
4. 通过 Shopify 后台完成商品、库存、订单、支付、配送、税费和客服基础闭环。

### 2.2 用户体验目标

1. 用户进入首页 5 秒内知道网站卖什么、主推什么、是否可信。
2. 用户能从导航中清楚区分 Push Carts、Accessories、Replacement Parts、Support。
3. 用户在商品页能快速看到价格、库存、颜色、规格、兼容性、配送、退换货、保修。
4. 用户能顺利完成加购、购物车、结账。
5. 已购买或已有推车的用户能快速找到对应型号的手册和配件。

### 2.3 上线质量目标

1. 全站无明显 Shopify 模板占位内容。
2. 所有可见 CTA 都有明确目标，不出现假按钮。
3. 所有商品价格、库存、SKU、配送重量和图片真实可用。
4. 所有政策、客服、售后入口完整。
5. 桌面端和移动端核心购买路径均可完成。

## 3. 范围

### 3.1 本期范围

1. 信息架构重组。
2. 首页内容层级重组。
3. 主导航和 footer 导航重组。
4. 商品集合页结构优化。
5. Push Cart 和 Accessory 商品详情页模板规范。
6. Downloads、Contact、Warranty、Shipping、Returns 等支持体系补齐。
7. Shopify 后台商品、变体、库存、价格、SKU、文件、政策、配送、支付基础配置。
8. 上线前 QA 和验收流程。

### 3.2 不在本期范围

1. 不重做 Shopify 主题。
2. 不开发独立前后端系统。
3. 不建设复杂会员体系。
4. 不建设博客/内容营销体系，除非上线后第二阶段需要。
5. 不做高级 ERP/WMS 集成，除非订单量或仓储要求已经明确。

## 4. 目标用户

### 4.1 新用户

画像：第一次访问 Rovic 官网，正在考虑购买高尔夫推车。  
核心问题：

1. 这是什么品牌？
2. 哪个型号适合我？
3. 价格、配送、退货和保修是否可靠？
4. 图片和规格是否足够支持购买决定？

### 4.2 老用户/配件用户

画像：已有 Rovic 或相关推车，需要替换零件或购买配件。  
核心问题：

1. 这个配件是否兼容我的型号？
2. 有没有安装说明或配件图纸？
3. 没有把握时怎么联系支持？

### 4.3 移动端用户

画像：在手机上看商品图、比较价格、快速加购。  
核心问题：

1. 首屏是否能理解产品？
2. 加购按钮是否容易找到？
3. 页面是否被固定控件遮挡？

## 5. 核心用户路径

### 5.1 购买推车路径

1. 首页。
2. 点击 QFC New Arrival 或 Push Carts。
3. 进入商品集合或 QFC 商品页。
4. 查看图片、规格、颜色、保修、配送、对比。
5. 加入购物车。
6. 进入购物车。
7. Shopify Checkout。
8. 支付完成。
9. 收到订单确认邮件。

### 5.2 购买配件路径

1. 首页或导航进入 Accessories。
2. 按用途或兼容型号筛选。
3. 进入配件详情页。
4. 确认 compatible models。
5. 加入购物车并结账。

### 5.3 找手册/售后路径

1. 导航进入 Support / Downloads。
2. 按型号选择 QFC、RV1C、RV1S、RV2L、RV3J。
3. 下载 User Manual、Folding Guide、Parts Drawing。
4. 找不到型号或不确定兼容性时进入 Contact Support。

## 6. 信息架构需求

详细信息架构见 `rovic_information_architecture.md`。本 PRD 对上线版 IA 的最低要求如下。

### 6.1 Header

一级导航建议：

1. Shop
2. QFC New Arrival
3. Push Carts
4. Accessories
5. Support
6. About Our Brands

右侧工具：

1. Search
2. Account
3. Cart

验收标准：

1. 所有导航项可点击。
2. 下拉菜单内容与对应导航项一致。
3. 不再出现无目标链接、禁用链接或模板占位链接。
4. 桌面端和移动端菜单内容一致。

### 6.2 Footer

Footer 必须包含：

1. Shop：All Products、Push Carts、Accessories、Replacement Parts、QFC New Arrival。
2. Support：Downloads、Contact Support、Warranty、Shipping、Returns、FAQs。
3. Company：About Our Brands、Privacy Policy、Terms of Service。
4. Contact：真实客服邮箱、响应时效、真实社交账号。

验收标准：

1. 用户从任意页面底部都能进入购买、支持和政策页面。
2. 不出现 `Product support coming soon.` 作为最终上线文案。
3. 不出现无效电话、无效邮箱和 Shopify 默认社交链接。

## 7. 页面需求

### 7.1 首页

目标：建立信任、表达主推产品、分流用户。

推荐模块：

1. Announcement bar：一句核心承诺，例如 Free U.S. shipping & returns。
2. Header。
3. Hero：主推 Rovic QFC 或品牌步行高尔夫场景。
4. Category entry：Push Carts、Accessories、Replacement Parts。
5. QFC featured product：新品推荐。
6. Model comparison：核心型号对比。
7. Feature story：折叠、稳定、转向、收纳、兼容配件。
8. Support confidence：Shipping、Returns、Warranty、Downloads。
9. Newsletter/优惠模块：仅在规则真实时保留。
10. Footer。

必备 CTA：

1. Shop QFC。
2. Shop Push Carts。
3. Shop Accessories。
4. View Downloads。

验收标准：

1. 首页不再承载无关模板模块。
2. Hero CTA 指向正确商品或集合。
3. 首页能清晰解释 Rovic 销售高尔夫推车和配件。
4. 首屏视觉不遮挡核心导航和 CTA。

### 7.2 All Products 集合页

目标：承接 Shop，展示全部商品并分流。

页面结构：

1. 标题：Golf Push Carts & Accessories。
2. 简短介绍。
3. 分类 tab：All、Push Carts、Accessories、Replacement Parts。
4. 筛选：Product Type、Compatibility、Availability、Color、Feature。
5. 商品网格。
6. 真实品牌说明或 SEO 文案。

验收标准：

1. 不再显示 `Products` 这种过泛标题作为最终上线主标题。
2. 不出现 `Example heading`、`Tagline`、`Share information about your brand...`。
3. 商品卡片展示真实价格、库存、标题和图片。
4. 筛选和排序可用。

### 7.3 Push Carts 集合页

目标：帮助用户比较整车。

页面结构：

1. 标题：Rovic Golf Push Carts。
2. 子分类入口：QFC Series、RV Series、Compact、Lightweight、Junior。
3. 型号商品卡。
4. 对比表入口。
5. 支持入口：manuals、warranty、contact。

验收标准：

1. 每个推车型号有明确定位。
2. 无货型号有明确状态：Sold Out、Backorder 或 Coming Soon。
3. 若某型号暂不售卖，不应让用户误以为可以立即购买。

### 7.4 Accessories 集合页

目标：帮助用户按用途和兼容型号找配件。

页面结构：

1. 标题：Rovic Accessories & Replacement Parts。
2. 子分类：Replacement Parts、Weather、Storage & Care、Seats & Comfort。
3. 筛选：Compatible model、Accessory type、Availability。
4. 商品网格。

验收标准：

1. 配件卡片能表达适配型号或至少进入详情页后明确展示。
2. 无货配件有下一步动作：Notify me、Contact support 或 Coming soon。

### 7.5 Push Cart 商品详情页

适用：Rovic QFC、RV1C、RV1S、RV2L、RV3J。

Buy box 必须包含：

1. 商品标题。
2. 一句话定位。
3. 真实价格。
4. 颜色/变体。
5. 库存状态。
6. Add to cart / Buy now。
7. Shipping、Returns、Warranty 摘要和链接。

详情内容必须包含：

1. Key specs。
2. Features。
3. Folded/open dimensions。
4. Wheel/brake information。
5. Bag compatibility。
6. Included accessories。
7. Compatible accessories。
8. Downloads。
9. Product FAQ。
10. Related products。

验收标准：

1. 用户无需联系客服即可理解主要规格和购买差异。
2. 价格、库存、变体选择和加购状态一致。
3. FAQ 不出现模板占位问题。
4. 所有政策和支持链接有效。

### 7.6 Accessory 商品详情页

适用：所有配件和替换零件。

必备内容：

1. 商品图。
2. 价格。
3. 库存状态。
4. Compatible with。
5. Installation notes。
6. Care notes。
7. Related cart models。
8. Related accessories。

验收标准：

1. 用户能判断配件是否适合自己的推车型号。
2. 不再只依赖 “Confirm fit before purchase” 这类模糊提醒。
3. 配件和替换零件不混在一起造成误购。

### 7.7 Downloads 页面

目标：用户按型号找到正确文档。

页面结构：

1. 标题：Downloads & Product Guides。
2. 型号快速入口。
3. 资源类型：User Manuals、Folding Guides、Parts Drawings、Warranty & Care。
4. 按型号分组。
5. Contact Support 入口。

验收标准：

1. 所有 Download PDF 按钮必须有真实文件链接。
2. 没有文件时，不显示假按钮，改为 Coming soon 或 Contact support。
3. 错误 URL 和无效外链必须清理。
4. 文件命名面向用户友好，例如 `Rovic QFC Parts Drawing PDF`。

### 7.8 Contact 页面

目标：提供真实可信的售前和售后支持。

必备内容：

1. Contact Rovic Support。
2. 表单。
3. 支持邮箱。
4. 响应时效。
5. 用户提交说明：订单号、型号、照片、序列号。
6. 支持主题：Order question、Warranty claim、Parts compatibility、Product question。

验收标准：

1. 不出现 `contact@yourstore.com`、`sales@yourstore.com`、默认电话。
2. 表单提交有成功反馈。
3. 联系方式与 Footer 保持一致。

### 7.9 Policy 页面

必须创建或完善：

1. Shipping Policy。
2. Returns & Refunds。
3. Warranty。
4. Terms of Service。
5. Privacy Policy。

验收标准：

1. 商品页、购物车、页脚都能进入相关政策。
2. 承诺文案与政策内容一致，例如 90-day trial、2-Year Warranty、Complimentary shipping & returns。

## 8. Shopify 后台需求

### 8.1 商品与变体

每个商品必须配置：

1. Title。
2. Product type。
3. Vendor。
4. Description。
5. Images / media。
6. Variants。
7. SKU。
8. Barcode，如有。
9. Price。
10. Compare-at price，如有。
11. Cost per item，如需利润分析。
12. Inventory tracking。
13. Continue selling when out of stock 设置。
14. Weight。
15. HS code，如跨境需要。
16. SEO title / meta description。

验收标准：

1. 不存在占位价格。
2. 所有可售变体有唯一 SKU。
3. 库存状态与前台可售状态一致。
4. 售罄、预售、Coming soon 三种状态有清晰规则。

### 8.2 Collection

必须建立：

1. All Products。
2. Push Carts。
3. Accessories。
4. Replacement Parts。
5. QFC New Arrival。
6. RV Series。
7. Compact。
8. Lightweight。
9. Junior。
10. Weather Accessories。
11. Storage & Care。
12. Seats & Comfort。

建议优先使用 automated collection，依赖 Product type、tag 或 metafield。

验收标准：

1. 商品自动进入正确集合。
2. 导航链接到正确集合。
3. 商品不会因为重复分类造成用户困惑。

### 8.3 Metafields

Push Cart metafields：

1. Model。
2. Series。
3. Generation。
4. Weight。
5. Folded dimensions。
6. Open dimensions。
7. Wheel configuration。
8. Brake type。
9. Bag compatibility。
10. Included accessories。
11. Compatible accessories。
12. Manual PDF。
13. Folding guide PDF。
14. Parts drawing PDF。

Accessory metafields：

1. Compatible models。
2. Accessory type。
3. Installation notes。
4. Care notes。
5. Related products。
6. Manual PDF。

验收标准：

1. 商品页规格、兼容性、下载资源由后台字段驱动。
2. 不需要每个商品页手工复制同一套 section。

### 8.4 Files

Shopify Files 中必须管理：

1. Product images。
2. User manuals。
3. Folding guides。
4. Parts drawings。
5. Warranty PDFs，如有。

验收标准：

1. Downloads 页面所有文件链接有效。
2. 文件名对用户友好。
3. 无效 URL、临时 URL、错误域名被清理。

### 8.5 库存与履约

必须明确：

1. 每个 SKU 当前库存。
2. 库存跟踪是否开启。
3. 是否允许缺货继续销售。
4. 缺货状态显示为 Sold Out、Backorder 还是 Coming Soon。
5. 发货地点。
6. 订单履约流程。

验收标准：

1. 用户不能购买不应售卖的商品。
2. 如果允许预售，前台必须明确告知预计发货时间。
3. 购物车和结账页状态一致。

### 8.6 配送、税费、支付

必须配置：

1. Shopify Payments 或可用支付方式。
2. 美国配送区域。
3. 运费规则。
4. 退货地址。
5. 税费设置。
6. 包裹重量和尺寸。
7. 免费配送门槛，如有。

验收标准：

1. 测试订单能走到支付前最后一步。
2. 美国地址能计算运费和税费。
3. 商品重量不会导致运费异常。

### 8.7 通知邮件

必须检查：

1. Order confirmation。
2. Shipping confirmation。
3. Refund notification。
4. Customer account emails。
5. Abandoned checkout，如启用。

验收标准：

1. 邮件品牌名为 Rovic Sports USA。
2. 发件邮箱和回复邮箱可信。
3. 邮件不出现“我的商店”或 Shopify 模板残留。

## 9. 内容规范

### 9.1 品牌名

统一使用：

1. Rovic。
2. Rovic Sports USA。

不得出现：

1. 我的商店。
2. yourstore.com。
3. Shopify 默认社交账号。

### 9.2 商品描述

每个商品描述必须回答：

1. 这是什么？
2. 适合谁？
3. 解决什么问题？
4. 核心规格是什么？
5. 是否兼容我的型号？
6. 售后政策是什么？

### 9.3 CTA

允许使用：

1. Shop QFC。
2. Shop Push Carts。
3. Shop Accessories。
4. View Manual。
5. Contact Support。
6. Notify Me。
7. Add to Cart。

不得出现：

1. 禁用但看起来可点击的按钮。
2. `href="#"`。
3. 模板占位按钮。

## 10. SEO 与分享

必须配置：

1. 首页 title：Rovic Sports USA | Golf Push Carts & Accessories。
2. 首页 meta description：Shop Rovic golf push carts, replacement parts, and accessories built for smoother walking rounds。
3. 商品页 SEO：产品名 + 核心品类 + Rovic Sports USA。
4. 集合页 SEO：Push carts、Accessories、Replacement parts。
5. OG image。
6. Logo alt。

验收标准：

1. 社交分享卡片显示 Rovic Sports USA。
2. 搜索结果不出现“我的商店”。
3. 商品页结构化数据价格和库存正确。

## 11. 数据与分析

建议配置：

1. Shopify Analytics。
2. Google Analytics 4。
3. Google Search Console。
4. Meta Pixel，如计划投放。
5. Google Merchant Center，如计划购物广告。

核心指标：

1. Homepage CTA click-through rate。
2. Collection to PDP rate。
3. PDP add-to-cart rate。
4. Cart to checkout rate。
5. Checkout completion rate。
6. Downloads click rate。
7. Contact form submissions by topic。
8. Sold Out / Notify Me interactions。

## 12. 权限与角色

Owner / 业务方：

1. 确认价格、库存、售后政策、配送规则、保修承诺。
2. 确认哪些产品第一阶段可售。

Shopify 后台运营：

1. 配置商品、变体、库存、集合、文件、政策、邮件。
2. 完成测试订单。

网页设计师：

1. 基于现有模板整理页面结构。
2. 修复前端布局、导航、按钮、占位内容和响应式问题。
3. 使用 Shopify theme editor 或 theme code 完成样式和 section 调整。

QA / 验收：

1. 按本 PRD 和 `rovic_ux_bug_prd.md` 做上线前检查。

## 13. P0 上线阻断项

以下任一项未完成，不建议公开上线：

1. 商品价格仍为占位价格。
2. 商品库存状态与前台加购/结账状态不一致。
3. 支付、配送、税费未完成测试。
4. Contact、Downloads、Warranty、Shipping、Returns 不完整。
5. 全站仍有明显模板占位内容。
6. 页面 title、footer、邮件或社交链接仍显示错误品牌身份。
7. 可见按钮不可点击或跳转错误。

## 14. 实施计划

### Phase 0：业务确认

负责人：Owner  
预计：0.5 天

确认：

1. 第一阶段可售 SKU。
2. 真实价格。
3. 库存数量。
4. 是否允许预售。
5. 配送地区和运费规则。
6. 退换货和保修政策。
7. 官方客服邮箱和社交账号。

### Phase 1：Shopify 后台基础配置

负责人：Shopify 后台运营  
预计：1 天

任务：

1. 商品价格、SKU、库存、重量。
2. Collection 自动规则。
3. Metafields。
4. Files/PDF。
5. Shipping、Taxes、Payments。
6. Policies。
7. Notification emails。

### Phase 2：页面结构与模板配置

负责人：网页设计师  
预计：1-2 天

任务：

1. Header 和 Footer 导航。
2. 首页模块重组。
3. 集合页分类、筛选和模板占位清理。
4. PDP 模板结构：Push Cart 和 Accessory。
5. Downloads 和 Contact 页面结构整理。
6. 移动端适配检查。

### Phase 3：内容补齐与修复

负责人：Owner + 网页设计师  
预计：1 天

任务：

1. 清理所有占位文案。
2. 商品描述和规格补齐。
3. FAQ 替换为真实问题。
4. 社交链接、邮箱、电话、版权更新。
5. 折扣/Newsletter 规则确认。

### Phase 4：上线前 QA

负责人：QA / Owner  
预计：0.5-1 天

任务：

1. 桌面端和移动端页面检查。
2. 测试订单。
3. 商品加购测试。
4. 下载链接测试。
5. 联系表单测试。
6. SEO 和分享检查。
7. 邮件通知检查。

## 15. 上线验收清单

站点与导航：

1. Header 所有链接正确。
2. Footer 所有链接正确。
3. Search 可用。
4. Account 可用或明确关闭。
5. Cart 可用。

商品：

1. 所有第一阶段可售商品价格正确。
2. SKU 唯一。
3. 库存正确。
4. 图片清晰。
5. 商品描述完整。
6. PDP 有规格和兼容性。

交易：

1. Add to cart 可用。
2. Cart 数量和价格正确。
3. Checkout 可达。
4. 运费和税费正常。
5. 支付方式正常。
6. 订单邮件正确。

支持：

1. Downloads 文件可下载。
2. Contact 表单可提交。
3. Warranty 可查看。
4. Shipping 可查看。
5. Returns 可查看。

内容：

1. 不出现“我的商店”。
2. 不出现 yourstore.com。
3. 不出现 Example heading。
4. 不出现 Tagline 占位。
5. 不出现 Use this text。
6. 不出现 Shopify 默认社交链接。

响应式：

1. 1440px 桌面端正常。
2. 1280px 桌面端正常。
3. 390px 移动端正常。
4. 375px 移动端正常。
5. 不出现横向滚动。
6. 固定栏不遮挡核心内容。

## 16. 风险与依赖

风险：

1. 价格和库存未确认会导致无法上线售卖。
2. PDF 资源缺失会影响售后可信度。
3. 配件兼容性不清会造成误购和客服压力。
4. 模板占位内容残留会影响品牌信任。
5. 配送重量不准确会导致运费异常。

依赖：

1. 产品价格表。
2. 真实库存表。
3. SKU 命名规则。
4. PDF 手册和配件图纸。
5. 售后政策。
6. 官方客服邮箱。
7. 官方社交账号。

## 17. 第一阶段推荐上线范围

建议第一阶段只上线“能真实购买和履约”的商品：

1. Rovic QFC。
2. 已确认有库存的 Replacement Wheel Set。
3. 已确认库存、价格、兼容性无误的配件。

暂不确定库存或履约能力的商品：

1. 可保留展示，但标注 Coming Soon。
2. 或隐藏出集合页，避免用户误解。
3. 或开启 Notify Me。

## 18. 交付物

1. 完成后的 Shopify 站点。
2. 信息架构文档：`rovic_information_architecture.md`。
3. 全局上线 PRD：`rovic_global_launch_prd.md`。
4. 修改问题 PRD：`rovic_ux_bug_prd.md`。
5. 修改前/修改后截图。
6. 上线前 QA 表。
7. 测试订单记录。

## 19. 最终定义

当以下条件满足时，可认为本项目完成 MVP 上线准备：

1. 用户可以从首页进入商品、完成加购和结账。
2. 商品数据真实，价格、库存、SKU、重量可用于履约。
3. 页面层级清晰，用户能区分推车、配件、替换零件和支持内容。
4. 用户能找到手册、保修、配送、退换货和客服。
5. 全站无明显模板残留和错误品牌信息。
6. Shopify 后台能支撑订单处理和售后基础流程。
