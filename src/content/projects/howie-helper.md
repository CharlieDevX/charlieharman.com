---
title: Howie Helper
shortTitle: Store scheduling app
summary: A phone-first scheduling app I built and host for the pizza store where I'm an assistant manager. My GM uses it to build and publish the weekly schedule.
description: Howie Helper is a small, invite-only React and TypeScript PWA I built for my own store. It's used for the weekly schedule, and under the hood it has offline sync, per-store access rules, and a self-hosted backend.
status: In use at my store · schedule only
privacy: Private system
role: "Solo build, AI-assisted with Claude Code: design, architecture, hosting"
year: "2026"
technologies:
  - React
  - TypeScript
  - PWA
  - PowerSync
  - Supabase
  - PostgreSQL
  - Docker
  - Cloudflare Tunnel
  - Vitest
facts:
  - value: One store
    label: a handful of people, invite only
  - value: Offline
    label: local copy on the phone, writes queued until reconnect
  - value: ~2,500
    label: unit and component tests
featuredOrder: 1
accent: orange
links: []
challenge: Our weekly schedule lived in a shared spreadsheet that's hard to read and edit on a phone, and crew availability and time-off requests came in through texts. I wanted one place on my phone where the schedule gets built, checked against availability, and published.
response: I built an installable web app, starting with a static HTML prototype in June 2026 and moving to React, TypeScript and a self-hosted Supabase backend in July. Today the store uses only the schedule. I also built other tools (inventory, nightly numbers, dough planning, drawer cash), but they're hidden or unused at the store.
sections:
  - eyebrow: Schedule
    title: Draft, check, publish
    body: Managers edit a private draft of the week while the crew only see the published version. Availability and time-off requests show on the draft grid, so conflicts are visible before anything goes out.
    bullets:
      - Weekly grid editor with a draft/publish gate
      - Crew availability and time-off requests overlaid on the draft
      - Copy-out to the owners' spreadsheet, plus PNG/PDF export
  - eyebrow: Offline first
    title: Works when the store Wi-Fi doesn't
    body: Each phone keeps a local SQLite copy of its store's data through PowerSync. Writes queue while offline and sync when the connection returns, so IDs and write rules have to survive retries. For example, the cash log is append-only.
    bullets:
      - Local SQLite replica with a queued write path
      - Separate upload queue for photo attachments
      - Prompt-to-update banner, because installed copies kept running old versions after deploys
  - eyebrow: Access control
    title: Rules in the database, not just the UI
    body: Every table has Postgres row-level security scoped to a store, with platform admins and a 7-rank member ladder on top. I checked the rules by impersonating real accounts before a second store's GM was given access.
    bullets:
      - Per-store row-level security on every table
      - Invite-code signup and role-based tool visibility per store
      - API rate limits tuned per endpoint, because a rate-limit error on sign-in would end the session and clear the offline queue
  - eyebrow: Running it
    title: Self-hosted on my homelab
    body: The backend (Postgres, auth, REST API, storage, sync) runs in Docker on my homelab and is exposed through a Cloudflare Tunnel. Deploys are a script I run by hand, and GitHub Actions type-checks and tests every PR.
    bullets:
      - Self-hosted Supabase and PowerSync in Docker
      - 32 SQL migrations and SQL scripts that check the access rules
      - CI for type-checking and tests; deploys are manual
media:
  - title: Crew view, manager draft, and availability request
    caption: Mockups rendered from the real app with made-up crew and a demo store. No real schedules or names.
    variant: phone
    image: /projects/howie-helper/hh-hero
    alt: Three phones showing Howie Helper's crew schedule view, the manager's draft week with availability flags, and an availability request form.
    shape: wide
    retina: true
  - title: Schedule editor on a wide screen
    caption: The full draft week with hours per shift, weekly totals, and availability flags from crew requests.
    variant: system
    image: /projects/howie-helper/hh-schedule-desktop
    alt: Desktop view of the weekly schedule editor with shifts by role, hours, totals, and highlighted availability conflicts.
    shape: wide
    retina: true
  - title: Manager's draft week
    caption: One availability conflict (red) and one warning (amber) flagged before anything is published.
    variant: phone
    image: /projects/howie-helper/hh-schedule-draft
    alt: Phone view of the draft schedule with a red-outlined conflict and an amber-outlined warning.
    shape: phone
  - title: Crew view
    caption: A crew member sees only the published week, with their own row pinned at the top.
    variant: phone
    image: /projects/howie-helper/hh-schedule-crew
    alt: Phone view of the published schedule with the viewer's row pinned at the top.
    shape: phone
  - title: Availability request
    caption: Crew request an availability change or time off, and it goes to the GM for approval.
    variant: phone
    image: /projects/howie-helper/hh-availability-request
    alt: Phone form for requesting availability changes by day, with open, close, any, and off options.
    shape: phone
  - title: Unsynced changes stay on the phone
    caption: Edits made offline wait on the device, and the app counts them until they sync.
    variant: phone
    image: /projects/howie-helper/hh-unsynced-notice
    alt: Phone view with a notice that three unsaved items are waiting on the device until they sync.
    shape: phone
outcomes:
  - The store's weekly schedule is built and published in the app.
  - I've worked through real offline sync, access control, and self-hosting problems for a small group of real users.
  - Other tools exist but aren't in use, and I'm keeping the app focused on scheduling for now.
architecture:
  - Installable React PWA
  - PowerSync local replica
  - Supabase auth & API
  - PostgreSQL with RLS
  - Homelab via Cloudflare Tunnel
disclosure: Images are mockups rendered from the real app against a throwaway database with made-up data. Howie Helper is an independent personal project. It is not an official Hungry Howie's product and is not endorsed by or affiliated with Hungry Howie's Pizza. Crew names, schedules, and store numbers are intentionally left out of this page.
---

This is a small tool for a small group of people. I'm keeping it narrow and honest about what it is.
