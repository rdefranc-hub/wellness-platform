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
          pnpm install --no-frozen-lockfile

      - name: Build project
        run: pnpm run build

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
          pnpm install --no-frozen-lockfile

      - name: Run self-heal automation
        run: |
          echo "🩹 Running self-heal automation..."
          node scripts/self-heal-shims.mjs

      - name: Commit and push changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git checkout -b bot/self-heal-shims || git checkout bot/self-heal-shims
          git add .
          git commit -m "chore(self-heal): add shims and update vite aliases" || echo "No changes to commit"
          git push origin bot/self-heal-shims || echo "Branch already exists"

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          branch: bot/self-heal-shims
          title: "chore(self-heal): add shims and update vite aliases"
          body: |
            🤖 This PR was automatically created by the self-heal workflow.
            It adds missing shims or updates Vite aliases after a failed build.
