# Rovic Sports USA 网站用户体验审阅与修复 PRD

版本：v1.0  
审阅日期：2026-09-07  
审阅对象：https://www.rovicsportsusa.com/  
审阅范围：首页、集合页、商品详情页、购物车、About、Contact、Downloads、Privacy Policy、商品数据接口 `/products.json`

## 1. 背景

Rovic 是高尔夫推车和相关配件品牌，用户进入官网时会默认期待：品牌真实可信、型号差异清楚、配件兼容关系明确、价格和库存准确、售后信息完整。

当前站点已经具备较好的视觉基础：Logo、首页主视觉、QFC 商品图和整体运动户外质感都比较完整。但从发布准备度看，仍存在若干会明显影响信任和转化的问题，其中价格、库存、默认模板信息属于上线前必须修复项。

## 2. 目标

1. 修复影响购买和履约的 P0 问题：价格、库存、默认店铺身份、默认社交链接、模板占位内容。
2. 优化移动端从浏览到加购的路径，减少用户找不到 CTA 或被固定控件遮挡的情况。
3. 完善美国市场电商用户在购买高尔夫推车前关心的信息：运费、退换货、保修、兼容配件、手册下载、真实客服联系方式。
4. 让站点从“可浏览的主题模板”提升到“可公开投放和承接订单的品牌官网”。

## 3. 非目标

1. 本 PRD 不包含 Shopify 后台支付网关、税务、仓储系统的完整配置方案。
2. 本 PRD 不要求重做整套主题，只要求在现有 Shopify 主题上做发布前修复和关键体验优化。
3. 本 PRD 不包含完整 SEO 内容策略，只覆盖当前审阅中发现的标题、品牌名、结构化数据和信任内容问题。

## 4. 核心用户与关键路径

核心用户：

1. 第一次听说或搜索 Rovic 的美国高尔夫用户：关注品牌可信度、产品差异、退换货和保修。
2. 已有 Rovic/Clicgear 推车的用户：需要快速确认配件是否兼容自己的型号。
3. 移动端用户：在手机上浏览商品图、比较型号、快速加购或联系支持。

关键路径：

1. 首页进入 -> 查看 QFC 或全部商品 -> 商品详情页 -> 选择颜色/型号 -> 加入购物车 -> 结账。
2. 首页/页脚进入 Downloads -> 找到对应型号手册 -> 下载 PDF 或联系支持。
3. 配件集合页 -> 判断是否有货、是否兼容 -> 加入购物车或订阅到货提醒。

## 5. 总体诊断

站点第一眼的品牌视觉是有基础的，尤其首页主视觉和 QFC 商品图片对“高尔夫推车”这个品类表达清楚。但是当前存在几个强烈的发布前信任断点：

1. 商品价格全部显示为 `$999.00`，包括配件和推车，极像占位价格。
2. 集合页/商品数据标记为 Sold Out 的商品，可以通过 Shopify `/cart/add.js` 被加入购物车。
3. 页面标题、元信息、页脚、社交 aria-label 中仍残留“我的商店”。
4. 多处社交链接仍指向 Shopify 官方社交账号。
5. Contact 页存在 `contact@yourstore.com`、`sales@yourstore.com`、法国电话号码等模板占位信息。
6. Downloads 页多个 “Download PDF” 按钮是禁用链接，用户无法完成下载任务。
7. About 页、集合页、QFC FAQ 存在 “Example heading”“Tagline”“Use this text...” 等模板文案。
8. 移动端首屏公告栏文字有裁切，商品详情页首屏看不到加购 CTA，集合页底部固定 Filter/Sort 控件遮挡商品卡片。

## 6. P0 需求：上线前必须修复

### P0-1 修复全站商品价格

现状：

1. `/products.json` 抓取到 16 个产品、27 个变体，所有变体价格均为 `$999.00`。
2. QFC、Replacement Wheel Set、Golf Umbrella、Adjustable Umbrella Holder 等不同品类价格相同，不符合用户常识。
3. 商品页、集合页、购物车、Shopify analytics/结构化数据中的价格也同步为 999。

用户影响：

1. 用户会判断网站仍在测试状态，降低下单信任。
2. Google 商品数据、广告 feed、购物车金额、支付金额都会被错误价格污染。
3. 配件价格过高会直接阻断购买。

需求：

1. 在 Shopify 后台核对每个产品和变体的真实 MSRP、促销价、compare-at price。
2. 对推车和配件分开配置价格，禁止使用统一占位价格。
3. 价格修改后，检查商品页、集合页、购物车、搜索结果、结构化数据、Shopify analytics payload。

验收标准：

1. 全站不存在无业务依据的 `$999.00` 占位价格。
2. 同一商品的 PDP、PLP、Cart、Checkout、`/products.json` 价格一致。
3. 抽检至少 5 个推车 SKU 和 5 个配件 SKU，价格符合内部价格表。

### P0-2 修复 Sold Out 状态与 Cart API 行为不一致的 bug

Bug ID：BUG-001  
严重级别：P0  
影响页面：https://www.rovicsportsusa.com/products/adjustable-umbrella-holder  
相关变体 ID：`48922150699182`

复现步骤：

1. 打开 Adjustable Umbrella Holder 商品页或集合页。
2. 页面和商品数据均显示该商品不可售 / Sold Out，前台普通加购按钮不可用。
3. 对 `https://www.rovicsportsusa.com/cart/add.js` 发起 POST 请求，参数为 `id=48922150699182&quantity=1`。
4. 服务端返回成功，购物车中出现 Adjustable Umbrella Holder，价格为 `$999.00`。

期望结果：

1. 如果商品售罄：服务端应返回不可加入购物车，购物车不应增加该商品。
2. 如果允许预售/补货销售：前台不应显示 Sold Out，应明确显示 Backorder、预计发货时间和用户确认文案。

实际结果：

1. 前台普通 UI 已阻止加购，但服务端 Cart API 仍允许同一 Sold Out 变体加入购物车。
2. 用户、爬虫、脚本、缓存页面或第三方插件仍可能绕过前台按钮，将前台标记为无货的商品加入购物车，造成履约和客服风险。

可能原因：

1. Shopify 后台开启了 “Continue selling when out of stock”，但主题仍按库存为 0 显示 Sold Out。
2. 主题的可售状态逻辑与 Shopify 变体库存策略不一致。
3. 产品/变体库存、销售渠道、库存跟踪状态配置不一致。

需求：

1. 核对所有 Sold Out 变体的库存策略，决定是严格停售还是明确预售。
2. 若严格停售，所有 Sold Out 变体应在 `/cart/add.js` 返回不可加入购物车。
3. 若允许预售，PLP/PDP 必须统一展示为 Backorder，并显示预计发货日期、取消政策和客服入口。
4. 增加上线前自动化检查：抽取所有 `available=false` 变体，尝试 `/cart/add.js`，结果必须与前台状态一致。

验收标准：

1. Sold Out 商品无法通过按钮、变体切换、URL、Cart API 直连、AJAX 请求或重复提交进入购物车。
2. 前台可售状态、`/products.json`、Cart API 和 Checkout 状态一致。
3. 对至少 10 个 Sold Out 变体完成回归测试。

### P0-3 修复店铺身份和 SEO 元信息

现状：

1. 首页 `<title>`、OG、Twitter meta 中仍显示“我的商店”。
2. 商品页标题为类似 `Rovic QFC – 我的商店`。
3. 页脚版权为 `© 2026 我的商店. Powered by Shopify`。
4. Logo 图片 `alt` 为空，隐藏文本仍是“我的商店”。

用户影响：

1. 对美国用户而言，“我的商店”会显得像测试站或未授权站点。
2. 搜索结果、社交分享卡片和浏览器标题都会削弱 Rovic 品牌。
3. 对屏幕阅读器用户也不友好。

需求：

1. Shopify 后台 Store details 中店铺名称改为 `Rovic Sports USA`。
2. 全站标题模板统一为：`页面名 | Rovic Sports USA`。
3. 首页 title 建议：`Rovic Sports USA | Golf Push Carts & Accessories`。
4. 首页 meta description 建议：`Shop Rovic golf push carts, replacement parts, and accessories built for smoother walking rounds.`
5. Logo alt 改为 `Rovic Sports USA`。
6. 移除页脚 `Powered by Shopify`，或按品牌规范替换为自有版权信息。

验收标准：

1. 全站源码和页面可见区域不再出现“我的商店”。
2. 首页、集合页、商品页、内容页的 title/OG/Twitter 信息均使用 Rovic Sports USA。
3. Logo 对屏幕阅读器可被识别为 Rovic Sports USA。

### P0-4 修复默认 Shopify 社交链接

现状：

1. 顶部公告栏、移动菜单、左侧浮动栏、页脚社交图标均指向 Shopify 官方社交账号。
2. aria-label 显示“我的商店 on Facebook/X/Instagram/YouTube”。

用户影响：

1. 用户点击社交图标后离开品牌站，进入 Shopify 社交账号。
2. 这会强烈暗示网站未完成配置。

需求：

1. 将所有社交链接替换为 Rovic 官方美国市场账号。
2. 如果某渠道暂无官方账号，应先隐藏对应图标，不保留 Shopify 默认链接。
3. aria-label 使用 `Rovic Sports USA on Instagram` 等文案。

验收标准：

1. 全站不存在 `facebook.com/shopify`、`twitter.com/shopify`、`instagram.com/shopify`、`youtube.com/user/shopify`。
2. 所有外链打开后均指向 Rovic 品牌资产。

### P0-5 清理模板占位内容与不可点击 CTA

现状：

1. 集合页存在 `Tagline`、`Example heading`、`Give customers details...`。
2. QFC 商品页 FAQ 存在 5 个 `Frequently asked question` 和 `Use this text...`。
3. QFC FAQ 文案中存在拼写错误 `hestitate`。
4. Contact 页有 `contact@yourstore.com`、`sales@yourstore.com`、法国电话号码。
5. Downloads 页多个 `Download PDF` 按钮为 `aria-disabled="true"`，无法下载。
6. About 页存在 `Add a tagline`、`Example heading`，以及多个禁用 CTA。

用户影响：

1. 用户会认为网站尚未完成，影响品牌可信度。
2. 需要售后、保修、手册的用户无法完成关键任务。
3. 禁用 CTA 会造成明显挫败感。

需求：

1. 删除或替换所有模板占位内容。
2. Contact 页替换为真实客服邮箱、电话、办公时段和服务范围。
3. Downloads 页每个 Download PDF 按钮必须绑定真实 PDF 文件；若文件未准备好，应隐藏该型号资源块或显示 “Coming soon” 并提供联系支持入口。
4. QFC FAQ 替换为真实问题：
   - Which golf bags fit the Rovic QFC?
   - What is the folded size and weight?
   - What accessories are compatible?
   - What is the warranty?
   - How long does shipping take?
5. 所有禁用 CTA 要么绑定真实链接，要么从页面移除。

验收标准：

1. 全站不再出现 `Example heading`、`Tagline`、`Add a tagline`、`Use this text`、`yourstore.com`。
2. 所有可见按钮均可点击并到达正确目标，或被明确隐藏。
3. FAQ 链接不再使用 `href="#"`。

## 7. P1 需求：转化与信任优化

### P1-1 优化移动端商品页加购路径

现状：

1. 移动端 QFC 商品页首屏主要展示大图、缩略图点位、标题和价格。
2. 加入购物车按钮在首屏下方，用户需要继续滚动。

需求：

1. 移动端 PDP 增加底部 sticky Add to Cart 区域，包含价格、已选颜色、Add to Cart。
2. 首屏在商品标题附近增加更紧凑的利益点：Free shipping、2-Year Warranty、90-day trial。
3. 变体选择后 sticky CTA 文案与价格同步更新。

验收标准：

1. 390px 宽移动端，从 PDP 顶部进入后用户无需深滚即可看到明确购买入口。
2. Sticky CTA 不遮挡页面原有内容，底部保留足够安全间距。

### P1-2 修复移动端公告栏裁切

现状：

1. 390px 移动端截图中，顶部公告栏文案横向裁切。
2. 当前公告包含多条信息：Contact、Free shipping and returns、question/contact。

需求：

1. 移动端公告栏只显示一条高价值短文案，例如 `Free shipping & returns in the U.S.`。
2. 若使用轮播，确保每条消息完整显示，不出现半截文字。
3. 顶部栏高度和 header overlay 间距固定，避免挤压首屏。

验收标准：

1. 375px、390px、430px 三种移动宽度下公告文字完整可读。
2. Header、公告栏、Hero 文案不重叠。

### P1-3 优化集合页信息结构

现状：

1. 集合页标题为通用 `Products`。
2. 桌面端商品网格上方存在较大空白。
3. 多个商品卡显示 Sold Out，但没有到货提醒或替代路径。
4. 移动端底部固定 `Filter and sort` 控件会遮挡商品卡片。

需求：

1. 将集合页标题改为更明确的 `Golf Push Carts & Accessories`。
2. 增加分类 tab 或筛选：Push Carts、Accessories、Replacement Parts。
3. 对 Sold Out 商品增加 `Notify me` 或 `Backorder` 状态，不只显示死态 Sold Out。
4. 调整移动端固定筛选条，避免遮挡商品卡：增加底部 padding 或改为非遮挡式按钮。
5. 删除集合页底部模板广告块，或替换为真实 Rovic 品牌内容。

验收标准：

1. 首屏能看到商品列表和明确分类，不出现过大空白。
2. Sold Out 商品有下一步动作：订阅到货、查看兼容替代品、联系客服。
3. 移动端商品名、价格、库存标签不被固定控件遮挡。

### P1-4 完善售后与政策信任内容

现状：

1. 页脚只有 Privacy Policy，缺少 Shipping、Returns、Warranty、Contact、Terms。
2. 商品页有 `90-day risk-free trial`、`2-Year Warranty`、`Complimentary shipping & returns`，但缺少可点击的政策详情。
3. 页脚电话 `020-1682888888` 与美国市场不匹配，Contact 页也存在默认电话。

需求：

1. 新增并在页脚展示：
   - Shipping Policy
   - Returns & Refunds
   - Warranty
   - Contact Support
   - Terms of Service
2. 商品页的运费、退换货、保修承诺链接到对应政策页。
3. 统一客服邮箱，建议使用 `support@rovicsportsusa.com` 或实际支持邮箱。
4. 没有美国客服电话前，不展示不可信电话；可先展示 email + contact form + response time。

验收标准：

1. 用户从任一商品页 1 次点击内可查看 shipping/returns/warranty 细则。
2. 页脚联系方式与 Contact 页一致。
3. 不再出现占位电话、占位邮箱或未解释的风险承诺。

### P1-5 强化商品详情页购买决策信息

现状：

1. QFC 商品页视觉图充足，但首屏下方才逐步出现功能、对比、FAQ。
2. 对高尔夫推车而言，用户购买前关心的重量、折叠尺寸、车轮结构、刹车、兼容配件、适配球包等信息需要更快被找到。

需求：

1. PDP 首屏或紧随首屏增加 `Key Specs` 模块：
   - Weight
   - Folded dimensions
   - Open dimensions
   - Wheel configuration
   - Brake type
   - Bag compatibility
   - Included accessories
2. 增加型号对比表，将 QFC、RV1C、RV1S、RV2L、RV3J 的差异放在同一张表中。
3. 配件页增加 `Compatible with` 模块，明确适配型号。

验收标准：

1. 用户在 PDP 前两屏内能获取主要规格和兼容信息。
2. 配件商品页不再只依赖描述中的 “Confirm fit...” 提醒。

## 8. P2 需求：细节与可维护性

### P2-1 修复变体命名和 SKU 缺失

现状：

1. QFC 颜色变体存在双空格：`Arctic  Black`、`Blue  Blue` 等。
2. 27 个变体中有 16 个缺少 SKU，主要集中在推车产品和部分配件。

需求：

1. 清理颜色命名，使用统一格式：`Arctic Black`、`Blue`、`Charcoal Black`、`Gray Black`、`Red Black`、`Silver Black`。
2. 每个可售变体配置唯一 SKU。
3. SKU 与仓储、发货、客服、退换货记录保持一致。

验收标准：

1. 前台、购物车、订单、analytics 中不再出现双空格变体名。
2. 所有可售变体均有 SKU。

### P2-2 优化首页浮动促销和社交入口

现状：

1. 桌面端左侧固定浮动栏显示社交图标和 `GET 20% OFF`。
2. 如果折扣没有明确条件和落地机制，会给用户一种“模板促销”的感觉。

需求：

1. 确认 20% off 是否真实存在。
2. 若存在，点击后打开订阅弹窗或自动应用折扣码，并说明适用范围。
3. 若不存在，移除浮动促销，仅保留更轻量的 newsletter 或社交入口。

验收标准：

1. 用户点击 `GET 20% OFF` 后能完成明确动作。
2. 折扣规则在弹窗、购物车或结账前可见。

### P2-3 统一语言与地区感

现状：

1. 主体页面是英文，但标题仍出现中文“我的商店”。
2. About/Contact 有中文页面标题或不一致命名。
3. 电话、邮箱、政策入口存在不同地区的默认模板痕迹。

需求：

1. 美国站统一使用英语面向用户。
2. 后台店铺名、页面标题、菜单、政策、邮件模板、通知模板均统一为 `Rovic Sports USA`。
3. 对内部管理可保留中文备注，但前台不可见。

验收标准：

1. 前台用户可见内容无中英文混杂的非必要痕迹。
2. 订单邮件、账号登录、通知邮件中的品牌名一致。

## 9. 页面级修改建议

### 首页

保留：

1. 首页视觉方向可保留，主图和品牌调性适合高尔夫推车。
2. `Move Through the Course with Confidence` 方向是对的，能表达步行打球的轻松感。

修改：

1. 首页 SEO 和社交分享信息改为 Rovic Sports USA。
2. 顶部公告精简为一条主承诺。
3. 确认 `Shop QFC` 链接到正确商品页。
4. 修复浮动社交链接和 20% off 入口。

### 集合页

修改：

1. `Products` 改为 `Golf Push Carts & Accessories`。
2. 将 Push Cart 和 Accessories 分组。
3. 修复 `$999.00` 价格。
4. 对无货配件增加到货提醒。
5. 删除底部模板 banner 和 `Example heading`。

### 商品详情页

修改：

1. 修复价格和变体名。
2. 移动端增加 sticky Add to Cart。
3. 首屏增加 Key Specs。
4. FAQ 替换为真实问题。
5. 信任承诺链接到真实政策页。
6. 修复 `href="#"` 和禁用按钮。

### Contact 页

修改：

1. 删除 `contact@yourstore.com`、`sales@yourstore.com`、法国电话。
2. 使用真实支持邮箱、服务时区和响应时效。
3. 表单主题建议包括：Order question、Warranty claim、Replacement part compatibility、Product question。
4. 首段文案建议改为：`Need help with a Rovic cart, accessory, or replacement part? Send us your model name, order number, and photos if relevant.`

### Downloads 页

修改：

1. 所有 `Download PDF` 必须绑定真实 PDF。
2. 文件未准备好的型号，不展示下载按钮；改为 `Manual coming soon` + `Contact Support`。
3. 增加按型号筛选或锚点导航。
4. 避免 `Featured collection` 出现在支持资源页，除非明确是售后配件推荐。

### About 页

修改：

1. 删除 `Add a tagline` 和 `Example heading`。
2. 如果使用品牌时间线，年份和品牌故事必须真实；若不确定，不建议使用具体年份。
3. 禁用 CTA 要么改为有效链接，要么删除。

## 10. 数据与埋点需求

建议在修复后追踪：

1. PDP add-to-cart rate，按移动端/桌面端拆分。
2. Collection -> PDP click-through rate。
3. Sold Out 商品的 Notify Me 提交量。
4. Downloads 页 PDF 点击量。
5. Contact 表单主题分布，尤其是 warranty 和 compatibility。
6. Cart started -> Checkout completed 转化率。
7. 因价格、库存、兼容性咨询造成的客服量变化。

## 11. QA 回归清单

浏览器和设备：

1. Desktop：1440px、1280px。
2. Mobile：375px、390px、430px。
3. Browser：Chrome、Safari iOS、Edge。

页面检查：

1. 首页、集合页、QFC PDP、至少 3 个配件 PDP、Cart、Contact、Downloads、Privacy。
2. 全站搜索 `我的商店`、`shopify` 默认社交链接、`yourstore.com`、`Example heading`、`Tagline`、`Use this text`。
3. 所有按钮和导航链接必须可点击并到达正确页面。
4. 所有商品价格与后台价格表一致。
5. 所有可售商品能正常加入购物车。
6. 所有 Sold Out 商品不能被加入购物车，除非已明确标记为 Backorder。
7. 移动端公告栏不裁切，底部固定控件不遮挡商品卡片。
8. 商品页信任承诺能跳转到对应政策。
9. Contact 表单提交成功后有明确反馈。
10. Downloads 页每个 PDF 链接可打开或下载。

## 12. 发布计划

阶段 1：P0 配置与内容清理，预计 0.5-1 天

1. 修复价格、库存策略、店铺名、社交链接。
2. 删除或替换所有模板占位内容。
3. 修复 Contact 和 Downloads 的无效信息与禁用按钮。

阶段 2：P1 转化优化，预计 1-2 天

1. 移动端 PDP sticky CTA。
2. 集合页分类与无货下一步动作。
3. 政策页、保修页、Shipping/Returns 入口完善。

阶段 3：P2 细节与数据，预计 1 天

1. SKU、变体命名、accessibility 文案清理。
2. 促销浮层规则明确。
3. 埋点检查和上线后指标观察。

## 13. 验收出口

本轮修复可上线的最低标准：

1. 全站没有明显模板残留、默认 Shopify 社交链接和“我的商店”。
2. 所有商品价格真实，Cart/Checkout 金额正确。
3. Sold Out 商品状态与 Shopify 服务端加入购物车能力一致。
4. 移动端核心购买路径可完成，公告栏和固定控件不遮挡内容。
5. Contact、Downloads、Shipping、Returns、Warranty 能支撑用户售前和售后任务。

## 14. 审阅证据

已审阅页面：

1. https://www.rovicsportsusa.com/
2. https://www.rovicsportsusa.com/collections/all
3. https://www.rovicsportsusa.com/products/rovic-qfc
4. https://www.rovicsportsusa.com/products/adjustable-umbrella-holder
5. https://www.rovicsportsusa.com/pages/about-our-brands
6. https://www.rovicsportsusa.com/pages/contact
7. https://www.rovicsportsusa.com/pages/downloads
8. https://www.rovicsportsusa.com/policies/privacy-policy
9. https://www.rovicsportsusa.com/products.json

本地截图证据：

1. `screenshots/home-desktop.png`
2. `screenshots/collection-desktop.png`
3. `screenshots/qfc-desktop.png`
4. `screenshots/home-mobile.png`
5. `screenshots/collection-mobile.png`
6. `screenshots/qfc-mobile.png`
