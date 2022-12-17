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
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/kpm.png",

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
      ({
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "TeamKUNPluginManager",
        logo: {
          alt: "KPM Logo Logo",
          src: "img/kpm.png",
        },
        items: [
          {
            type: "doc",
            docId: "kpm",
            position: "left",
            label: "KPMとは?",
          },
          {
            href: "https://github.com/TeamKun/TeamKUNPluginManager/releases",
            position: "right",
            label: "ダウンロード"
          },
          {
            href: "https://github.com/TeamKUN/TeamKUNPluginManager",
            position: "right",
            className: "icon-link i-github"
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "ドキュメント",
            items: [
              {
                label: "KPMとは?",
                to: "/docs/kpm",
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
                href: "https://github.com/TeamKun/TeamKUNPluginManager/issues/new?template=bug_report.yml",
              },
              {
                label: "機能をリクエスト",
                href: "https://github.com/TeamKun/TeamKUNPluginManager/issues/new?template=feature_request.yml",
              },
            ],
          },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()} <a href="https://github.com/TeamKUN">TeamKUN</a>., <a href="https://peya.tokyo/">Peyang</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
