module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: "production",
  // エントリーポイントの設定
  entry: "./js/App.js",
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};
