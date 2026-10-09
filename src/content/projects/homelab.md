---
title: Homelab
shortTitle: Self-hosted Ubuntu server
summary: A 24/7 Ubuntu server at home running nearly 30 Docker containers, including a media server for family and friends and the backend for Howie Helper.
description: My homelab is one Ubuntu server with Docker, Tailscale, monitoring, and nightly backups. It hosts a media server, Nextcloud, Pi-hole, local LLMs, and the backend for my store's scheduling app.
status: Running 24/7 · since Jan 2026
privacy: Private system
role: "Hardware, networking, and operations; scripts AI-assisted with Claude Code"
year: 2026–present
technologies:
  - Ubuntu
  - Docker
  - Tailscale
  - Cloudflare Tunnel
  - Pi-hole
  - Ollama
  - MLX
  - Uptime Kuma
featuredOrder: 3
accent: steel
links: []
facts:
  - value: ~30
    label: Docker containers on one server
  - value: "0"
    label: open router ports
  - value: Nightly
    label: backups, kept for 30 days
challenge: I wanted to run real services for real people (a media server for my family and friends, file sync for me, and the backend for my store's scheduling app) without paying for cloud hosting or opening my home network to the internet.
response: I run everything on one Ubuntu server, a Ryzen 7 3700X with 64 GB of RAM and an RTX 2080 Super, with services grouped in Docker. Monitoring and backups are in place, so I usually hear about a problem from my phone before anyone else notices it.
sections:
  - eyebrow: Services
    title: What actually runs on it
    body: About a dozen containers make up the media stack, with GPU transcoding for family and friends. A dozen more run the self-hosted Supabase backend behind Howie Helper. The rest are personal and operational tools.
    bullets:
      - Jellyfin media server with GPU transcoding
      - Self-hosted Supabase (Postgres, auth, REST API) and PowerSync for Howie Helper
      - Nextcloud, Pi-hole DNS for the home network, and Ollama with 4–8B models on the GPU
      - Separately, my M1 Pro MacBook runs larger models and Qwen image generation through MLX
  - eyebrow: Access
    title: No open ports
    body: Admin pages listen only on the server and get HTTPS through Tailscale. The two things that need to be public go out through Tailscale Funnel and a Cloudflare Tunnel, so the router has no ports forwarded.
    bullets:
      - Tailscale with MagicDNS and HTTPS for admin and personal access
      - Cloudflare Tunnel for howiehelper.app
      - Tailscale Funnel for the media server
  - eyebrow: Operations
    title: Monitoring, backups, and runbooks
    body: Uptime Kuma checks services and sends phone alerts, Scrutiny checks disk health every hour, and the server alerts my phone when it shuts down or boots. Backups run nightly. I've done one partial restore test (the Nextcloud database); a full-server restore hasn't been tested yet, and there's no offsite copy yet.
    bullets:
      - Uptime Kuma with ntfy phone alerts, plus Scrutiny for disk health
      - Nightly backups kept 30 days on two separate drives
      - 14 written runbooks for routine fixes
  - eyebrow: Fixes
    title: Problems I actually hit
    body: Most of what I've learned came from things breaking. These are a few of the fixes.
    bullets:
      - A start-up script crashed partway through, so 7 of 12 service groups silently never came up after a reboot
      - My phone lost DNS away from home because Tailscale was sending it to Pi-hole, which only works on the home network
      - Moved the data drives from USB to SATA and combined them into one pool, keeping databases off it
media:
  - title: How it's laid out
    caption: An illustration of the layout. No real hostnames, addresses, or services are shown.
    variant: system
  - title: Health at a glance
    caption: An illustration of the monitoring view. No real metrics are shown.
    variant: operations
outcomes:
  - Family, friends, and my store's app depend on it every day.
  - I get problems from phone alerts and runbooks instead of from people telling me something is down.
  - Next steps are an offsite backup and a full restore test.
architecture:
  - Tailscale & Cloudflare Tunnel
  - Docker service groups
  - Ryzen 7 / 64 GB / RTX 2080 Super
  - Monitoring & alerts
  - Nightly backups
disclosure: Addresses, hostnames, credentials, and detailed network layout are left out on purpose. Most scripts and automation were written AI-assisted with Claude Code and reviewed by me; the hardware work, networking setup, and decisions are mine.
---

This is a working server that people use every day, so keeping it running matters more than adding to it.
