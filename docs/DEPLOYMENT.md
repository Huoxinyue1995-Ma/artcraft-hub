# Artcraft Hub 部署文档

目标：从独立项目目录部署到 Vercel，绑定用户提供的域名，让网站能被 Google 和 Bing 发现，接入 GA4，并提交 Google AdSense 申请。

本项目是新项目。以下命令都在 `artcraft-hub` 目录执行，不要在旧图片工具目录执行。

当前项目已经创建：GitHub 仓库为 <https://github.com/Huoxinyue1995-Ma/artcraft-hub>，Vercel 项目为 <https://vercel.com/emma-8abb/artcraft-hub>，预览地址为 <https://artcraft-hub-theta.vercel.app/zh>。下面的步骤仍然保留完整流程，方便以后复用或交接。

截至本次整理，代码、GitHub 仓库、Vercel 项目、根域名 `artcraftphotocraft.space`、Google Search Console、GA4、Bing Webmaster 和 AdSense 申请流程均已接通。Google 的 `sitemap.xml` 已提交成功并发现 24 个网址；Bing 已验证网站并提交同一 sitemap。`www` 子域名仍需补充 CNAME（可选）。AdSense 审核由 Google 后台继续处理，广告是否最终获批不由部署决定。

当前上线状态快照：

| 项目 | 当前状态 |
| --- | --- |
| GitHub | 公开仓库 `Huoxinyue1995-Ma/artcraft-hub`，主分支已推送 |
| Vercel | 最新生产部署 Ready，根域名已接到 Production |
| 正式域名 | `https://artcraftphotocraft.space` 作为主地址；`www` CNAME 尚未配置 |
| Google Search Console | URL 前缀资源已用 HTML 标记验证 |
| Google sitemap | `/sitemap.xml` 提交成功，已发现 24 个网址 |
| GA4 | 已接入 `G-5D1QDLHCF2`，生产环境已部署 |
| Bing | 已验证 `artcraftphotocraft.space`，已提交 `https://artcraftphotocraft.space/sitemap.xml` |
| AdSense | 已添加网站、元标记验证并提交审核；后台显示“正在准备” |

## 0. 先准备好这些东西

- GitHub 账号和一个新的仓库，例如 `artcraft-hub`。
- Vercel 账号，可以用 GitHub 登录。
- 用户已有域名 `artcraftphotocraft.space`，以及域名平台的 DNS 修改权限。
- 一个 Google 账号，用于 Search Console、GA4 和 AdSense。
- 一个 Bing Webmaster 账号，或准备使用 Search Console 导入。
- 以后存放备用安装包的对象存储账号（推荐 Cloudflare R2）。

不要把 Google 密码、验证码、AdSense 付款资料、R2 密钥或其他私密信息写进 GitHub，也不要发到聊天里。

## 1. 在电脑上安装工具

### 1.1 安装 Node.js

打开 Node.js 官网，安装当前 LTS 版本。推荐使用 Node.js 20.9 或更高的 LTS 版本。

安装完成后，打开终端执行：

```bash
node -v
npm -v
```

看到版本号就表示安装成功。若 `node` 找不到，关闭终端并重新打开；仍然找不到时，重新安装 Node.js。

### 1.2 进入新项目目录

```bash
cd "/Users/laohuo/Documents/ChatGPT/seo的尝试/artcraft-hub"
npm install
```

项目代码已经在独立目录中，不需要重新创建应用。不要把旧项目的 Stripe、图片上传或图片编辑代码复制进来。

## 2. 配置网站地址和统计编号

在项目根目录创建 `.env.local`。这个文件只放在自己电脑上，不提交到 GitHub：

```bash
NEXT_PUBLIC_SITE_URL=https://artcraftphotocraft.space
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_DOWNLOAD_MIRROR_BASE_URL=https://download.你的域名.com
```

说明：

- 本项目当前的正式主地址是 `https://artcraftphotocraft.space`。如果以后决定把 `www` 作为主地址，必须同步修改这个变量和 Vercel 的主域名设置。
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` 在 GA4 数据流建立后填写。
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 是 Search Console 选择 URL-prefix 属性时提供的 HTML meta 验证值；使用 Domain 属性并完成 DNS TXT 验证时可以留空。
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` 是 Bing Webmaster 提供的 `msvalidate.01` 值；如果从 Search Console 导入或使用 DNS 验证，可以留空。
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 只有 AdSense 审核通过后才填写并开启广告组件；审核前不要加载广告脚本。
- `NEXT_PUBLIC_DOWNLOAD_MIRROR_BASE_URL` 指向对象存储的公开下载域名。没有完成镜像检查时可以留空，页面隐藏备用镜像按钮。
- 公开变量会进入网页代码，不能把 R2 Secret Access Key、GitHub Token 或其他密钥放到 `NEXT_PUBLIC_` 变量中。

## 3. 本地检查网站

在项目目录运行：

```bash
npm run typecheck
npm run build
npm run dev
```

浏览器打开终端显示的本地地址，一项一项检查：

1. 中文和英文首页能切换。
2. 下载页的官方链接能打开，备用镜像按钮只在有真实文件时出现。
3. Windows、macOS、Linux 教程中的链接和代码块可复制。
4. Adobe 对比表在手机上可以横向阅读或自动换行。
5. `/robots.txt`、`/sitemap.xml`、`/ads.txt` 能打开。
6. 浏览器开发者工具中没有请求用户文件、私密密钥或不存在的 API。

`npm run build` 成功后，才进入 GitHub 和 Vercel 步骤。

## 4. 准备 GitHub 仓库

在 GitHub 新建一个空仓库，例如 `artcraft-hub`，不要勾选自动生成 README（本项目已有 README）。在项目目录执行：

```bash
git init
git add README.md docs package.json next.config.ts tsconfig.json next-env.d.ts src public components lib .env.example
git commit -m "Create Artcraft Hub content site"
git branch -M main
git remote add origin https://github.com/你的账号/artcraft-hub.git
git push -u origin main
```

本项目实际使用的远程地址是：

```text
https://github.com/Huoxinyue1995-Ma/artcraft-hub.git
```

如果本地已经生成了 `package-lock.json`，确认内容后再单独加入；当前项目可以直接按 `package.json` 安装。不要使用没有检查范围的 `git add .`，避免把 `.env.local`、截图、安装包和本地输出上传。

以后更新内容：

```bash
git add docs src public components lib package.json next.config.ts tsconfig.json next-env.d.ts .env.example
git commit -m "Update Artcraft release information"
git push origin main
```

## 5. 在 Vercel 创建网站

1. 登录 Vercel，点击 **Add New → Project**。
2. 选择新的 `artcraft-hub` GitHub 仓库。
3. 框架选择 Next.js，根目录选择 `artcraft-hub`（如果仓库本身就是该目录则保持根目录）。
4. 在 **Environment Variables** 加入：

   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`（只有选择 URL-prefix + HTML meta 验证时才需要）
   - `NEXT_PUBLIC_BING_SITE_VERIFICATION`（只有选择 Bing HTML meta 验证时才需要）
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`（审核通过后）
   - `NEXT_PUBLIC_DOWNLOAD_MIRROR_BASE_URL`（镜像准备好后）

5. 点击 **Deploy**。

部署成功的判断：Vercel 显示绿色部署状态，打开 Vercel 临时网址能看到首页，下载页链接可以点击，页面没有构建错误。

以后推送到 `main` 会自动触发新的部署。构建失败时，先在本地重新运行 `npm run build`，修复同一错误后再推送。

## 6. 绑定已有域名

1. 在 Vercel 项目打开 **Settings → Domains**。
2. 输入用户已有的正式域名，点击 **Add**。
3. Vercel 会显示当前需要的 DNS 记录。以 Vercel 页面为准，不要照抄旧教程中的固定 IP。
4. 打开域名注册商的 DNS 设置，按 Vercel 给出的名称和值添加记录。常见情况是根域名使用 `A` 记录，`www` 使用 `CNAME`，但最终记录以 Vercel 页面为准。
5. 等待 Vercel 显示已验证。DNS 更新可能需要几分钟到数小时。
6. 在 Vercel 把 `artcraftphotocraft.space` 设为主要地址；如果同时添加 `www.artcraftphotocraft.space`，让另一个地址自动跳转。
7. 更新 `NEXT_PUBLIC_SITE_URL` 为主要地址，重新部署。

本次项目在 Vercel 中显示的记录（如果 Vercel 页面后来给出新值，以新值为准）是：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `3a38d4486d12f35d.vercel-dns-017.com.` |

如果注册商自动补全域名后缀，名称只填写 `@` 和 `www`，不要再写完整域名。删除与旧主机冲突的 A、AAAA 或 CNAME 记录后保存。当前根域名已经接到 Vercel Production，可直接访问；`www` 只有在保存上面的 CNAME 后才会通过 Vercel 验证。

用电脑网络和手机流量分别打开正式域名，确认：

- 地址栏有 HTTPS 锁图标。
- 根域名和 `www` 只有一个主要地址，另一个会跳转。
- `/robots.txt` 和 `/sitemap.xml` 中使用的是正式域名。

## 7. 申请并验证 Google Search Console

推荐使用“域名属性”，这样可以同时覆盖根域名和 `www`。

1. 打开 [Google Search Console](https://search.google.com/search-console/) 并登录 Google 账号。
2. 点击 **Add property**，选择 **Domain**。
3. 输入 `artcraftphotocraft.space` 这种纯域名，不要输入 `https://` 或页面路径。
4. Google 会显示一条 TXT 记录。
5. 到域名注册商的 DNS 设置添加这条 TXT 记录，名称和值完全照抄。
6. 回到 Search Console 点击 **Verify**。
7. 验证成功后保留 TXT 记录，不要删除。

验证成功的判断：Search Console 显示该域名已验证，且当前 Google 账号列为所有者。

如果暂时不能修改 DNS，也可以在 Search Console 选择 **URL-prefix** 属性并选择 HTML 标记验证：把 Google 给出的值填入 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`，推送并等待 Vercel 部署后，再回到 Search Console 点击 **Verify**。Bing 的 HTML meta 验证同理，把值填入 `NEXT_PUBLIC_BING_SITE_VERIFICATION`。

## 8. 提交站点地图

先在无痕窗口打开：

```text
https://artcraftphotocraft.space/sitemap.xml
```

能看到 XML 内容后，进入 Search Console 的 **Sitemaps**：

1. 在 **Add a new sitemap** 中填写 `sitemap.xml`。
2. 点击 **Submit**。
3. 状态显示 **Success** 即表示 Google 已收到站点地图。

站点地图提交不代表马上收录或马上有排名。上线完成只要求提交成功，收录和排名作为后续观察工作。

## 9. 配置 GA4

1. 打开 [Google Analytics](https://analytics.google.com/)，创建 GA4 属性。
2. 创建 Web 数据流，填写正式域名。
3. 复制形如 `G-XXXXXXXXXX` 的 Measurement ID。
4. 把它填入 Vercel 的 `NEXT_PUBLIC_GA_MEASUREMENT_ID`，重新部署。
5. 在网站接受统计 Cookie 后，打开 GA4 的 **Realtime**，访问首页、下载页和一个外部下载按钮。
6. 确认能看到页面访问，以及例如 `official_download_click`、`mirror_download_click`、`language_switch` 这类不包含文件内容的事件。

GA4 不应记录安装包内容、用户电脑文件、账号密码或 URL 中的密钥。隐私页要说明统计用途，并提供拒绝非必要 Cookie 的入口。

## 10. 提交 Bing sitemap

推荐在 [Bing Webmaster Tools](https://www.bing.com/webmasters/) 使用 **Import from Google Search Console**，这样可以减少重复验证。

如果无法导入：

1. 用同一个网站域名创建 Bing 站点。
2. 按 Bing 显示的方法完成 DNS、HTML 文件或 Meta 标签验证。
3. 进入 **Sitemaps**，提交 `https://artcraftphotocraft.space/sitemap.xml`。

看到 sitemap 状态为已提交或成功读取，就完成 Bing 这一步。

## 11. 准备 Google AdSense

本项目选择的是 AdSense（在网站展示广告赚钱），不是 Google Ads（花钱推广网站）。

申请前先完成：

- 正式域名和 HTTPS。
- 首页、下载、安装、功能、对比、关于、联系、隐私、条款页面。
- 每篇内容有原创说明和官方来源，不是把 GitHub README 原文整段复制。
- 真实的联系邮箱和隐私政策。
- `ads.txt` 路径已预留；AdSense 后台给出内容后，把原文放入 `public/ads.txt`。

申请步骤：

1. 打开 [Google AdSense](https://www.google.com/adsense/) 并使用真实资料申请。
2. 添加正式网站，按后台要求完成网站验证。
3. 把 AdSense 给出的验证代码按要求加入站点，重新部署。
4. 在后台提交审核，等待 Google 结果。
5. 审核通过后，再填写 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 并打开广告组件。
6. 广告不要遮挡导航、代码复制、安装步骤或下载按钮。

审核是否通过由 Google 决定。不要点击自己的广告、不要诱导用户点击，也不要在审核前显示假的广告占位。

## 12. 配置备用安装包镜像

Vercel 适合部署网页，不适合存放经常更新的大型安装包。镜像采用对象存储：

1. 创建 Cloudflare R2 bucket，例如 `artcraft-downloads`。
2. 为 bucket 配置只读公开域名，例如 `download.artcraftphotocraft.space`。
3. 从官方 GitHub Releases 或官方站点下载指定版本文件。
4. 检查许可证、NOTICE、文件来源、大小和 SHA-256。
5. 上传到带版本号的路径，例如 `artcraft/v0.41.0/windows/x64/installer.exe`。
6. 在项目数据文件中填入公开地址、大小、SHA-256、来源 URL 和检查日期。
7. 用无痕窗口测试下载和校验值，再提交 GitHub 触发 Vercel 部署。

如果许可证、来源或校验值有任何疑问，隐藏镜像按钮，只保留官方下载按钮。镜像文件不是 Vercel 部署成功的替代条件；网站必须先有可用的官方入口。

## 13. 最终上线验收

按顺序勾选：

- [x] `npm run typecheck` 成功。
- [x] `npm run build` 成功。
- [x] Vercel 生产部署成功。
- [x] 正式域名可打开，HTTPS 正常。
- [x] 中文、英文核心页面可打开。
- [x] 官方下载、源码教程和 Adobe 官方来源链接可打开。
- [x] 备用镜像未提供时，页面明确说明暂未提供镜像。
- [x] `/robots.txt`、`/sitemap.xml`、`/ads.txt` 可访问。
- [x] Search Console URL-prefix 资源验证成功。
- [x] Search Console 的 `sitemap.xml` 已提交并发现 24 个网址。
- [ ] GA4 Realtime 看得到测试访问和点击事件（需要在 Cookie 提示中同意可选统计后再测）。
- [x] Bing Webmaster 已验证并提交 sitemap。
- [x] AdSense 网站已添加、元标记验证成功并已提交审核；广告单元仍等待审核结果。

完成这些项目后，才算达到“功能可用 → Vercel → 域名 → 可访问 → Search Console → 广告申请 → sitemap → GA4 → Bing”的目标。

## 14. 常见问题

### Vercel 构建失败

在本地运行 `npm run build`，先修复本地同样的报错。重点检查 MDX 文件格式、环境变量名称和中英文路由是否重复。

### 域名一直未验证

回到 Vercel Domains 页面重新查看当前 DNS 记录。确认 DNS 记录名称没有多余域名后缀，也没有与旧网站冲突的记录。DNS 生效需要时间。

### Search Console 无法验证

确认使用的是 Domain 属性，TXT 记录完整保留，且添加到了正确的 DNS 平台。不要把 `https://` 写进 Domain 属性输入框。

### Sitemap 提交失败

先直接打开正式域名的 `/sitemap.xml`。如果打不开，检查 `NEXT_PUBLIC_SITE_URL` 和 Vercel 部署；如果能打开，再回到 Search Console 提交。

### AdSense 代码放了但没有广告

先确认网站已经通过审核、`ads.txt` 内容来自 AdSense 后台、广告脚本只在生产域名加载。广告展示本身可能需要等待 Google 的审核和投放。

### Artcraft 新版本发布后下载页过时

打开官方 Releases，核对版本、系统、架构、文件名、大小和 SHA-256，更新版本数据和页面检查日期，再推送到 `main`。不要直接把第三方镜像文件替换成新版本。
