# Artcraft Hub 项目需求文档

版本：v0.1（边界已按 2026-10-20 的确认结果整理）

## 1. 项目一句话

做一个中英文双语的 Artcraft 新手资料站，帮助用户找到官方版本、看懂安装步骤、了解 Artcraft 能做什么，并用一张简单的表格判断它和 Adobe Photoshop、Illustrator、Premiere Pro、After Effects 的区别。

网站是资料导航站，不在网页中重做 Artcraft，也不要求用户注册账号。

## 2. 已确认的边界

| 项目 | 第一版决定 |
| --- | --- |
| 项目性质 | 全新独立项目，和旧图片工具站分开；使用新的代码目录、GitHub 仓库和 Vercel 项目 |
| 主要读者 | 不会写代码、想安装和尝试 Artcraft 的新手 |
| 网站语言 | 中文和英文都提供；中文说明优先，软件按钮、命令和官方名称保留英文 |
| 资料对象 | `storytold/artcraft`，以官方 README、Releases、`_docs/dev_setup.md`、LICENSE 和 NOTICE 为准 |
| 下载入口 | 同时提供官方下载链接和备用镜像入口；每个镜像必须显示来源、版本、系统、架构、校验值和检查日期 |
| 核心内容 | 下载入口、安装教程、功能说明、Artcraft 与 Adobe 对比 |
| Adobe 对比 | Photoshop、Illustrator、Premiere Pro、After Effects；比较价格模式、主要用途、上手难度、平台和适合人群 |
| 收入方式 | 申请 Google AdSense，在审核通过后展示广告 |
| 域名 | `artcraftphotocraft.space`（用户已提供；上线时决定根域名或 `www` 为主地址） |
| 发布平台 | Vercel |
| 上线验收 | 功能可用、Vercel 部署、域名访问、Search Console 验证、提交 sitemap、GA4 可见数据、Bing 可验证、AdSense 申请流程完成 |
| 更新方式 | 首版由站长通过 GitHub 提交内容更新；每月检查一次 Artcraft 官方版本和链接 |

## 3. 官方资料基线

截至 2026-10-20，官方 GitHub 页面显示：

- ArtCraft 被描述为面向艺术家、设计师和影视创作者的桌面 AI 创作 IDE。
- 官方 README 提到 2D 合成、3D 合成、角色姿态、背景移除、图像转 3D 网格、文生图、提示词图像编辑、画布编辑、图生视频等能力。页面也说明更多预览会继续补充，因此本站必须把功能写成“截至检查日期官方页面已展示的能力”，不要写成永久承诺。
- 官方下载入口包含 `getartcraft.com`、GitHub Releases 和源码构建说明。Windows 与 macOS 有稳定版本入口；Linux 主要按源码构建说明处理，不能把它写成已提供同等稳定安装包。
- 官方仓库显示 `LICENSE-MIT` 与 `LICENSE-APACHE`，并要求同时参考 `NOTICE`。页面应同时链接 [MIT](https://github.com/storytold/artcraft/blob/main/LICENSE-MIT)、[Apache-2.0](https://github.com/storytold/artcraft/blob/main/LICENSE-APACHE) 和 [NOTICE](https://github.com/storytold/artcraft/blob/main/NOTICE)；本站只引用官方资料，不重新解释许可证的法律含义。

每一页涉及版本、功能或许可证时，都要在页面底部记录：来源链接、最后检查日期、站点版本。发现官方页面变化时，先更新来源记录，再改正文。

## 4. 目标与成功标准

用户进入网站后，应能在 3 分钟内完成：

1. 判断自己使用 Windows、macOS 还是 Linux。
2. 找到对应的官方安装入口或源码安装入口。
3. 看懂安装前需要准备什么，以及下一步点击哪里。
4. 看到 Artcraft 与 Adobe 的差别，并知道该工具是否适合自己。

第一版上线成功还必须满足：

- 中英文首页、下载页、安装页、功能页、对比页、FAQ 和法律页面可直接打开。
- 官方链接能打开，失效链接不会默默显示为可用下载。
- 备用镜像只显示经过来源、许可证、文件大小和 SHA-256 校验的文件。
- 手机宽度可以阅读、复制命令和点击下载。
- Vercel、域名、HTTPS、Google Search Console、GA4、Bing sitemap 流程完成。
- Google AdSense 申请所需的隐私政策、联系方式、原创说明和 `ads.txt` 已准备好；是否通过审核由 Google 决定。

## 5. 第一版页面

每个页面都要有中文和英文版本，并提供语言切换、页面标题、描述和规范网址。

| 地址 | 页面内容 |
| --- | --- |
| `/zh`、`/en` | 首页：Artcraft 是什么、适合谁、四个核心入口、非官方声明 |
| `/zh/downloads`、`/en/downloads` | 最新版本、系统与架构、官方下载、备用镜像、校验值、版本来源 |
| `/zh/install/windows`、`/en/install/windows` | Windows 新手安装步骤、第一次打开、常见拦截提示 |
| `/zh/install/macos`、`/en/install/macos` | macOS 12+ 通用安装包、安装和首次打开 |
| `/zh/install/linux`、`/en/install/linux` | Linux 源码构建说明；明确这不是官方图形化安装包教程 |
| `/zh/features`、`/en/features` | 按“能做什么、适合谁、当前限制”解释官方功能 |
| `/zh/compare/adobe`、`/en/compare/adobe` | Artcraft 与四个 Adobe 产品的事实对照表和选择建议 |
| `/zh/faq`、`/en/faq` | 下载失败、版本选择、系统要求、许可证、账号和安全提示 |
| `/zh/about`、`/en/about` | 本站是谁、如何更新资料、非官方声明、联系邮箱 |
| `/zh/contact`、`/en/contact` | 联系邮箱，以及报告链接或资料变化的方法 |
| `/zh/privacy`、`/en/privacy` | GA4、Cookie、广告、联系信息和外部链接说明 |
| `/zh/terms`、`/en/terms` | 使用条款、第三方链接免责声明、版本与兼容性免责声明 |
| `/robots.txt`、`/sitemap.xml`、`/ads.txt` | 搜索引擎、站点地图和 AdSense 所需文件 |

首版不做账号、评论、论坛、在线编辑器、云端生成、站内支付、会员、邮件订阅和复杂后台。

## 6. 下载页与备用镜像规则

下载页每个版本使用同一个信息卡：


- 版本号和发布日期。
- Windows、macOS、Linux 的支持方式。
- CPU 架构，例如 x64 或 arm64；没有官方说明时不猜。
- “官方下载”按钮，链接到 `getartcraft.com` 或 GitHub Releases。
- “备用镜像”按钮，只有镜像文件完成检查后才显示。
- 文件大小、SHA-256、上传日期、来源版本和许可证提示。
- “查看官方发布说明”按钮。

镜像文件不能直接放进 Vercel 代码仓库。推荐使用 Cloudflare R2 或同类对象存储，Vercel 页面只保存公开下载地址和元数据。镜像上线前必须完成：

1. 确认文件来自官方发布页，并记录来源 URL。
2. 检查官方许可证和 NOTICE 是否允许这样分发；无法确认时只放官方链接。
3. 计算 SHA-256，并在页面显示。
4. 用干净环境测试文件能下载、解压或安装。
5. 记录检查日期、文件大小和维护人。
6. 官方版本撤回、变更或许可证状态不明确时，立即隐藏镜像按钮。

这套规则能满足“官方链接 + 备用镜像”两个入口，同时避免把不明来源的安装包冒充官方文件。

## 7. 安装教程写法

教程要像带着新手操作一样写，每一步只做一个动作：

1. 先判断系统和 CPU 类型。
2. 说明应该点击官方稳定下载，还是查看 GitHub Releases。
3. 展示安装程序文件名或页面位置；版本号用“当前最新版本”，不要把旧版本写死成永久步骤。
4. 说明第一次打开可能看到的系统安全提示，并告诉用户如何确认来源。
5. 安装完成后只做一个最小测试，例如打开项目或生成一张测试图。
6. 出错时先回到官方发布说明，不让用户随意下载第三方修复包。

源码教程必须单独标记“开发者路线”，至少说明 Rust、Node.js、Tauri CLI 和官方脚本入口。不要让普通用户把源码构建当作最快安装方式。

## 8. Adobe 对比规则

对比页不是给 Adobe 打分，也不写“完全替代”。表格至少包含：

| 维度 | 要写什么 |
| --- | --- |
| 主要用途 | Artcraft 的互动 AI 图像/视频创作，与 Photoshop、Illustrator、Premiere Pro、After Effects 的核心工作不同 |
| 价格模式 | 只引用官方公开价格页，并写检查日期；不同国家价格可能不同 |
| 运行平台 | 只写官方资料明确支持的平台 |
| 上手难度 | 用“新手需要学习什么”解释，不用含糊的专业评分 |
| 适合谁 | 给出典型场景，例如 AI 视觉探索、修图、矢量设计、剪辑、特效 |
| 限制 | 说明 Artcraft 仍在快速更新，Adobe 功能、插件和生态不同 |

每个 Adobe 产品的价格和功能都要链接到官方页面。价格变化后更新表格，不复制第三方旧报价。

## 9. 技术方案

| 部分 | 选择 | 用途 |
| --- | --- | --- |
| 网站框架 | Next.js 16 App Router + TypeScript | 适合静态内容、SEO 和 Vercel |
| 样式 | 项目内置 CSS（`src/app/globals.css`） | 统一做中文、英文和手机布局，减少依赖 |
| 内容 | Next.js 页面组件 + TypeScript 内容数据 | 不需要数据库；修改文章后提交 GitHub 即可发布 |
| 双语 | `/zh` 与 `/en` 路由 | 页面网址清楚，方便搜索引擎收录 |
| 搜索 | 首版暂不提供站内搜索 | 先保证下载、教程和对比内容清楚；以后内容变多再增加搜索 |
| 下载镜像 | Cloudflare R2（或兼容对象存储） | 存放经许可和校验的安装包；Vercel 只提供页面 |
| 发布 | GitHub + Vercel | 推送主分支后自动构建 |
| 统计 | GA4 + Consent Mode | 只统计页面访问和按钮点击，不上传安装包或用户文件 |
| 搜索提交 | Google Search Console + Bing Webmaster | 验证域名并提交 sitemap |
| 广告 | Google AdSense | 审核通过后才加载广告代码 |

Next.js 页面以服务端静态内容为主；只有语言切换、关键词搜索、复制命令和同意提示需要浏览器交互。不要把安装包文件、用户信息或密钥传到页面脚本中。

## 10. 内容数据结构

每一条版本、功能和对比资料至少保留：

```ts
type SourceRecord = {
  sourceUrl: string;
  checkedAt: string; // YYYY-MM-DD
  note?: string;
};

type ReleaseEntry = {
  version: string;
  releasedAt: string;
  platform: 'windows' | 'macos' | 'linux';
  architecture?: string;
  officialUrl: string;
  mirrorUrl?: string;
  sha256?: string;
  sizeBytes?: number;
  source: SourceRecord;
};
```

页面正文使用 MDX；版本和下载信息使用数据文件，便于以后自动检查链接。每篇内容头部保留 `title`、`description`、`locale`、`updatedAt` 和 `sources`。

## 11. 搜索引擎与广告要求

- 所有核心页面有唯一标题、说明文字、规范网址和中英文互相指向的 `hreflang`。
- `sitemap.xml` 只列出真实可访问页面，不列测试页、镜像临时地址或重复语言页面。
- `robots.txt` 允许读取内容页面，禁止 `/api`、构建文件和管理路径。
- 首页、下载页和安装页加入 FAQ 或 Article 结构化数据时，内容必须与页面文字一致。
- 站内广告只在 AdSense 审核通过后开启；编辑、复制命令和下载按钮附近不放遮挡式广告。
- `ads.txt` 内容使用 AdSense 后台给出的原文，不手写猜测。
- GA4 默认只记录匿名页面浏览和按钮事件；先处理用户的 Cookie 选择。

## 12. 第一版明确不做

- 不在本网站运行 Artcraft，也不提供云端 AI 生成。
- 不创建 Artcraft 用户账号，不代用户登录官方服务。
- 不承诺 Adobe 兼容、法律结论、模型效果或安装成功率。
- 不把第三方破解包、修改版、未验证镜像列为下载。
- 不把官网或 GitHub 的商标、截图、视频复制成让人误解为官方的品牌页面。
- 不做自动抓取 GitHub 后直接发布；版本变化先人工核对来源和许可证。
- 不把 Google Search Console 验证、AdSense 申请和广告审核写成保证收录或保证获批。

## 13. 验收清单

### 内容与功能

- [ ] 中英文首页能互相切换，语言网址可直接打开。
- [ ] 下载页展示官方入口和至少一个经过校验的备用镜像，或明确显示“镜像暂未提供”。
- [ ] Windows、macOS、Linux 三套教程分别说明稳定下载和源码构建的区别。
- [ ] 功能页只引用官方 README，标有来源和检查日期。
- [ ] Adobe 对比页包含四个产品、价格来源日期和“非官方比较”声明。
- [ ] FAQ、隐私、条款、关于和联系页面可打开。
- [ ] 手机宽度下菜单、表格、代码块和下载按钮不溢出。

### 技术与上线

- [ ] `npm run typecheck` 通过。
- [ ] `npm run build` 通过。
- [ ] 页面标题、规范网址、`robots.txt`、`sitemap.xml`、`ads.txt` 正确。
- [ ] 官方下载链接、镜像链接和 SHA-256 可复核。
- [ ] Vercel 生产网址可访问，绑定域名和 HTTPS 正常。
- [ ] Google Search Console 域名验证成功，并提交 `sitemap.xml`。
- [ ] GA4 Realtime 能看到一次测试访问和下载点击事件（需在 Cookie 提示中同意可选统计后测试）。
- [x] Bing Webmaster 验证成功并收到 sitemap。
- [x] AdSense 网站已添加、验证成功并提交审核；广告单元等审核通过后再开启。

## 14. 维护节奏

每月检查一次：官方首页、GitHub README、Releases、源码安装说明、许可证/NOTICE、四个 Adobe 官方价格页和所有下载链接。Artcraft 发布新版本时，先更新版本数据和校验值，再更新安装教程中的截图或文字。

站点页脚显示“资料最后检查日期”。如果某个来源打不开，页面要显示“待官方页面恢复”或暂时隐藏按钮，不能继续显示过期下载。

