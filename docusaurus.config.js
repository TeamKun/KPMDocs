// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight")
const darkCodeTheme = require("prism-react-renderer/themes/vsDark")


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TeamKUNPluginManager",
  tagline: "最も高度な PaperMC プラグイン管理ツール",
  url: "https://example.com/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/kpm.png",

  clientModules: [
    require.resolve("@fontsource/jetbrains-mono/index.css"),
    require.resolve("@fortawesome/fontawesome-free/css/all.min.css"),
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "teamkun", // Usually your GitHub org/user name.
  projectName: "kpmdocs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/TeamKUN/KPMDocs/edit/main/",

          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
      require.resolve("docusaurus-plugin-image-zoom"),
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "TeamKUNPluginManager",
        logo: {
          alt: `KPM Logo`,
          src: "img/kpm.png",
        },
        items: [
          {
            to: "/docs/home",
            position: "left",
            label: "ホーム",
          },
          {
            to: "/docs/use-kpm/getting-started",
            position: "left",
            label: "KPMを使い始める",
          },
          {
            to: "/docs/use-kpm/commands",
            position: "left",
            label: "コマンド一覧",
          },
          {
            to: "/docs/expressions",
            position: "left",
            label: "用語集",
          },
          {
            href: "https://github.com/TeamKUN/TeamKUNPluginManager/releases",
            position: "right",
            label: "ダウンロード"
          },
          {
            href: "https://github.com/TeamKUN/TeamKUNPluginManager",
            position: "right",
            className: "icon-link i-github"
          },
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "ドキュメント",
            items: [
              {
                label: "ホーム",
                to: "/docs/home",
              },
              {
                label: `KPM を使い始める`,
                to: "/docs/getting-started",
              },
            ],
          },
          {
            title: "開発者 - Peyang",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/PeyaPeyaPeyang",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/peyang9799",
              },
              {
                label: "Email",
                href: "mailto:peyang@peya.tokyo"
              },
            ],
          },
          {
            title: "KPM",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/TeamKUN/TeamKUNPluginManager",
              },
              {
                label: "バグを報告",
                href: `https://github.com/TeamKUN/TeamKUNPluginManager/issues/new?template=bug_report.yml`,
              },
              {
                label: "機能をリクエスト",
                href: `https://github.com/TeamKUN/TeamKUNPluginManager/issues/new?template=feature_request.yml`,
              },
            ],
          },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()} <a href="https://github.com/TeamKUN">KUN Development Team</a>., <a href="https://peya.tokyo/">Peyang</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        background: {
          light: 'rgba(0, 0, 0, 0.6)',
          dark: 'rgba(0, 0, 0, 0.6)'
        }
      }

    })
}

module.exports = config
