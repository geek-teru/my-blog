## Gatsbyとは
* Gatsbyとは爆速なサイトを手軽に構築するためのReact製のフレームワーク。
* 爆速という部分がポイントで、リクエストが来るたびにbackendへのデータ取得をするのではなく、静的なページを事前に作成しておく。「静的サイトジェネレーター(SSG)」

## Gatsbyのディレクトリ構成
```
my-blog/
├── content/          # ブログ記事のマークダウンファイルを格納
│   └── blog/        # 実際の記事ファイルとアセット
├── src/             # ソースコードディレクトリ
│   ├── components/  # Reactコンポーネント
│   ├── pages/       # ページコンポーネント
│   ├── templates/   # ブログ記事テンプレート
│   └── styles/      # CSSスタイル
├── static/          # 静的ファイル（画像など）
├── gatsby-config.js # Gatsbyの設定ファイル
├── gatsby-node.js   # Gatsbyのビルド設定
└── package.json     # プロジェクトの依存関係
```

## GatsbyのReactコンポーネント
```
src/components/
├── bio.js           # プロフィール情報を表示するコンポーネント
├── layout.js        # ページの共通レイアウトを定義
├── seo.js           # SEO関連のメタタグを管理
└── header.js        # サイトヘッダーのナビゲーション
```

主な役割：
* bio.js: 
  - ブログ著者のプロフィール情報を表示
  - アバター画像、名前、自己紹介文を管理
  - SNSリンクの表示

* layout.js:
  - すべてのページで共通して使用されるレイアウト
  - ヘッダー、フッター、メインコンテンツの配置
  - グローバルスタイルの適用

* seo.js:
  - ページごとのメタタグを動的に生成
  - OGP（Open Graph Protocol）の設定
  - Twitterカードの設定

* header.js:
  - サイトのナビゲーションメニュー
  - ロゴやサイトタイトルの表示
  - レスポンシブなハンバーガーメニュー

```
pages/index.js または templates/blog-post.js
└── components/layout.js
    └── components/header.js
    └── children (メインコンテンツ)
        ├── components/bio.js
        └── ブログ記事コンテンツ
```

## ページ読み込みの流れ
`gatsby-source-filesystem`や`gatsby-transformer-remark`などのプラグインを使用して、マークダウンファイルを読み込んでGraphQLスキーマに変換する。

```
graph TD
    A[content/blog/*.md] --> B[gatsby-source-filesystem]
    B --> C[gatsby-transformer-remark]
    C --> D[GraphQLスキーマ]
    D --> E[Reactコンポーネント]
    E --> F[ブラウザ表示]
```

## ビルド処理の流れ

Gatsbyのビルドプロセスは以下のステップで進行します：

1. **データの取得**:
   - `gatsby-source-filesystem`プラグインを使用して、`content/blog`ディレクトリ内のMarkdownファイルを読み込みます。
   - `gatsby-transformer-remark`プラグインを使用して、MarkdownファイルをGraphQLノードに変換します。

2. **GraphQLスキーマの生成**:
   - 取得したデータをもとに、GraphQLスキーマが自動的に生成されます。

3. **ページの生成**:
   - `gatsby-node.js`内の`createPages` APIを使用して、Markdownデータからブログ投稿ページを動的に生成します。
   - 各ページは、指定されたテンプレートとコンテキストデータを使用して作成されます。

4. **静的ファイルの生成**:
   - すべてのページが静的なHTMLファイルとして生成され、`public`ディレクトリに出力されます。

5. **最適化**:
   - 生成されたファイルは、パフォーマンス向上のために最適化されます。これには、CSSやJavaScriptの圧縮、画像の最適化などが含まれます。

このプロセスにより、Gatsbyは高速でSEOに優れた静的サイトを生成します。


