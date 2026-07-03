FROM docker.io/library/debian:13-slim

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

RUN apt-get update && \
    apt-get install -y sudo unzip curl git zstd libatomic1 just fzf && \
    apt-get clean

RUN groupadd -g 1000 biolak && \
    useradd -m -u 1000 -g biolak biolak && \
    echo "biolak ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/biolak

USER biolak
