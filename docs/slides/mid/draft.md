## ファイル共有の仕方
### **Session semantics**
開いた時点のファイルシステム上のファイルの内容キャッシュ上にコピー(open)、ファイルをcloseするまで変更をアップロードしない。

## 変更許可の仕方
openで内容とバージョンをセットで取得し、closeする時に取得時のバージョンを送り返し、ファイルシステムでバージョンの比較を行い、不一致ならFailedを返す。

## 流れ
A と B が同じファイルの v1 を開く → 両方が編集する → A の `close` が成功して v2 になる → B の `close` は競合になる → 新しく開くと v2 が見える。

## データ管理の仕方
### サーバ
- バージョン
- 正本

### クライアント
- バージョン
- 正本

## **API**
### open(site, path, mode);
用途
- ファイルシステムからファイルをキャッシュ上にロードする
- 存在しないパスはファイルを生成する

引数: 
- site: ファイルシステムのURI
- path: site内のファイル位置
- mode: read only, write only, read/write

戻り値
- file: キャッシュ上のファイルのポインタ

### close(file, mode)
用途
- ファイルをファイルシステムにアップロードし、ファイルをキャッシュ上から消去する

引数
- file: キャッシュ上のファイルのポインタ
- mode: 変更内容をアップロードしてclose, 変更内容破棄してclose

戻り値
- Success
- Not Found
- Failed(Conflict)

### read(file, offset, length, buf)
用途
- キャッシュ上のファイルを読み取る

引数
- file: キャッシュ上のファイルのポインタ
- offset: ファイルの読み取り始めの場所
- mode: 変更内容をアップロードしてread, 変更内容破棄してread
- buf: 読み取ったファイルを格納する文字列バッファ

戻り値
- Success
- Not Found
- Failed

### write(file, offset, length, buf)
用途
- 変更内容をファイル上に書き込む

引数
- file: キャッシュ上のファイルのポインタ
- offset: ファイルの読み取り始めの場所
- mode: 変更内容をアップロードしてread, 変更内容破棄してread
- buf: 読み取ったファイルを格納する文字列バッファ

戻り値
- Success
- Not Found
- Failed