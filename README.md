# Internal Gyazo
nodejs(electron)で出来てるinternalなgyazo  
指定サーバに画像送ります。  
node_moduleを少しいじったのでコミットignoreしてない。  
よってレポ重い。  
サーバのコードは `server/recieve.php` 　　

# 実行方法

実行ファイル･フォルダと同じ階層に `bin/nircmdc.exe` 必要（winのみ）  


## required

- nodejs >= 5.0.0  
- electron  
- asar (for distribute)

## debug build

```
# install electron
$ npm -g install electron-prebuilt
$ git clone https://github.com/hakopako/internal-gyazo.git
$ cd client/electron    
$ electron .  
```

## distribute

```
# install asar
$ npm install -g asar
$ cd client/electron    
$ asar pack . ../app.asar
$ electron ../app.asar  
```

## OS

実際に配布するにはelectronが配布してるパッケージにapp.asarを置必要がある。  

ここ [https://github.com/atom/electron/releases](https://github.com/atom/electron/releases) から  
配布したいOS向けのzipを落としてきて良しなにapp.asarを置くだけ。  
gulpとかでのビルド方法もあったけど、よく知らない。  

参考：[http://qiita.com/Quramy/items/a4be32769366cfe55778](http://qiita.com/Quramy/items/a4be32769366cfe55778)




