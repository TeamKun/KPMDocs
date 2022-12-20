// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight")
const darkCodeTheme = require("prism-react-renderer/themes/vsDark")
const kpmtoml = require("./config/kpmtoml").project

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: kpmtoml.project.name,
  tagline: "最も高度な PaperMC プラグイン管理ツール",
  url: "https://example.com/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/kpm.png",

  clientModules: [
    require.resolve("@fontsource/jetbrains-mono/index.css"),
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: kpmtoml.project.name,
        logo: {
          alt: `${kpmtoml.project.short_name} Logo Logo`,
          src: "img/kpm.png",
        },
        items: [
          {
            type: "doc",
            docId: "home",
            position: "left",
            label: "ホーム",
          },
          {
            type: "doc",
            docId: "use-kpm/getting-started/install",
            position: "left",
            label: "KPMを使い始める",
          },
          {
            href: kpmtoml.project.version.url,
            position: "right",
            label: "ダウンロード"
          },
          {
            href: kpmtoml.project.url,
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
                label: `${kpmtoml.project.short_name}を使い始める`,
                to: "/docs/getting-started/",
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
            title: kpmtoml.project.short_name,
            items: [
              {
                label: "GitHub",
                href: kpmtoml.project.url,
              },
              {
                label: "バグを報告",
                href: `${kpmtoml.project.url}/issues/new?template=bug_report.yml`,
              },
              {
                label: "機能をリクエスト",
                href: `${kpmtoml.project.url}/issues/new?template=feature_request.yml`,
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
    })
}

module.exports = config
