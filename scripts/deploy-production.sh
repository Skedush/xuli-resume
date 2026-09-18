#!/usr/bin/env bash

set -Eeuo pipefail

repository_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
remote_url=${XULI_RESUME_REMOTE_URL:-https://github.com/Skedush/xuli-resume.git}
remote_ref=refs/remotes/production/main
deployed_revision_file="$repository_root/.git/production-deployed-revision"
lock_file="$repository_root/.git/production-deploy.lock"

exec 9>"$lock_file"
if ! flock -n 9; then
  echo "Another production deployment is already running."
  exit 0
fi

git -C "$repository_root" fetch --quiet "$remote_url" "+refs/heads/main:$remote_ref"

current_revision=$(git -C "$repository_root" rev-parse HEAD)
target_revision=$(git -C "$repository_root" rev-parse "$remote_ref")

if [ -n "$(git -C "$repository_root" status --porcelain --untracked-files=no)" ]; then
  echo "Tracked working-tree changes detected; refusing to deploy."
  exit 1
fi

if [ "$current_revision" != "$target_revision" ]; then
  if git -C "$repository_root" merge-base --is-ancestor "$current_revision" "$target_revision"; then
    git -C "$repository_root" merge --ff-only "$target_revision"
  elif git -C "$repository_root" merge-base --is-ancestor "$target_revision" "$current_revision"; then
    echo "Local main is ahead of origin/main; waiting for the commits to be pushed."
    exit 0
  else
    echo "Local main and origin/main have diverged; refusing to deploy."
    exit 1
  fi
fi

target_revision=$(git -C "$repository_root" rev-parse HEAD)
deployed_revision=$(cat "$deployed_revision_file" 2>/dev/null || true)

if [ "$deployed_revision" = "$target_revision" ] && \
  curl --fail --silent --max-time 5 http://127.0.0.1:8888/version.txt | grep --quiet --fixed-strings "$target_revision"; then
  echo "Production is already running $target_revision."
  exit 0
fi

echo "Deploying $target_revision..."
BUILD_REVISION="$target_revision" docker compose \
  --project-directory "$repository_root" \
  -f "$repository_root/docker-compose.prod.yml" \
  up -d --build --remove-orphans

for attempt in $(seq 1 12); do
  if [ "$(curl --fail --silent --max-time 5 http://127.0.0.1:8888/version.txt || true)" = "$target_revision" ]; then
    printf '%s\n' "$target_revision" > "$deployed_revision_file"
    echo "Production deployment completed: $target_revision"
    exit 0
  fi

  sleep 2
done

echo "Production health check did not report $target_revision."
exit 1
