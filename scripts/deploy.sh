#!/usr/bin/env bash
# Deploy the site to Cloudflare Workers.
# Usage: npm run deploy [-- --allow-dirty]
#   --allow-dirty  deploy even with uncommitted changes (they WILL be baked into the build)
set -euo pipefail
cd "$(dirname "$0")/.."

allow_dirty=false
[[ "${1:-}" == "--allow-dirty" ]] && allow_dirty=true

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" != "main" ]]; then
  echo "✗ On branch '$branch' — deploys ship from main. (git checkout main)" >&2
  exit 1
fi

git fetch origin main --quiet
if [[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]]; then
  echo "✗ Local main is not in sync with origin/main. (git pull)" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]] && ! $allow_dirty; then
  echo "✗ Uncommitted changes would be baked into the build:" >&2
  git status --short >&2
  echo "  Commit or stash them, or rerun with: npm run deploy -- --allow-dirty" >&2
  exit 1
fi

npm run build
npm run audit:site
npx wrangler deploy

echo "✓ Deployed $(git rev-parse --short HEAD) to Cloudflare Workers."
