import Link from 'next/link'
import { ArrowUpRight, Terminal } from 'lucide-react'
import { PageIntro } from '@/components/site-shell'
import { OFFICIAL, SITE_URL, type Lang } from '@/lib/content'
import { LAUNCHER, type ReleaseInfo } from '@/lib/releases'

/**
 * /en/install/linux — "Install ArtCraft Launcher on Linux".
 *
 * Facts checked on LINUX_CHECKED_AT against the official craft-launcher repository:
 *  - README (Downloads › Linux, Where apps are installed, tray note)
 *  - packaging/linux/nfpm.yaml (deb/rpm runtime dependencies — the source of the library list)
 *  - packaging/linux/package.sh (static AppImage runtime: no libfuse2 needed)
 *  - packaging/linux/AppRun (Wayland icon integration) and the Flatpak bundle manifest
 *  - the release assets of the current version (formats per architecture)
 * The launcher is pure Rust/egui: no Electron, so there is no --no-sandbox flag to discuss.
 * The "build from source" section is about the ArtCraft AI app (_docs/dev_setup.md), not the launcher.
 */
export const LINUX_CHECKED_AT = '2026-10-27'
export const LINUX_TITLE = 'Install ArtCraft Launcher on Linux: AppImage, DEB, RPM & Flatpak'
export const LINUX_DESCRIPTION = 'How to install ArtCraft Launcher on Linux: which file to pick for x86_64, aarch64 or RISC-V, AppImage, .deb, .rpm and Flatpak commands, required libraries, known issues and checksum verification.'

const GH_LAUNCHER = 'https://github.com/storytold/craft-launcher'
const NFPM = `${GH_LAUNCHER}/blob/main/packaging/linux/nfpm.yaml`

const faq: Array<{ q: string; a: string }> = [
  {
    q: 'Is ArtCraft Launcher official?',
    a: 'Yes. It is published by the ArtCraft team in the storytold organization on GitHub (github.com/storytold/craft-launcher) and linked from getartcraft.com/apps. Its Windows and macOS builds are signed by Learning Machines, the company behind ArtCraft. It is open source under MIT or Apache-2.0 and currently in early alpha.',
  },
  {
    q: 'Is the Flatpak version different from the .deb version?',
    a: 'Yes. The program is byte-for-byte the same, but the Flatpak runs in a sandbox. It installs Craft apps on your system through flatpak-spawn --host, and if your system has no Flatpak it keeps apps inside its own sandbox folder instead. The .deb and .rpm install the launcher system-wide and can install apps as system packages. The official recommendation for Linux is the AppImage, .deb or .rpm.',
  },
  {
    q: 'Does ArtCraft Launcher run on RISC-V?',
    a: 'Yes, as a .deb, .rpm or .tar.gz built against Ubuntu 24.04, so it needs glibc 2.39 or newer. There is no AppImage or Flatpak for riscv64.',
  },
  {
    q: 'Do I need root to install it?',
    a: 'No, if you use the AppImage or the Flatpak with --user. Installing the .deb or .rpm needs sudo. Later, when the launcher installs a Craft app as a system package, it asks for your password through polkit (pkexec).',
  },
]

export function linuxJsonLd(lang: string) {
  const url = `${SITE_URL}/${lang}/install/linux`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Install ArtCraft Launcher on Linux',
      description: LINUX_DESCRIPTION,
      step: [
        { '@type': 'HowToStep', name: 'Pick the right file', text: 'Choose the file that matches your CPU architecture (x86_64, aarch64 or riscv64) and package format.' },
        { '@type': 'HowToStep', name: 'Verify the download', text: 'Check the file against SHA256SUMS.txt from the same GitHub release with sha256sum.' },
        { '@type': 'HowToStep', name: 'Install', text: 'Make the AppImage executable and run it, or install the .deb with apt, the .rpm with dnf, or the .flatpak with flatpak install --user.' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Artcraft Hub', item: `${SITE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Install on Linux', item: url },
      ],
    },
  ]
}

const Cmd = ({ children }: { children: string }) => (
  <div className="code-block linux-cmd"><Terminal size={14} /><code>{children}</code></div>
)

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children} <ArrowUpRight size={12} /></a>
)

export function LinuxInstallPage({ lang, launcher }: { lang: Lang; launcher: ReleaseInfo }) {
  const v = launcher.version
  const file = (suffix: string) => `artcraft-launcher-${v}-linux-${suffix}`
  const fileUrl = (suffix: string) => `${GH_LAUNCHER}/releases/download/v${v}/${file(suffix)}`
  const appImageX64 = launcher.files.find((f) => f.file.endsWith('-linux-x86_64.AppImage'))

  return (
    <div className="container page-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(linuxJsonLd(lang)).replace(/</g, '\\u003c') }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${lang}`}>Artcraft Hub</Link> <span>/</span> <span>Install on Linux</span></nav>
      <PageIntro
        lang={lang}
        eyebrow="LINUX / INSTALL"
        title="Install ArtCraft Launcher on Linux"
        description={`ArtCraft Launcher installs, updates and opens all 13 Craft apps. This guide covers the current version, v${v} (released ${launcher.publishedAt}), on x86_64, aarch64 and RISC-V. Last checked ${LINUX_CHECKED_AT}.`}
      />
      <div className="button-row">
        <a className="button button-dark" href={appImageX64?.url ?? LAUNCHER.releases} rel="noreferrer" data-ga-event="launcher_download">Download the x86_64 AppImage <ArrowUpRight size={16} /></a>
        <a className="text-link" href={LAUNCHER.releases} target="_blank" rel="noreferrer" data-ga-event="launcher_release_click">All Linux files on GitHub <ArrowUpRight size={15} /></a>
      </div>

      {/* 1. 30-second answer */}
      <section className="safe-answer linux-answer" aria-label="Short answer">
        <div className="safe-answer-row"><span className="linux-badge">1</span><div><h2>AppImage — the easiest.</h2><p>One file, any distro, no install and no root. Make it executable and run it.</p></div></div>
        <div className="safe-answer-row"><span className="linux-badge">2</span><div><h2>.deb or .rpm — managed by your system.</h2><p>Installs system-wide through apt or dnf, with a menu entry and clean removal.</p></div></div>
        <div className="safe-answer-row"><span className="linux-badge">3</span><div><h2>Flatpak — sandboxed, and it behaves differently.</h2><p>Runs in a sandbox and installs Craft apps in an unusual way. Read the Flatpak section before choosing it.</p></div></div>
      </section>

      <article className="prose safe-article">
        {/* 2. Which file */}
        <h2 id="which-file">Which file should you download?</h2>
        <p>Check your CPU architecture with <code>uname -m</code>. It prints <code>x86_64</code> on most PCs, <code>aarch64</code> on Arm boards and Arm laptops, and <code>riscv64</code> on RISC-V hardware. Then pick a format:</p>
        <div className="table-wrap safe-table">
          <table>
            <thead><tr><th>Format</th><th>x86_64</th><th>aarch64</th><th>riscv64</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td>.AppImage</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>—</td><td>Any distro, no install</td></tr>
              <tr><td>.AppImage.zsync</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>—</td><td>Delta updates with AppImageUpdate (not an installer)</td></tr>
              <tr><td>.deb</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>Debian, Ubuntu, Mint, Pop!_OS</td></tr>
              <tr><td>.rpm</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>Fedora, openSUSE, RHEL</td></tr>
              <tr><td>.flatpak</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>—</td><td>Sandboxed install</td></tr>
              <tr><td>.tar.gz</td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td><span className="safe-ok">Yes</span></td><td>Scripts and other distros (plain <code>bin/</code> and <code>share/</code> tree)</td></tr>
              <tr><td>Minimum glibc</td><td>2.35</td><td>2.35</td><td>2.39</td><td>Ubuntu 22.04+, Debian 12+, Fedora 36+ (riscv64: Ubuntu 24.04+)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="tiny-note">Releases also include an Arch Linux package (<code>.pkg.tar.zst</code>) for x86_64 and aarch64, which the official README doesn’t list. Check your glibc version with <code>ldd --version</code>.</p>

        {/* 3. AppImage */}
        <h2 id="appimage">Install with the AppImage</h2>
        <p>The AppImage is a single file that runs on almost any distro without installing anything. Download it, make it executable, and run it:</p>
        <Cmd>{`chmod +x ${file('x86_64.AppImage')}\n./${file('x86_64.AppImage')}`}</Cmd>
        <p>On an Arm machine, use the <code>aarch64</code> file instead. Keep the AppImage somewhere permanent, such as <code>~/Applications</code>: on first run it adds a menu entry and icons under <code>~/.local/share</code> that point to that path. If you move the file later, it updates them the next time it runs.</p>
        <h3>Do I need libfuse2?</h3>
        <p>No. Many AppImages fail on newer distros with an error about <code>libfuse.so.2</code>, because Ubuntu 22.04 and later no longer install libfuse2 by default. The ArtCraft Launcher AppImage is built with a statically linked AppImage runtime, so it doesn’t need libfuse2. The one exception is an environment with no FUSE at all, such as a Docker container. There, run it with:</p>
        <Cmd>{`./${file('x86_64.AppImage')} --appimage-extract-and-run`}</Cmd>
        <p>To update, use the launcher’s own <strong>Update and restart</strong>, which replaces the AppImage in place, or point AppImageUpdate at the <code>.zsync</code> file to download only what changed.</p>
        <p>To remove it, delete the AppImage. It also leaves a desktop entry and icons under <code>~/.local/share/applications</code> and <code>~/.local/share/icons</code>, plus its settings and logs in <code>~/.local/share/artcraft-launcher</code>. Delete those too if you want a clean removal. Craft apps you installed through the launcher are separate programs and stay installed.</p>

        {/* 4. deb / rpm */}
        <h2 id="deb-rpm">Install with .deb or .rpm</h2>
        <p>The .deb and .rpm packages put the launcher in <code>/usr/bin</code> and add a desktop entry, so your system’s package manager can update or remove it. Use the leading <code>./</code> so apt installs the local file instead of searching the repositories, and pulls in any missing libraries:</p>
        <p><strong>Debian, Ubuntu, Linux Mint, Pop!_OS</strong></p>
        <Cmd>{`sudo apt install ./${file('x86_64.deb')}`}</Cmd>
        <p><strong>Fedora, RHEL</strong> (on openSUSE, use <code>sudo zypper install</code> with the same file)</p>
        <Cmd>{`sudo dnf install ./${file('x86_64.rpm')}`}</Cmd>
        <p>Replace <code>x86_64</code> with <code>aarch64</code> or <code>riscv64</code> to match your machine. To remove the launcher later, run <code>sudo apt remove artcraft-launcher</code> or <code>sudo dnf remove artcraft-launcher</code>.</p>
        <p>The launcher can also update itself from inside the app: <strong>Update and restart</strong> downloads the new .deb or .rpm, checks it against the release checksum and installs it, asking for your password. Your package manager won’t find updates on its own, because these packages don’t come from a repository. Use the launcher’s update, or download the new file and install it the same way.</p>
        <p>The format you install the launcher with also decides how it installs Craft apps. Running from a .deb or .rpm, it prefers your distro’s own package format — .deb on Debian and Ubuntu, .rpm on Fedora and openSUSE — so the apps appear in your package manager too. Running as an AppImage, it installs apps as AppImages. You can change this under <strong>Settings › Installing on Linux › Install new apps as</strong>. Updates always use the format an app was installed with.</p>

        {/* 5. Flatpak */}
        <h2 id="flatpak">Install with Flatpak — and how it behaves</h2>
        <p>The Flatpak is a single-file bundle, not a Flathub listing, so install it from the downloaded file:</p>
        <Cmd>{`flatpak install --user ${file('x86_64.flatpak')}`}</Cmd>
        <p>The program inside is the same as in the AppImage and .deb, but the sandbox changes how it installs Craft apps. This is the part that surprises people:</p>
        <ul>
          <li><strong>If your system has Flatpak</strong> — the usual case — the launcher asks your system, through <code>flatpak-spawn --host</code>, to install each Craft app as its own Flatpak. The apps end up as normal Flatpaks on your system, outside the launcher’s sandbox.</li>
          <li><strong>If the host has no usable Flatpak</strong> — for example inside a container — it falls back to each app’s release tarball. It unpacks the tarball into its own folder, <code>~/.var/app/ai.storyteller.artcraft-launcher/data/artcraft-launcher/apps/&lt;app&gt;</code>, and runs the app inside the same sandbox, with that app’s settings in a <code>home/</code> folder beside it. Nothing is installed on your system, and those apps only appear inside the launcher.</li>
          <li><strong>It can’t install system packages.</strong> From the sandbox the launcher can’t install .deb or .rpm files, or anything that needs root. Those you install yourself.</li>
        </ul>
        <p>The sandbox is also less closed than people expect: the bundle can read and write your home folder, use the network, and talk to Flatpak itself. That last permission is effectively a way out of the sandbox, so the official README calls the AppImage, .deb and .rpm “the recommended way to run the launcher on Linux”. Choose the Flatpak only if you specifically want Flatpak management.</p>

        {/* 6. Requirements */}
        <h2 id="requirements">System requirements and libraries</h2>
        <p>ArtCraft Launcher is a native Rust app (egui), with no Electron or embedded browser. The program itself links only glibc and libgcc. Windowing (X11 or Wayland), keyboard handling and the GPU are loaded at runtime, so they aren’t detected automatically. The official <Ext href={NFPM}>.deb and .rpm packaging</Ext> lists them as dependencies:</p>
        <div className="table-wrap safe-table">
          <table>
            <thead><tr><th>What it’s for</th><th>Debian / Ubuntu package</th><th>Fedora / openSUSE (library)</th></tr></thead>
            <tbody>
              <tr><td>C runtime</td><td>libc6 (≥ 2.35), libgcc-s1</td><td>glibc, libgcc</td></tr>
              <tr><td>Keyboard layouts</td><td>libxkbcommon0, libxkbcommon-x11-0</td><td>libxkbcommon.so.0, libxkbcommon-x11.so.0</td></tr>
              <tr><td>Wayland</td><td>libwayland-client0</td><td>libwayland-client.so.0</td></tr>
              <tr><td>X11</td><td>libx11-6, libx11-xcb1, libxcb1, libxcursor1, libxi6</td><td>libX11.so.6, libX11-xcb.so.1, libxcb.so.1, libXcursor.so.1, libXi.so.6</td></tr>
              <tr><td>GPU (one of)</td><td>libvulkan1 or libegl1</td><td>libvulkan.so.1 or libEGL.so.1</td></tr>
              <tr><td>Recommended</td><td>mesa-vulkan-drivers, libegl-mesa0, xdg-desktop-portal</td><td>mesa-vulkan-drivers, xdg-desktop-portal</td></tr>
            </tbody>
          </table>
        </div>
        <p>If you install the .deb or .rpm, these come in automatically. With the AppImage or .tar.gz, a normal desktop install almost always has them already. On a minimal system, install them from this list. The tray icon and notifications use D-Bus directly, so GTK and libappindicator aren’t needed.</p>

        {/* 7. Known issues */}
        <h2 id="known-issues">Four known issues</h2>
        <ol className="linux-issues">
          <li>
            <strong>The icon is missing or shows a generic Wayland logo.</strong> On Wayland, the dock looks up a window’s icon from an installed desktop entry, and a plain AppImage installs none. The launcher’s AppImage adds the entry and icons to <code>~/.local/share</code> on its first run, so start it once from its permanent location. If you set <code>ARTCRAFT_LAUNCHER_NO_DESKTOP_INTEGRATION=1</code> (or an AppImage manager sets <code>DESKTOPINTEGRATION=1</code>), this step is skipped and the icon stays generic.
          </li>
          <li>
            <strong>No tray icon on GNOME.</strong> The tray uses the StatusNotifierItem standard. KDE, Xfce, Cinnamon and most other desktops show it, but stock GNOME doesn’t. Install the AppIndicator extension (on Ubuntu it is usually already enabled; elsewhere, install “AppIndicator and KStatusNotifierItem Support”). The launcher still works without a tray icon.
          </li>
          <li>
            <strong>The window doesn’t open: missing GPU libraries.</strong> The launcher needs Vulkan or EGL. On minimal installs, virtual machines or headless setups without them, it can fail to open a window. Install <code>mesa-vulkan-drivers</code> and <code>libegl1</code> (Debian/Ubuntu) or <code>mesa-vulkan-drivers</code> (Fedora), or the vendor driver for your GPU. Then check the log at <code>~/.local/share/artcraft-launcher/logs/artcraft-launcher.log</code>. Running it with <code>RUST_LOG=debug</code> records more detail.
          </li>
          <li>
            <strong>A Craft app fails to install.</strong> If you run the Flatpak version, check Flatpak first. Is <code>flatpak</code> installed on the host, and can it install user Flatpaks? Without a usable host Flatpak, apps go into the sandbox instead (see the Flatpak section). With the .deb or .rpm version, system installs ask for your password through polkit (<code>pkexec</code>). If polkit isn’t installed, the launcher can’t install apps system-wide.
          </li>
        </ol>

        {/* 8. Verify */}
        <h2 id="verify">Verify your download</h2>
        <p>Every release includes a <code>SHA256SUMS.txt</code> file. Download it into the same folder as your file and run:</p>
        <Cmd>{`sha256sum --check --ignore-missing SHA256SUMS.txt`}</Cmd>
        <p>You should see your file name followed by <code>OK</code>. Our <Link href={`/${lang}/downloads#launcher`}>official ArtCraft Launcher downloads</Link> also list each file’s SHA-256 digest, as published by GitHub. For why this matters, see <Link href={`/${lang}/is-artcraft-safe`}>Is ArtCraft safe to download and use?</Link></p>

        {/* 9. Build from source (demoted) */}
        <h2 id="build-from-source">Build the ArtCraft AI app from source</h2>
        <p>This section is for developers and is about a different program. The <strong>ArtCraft AI app</strong> (the AI image and video studio) has no ready-made Linux package. Its official downloads are Windows and macOS only, so on Linux you build it from source. The launcher above does not install or manage it.</p>
        <ol>
          <li>Install Rust, Node.js (version 20 or newer) and the Tauri CLI, following the versions in the <Ext href={OFFICIAL.setup}>official developer setup guide</Ext>.</li>
          <li>Clone <code>github.com/storytold/artcraft</code> and, from the repository, run the combined Unix script. It starts the frontend and the Rust/Tauri app together:</li>
        </ol>
        <Cmd>{`./script/artcraft/unix_dev.sh`}</Cmd>
        <p>The build works when a desktop window opens and the frontend appears. If compilation fails, check the official guide first, because the required versions change.</p>

        {/* 10. FAQ */}
        <h2 id="faq">FAQ</h2>
      </article>
      <div className="faq-list linux-faq">{faq.map(({ q, a }) => (
        <details className="faq-item" key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}</div>

      <div className="source-box comparison-sources">
        <div>
          <strong>Sources</strong>
          <p>
            <Ext href={`${GH_LAUNCHER}#downloads`}>ArtCraft Launcher README — Downloads</Ext> · <Ext href={NFPM}>deb/rpm packaging (dependencies)</Ext> · <Ext href={LAUNCHER.releases}>Launcher releases</Ext> · <Ext href={OFFICIAL.setup}>ArtCraft AI app developer setup</Ext>
          </p>
          <p className="tiny-note">File names and the version update automatically from the latest GitHub release. Formats, commands and libraries were checked against the official repository on {LINUX_CHECKED_AT}. This site is independent from ArtCraft.</p>
        </div>
      </div>
    </div>
  )
}
