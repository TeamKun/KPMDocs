import DocCard from "@theme/DocCard";

# エイリアス

プラグインのリリースまたはプラグイン自体に別名を付けられる機能です。

---

## このページの前提要件

| 要件名 | 要件 | 摘要 |
| :--- | :-- | :---- |
| TeamKUNPluginManager | alpha-0.1a+ | KPM をまだインストールしていない方は[こちら](/docs/use-kpm/getting-started/install.mdx)。 |
| リモートサーバ/リポジトリ | 必須 | `json` ファイルをアップロードできる HTTP サーバ/ GitHub リポジトリが必要です。 |


### ステップ 1：エイリアスを定義する JSON を記述します。

```json
{
    "エイリアス名": "ダウンロードURLまたはクエリ",
    "steal": "https://github.com/TeamKun/StealPlugin",
    "a": "https://example.com/ExamplePlugin-1.0.jar"
}
```

### ステップ 2：サーバまたはリポジトリにアップロードします。

### ステップ 3：KPM にエイリアスデータセットを追加します

`config.yml` の以下の箇所を追記 / 編集します。
```yaml
#19行目
config:
  - name: "エイリアスの一意の名前"
    url: "エイリアスの直リンク"
    auth: false # GitHubのプライベートリポジトリでエイリアスを管理する場合はtrueにセットしてください。
```

### ステップ 4：サーバを再起動します。

### ステップ 5：プラグイン定義ファイルをアップデートする

`/kpm update` コマンドを実行して、プラグイン定義ファイルをアップデートして変更を適用します。
