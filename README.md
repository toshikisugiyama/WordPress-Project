## SetUp

### 1.Dockerコンテナ作成
```
docker-compose up -d
```

### 2.テーブルを作成
test_db.sqlを1で作成したDBにインポートする
```
DB情報
- DB_NAME: wordpress
- DB_USER: wordpress
- DB_PASSWORD: wordpress
- port: 5306
```

### 3.ログイン
以下、表示できることを確認する

サイト
http://localhost:8000/

管理画面
http://localhost:8000/wp-admin
ID：kanucha-admin
PW：9VulAjoVdHrpzwi#L4


## コーディング環境構築
インストール
```
npm install
```

タスクランナー起動
```
gulp
```