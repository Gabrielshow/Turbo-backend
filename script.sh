#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]; then
	echo "usage: $0 <commit-message> <path-to-repo>"
	exit 1
fi

COMMIT_MESSAGE="$1"
REPO_PATH="$2"

read -p "Enter the path to your SSH key (leave blank for default): " SSH_KEY_PATH

cd "$REPO_PATH"  || { echo "Directory not found: $REPO_PATH"; exit 1; }

FINAL_COMMIT_MESSAGE="${COMMIT_MESSAGE} - auto push"

git add .

git commit -m "$FINAL_COMMIT_MESSAGE"

if [ -n "$SSH_KEY_PATH" ]; then
	export GIT_SSH_COMMAND="ssh -i $SSH_KEY_PATH"
else
	export GIT_SSH_COMMAND="ssh"
fi

UPSTREAM_BRANCH=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)

if [ -z "$UPSTREAM_BRANCH" ]; then
  echo "No upstream branch found. Setting upstream branch and pushing..."
  # Push and set the upstream branch
  git push --set-upstream origin $(git rev-parse --abbrev-ref HEAD)
else
  echo "Pushing changes to the remote repository..."
  git push
fi

unset GIT_SSH_COMMAND

echo "Git operations completed successfully."
