---
description: Commit current progress to git
---

1. Run `git status` to see changes
2. Stage all changes: `git add .`
3. Create commit with progress summary:
   ```
   git commit -m "progress: Level X Quest Y complete"
   ```
4. Show confirmation:
   ```
   ┌─────────────────────────────────────────────────────────────┐
   │  💾 PROGRESS SAVED!                                          │
   │                                                              │
   │  Committed: [X files changed]                               │
   │  Message: "progress: Level X Quest Y complete"              │
   │                                                              │
   │  Push to GitHub? (yes / no)                                 │
   └─────────────────────────────────────────────────────────────┘
   ```
5. If yes, run `git push`
