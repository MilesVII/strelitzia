#!/bin/bash
cd "$(dirname "$0")"
pkg strelitzia_server.js -t node14-macos-x64 -o Strelitzia
chmod +x ./Strelitzia