#!/bin/bash

# node
curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME/bin:$PATH"
echo "export PNPM_HOME=\"$HOME/.local/share/pnpm\"" >> ~/.bashrc
echo "export PATH=\"$PNPM_HOME/bin:\$PATH\"" >> ~/.bashrc

pnpm config set store-dir ~/.pnpm-store
pnpm runtime set node 24 -g
pnpm i
