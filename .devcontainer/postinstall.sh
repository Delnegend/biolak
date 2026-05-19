#!/bin/bash

# node
curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
pnpm config set store-dir ~/.pnpm-store
pnpm runtime set node 24 -g
pnpm i

# just
ver="1.43.1"
curl -L -o /tmp/just.tar.gz https://github.com/casey/just/releases/download/$ver/just-$ver-x86_64-unknown-linux-musl.tar.gz
checksum="6a3003f68fa4d86ada8afe33830a88ffdb6c2fcaff4e5a840b1cb90eaf6f46fc"
if [ "$checksum" != "$(sha256sum /tmp/just.tar.gz | awk '{print $1}')" ]; then
    echo "just tarball checksum failed"
else
    sudo tar -xf /tmp/just.tar.gz -C /usr/local/bin just
    echo 'alias j=just' >> ~/.bashrc
    echo 'eval "$(just --completions bash)"' >> ~/.bashrc
    echo 'complete -F _just j' >> ~/.bashrc
fi
rm -f /tmp/just.tar.gz

# fzf
ver="0.66.1"
curl -L -o /tmp/fzf.tar.gz https://github.com/junegunn/fzf/releases/download/v$ver/fzf-$ver-linux_amd64.tar.gz
checksum="eca8d793061283122d79ff81baf996535c0bfbf7058253142aaf2578e56943ef"
if [ ! "$checksum" = "$(sha256sum /tmp/fzf.tar.gz | awk '{print $1}')" ]; then
    echo "fzf tarball checksum failed"
else
    sudo tar -xf /tmp/fzf.tar.gz -C /usr/local/bin fzf
fi
rm -f /tmp/fzf.tar.gz
