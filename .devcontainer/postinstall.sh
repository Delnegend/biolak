#!/bin/bash

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

ver=1.40.0 && sudo rm -f /usr/local/bin/just
curl -s -L -o /tmp/just.tar.gz https://github.com/casey/just/releases/download/$ver/just-$ver-x86_64-unknown-linux-musl.tar.gz
checksum=$(openssl dgst -sha3-512 /tmp/just.tar.gz | awk '{print $2}')
expected="27f317b6ca704395dbad34c078f57d140d6d3e1f147a29b5c7563489885525a203bb289b02ec05e52282d25dfe446a60e11554a58addc682ad17f94b6b100cb9"
if [ "$checksum" != "$expected" ]; then
  echo "just checksum mismatch, expected $expected, got $checksum"
else
  sudo rm -f /usr/local/bin/just
  sudo tar -xzf /tmp/just.tar.gz -C /usr/local/bin just
  [[ -f "/usr/local/bin/just" ]] && echo "just installed successfully"
fi
rm -f /tmp/just.tar.gz

ver="0.61.3"
curl -s -L -o /tmp/fzf.tar.gz https://github.com/junegunn/fzf/releases/download/v$ver/fzf-$ver-linux_amd64.tar.gz
checksum=$(openssl dgst -sha3-512 /tmp/fzf.tar.gz | awk '{print $2}')
expected="1710205b6f924c78ebfc6b43e1697e4cf4ba168d7970196f23effb4f125e956a76a07ae8a26dfcd1a4a5b26435b2670bb840b7d1c4ea92befef09789d17068b0"
if [ "$checksum" != "$expected" ]; then
  echo "fzf checksum mismatch, expected $expected, got $checksum"
else
  sudo rm -f /usr/local/bin/fzf
  sudo tar -xzf /tmp/fzf.tar.gz -C /usr/local/bin fzf
  [[ -f "/usr/local/bin/fzf" ]] && echo "fzf installed successfully"
fi
rm -f /tmp/fzf.tar.gz

echo 'alias j=just' >> ~/.zshrc

curl https://get.volta.sh | bash
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
if ! grep -qF 'export VOLTA_HOME="$HOME/.volta"' ~/.zshrc; then
  echo 'export VOLTA_HOME="$HOME/.volta"' >> ~/.zshrc
fi
if ! grep -qF 'export PATH="$VOLTA_HOME/bin:$PATH"' ~/.zshrc; then
  echo 'export PATH="$VOLTA_HOME/bin:$PATH"' >> ~/.zshrc
fi
volta install node@lts pnpm
pnpm config set store-dir ~/.pnpm-store
pnpm i

echo 0 | sudo update-alternatives --config iptables