---
title: GhostGrid
shortTitle: Personal dashboard
summary: A personal dashboard I run on my homelab for email triage, my calendar, and server stats, with a local LLM assistant that has to ask before it changes anything.
description: GhostGrid is a private FastAPI and React PWA for email triage, iCloud calendar sync, server stats, and a local Llama 3.1 assistant. It runs on my homelab and is reached over Tailscale.
status: Private · in active development
privacy: Private system
role: "Specs, design, and review; built AI-assisted with Claude Code"
year: 2026–present
technologies:
  - React
  - Vite
  - FastAPI
  - Python
  - PWA
  - Ollama
  - GitHub Actions
featuredOrder: 2
accent: blue
links: []
facts:
  - value: "4"
    label: inboxes triaged, read-only
  - value: "146"
    label: backend tests, run in CI on every PR
  - value: Local
    label: Llama 3.1 8B assistant on my GPU
challenge: My email is spread across four inboxes, my calendar is in iCloud, and my server's health lives in a handful of admin pages. I wanted one place on my phone that told me what needed attention.
response: I built GhostGrid as an installable web app backed by FastAPI, running under systemd on my homelab and reached only over Tailscale. I write the specs, Claude Code implements them on branches, and I review and merge every change.
sections:
  - eyebrow: Email
    title: Triage that catches what slipped
    body: A daily job scores mail across four Gmail and Outlook inboxes. It saves a snapshot after every scan, so the weekly digest can tell "I replied" apart from "this fell through the cracks."
    bullets:
      - Read-only by design, because there is no code that writes mail
      - Mail content is treated as untrusted, and raw HTML never crosses the API
      - Each account reports its status and last successful scan
  - eyebrow: Calendar
    title: Two-way iCloud sync
    body: Month, week, and day views read and write my iCloud calendar. Edits to recurring events change the parsed event rather than overwriting the raw calendar data, and they ask whether to change this event, future events, or all of them.
    bullets:
      - Read/write sync with iCloud
      - Recurring edits scoped to this, future, or all
      - A safety check before every save
  - eyebrow: Assistant
    title: A local model that has to ask
    body: The assistant runs Llama 3.1 8B through Ollama on the homelab GPU. Any edit or delete it wants to make becomes a proposal I have to confirm, and the server enforces that, not the model.
    bullets:
      - Switched from Mistral 7B after it failed at tool calling
      - The model unloads after 60 seconds so the GPU can be shared with media transcoding
      - Email scoring uses a hosted model; the assistant is local
  - eyebrow: Quality
    title: Tests and CI
    body: There are 146 backend tests, mostly covering email and calendar, and GitHub Actions runs them on every pull request along with the frontend build.
    bullets:
      - Python unittest suite for email, calendar, and bookmarks
      - CI on every PR and every push to main
      - Manual deploys with an update script
media:
  - title: Dashboard on a phone
    caption: An illustration of the layout. No real mail, events, or hostnames are shown.
    variant: dashboard
  - title: How it fits together
    caption: PWA → FastAPI on the homelab → iCloud, mail providers, and a local Ollama model.
    variant: system
outcomes:
  - Email, calendar, and server status are in one place on my phone.
  - The assistant can't change my data without my confirmation.
  - Next up are more assistant tools and a research page.
architecture:
  - Installable React PWA
  - FastAPI on homelab
  - Email & iCloud calendar
  - Local Ollama model
disclosure: GhostGrid is private and reached only over Tailscale. Screens here are illustrations with no real data. It's built AI-assisted with Claude Code; I write the specs and review every change.
---

GhostGrid is a tool I actually use, so it changes based on what I need day to day.
