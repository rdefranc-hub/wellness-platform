name: build-and-self-heal

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          corepack enable
          pnpm install --no-frozen-lockfile || npm install

      - name: Build project
        run: |
          pnpm run build || npm run build || echo "Build failed — triggering self-heal"

  self-heal:
    needs: build
    if: ${{ failure() }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          corepack enable
          pnpm install --no-frozen-lockfile || npm install

      - name: Run self-heal automation
        run: |
          echo "🩹 Running self-heal automation..."
          node scripts/self-heal-shims.mjs

      - name: Commit and push changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git checkout -B bot/self-heal-shims
          git add .
          git commit -m "chore(self-heal): add missing shims and update vite config" || echo "No changes to commit"
          git push -f origin bot/self-heal-shims || echo "Branch already exists"

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          branch: bot/self-heal-shims
          title: "chore(self-heal): add shims and update vite aliases"
          body: |
            🤖 Auto-generated PR by GitHub Actions.
            Adds or fixes missing shims and updates Vite configuration automatically.
