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
    font-size: 22px;
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

# API

<div class="columns">
<div>

### `open(site, path, mode)` → file
- site: ファイルシステムの URI
- path: site 内のパス（なければ生成）
- mode: read only / write only / read-write

### `close(file, mode)`
- mode: アップロード / 破棄
- → Success / Not Found / Failed (Conflict)

</div>
<div>

### `read(file, offset, length, buf)`
### `write(file, offset, length, buf)`
- キャッシュ上のファイルを読み書き
- → Success / Not Found / Failed

</div>
</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# ご清聴ありがとうございました
