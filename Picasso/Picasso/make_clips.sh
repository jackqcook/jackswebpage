#!/usr/bin/env bash
set -euo pipefail

SOURCE_FILE="${1:-supervised_output-2.mp4}"
CLIPS_DIR="clips"

mkdir -p "${CLIPS_DIR}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not installed."
  exit 1
fi

if [[ ! -f "${SOURCE_FILE}" ]]; then
  echo "Source file not found: ${SOURCE_FILE}"
  echo "Place the film in the repo root or pass an explicit path."
  exit 1
fi

# Longer sections with ~20s spacing between each clip window.
# Clip length: 35s, gap between windows: 20s.
ffmpeg -y -ss 00:00:05 -i "${SOURCE_FILE}" -t 00:00:35 -c:v libx264 -crf 19 -preset slow -an "${CLIPS_DIR}/clip-01.mp4"
ffmpeg -y -ss 00:01:00 -i "${SOURCE_FILE}" -t 00:00:35 -c:v libx264 -crf 19 -preset slow -an "${CLIPS_DIR}/clip-02.mp4"
ffmpeg -y -ss 00:01:55 -i "${SOURCE_FILE}" -t 00:00:35 -c:v libx264 -crf 19 -preset slow -an "${CLIPS_DIR}/clip-03.mp4"
ffmpeg -y -ss 00:02:50 -i "${SOURCE_FILE}" -t 00:00:35 -c:v libx264 -crf 19 -preset slow -an "${CLIPS_DIR}/clip-04.mp4"

echo "Done. New clips written to ${CLIPS_DIR}/"
