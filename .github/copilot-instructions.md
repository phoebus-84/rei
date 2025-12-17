# GitHub Copilot Instructions for paons_immobiliare

## Project Overview

This is a real estate web application built with SvelteKit and modern tooling.

## Issue Tracking

**CRITICAL**: This project uses **bd (beads)** for ALL task tracking.

**Key Commands:**
```bash
# Find work
bd ready --json                    # Unblocked issues
bd list --status open --json       # All open issues

# Create and manage
bd create "Title" -t bug|feature|task -p 0-4 --json
bd update <id> --status in_progress --json
bd close <id> --reason "Done" --json

# Sync (important!)
bd sync  # Force immediate export/commit/push
```

**Workflow:**
1. Check ready work: `bd ready --json`
2. Claim task: `bd update <id> --status in_progress`
3. Work on it
4. Complete: `bd close <id> --reason "Done"`
5. Commit `.beads/issues.jsonl` with code changes

See AGENTS.md for detailed workflows.

## Tech Stack

- **Frontend**: SvelteKit with Tailwind CSS
- **Package Manager**: Bun
- **Linting**: ESLint
- **Internationalization**: inlang
- **Component Library**: shadcn/ui (via components.json)

## Important Rules

- ✅ Use bd for ALL task tracking
- ✅ Always use `--json` flag for programmatic bd commands
- ✅ Commit `.beads/issues.jsonl` with code changes
- ✅ Check `bd ready` before asking "what should I work on?"
- ❌ Do NOT create markdown TODO lists
