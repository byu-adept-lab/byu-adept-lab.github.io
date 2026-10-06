---
title: Language model reasoning
card_title: LLM reasoning
eyebrow: Research &middot; Language model reasoning
framing: Training language models to reason more effectively, efficiently, and reliably.
summary: >-
  Reinforcement learning, distillation, and inference-aware training methods
  that improve how language models solve multi-step problems.
order: 6
tags:
  - LLMs
  - Reasoning
  - RL
---

## Overview

Language-model reasoning is a sequential decision problem in miniature: a model chooses one
token at a time, receives a signal about the completed solution, and must balance exploration,
accuracy, length, and compute. The lab's recent work studies how to make that loop more
sample-efficient and more reliable, especially when training and inference engines disagree or
when the reward arrives only after a full reasoning trace.

## Themes

- **Reasoning distillation** — transferring useful problem-solving behavior from a stronger
  teacher into a smaller student without wasting rollout or training compute
- **Rollout efficiency** — reusing trajectories, allocating sampling budgets, and selecting
  informative examples so each generated trace contributes more learning signal
- **Training-inference mismatch** — correcting the probability differences that arise when one
  engine generates a rollout and another engine computes the update
- **Reliable termination** — treating equivalent end-of-sequence signals consistently so models
  do not inflate response length or truncate otherwise-correct solutions
- **Monitorable and compositional reasoning** — shaping reasoning traces so they can be inspected,
  supervised, and recombined across tasks

## Open questions

- How to measure the reasoning value of a trajectory before spending the cost of training on it
- Which forms of off-policy reuse preserve useful exploration rather than narrowing policy diversity
- How to separate model capability from artifacts of the training and inference stack
- How to evaluate reasoning quality, efficiency, and reliability together rather than optimizing one
  at the expense of the others
