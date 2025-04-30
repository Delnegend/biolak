#!/bin/bash

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

JUST_VERSION=1.40.0 && sudo rm -f /usr/local/bin/just && \
    curl -sL https://github.com/casey/just/releases/download/$JUST_VERSION/just-$JUST_VERSION-x86_64-unknown-linux-musl.tar.gz |\
    sudo tar -xzf - -C /usr/local/bin just && \
    [[ -f /usr/local/bin/just ]] && echo "just is installed" || echo "just is NOT installed"

FZF_VERSION=0.61.3 && sudo rm -f /usr/local/bin/fzf && \
    curl -sL https://github.com/junegunn/fzf/releases/download/v$FZF_VERSION/fzf-$FZF_VERSION-linux_amd64.tar.gz |\
    sudo tar -xzf - -C /usr/local/bin fzf && \
    [[ -f /usr/local/bin/fzf ]] && echo "fzf is installed" || echo "fzf is NOT installed"

echo 'alias j=just' >> ~/.zshrc

curl https://get.volta.sh | bash
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
volta install node@lts pnpm
pnpm config set store-dir ~/.pnpm-store