---
title: Howie Helper
shortTitle: Store operations PWA
summary: A phone-first toolkit that turns five recurring store workflows into one reliable, offline-capable system for multi-store teams.
description: Case study of Howie Helper, a React and TypeScript PWA for practical store operations with offline sync, role controls, and a self-hosted data platform.
status: Live · actively maintained
privacy: Public product
role: Product design, full-stack engineering & operations
year: "2026"
technologies:
  - React
  - TypeScript
  - PWA
  - PowerSync
  - Supabase
  - PostgreSQL
  - Cloudflare
  - Docker
  - Playwright
  - Vitest
featuredOrder: 1
accent: orange
links:
  - label: Open public app
    url: https://howiehelper.app
facts:
  - value: Five
    label: store workflows in one product
  - value: Offline
    label: usable through unreliable connectivity
  - value: End to end
    label: product, platform, delivery, and support
challenge: Store-closing work often lives across calculators, paper notes, messages, and memory. The problem was not a lack of software; it was the lack of one fast, trustworthy tool that matched how the work actually happens on a phone during a busy shift.
response: Charlie designed and built a single installable web app around the highest-friction workflows, then owned the supporting data, synchronization, deployment, security, and test systems required to make it dependable in day-to-day use.
sections:
  - eyebrow: Workflow design
    title: One shift, five practical tools
    body: Each workflow was reduced to the decisions a team member actually needs to make, with large touch targets, clear progress, and summaries that can be checked before submission.
    bullets:
      - Nightly inventory with guided item counts and readable summaries
      - Drawer cash and nightly-number calculations with visible checks
      - Dough-build planning and schedule-making in the same installable app
  - eyebrow: Data integrity
    title: Local first when the network is not
    body: The interface stays useful through intermittent connectivity. Local changes are synchronized when a connection returns, while the product makes sync state legible instead of pretending every request is immediate.
    bullets:
      - Offline-capable reads and writes through a local synchronization layer
      - Conflict-aware data boundaries organized around stores and users
      - Explicit loading, completion, error, and reconnect states
  - eyebrow: Platform ownership
    title: Built beyond the browser
    body: The product includes a self-hosted Supabase and PostgreSQL platform, containerized services, Cloudflare delivery, and repeatable deployment automation. Application behavior and operating behavior are treated as one system.
    bullets:
      - Role-aware access for team members, managers, and multiple stores
      - Automated delivery paths for the PWA and supporting services
      - Monitoring and operational documentation for routine maintenance
  - eyebrow: Confidence
    title: Security and tests as product work
    body: Access rules, validation, and regression coverage were developed alongside features. The goal is a tool that is safe to change, not simply a prototype that happens to work once.
    bullets:
      - Row-level access rules and server-side authorization boundaries
      - Unit, integration, and end-to-end coverage across critical workflows
      - Deliberate handling of customer information, credentials, and endpoints
media:
  - title: Phone-first workflow system
    caption: A designed representation of the installable interface; no operational data is shown.
    variant: phone
  - title: Delivery and data boundaries
    caption: A sanitized system view from the public edge to synchronized data services.
    variant: system
  - title: Operational feedback
    caption: Health, deployment, and recovery signals are part of the product surface behind the scenes.
    variant: operations
outcomes:
  - Consolidated five recurring workflows into one coherent, installable experience.
  - Kept the core tools available during unstable connectivity and made synchronization state understandable.
  - Established a production-minded foundation for access control, automated delivery, monitoring, and continued iteration.
architecture:
  - Installable React PWA
  - Offline sync boundary
  - Supabase API & auth
  - PostgreSQL data layer
  - Operations & delivery
disclosure: Howie Helper is an independent project. It is not an official Hungry Howie’s product and is not endorsed by or affiliated with Hungry Howie’s Pizza. Credentials, customer information, and internal service endpoints are intentionally excluded from this case study.
---

The system is continually refined around real operational feedback while keeping sensitive store and customer data out of public materials.
