#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

if [ ! -f "draft.html" ]; then
    echo "❌ Erreur : draft.html n'existe pas."
    exit 1
fi

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
cp index.html "index.html.backup_${TIMESTAMP}"
cp draft.html index.html

echo "✅ 'draft.html' a été promu en 'index.html' avec succès !"
echo "💾 Sauvegarde de l'ancienne version : index.html.backup_${TIMESTAMP}"
