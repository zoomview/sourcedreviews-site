# Seed 联盟任务证据报告

生成时间：2026-11-25（Asia/Shanghai）
仓库：`C:/review/sourcedreviews-site/`
生产站：https://sourcedreviews.com/
本次提交：`a415966`（三篇评测 + 正式图片 + OG + 卡片映射）、`646bd09`（sitemap 与 content types 重建）
基线 HEAD：`f95d876 Regenerate sitemap and content types for the Resilia reviews`

---

## 1. 四个 pwiz.co 短链的跳转映射（发布前及发布后各核验一次）

四个链接全部返回 HTTP 302。落地地址仅用于确认商品身份，**不出现在任何 CTA 或正文中**。

| 短链 | 302 落地 | 确认身份 |
|---|---|---|
| `3bc4vq04yfm4q8qn` | `https://www.amazon.com/dp/B0G99BV4K9?maas=...` | Seed DS-01 Daily Synbiotic — 60-Day Refill（120 粒 / 60 servings / 双补充袋） |
| `qntpv5zsdv5qsfjb` | `https://www.amazon.com/dp/B0CMJR4XGR?maas=...` | Seed DS-01 Daily Synbiotic — 30-Days With Jar（60 粒 / 30 servings / 含 DS-01 罐） |
| `kg74vd4q10tvd73x` | `https://www.amazon.com/dp/B0G99WQ4PG?maas=...` | Seed DS-01 Daily Synbiotic — 30-Day Refill（60 粒 / 30 servings / 单补充袋） |
| `7q1q5efpp72jb5qe` | `https://www.amazon.com/stores/page/5820FCF2-1126-43EB-875E-8CF231DA3F6D?maas=...` | Seed 官方品牌店铺页 |

第四个短链是品牌页，按要求只作每篇的 **CTA 2**，不单独建品牌评测页。

Amazon 落地地址仅作证据核验使用；生产 HTML 中 Amazon / ASIN / `/dp/B0` 出现次数实测为 **0**。

---

## 2. 三个变体的商品身份与包装差异（ASIN 页面数据核验）

| 维度 | B0G99BV4K9 | B0CMJR4XGR | B0G99WQ4PG |
|---|---|---|---|
| 页面标题 | Seed DS-01 Daily Synbiotic - Adult Probiotic + Prebiotic - 60-Day Refill | … - 30-Days With Jar | … - 30-Day Refill |
| 胶囊数 | 120 Count | 60 Count | 60 Count |
| servings | 60 | 30 | 30 |
| 容器类型 | Sachet（双补充袋） | Jar（含 DS-01 罐） | Sachet（单补充袋） |
| 重量/尺寸 | 4 ounces；10 × 9.5 × 0.5 in | 0.34 kg | 9.88 × 4.04 × 0.6 in |
| UPC | 850058995267 | 860340001675 | 850058995250 |
| MPN | SYN-RF-AMZ-2MO | SYN-AZ | SYN-RF-AMZ |

平台聚合评分（Amazon 页面实读）：三页均为 **4.4 / 8,546**。

> 评分冲突已解决：相关推荐中的 `4.2 / 1,458` 属于另一商品 `B0CPTT5TWD`（14-Day Gut Rescue），与本任务三件商品无关。三个目标页面在正文中一律写为平台聚合评分，并明确标注为 Amazon 页面数据，不写成本站编辑评分。
>
> Best Sellers Rank（三页一致）：`#336 in Health & Household`、`#4 in Probiotic Nutritional Supplements`。

---

## 3. 三篇文章：标题、摘要与编辑角度差异

| 文章 | 标题 | 角度 |
|---|---|---|
| `seed-ds-01-30-day-jar-review` | Seed DS-01 Daily Synbiotic 30-Day Jar Review: The Starter Pack That Opens Seed's Refill System | 罐装初始装：标签、证据与营销主张的分离，谁该从罐开始、谁该直接买补充装 |
| `seed-ds-01-60-day-refill-review` | Seed DS-01 60-Day Refill Review: Two Sachets, 120 Capsules, and What the Label Panel Actually Breaks Down To | 双袋补充装：逐 blend 拆解 Supplement Facts、把 72/79/67 营销卡追回论文数字、refill system 悬而未决的包装问题 |
| `seed-ds-01-30-day-refill-review` | Seed DS-01 30-Day Refill Review: One Sachet, 30 Servings, and What the Packaging's Own Timeline Does Not Prove | 单袋补充装：补充流程、包装自印时间线与论文实测点的差异、第三方检测声明边界 |

三篇摘要互不重复；全站终检 `dup_titles = {}`、`dup_summaries = {}`（脚本 `.scratch/b7/final_audit.py`，覆盖全站 review 集合）。

正文文件：

```text
src/content/reviews/seed-ds-01-30-day-jar-review.md
src/content/reviews/seed-ds-01-60-day-refill-review.md
src/content/reviews/seed-ds-01-30-day-refill-review.md
```

---

## 4. CTA 逐字节核验（生产环境实测）

从生产 HTML 中提取 `<a class="cta">` 的 href，与提交的短链做字符串全等比较，并对每个 href 取十六进制字节比对。

| 文章 | CTA 1 | CTA 2 | 判定 |
|---|---|---|---|
| 30-Day Jar | `https://pwiz.co/go/qntpv5zsdv5qsfjb` | `https://pwiz.co/go/7q1q5efpp72jb5qe` | EXACT / EXACT |
| 60-Day Refill | `https://pwiz.co/go/3bc4vq04yfm4q8qn` | `https://pwiz.co/go/7q1q5efpp72jb5qe` | EXACT / EXACT |
| 30-Day Refill | `https://pwiz.co/go/kg74vd4q10tvd73x` | `https://pwiz.co/go/7q1q5efpp72jb5qe` | EXACT / EXACT |

每篇恰为 2 个 CTA，顺序固定为「单品短链 → 品牌短链」。每个 href 长度 35 字节，十六进制逐字节比对一致：

```text
68747470733a2f2f7077697a2e636f2f676f2f716e747076357a736476357173666a62   (CTA1 30-Day Jar)
68747470733a2f2f7077697a2e636f2f676f2f336263347671303479666d347138716e   (CTA1 60-Day Refill)
68747470733a2f2f7077697a2e636f2f676f2f6b673734766434713130747664373378   (CTA1 30-Day Refill)
68747470733a2f2f7077697a2e636f2f676f2f37713171356566707037326a62357165   (CTA2，三篇共用)
```

CTA 使用可点击的 `<a class="cta">`（样式见 `src/styles/global.css` 的 `.prose .cta`），辅助说明用 `.prose .cta-note`。CTA note 中的 “Prices and availability change daily” 属通用免责声明，不是价格声明。

---

## 5. 临床证据边界：两篇论文、资助与利益冲突

两篇均取 PMC 全文（非摘要）为依据：

```text
.scratch/b7/papers/PMC12845427_efetch.txt   len 49066
.scratch/b7/papers/PMC12430871.txt           len 74358
.scratch/b7/papers/evidence-notes.md         逐字摘录
```

### 论文 1（PMID 41599868 / PMC12845427 / DOI 10.3390/nu18020255，*Nutrients* 2026;18(2):255）
n=350，随机双盲安慰剂对照，6 周，DS-01 = 53.6B AFU 多菌株益生菌 + 400 mg 石榴提取物。
Week 6：DQLQ `0.80 vs 1.20, p < 0.05`；腹胀与产气（PROMIS-GI 13a）`16.0 vs 21.0, p < 0.01`；never/rarely 腹胀 `72.3% vs 55.9%, p < 0.001`；腹部不适（PROMIS-GI 5a）`8.0 vs 10.0, p < 0.01`。
参与者覆盖 **40 个美国州与 1 个美国属地**（Results 3.1 原句），试验为 decentralized design。

### 论文 2（PMID 40944126 / PMC12430871 / DOI 10.3390/nu17172734，*Nutrients* 2025;17(17):2734）
n=32，91 天，同一配方。Bifidobacterium/Lactobacillus alpha 多样性各时间点升高，Day 91 `p < 0.0001`；UroA Day 7 约 12 倍、Day 91 约 49 倍，Day 91 UroA-capable `100% vs 44.4%, p < 0.01`；丁酸升高 `p < 0.03`；CRP 变化 −0.44 mg/L 与 *B. longum* / *B. infantis* 丰度相关；HbA1c 虽下降但仍在无代谢综合征健康人群正常范围。**该研究没有 GI 症状终点。**

### 资助与利益冲突（三篇正文均披露）

- 论文 1 原文：*"This study was funded by a grant from Seed Health, Inc. (Venice, CA, USA)."*
- 论文 2 原文：*"This study was funded by a grant from Seed Health, Inc. (Venice, CA, USA)."*
- 论文 1 COI：C.V.D.E. 与 Z.K. 为 Seed 员工及股东；R.J. 为 Increnovo LLC 员工，R.J. 与 J.R.A. 任 Seed 顾问。
- 论文 2 COI：B.A.N. 与 Z.K. 为 Seed 员工及股东；G.R. 与 R.J. 任 Seed 顾问。
- 两篇均声明：Seed 未参与试验运营（由 Radicle 独立执行），发表决定完全由作者作出。

因此三篇文章一律把两篇论文表述为「由 Seed 资助、作者含 Seed 员工与顾问的试验」，**不包装成完全独立验证**。

### 安全性（按论文实际终点表述）

- 论文 1 原文：*"Overall, the multi-species synbiotic was well-tolerated, with no serious adverse events reported. Safety was prospectively monitored throughout the trial, and there were no significant differences observed between arms (p > 0.05), including total adverse events, and symptom-specific events including dizziness, drowsiness, dry mouth, headache, insomnia, nausea, numbness/tingling, and other GI symptoms (Supplementary Tables S1–S11)."*
- 论文 2 原文：*"The multi-species synbiotic was well-tolerated, and none of the participants reported adverse events in either study arm."*

### 不得外推的部分（已在正文中明确）

- 症状试验读出点是 **Week 6**，不是包装时间线的 2 周 / 4 周节点。
- 91 天研究只测生物学终点，**不能**支撑 “3 Months — Sustains smooth digestion”。
- 包装 “Benefits Build Over Time” 五行与脚注按高清像素逐字锁定，`4 Weeks` 行**没有任何上标**；`‡‡` 只标在 2 周 regularity 行，脚注为 *"‡‡ Data derived from ingredient-level clinical research."*
- 焦虑边界：mild-anxiety 亚组「单一焦虑相关症状至少下降 1 点」为 `66.0% vs 45.5%, p < 0.05`，**不是**总体抗焦虑效果；总体 depression 与 libido 无显著差异。

---

## 6. 制造商声明与编辑判断的区分

三篇正文均写明未做 hands-on testing，并逐条区分四类来源：

| 类别 | 写法 | 示例 |
|---|---|---|
| 制造商声明 | 明确归因给 Seed | 24 菌株、53.6B AFU、capsule-in-capsule（依据为 in-vitro SHIME）、免疫/皮肤/微量营养素合成、敏感者前三天每日 1 粒再升至 2 粒 |
| 已发表临床研究 | 按论文实际终点 | DQLQ、PROMIS-GI 13a/5a、UroA、丁酸、CRP |
| Amazon 页面聚合评分 | 标注为平台聚合数据 | 4.4 / 8,546 |
| 本站编辑判断 | 明确标为编辑结论 | 适合谁 / 不适合谁、评分标准、verdict |

包装上的营销数据卡（`72% never or rarely feeling bloated` / `79% minimal discomfort from occasional constipation` / `67% rarely experiencing abdominal discomfort`，`as of February 2026`，含 FDA 免责声明）按**制造商营销图声明**引用，不写成本站发现。第三方检测图只列受测类别（strength, purity, heavy metals, pesticides, allergens），**未列实验室、认证项目或标准**——正文如实写明这一缺口。

三篇均无买家引语、无价格、无库存或奖项断言。

---

## 7. 正式图片映射（15 张源图，本地托管）

所有正式图片以**原始字节**复制安装（`shutil.copyfile`，不重编码、不裁剪），源文件与安装文件 SHA-256 完全一致，由 `scripts` 下的安装脚本断言校验；安装脚本另断言无重复源、无重复安装路径。

真值映射文件：`.scratch/b7/final_image_map.json`（记录完整 SHA-256、来源 ASIN、media ID、像素尺寸、用途与 alt）。

### seed-ds-01-30-day-jar（罐装，6 张）

| 文件 | media ID | 尺寸 | SHA-256 |
|---|---|---|---|
| hero.jpg | 61sedBtfSbL | 1450×1500 | `8d96581249363fc29d201f4ae2089a737b50b4f63a899262ec3907dd6a871eb9` |
| pick-1.jpg | 617YiBRJy1L | 640×1137 | `9f17e1dd9c28a6251a83869d607d38f1d36d0b92efb3b3edf3016c814b9f3cea` |
| pick-2.jpg | 81WjTGUNYYL | 1500×1500 | `eacbfbd64f1635e03fddbfb0edc1e3d22abf4189f74a6a9ada17ee2d367dd476` |
| pick-3.jpg | A1SdjK+DZzL | 4032×3024 | `020dc5c1aeab252497f3542cfcdd38e30750e73ce80e5306c8b278bb85a4c9c4` |
| pick-4.jpg | A1QLsr+-D4L | 2316×3088 | `d443890b5c76b2c956891842eade10beb5368ae9bc8657cad76068c98d3d62aa` |
| pick-5.jpg | 71F9rb9ZgrL | 640×1137 | `0c2708d7f13a009545533c1a8391144cfdb3497f21cf8d5313a4bc4ae8b54c3d` |

### seed-ds-01-60-day-refill（双袋，5 张）

| 文件 | media ID | 尺寸 | SHA-256 |
|---|---|---|---|
| hero.jpg | 71ImZgIjOjL | 1456×1500 | `901654aae9ca29b731621d56ee3c845e37d95c31b7ecc63d656baaaea7d7321a` |
| pick-1.jpg | 811iI+IbwrL | 1500×1500 | `ac261bd94255c7e281737ef37bb315a111145b3b7715cae223f2c66a03243526` |
| pick-2.jpg | 71k6RZe17+L | 1500×1500 | `39038c9d3f184d7cbd611c273d2ba3bb4d8c960751da37d6045467cca55e0eea` |
| pick-3.jpg | 61seU3W88UL | 1500×1500 | `a0c3376770e6be5b7b2e0cbd48854da295ff8e9b183e3b43d0944fac1718dda7` |
| pick-4.jpg | 71uJ6tia8uL | 1500×1500 | `f78042627b0717fac5f1930e92e5142e9b1fc8373863c1162eb9f51456bed0ea` |

### seed-ds-01-30-day-refill（单袋，4 张）

| 文件 | media ID | 尺寸 | SHA-256 |
|---|---|---|---|
| hero.jpg | 61j-7BzYm7L | 828×1500 | `826b49015b73a38a931fe66d3e398d266f8e187b4545643e4ba7ba741ca23271` |
| pick-1.jpg | 71tpRsw1eOL | 1500×1500 | `992cebbcf7385b80368e19e6057dca25aac37e4507736b3f7940dc75fd3103eb` |
| pick-2.jpg | 81r0ZZ+33zL | 1500×1500 | `99d3261743b1239641e5b4877f7f4e01c0ec26f16eed3de535bec50de56fd720` |
| pick-3.jpg | 71wnlDclz5L | 1500×1500 | `67e6f2cf385ea2ceee4e949b64c1e96f1819b195feeb013e5957b219196e8f81` |

三篇之间**无共用原图**，且为各自商品拍摄角度不同的素材。感知哈希扫描（dHash ≤ 6）无近似对；dHash 曾把罐装与袋装误判为同组，已确认 dHash 只用于发现近似母图，**不作为产品身份依据**，最终判定以实际像素与目视核验为准。

### 每张正式安装图的目视核验

每张最终安装图片均用图像读取工具目视检查过标签方向、主体完整性与是否含镜像/角标/竞品/字幕。关键结论：

- 罐装 pick-1 / pick-3 / pick-4 / pick-5 的标签文字方向正常（"Seed®"、"DS-01® DAILY SYNBIOTIC" 正读），主体与标签完整。
- 30-Day Refill hero（828×1500）原始产品图为白底，右下角带两粒胶囊；`lead.jpg` 合成时整幅照片完整保留，未裁切包装主体，右侧白带来自原图本身而非合成空带。
- 「The Seed Standard」「Stay stocked, stay regular.」「Benefits Build Over Time」等品牌图文字方向正常，且正文引用逐字一致。

### 派生图

`hero.jpg` 是原始 OG 主图；`lead.jpg` 由 `scripts/build-hero-composites.py` 从 `hero.jpg` 合成，固定 1600×900 JPEG，不改写原图身份。OG 卡由 `scripts/generate-og-images.py` 使用 `hero.jpg` 生成。

```text
seed-ds-01-30-day-jar      lead 1600x900    OG 1200x630
seed-ds-01-60-day-refill   lead 1600x900    OG 1200x630
seed-ds-01-30-day-refill   lead 1600x900    OG 1200x630
```

---

## 8. 图片排除记录

原始审计池共 48 个文件（44 张 `.scratch/b7/hr/` JPEG + 4 张新抓取 PNG），最终安装 15 张，排除 33 张。

| media ID / 文件 | 排除原因 |
|---|---|
| `71ryflhaIFL`（原罐装 pick-6） | **镜像倒字**：浴室镜前自拍，罐身标签整体镜像（"deeS"、反向的 "DS-01® DAILY SYNBIOTIC"）。即使商品身份正确也属硬性排除。已从安装目录删除，`final_image_map.json` / `eligible_ids.json` / 安装脚本同步更新；生产环境 `/images/reviews/seed-ds-01-30-day-jar/pick-6.jpg` 返回 404 |
| `61YrrUQFfmL` | 镜像倒字 |
| `A19eBp6OJoL` | 大绿色箭头角标 |
| `51vpS2Qgb9L` | 过曝的手部/白色物体特写，无法确认 Seed 包装 |
| `515lWxw4cTL` | 640×360 视频帧，产品过小不可辨 |
| `81tWiUnak-L` | 深绿罐体，但标签被画面右缘截断 |
| 12 张原有问题图 | `41NP37kZI8L`、`51TRD9LfzDL`、`61E8xTt5ywL`、`61MHDnhLb8L`、`61N6RQVfZwL`、`61PNivAMUGL`、`61SNgT9-ZIL`、`61e1RxV3wVL`、`71B6KR+HuGL`、`810TB3I0GZL`、`818lwV5ZmEL`、`81eKrM8lqcL` |
| 11 张低分辨率副本 | `314g5G83SzL`、`318Dxu7r4UL`、`31HOE5VHk-L`、`31LI0Fv0TiL`、`418jdEp0nzL`、`41H-wlD5ixL`、`41L3RQUaeVL`、`41ederPeEXL`、`41gcBA7fL`、`41wXLVc80WL`、`51OmQiF08oL` |
| 4 张新抓取 PNG | `81bVX3pT9EL.png`、`A14Vd8ALcaL.png`、`A1d0yxQWYsL.png`、`B1Og0YnjhGL.png`（均为视频帧/带字幕营销截帧） |

`.scratch/b7/zoom/` 下的所有裁剪放大图、`POOL_A.jpg`、`POOL_B.jpg`、`ASSIGN*.jpg`、`PROB12.jpg` 等一律为**核验用文件，不是拟安装图片**。

---

## 9. 终检结果（`.scratch/b7/final_audit.py`）

```text
decode_fail: []
seed_images: 18            (15 张源图 + 3 张派生 lead)
og: 3
internal_exact_dups: []
cross_site_exact_dups: []
near_dup_pairs(dhash<=6): []
missing_referenced_images: []
dup_titles: {}
dup_summaries: {}
amazon_or_link_leaks: []
CTA byte_identical: 三篇均 True
```

价格扫描：三篇正文与构建 HTML 中 `$` 出现次数为 0。

---

## 10. 构建、提交、推送与 Cloudflare 发布

```text
npm run build        -> 58 page(s) built，含 3 个新 Seed 路由
git commit           -> a415966 Add three Seed DS-01 supplement reviews with supplied short-link CTAs
git commit           -> 646bd09 Regenerate sitemap and content types for the Seed reviews
git push origin main -> f95d876..646bd09
```

Cloudflare 发布等待：首轮探测 404，第 5 轮（约 80 秒）返回 200 且 CTA 已出现，判定为已发布。

---

## 11. 生产验收结果

页面 HTTP 与元数据：

| URL | HTTP | datePublished | OG / Twitter 图 | Article JSON-LD |
|---|---|---|---|---|
| `/reviews/seed-ds-01-30-day-jar-review/` | 200 | 2026-11-25 | `/og/seed-ds-01-30-day-jar-review.png` | 有 |
| `/reviews/seed-ds-01-60-day-refill-review/` | 200 | 2026-11-25 | `/og/seed-ds-01-60-day-refill-review.png` | 有 |
| `/reviews/seed-ds-01-30-day-refill-review/` | 200 | 2026-11-25 | `/og/seed-ds-01-30-day-refill-review.png` | 有 |

作者均为 `Daniel Reeves`；JSON-LD 类型包含 Article、Person、Organization、BreadcrumbList、WebSite、WebPage、ImageObject。

资源 HTTP：15 张源图对应的 hero/lead/pick 全部 200，3 张 OG 全部 200，罐装 `pick-6.jpg` 返回 **404**（确认已下线）。

正文图片引用：罐装 6 张、60 天 5 张、30 天 4 张，与安装目录一致。

站内入口：

- `sitemap.xml` 含 3 条新 URL，`grep -c "seed-ds-01"` = 3
- 首页出现 3 条 Seed 链接及对应图片目录
- `/categories/reviews/` 分类页出现 3 张卡片
- 首页 `<meta name="partnerwhiz-verify" content="pw_85d46efc6ccc7a469e6c176513f7d039705604e14db1471a" />` 仍在位

---

## 12. 提交隔离

本次 Seed 提交**未混入**任何其他任务的改动。提交前工作树存在 21 项遗留文章图片修改（air-fryer-toaster-oven、coffee-makers、drip-coffee-makers、gaming-chairs-for-heavy-people、portable-induction、single-serve-coffee-makers）与 1 个未跟踪的 Resilia 证据报告，这些全部保持未暂存状态，仅暂存了：

```text
src/content/reviews/seed-ds-01-30-day-jar-review.md
src/content/reviews/seed-ds-01-60-day-refill-review.md
src/content/reviews/seed-ds-01-30-day-refill-review.md
src/components/ArticleCard.astro          （仅新增 3 条显式映射）
public/images/reviews/seed-ds-01-*/        （15 张源图 + 3 张 lead）
public/og/seed-ds-01-*.png                （3 张 OG）
.astro/astro/content.d.ts
public/sitemap.xml
```

`ArticleCard.astro` 采用显式 `ARTICLE_TO_IMAGE_DIR` 映射，三条 Seed slug 已登记，不依赖自动猜测：

```text
'seed-ds-01-30-day-jar-review':    'seed-ds-01-30-day-jar'
'seed-ds-01-60-day-refill-review': 'seed-ds-01-60-day-refill'
'seed-ds-01-30-day-refill-review': 'seed-ds-01-30-day-refill'
```

`src/pages/reviews/[slug].astro` 通过 `getStaticPaths()` 自动生成路由，无需手工注册；`scripts/generate-sitemap.js` 自动扫描 Markdown，构建后已核验 sitemap。

---

## 13. 遗留事项（未在本轮处理）

- 8 篇遗留评测的图片与正文修复（去价格、去未证实竞品比较、修正型号、重建 lead/OG、去重、部署）尚未开始，其 21 项图片改动仍在工作树中未暂存。
- `docs/Resilia-联盟任务证据报告.md` 在本轮开始前即为未跟踪状态，未包含在本次 Seed 提交内。
- `https://sourcedreviews.com/reviews/best-shark-vacuums-2026/` 的 CTA 格式本轮未复核。
- 5 个已删除电竞椅 URL 的 Google Search Console Removals 状态本轮未复核。
