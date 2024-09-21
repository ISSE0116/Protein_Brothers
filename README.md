# プロジェクト名

## 概要
送金&請求アプリ

## 環境設定
ローカルで実行するための手順を以下に記載。

### 0. リポジトリのクローン(まだローカルにクローンしてない場合)

まず、GitHubからリポジトリをクローン。

```bash
git clone https://github.com/ISSE0116/Protein_Brothers.git
cd Protein_Brothers
```

### 1. リモートリポジトリをローカルにpull
```bash
git pull
```

### 2. PostgreSQL データベースのセットアップ

以下の手順で OurDB.sql を使用してデータベースを復元。

1.PostgreSQL がインストールされていることを確認。  
2.DB/OurDB.sql ファイルに本ブランチ内で動くデータベースを保存。  
3.ターミナルで以下のコマンドを実行して、データベースを作成したのち、OurDB.sql からデータを復元。
```bash
# PostgreSQLにログイン
psql -U your_username
```
```bash
# データベースを作成
CREATE DATABASE your_database_name;
```
```bash
# データベースからログアウト
\q
```
```bash
# SQLファイルからデータベースを復元
psql -U your_username(既にローカルに登録しているユーザー名) -d your_database_name(さっき作ったDBの名前) -f db/OurDB.sql
```

connection_SQL.pyの
```bash
    connection = psycopg2.connect(
        host = "localhost",
        database = "your_database_name",
        user = "your_username",
        password = "your_password"
    )
```
を変更する。

### 3. ライブラリの導入(既に終わっている場合はスキップ)
```bash
# anaconda環境の人は以下のコマンドを実行
conda env create -f environment.yml
```

### 4. プロジェクトの実行
以下のコマンドを使用し実行。

```bash
# React起動
npm start
```

```bash
# Flask起動
python3 app.py
```

```bash
# URLをブラウザに打ち込む
localhost:3000
```
