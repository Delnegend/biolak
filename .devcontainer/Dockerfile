FROM debian:12-slim

RUN apt-get update && apt-get install -y sudo zsh curl git python3 && apt-get clean

RUN groupadd -g 1000 biolak && \
    useradd -m -u 1000 -g biolak biolak && \
    echo "biolak ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/biolak && \
    mkdir -p /usr/local/cargo && chown -R biolak /usr/local/cargo && \
    mkdir -p /home/biolak/.pnpm-store && chown -R biolak /home/biolak/.pnpm-store

USER biolak