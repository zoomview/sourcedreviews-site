# GOLDENMATE 联盟任务证据报告

- **报告生成时间：** 2026-11-27（Asia/Shanghai）
- **任务来源：** 用户提供的三个联盟短链（第 1 个为官方品牌页，后 2 个为单品页）
- **仓库：** `sourcedreviews-site`，分支 `main`
- **生产站：** `https://sourcedreviews.com/`

---

## 1. 联盟短链解析与映射

三个短链均已实际发起请求跟踪，跳转终点返回 HTTP 200。

| 角色 | 用户提供的短链（逐字节） | 跳转终点 | 状态 |
|---|---|---|---|
| 官方品牌页 | `https://pwiz.co/go/kcxmw669s6n5bzfe` | Amazon GOLDENMATE 官方店铺页 `https://www.amazon.com/stores/page/43C63459-D30C-4845-90D9-DC030C2316B6` | 200 |
| 单品页 1 | `https://pwiz.co/go/tztgaff7dychhd38` | `https://www.amazon.com/dp/B0D5QSYK69` | 200 |
| 单品页 2 | `https://pwiz.co/go/ec5fdpn1fyt1mah0` | `https://www.amazon.com/dp/B0GJ5WBM5D` | 200 |

Amazon 目的地**仅用于身份与证据核验**，未出现在任何 CTA 或正文中。

## 2. 商品身份与规格核验

### 单品 1 —— GOLDENMATE 1000VA/800W 白色塔式

| 字段 | 核验值 |
|---|---|
| 标题 | GOLDENMATE 1000VA/800W Lithium UPS Battery Backup & Surge Protector, White |
| 型号 | UPS 1000VA Pro/800W |
| 容量 | 1000VA / 800W / 6.67A / 120V |
| 波形 | Pure Sine Wave |
| 电池 | LiFePO4，25.6V 9Ah（230.4Wh） |
| 续航（listing 值） | ≤30 分钟 @ 400W、25°C |
| 充电时间 | 10 小时 |
| 电池平均寿命 | 10 年 |
| 插座 | 8 个 NEMA 5-15P，Type B 三芯 |
| 尺寸 / 重量 | 12.99"D × 4.13"W × 9.84"H / 12.13 lb（listing 规格表） |
| 形态 | Tower，白色 |
| 保修 | 2 年 |
| 规格表所列标准 | UL1642、UL1973、UL1778、FCC、TUV |
| 平台聚合评分 | 4.4 / 5，1,595 条全球评分 |
| BSR | Computer UPS 类目 #9 |

**规格表交叉标记为「无」的三项：** AVR、Communication Port、USB Charging Ports。这三项在正文中被明确写成缺点，并作为两型号差异的核心依据。

**两处已披露的 listing 内部冲突：**

1. **充放电循环次数**：功能要点写 "more than 5000 charge cycles"，同页产品图写 "3000+ Cycle life" —— 正文同时呈现两个数字并建议按保守值规划。
2. **重量三值并存**：产品图 `12.79 lbs`、规格表 `5.6 kg`、规格表另一行 `12.13 pounds` —— 正文如实列出，不做取舍。

### 单品 2 —— GOLDENMATE 1500VA/1000W 深灰壁挂式

| 字段 | 核验值 |
|---|---|
| 标题 | GOLDENMATE 1500VA/1000W Lithium UPS Battery Backup & Surge Protector, Gray |
| 型号 | UPS-1500VA-10BKW01-UG |
| 容量 | 1500VA / 1000W / 8.33A / 120V |
| 波形 / 切换 | Pure Sine Wave，<10ms |
| 电池 | LiFePO4（产品图标注 230Wh） |
| 续航 | **listing 未公布** —— 正文明确指出该缺口 |
| 插座 | 8 个 NEMA 5-15P，Type B 三芯 |
| 尺寸（规格表） | 3.54"D × 9.84"W × 13"H |
| 尺寸（产品图标注） | 10.03 in × 13.54 in × 3.54 in |
| 重量 | 13.9 lb（规格表）/ 13.89 lbs（产品图） |
| 材质 / 形态 | 金属外壳 / 紧凑壁挂式 |
| 保修 | 2 年 |
| 平台聚合评分 | 4.5 / 5，50 条全球评分 |
| BSR | Computer UPS 类目 #28 |

**已披露的 listing 内部冲突：** 规格表的宽高（9.84"W × 13"H）与产品图的宽高（13.54 in × 10.03 in）互相矛盾，深度 3.54 in 一致。正文如实披露并建议自行量测。

**该型号独有功能：** 壁挂安装（含螺丝）、通信口 + USB 线实现 NAS/PC/Mac 自动安全关机、USB-C 与 USB-A 充电口（总输出 10W）、内置断电自动点亮 LED 应急灯。

**未具名标准：** 该 listing 只笼统写 "certifications for safety and industry compliance"，未像 1000VA 一样列出 UL1642 等具体标准——正文如实对比说明。

## 3. 站内重复主题检查

发布前已搜索 `src/content/reviews/`，确认站内**不存在** UPS、backup power、power protection 或 GOLDENMATE 同主题文章，故两篇均为新选题，无主题撞车。

## 4. CTA 逐字节比对

正文中的 CTA 使用 `<a class="cta" href="...">` 真实可点击锚点，样式取自站点既有 `.prose .cta`（accent 背景、白字、圆角），并配 `.cta-note` 辅助说明。

**1000VA 评测（`goldenmate-1000va-ups-review`）：**

```
CTA 1 = https://pwiz.co/go/tztgaff7dychhd38   ← 对应单品短链
CTA 2 = https://pwiz.co/go/kcxmw669s6n5bzfe   ← 官方品牌页短链
```

**1500VA 评测（`goldenmate-1500va-wall-mount-ups-review`）：**

```
CTA 1 = https://pwiz.co/go/ec5fdpn1fyt1mah0   ← 对应单品短链
CTA 2 = https://pwiz.co/go/kcxmw669s6n5bzfe   ← 官方品牌页短链
```

程序化比对结果：两篇各 **2 个 CTA**，顺序为「单品 → 品牌」，与用户指定的 `pwiz.co` 原文逐字节一致（含大小写与全部字符），无参数化、无规范化、无缩短。

## 5. 图片安装与哈希

全部 15 张新图**本地托管**于 `public/images/reviews/`，无任何 Amazon、厂商或第三方热链。采用**原始字节复制**安装，未重编码、未裁剪、未镜像；源文件与安装文件 SHA-256 逐项相同。

### `goldenmate-1000va-ups/`（来源 ASIN `B0D5QSYK69`）

| 槽位 | 源文件 | SHA-256 | 字节 |
|---|---|---|---|
| hero.jpg | `00_61lopeE3lLL.jpg` | `3215425a7b2fbcf90951e5abb29bc439ab55c5c0b69107a28d28964263925bdf` | 88,905 |
| pick-1.jpg | `05_71LhzavzoJL.jpg` | `04ddac98c7099af84267863c7286d44b73e0105b39a8b417aa7c36d8ba070468` | 195,316 |
| pick-2.jpg | `07_71HIsfm0gyL.jpg` | `289eccf978ae04507b8faca1b4e04abefd029ce57ccda14ec9227636f778d766` | 194,220 |
| pick-3.jpg | `02_71lQ3h9zZmL.jpg` | `e2e06f9daca6f26e8e8e71731abdd41e7106c33e120c427ba690f95562ba287a` | 200,492 |
| pick-4.jpg | `04_71rPFAGeVxL.jpg` | `b226a83e1c5e624f200c1220990e3107fa212164b7ba3fd7ffb6391ccdad3823` | 167,254 |
| pick-5.jpg | `06_81WHW1D9xSL.jpg` | `dfb3af5aa3a27357252716246f18fc7c08728b3056b8cbd18d509f4844dcac3e` | 288,520 |
| pick-6.jpg | `08_71RnPWuaojL.jpg` | `dff178755d7d4d11f8eedf9fa93e521a80cc285840fc70c2dbc1f0bd49c83b7d` | 155,323 |

### `goldenmate-1500va-wall-mount-ups/`（来源 ASIN `B0GJ5WBM5D`）

| 槽位 | 源文件 | SHA-256 | 字节 |
|---|---|---|---|
| hero.jpg | `00_71vesDRy+0L.jpg` | `6d68e43f1884a00d97c3cc37eb6a1aa74f383d9db4ad62e6cbdaa60ea430bbf2` | 249,618 |
| pick-1.jpg | `08_71Zxg3xxxwL.jpg` | `7e83d5bd39e43234511d4c838f533a24200786c634b4161e82e729e02f983c53` | 216,414 |
| pick-2.jpg | `06_81H11NeUdzL.jpg` | `b885e4608f5869093100c3f0b15cbbe9dc3c265eb732b7c996a8f1237dab18ae` | 304,587 |
| pick-3.jpg | `07_71xVZEvea6L.jpg` | `965e24db42ef02db26a7a1440fb3f1eb3c3c877e78ced120e6add5be71120692` | 212,199 |
| pick-4.jpg | `03_71ak3R-rssL.jpg` | `da8ae61588f9419eb8ffb610cece94a7e3a12d1cd6afcc297254521b93c2dcd6` | 190,507 |
| pick-5.jpg | `04_71B+tyWeRFL.jpg` | `33954460473068c3c3ba318af457c6ce30a72c1a9062cedbf75b6c1b25c9b656` | 235,284 |
| pick-6.jpg | `02_71CwxgP2mxL.jpg` | `1a8704ee71483ff9627edcfcbd473eb76f0e57dfeff548b5092627827ef40e20` | 177,950 |
| pick-7.jpg | `05_71RwinC2QRL.jpg` | `65bc6e68be8b1b41651038b3bd4f0a8bb3c48d36183527a2217b5cc8bc156efd` | 222,544 |

### 身份与重复控制

- **逐张目视核验**完成：1000VA 确认为白色塔式；1500VA 确认为深灰扁平壁挂式，两款形态明确可区分。
- **排除项**：1000VA 图库中带营销角标（「10+ YEARS LIFETIME」「Silence Mode 34」）的图片、以及同 ASIN 的其他配色变体图，均未进入正式矩阵，避免读者误认当前颜色型号。
- **精确重复**：全站 SHA-256 扫描，17 张新图均无同字节副本。
- **近似重复**：全站 dHash 最近邻扫描，新图与全站任意图的最小距离为 56（`goldenmate-1000va-ups/lead.jpg` ↔ `tcl-tab-10-gen-4/lead.jpg`），远高于 14 的同组阈值；两篇之间 lead 距离 60。

### lead 与 OG

- `lead.jpg` 由 `scripts/build-hero-composites.py` 的同款函数**限域**生成（仅处理这两个新目录），1600×900。
- OG 由 `scripts/generate-og-images.py` 的同款函数**限域**生成（仅生成这两个 slug），1200×630。
- 两个全量脚本的 `main()` 均**未直接执行**，未触碰任何无关文章的图片。
- 生成的 4 张图已 `read` 目视确认：两款形态清晰、标题完整无裁切。

## 6. 终检结果（构建产物）

```
CTA 顺序与字节一致性          PASS
每篇 CTA 数量 = 2             PASS
直接 Amazon URL / ASIN / /dp/B0 泄漏   0
$ 符号                       0
重复标题 / 重复摘要           0
引用图片缺失                 0
弱 alt (<25 字符)            0
首图非 lead.jpg               0
同页重复引用图片              0
17 张图片解码                 全部 OK
```

## 7. 构建与提交

```
npm run build  →  60 page(s) built in 2.91s
node scripts/generate-sitemap.js  →  52 URLs (44 articles + 8 static)
```

提交（与遗留 8 篇任务严格隔离）：

```
7fc815b  Add two GOLDENMATE UPS reviews with supplied short-link CTAs
1a4b15c  Regenerate sitemap and content types for the GOLDENMATE reviews
```

推送：`32b362c..1a4b15c  main -> main`，remote HEAD 核对为 `1a4b15cfce9d7c48859fb913617422c3344d4531`。

**隔离确认：** 本次提交只含 2 个 Markdown、17 张新图、2 张 lead、2 张 OG、`ArticleCard.astro` 映射、sitemap 与 content types 共 22 个文件。21 个遗留图片改动与 `docs/Resilia-联盟任务证据报告.md` 明确排除在外，仍留在工作区未提交。

## 8. 生产验收（Cloudflare 发布后）

Cloudflare 第 8 次探测（推送后约 140 秒）返回 200 并含目标 CTA，判定发布完成。

| 检查项 | 结果 |
|---|---|
| `GET /reviews/goldenmate-1000va-ups-review/` | **200**，30,618 字节 |
| `GET /reviews/goldenmate-1500va-wall-mount-ups-review/` | **200**，29,701 字节 |
| 生产 HTML CTA 1（1000VA） | `https://pwiz.co/go/tztgaff7dychhd38` ✔ 逐字节一致 |
| 生产 HTML CTA 2（1000VA） | `https://pwiz.co/go/kcxmw669s6n5bzfe` ✔ 逐字节一致 |
| 生产 HTML CTA 1（1500VA） | `https://pwiz.co/go/ec5fdpn1fyt1mah0` ✔ 逐字节一致 |
| 生产 HTML CTA 2（1500VA） | `https://pwiz.co/go/kcxmw669s6n5bzfe` ✔ 逐字节一致 |
| CTA 为真实 `<a class="cta">` 可点击锚点 | ✔，各 2 个 |
| 生产页 Amazon / ASIN / `/dp/B0` 泄漏 | **0** |
| 生产页 `$` | **0** |
| 正文图片 7 张（1000VA）+ 8 张（1500VA） | 全部 **200** |
| OG 图片 2 张 | 全部 **200** |
| `og:image` / `twitter:image` 指向 | `https://sourcedreviews.com/og/<slug>.png` ✔ |
| JSON-LD | Article / BreadcrumbList / Person / Organization / WebSite / WebPage / ImageObject 均存在，headline、datePublished、author、description 正确 |
| sitemap.xml | 52 条 loc，含 2 条新路由 ✔ |
| 首页收录 | 44 篇文章中含 2 条新链接 ✔ |
| Tech 分类页收录 | 含 2 条新链接 ✔ |
| 首图 alt 文本 | 生产页确认与图片实际内容一致 ✔ |

正文关键事实抽查（生产 HTML 计数）：

```
1000VA: "5,000 charge cycles" ×2 / "3000+ cycle life" ×2
        "4.4 out of 5 stars from 1,595" ×3
        "did not perform hands-on testing" ×1
1500VA: "13.54 inch" ×4 / "4.5 out of 5 stars from 50" ×3
        "UPS-1500VA-10BKW01-UG" ×1 / "automatic safe shutdown" ×8
```

## 9. 合规声明核对

| 项目 | 状态 |
|---|---|
| 声称亲手测试 | 无，两篇均明确声明未做 hands-on testing |
| 伪造买家引语 | 无，全文不引用任何单个买家原话 |
| 价格 | 无，两篇正文与生产页均零 `$` |
| 平台评分伪装成编辑评分 | 无，评分明确写为 Amazon 平台聚合评分，并注明样本量 |
| 制造商声明未归因 | 无，规格、认证、续航、成本对比均写为制造商声明 |
| 联盟关系披露 | 站内沿用「This article contains affiliate links」，并配 `.cta-note` 说明价格与库存变化 |
| 引用来源 | 每篇末节列明 listing、feature bullet、规格表、评分与 BSR 的出处及访问时间 |
| 图片热链 | 无，全部本地托管 |
| 官方品牌页单独成文 | 未创建，两篇各以品牌页短链作为 CTA 2 |

---

**结论：** 2 篇 GOLDENMATE UPS 评测已按用户指定格式发布到生产站，CTA 顺序与字节完全符合要求，未嵌入 Amazon 链接，图片全部本地托管且逐张核验身份，构建、提交、推送、Cloudflare 发布与生产验收全部通过。
