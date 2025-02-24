# useLocation フックについて

## 概要
`useLocation`は`@reach/router`ライブラリから提供されるReactフックで、現在のURLに関する情報を取得するために使用されます。

## 返却値
`useLocation`は以下のプロパティを持つオブジェクトを返します：

- `pathname`: 現在のパス（例：`/blog`）
- `search`: クエリ文字列（例：`?page=2&category=tech`）
- `hash`: URLのハッシュ部分（例：`#section1`）
- `state`: ナビゲーション時に渡された状態オブジェクト

## 使用例
```javascript
const location = useLocation()

// クエリパラメータの取得
import queryString from "query-string"
const { page = 1 } = queryString.parse(location.search)

// ハッシュの取得
const currentSection = location.hash.replace('#', '')

// パスの取得
const currentPath = location.pathname
```