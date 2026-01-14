---
description: Jump to a specific level (1-4)
---

Usage: /level [number]

Example: /level 2

1. Parse the level number from arguments: $ARGUMENTS
2. Validate level is 1-4
3. Update `.vibe/progress.json` with new currentLevel, set currentQuest to first quest of that level
4. Load the appropriate level reference:
   - Level 1: [level-1-awakening.md](../../skills/vibe-coder/references/level-1-awakening.md)
   - Level 2: [level-2-foundation.md](../../skills/vibe-coder/references/level-2-foundation.md)
   - Level 3: [level-3-build.md](../../skills/vibe-coder/references/level-3-build.md)
   - Level 4: [level-4-polish.md](../../skills/vibe-coder/references/level-4-polish.md)
5. Display level banner and begin first quest
