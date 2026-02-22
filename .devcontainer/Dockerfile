FROM docker.io/library/debian:12-slim

RUN apt-get update && \
    apt-get install -y sudo unzip curl git zstd && \
    apt-get clean

RUN groupadd -g 1000 biolak && \
    useradd -m -u 1000 -g biolak biolak && \
    echo "biolak ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/biolak

USER biolak
