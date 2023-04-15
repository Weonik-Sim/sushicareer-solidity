### 初期化
```
yarn install
```

### Dev起動
```
yarn dev
```

### ABI設定
```
contracts/ABI.json
sushicareer-solidityをcomplieした後、
生成されるToken.jsonファイルの内容を貼り付け
```

### .env設定
```
# 以下はlocal環境のcontractアドレス
THIRDWEB_AUTH_PRIVATE_KEY=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=localhost:3000
NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY=0x5FbDB2315678afecb367f032d93F642f64180aa3
```