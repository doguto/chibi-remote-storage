---
marp: true
theme: default
size: 16:9
paginate: true
header: 分散ファイルシステム 設計 中間報告
style: |
  section {
    font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;
    font-size: 26px;
  }
  section.lead h1 {
    font-size: 56px;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
  }
  section p:has(> img) {
    text-align: center;
  }
  section.api {
    font-size: 24px;
  }
  section.api h3 {
    margin: 0 0 0.65em;
    font-size: 27px;
  }
  section.api p {
    margin: 0.65em 0 0.25em;
  }
  section.api ul {
    margin: 0;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: "" -->

# 分散ファイルシステム 設計
## 中間報告

東儀 隆弘
詹 栄盛

---

# ファイル共有: Session semantics

- `open` でファイルをキャッシュにコピー
- 編集はキャッシュ上で行う
- `close` まで変更をアップロードしない

---

# 変更許可: バージョン比較

- `open` で内容とバージョンを取得
- `close` で取得時のバージョンを送り返す
- サーバで比較し、不一致なら `Failed (Conflict)`

---

# 流れ

![h:480](./images/flow.svg)

---

# データ管理

![w:1000](./images/data.svg)

---

<!-- _class: api -->

# API（open / close）

<div class="columns">
<div>

### `open(site, path, mode)`

**用途**\
ファイルをキャッシュに読み込む。\
指定先にファイルがなければ作成する。

**引数**

- `site` — ファイルシステムの URI
- `path` — `site` 内のファイルパス
- `mode` — アクセスモード\
  `read only` / `write only` / `read/write`

**戻り値**\
`file` — キャッシュ内のファイルポインタ

</div>
<div>

### `close(file, mode)`

**用途**\
変更をアップロードまたは破棄する。\
ファイルをキャッシュから削除する。

**引数**

- `file` — キャッシュ内のファイルポインタ
- `mode` — 変更をアップロード／破棄

**戻り値**\
`Success` / `Not Found` / `Failed (Conflict)`

</div>
</div>

---

<!-- _class: api -->

# API（read / write）

<div class="columns">
<div>

### `read(file, offset, length, buf)`

**用途**\
キャッシュ上のファイルから読み取る。

**引数**

- `file` — キャッシュ内のファイルポインタ
- `offset` — 読み取りの開始位置
- `length` — 読み取る長さ
- `buf` — 読み取り先の文字列バッファ

**戻り値**\
`Success` / `Not Found` / `Failed`

</div>
<div>

### `write(file, offset, length, buf)`

**用途**\
キャッシュ上のファイルに書き込む。

**引数**

- `file` — キャッシュ内のファイルポインタ
- `offset` — 書き込みの開始位置
- `length` — 書き込む長さ
- `buf` — 書き込み元の文字列バッファ

**戻り値**\
`Success` / `Not Found` / `Failed`

</div>
</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# ご清聴ありがとうございました
