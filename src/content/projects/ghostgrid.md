---
title: GhostGrid
shortTitle: Personal operations system
summary: A continuously developed, private dashboard that brings system health, planning, reflection, and a local AI assistant into one responsive workspace.
description: Sanitized case study of GhostGrid, a private React and FastAPI personal-operations dashboard with monitoring, planning tools, and a local Ollama-powered agent.
status: Private · in continuous development
privacy: Private system
role: Product design, full-stack engineering & operations
year: 2025–present
technologies:
  - React
  - Vite
  - FastAPI
  - Python
  - PWA
  - Ollama
  - Docker
  - Linux
featuredOrder: 2
accent: blue
links: []
facts:
  - value: One view
    label: operations and personal planning
  - value: Local AI
    label: private, on-device model execution
  - value: Ongoing
    label: shaped through daily use
challenge: "Infrastructure status, tasks, calendar context, and journal notes all answer different versions of the same question: what needs attention now? Separate tools made that context fragmented and slowed down routine decisions."
response: GhostGrid combines those signals in a private, installable dashboard. A FastAPI service boundary connects a responsive React interface to personal workflows, system signals, and a locally hosted language model without turning private context into a public service.
sections:
  - eyebrow: Information design
    title: A dashboard built around attention
    body: The responsive bento layout gives each signal enough space to be understood without turning the page into a wall of telemetry. Priority changes with screen size, so the system remains useful at a desk or from a phone.
    bullets:
      - System status and recent activity summarized at a glance
      - Task, calendar, and journal surfaces designed as related context
      - Installable PWA behavior for quick, app-like access
  - eyebrow: Application boundary
    title: A typed interface over private capabilities
    body: React and Vite handle a modular client while FastAPI coordinates the private service layer. Clear contracts keep monitoring, planning, and assistant features isolated enough to evolve independently.
    bullets:
      - Focused API modules rather than direct access to underlying systems
      - Responsive states for loading, partial availability, and failure
      - Sanitized client models that avoid exposing operational internals
  - eyebrow: Local intelligence
    title: An agent that stays close to the data
    body: A locally hosted Ollama model can work with intentionally selected personal context. The agent is one capability inside the system, not an unrestricted control plane.
    bullets:
      - Local inference keeps personal prompts within the private environment
      - Narrow tools expose specific, reviewable actions and read paths
      - Clear interface cues separate generated guidance from system facts
  - eyebrow: Living system
    title: Continuous development through use
    body: GhostGrid is treated as an operating product. New capabilities earn their place by reducing friction, and existing views are simplified as the system reveals what is genuinely useful.
    bullets:
      - Iteration guided by daily workflows rather than a feature inventory
      - Health signals and graceful degradation for dependent services
      - Documentation for routine operation and recovery
media:
  - title: Responsive bento dashboard
    caption: A sanitized composition representing monitoring and planning surfaces without private data.
    variant: dashboard
  - title: Bounded private services
    caption: A conceptual view of interface, API, capability, and local-data boundaries.
    variant: system
  - title: Operational awareness
    caption: Designed health signals help distinguish an unavailable dependency from an application failure.
    variant: operations
outcomes:
  - Unified system awareness and personal planning without publishing private context to third-party dashboards.
  - Created a maintainable boundary for adding capabilities without coupling the interface directly to infrastructure.
  - Established a safe place to explore local-agent workflows with deliberately constrained access.
architecture:
  - Installable web interface
  - FastAPI boundary
  - Bounded capabilities
  - Local model & private data
disclosure: GhostGrid is a private personal system. Screens in this case study are purpose-built representations; they contain no real tasks, journal entries, calendar data, hostnames, URLs, network topology, or control endpoints.
---

Only the design decisions and generalized system boundaries are public. The working environment and its data remain private.
