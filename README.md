# Setup

1. リポジトリのクローン
2. `pnpm install`
3. `.env`の整備(`.env.example`を参考にしてください)

# 使い方

## 指定ユーザの投稿全削除

- `pnpm tsx src/main.ts delete-all ユーザーID` # モデレーション画面などから見えるもの
- `pnpm tsx src/main.ts delete-all ユーザーID --frozen` とすると凍結までやります

### 必要な権限

- ノートを作成・削除する
- (Admin)ユーザーのすべてのファイルを削除する
- (Admin)ユーザーを凍結する: 凍結フラグを使う場合のみ