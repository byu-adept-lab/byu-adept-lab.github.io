---
title: Structured action spaces
card_title: Structured actions
eyebrow: Research &middot; Structured action spaces
framing: Combinatorial and factored action spaces, where the joint action set is far too large to enumerate.
summary: >-
  Decisions composed of many interacting parts, where the number of joint actions
  is astronomically larger than anything you can enumerate.
order: 4
tags:
  - RL
  - Offline RL
---

## Overview

Most reinforcement learning methods assume a modest set of discrete actions that can be scored
exhaustively at every step. Consequential decisions are instead factored: a treatment plan fixes a
drug, a dose, concurrent interventions, and a duration simultaneously, and an experimental protocol
is a configuration rather than a single selection. Once a decision has parts, the joint action space
grows multiplicatively and any method whose update requires a maximization over all actions ceases
to be computable — the work in [SAINT: Attention-Based Policies for Discrete Combinatorial Action
Spaces](https://arxiv.org/abs/2505.12109) evaluates environments with up to 1.35 &times;
10<sup>18</sup> joint actions. The binding constraint in this regime is computational before it is
statistical: the data frequently contains enough signal, and no tractable search exists over the
space it covers.

## Methods

- **Learned action structure** — sub-actions are dependent, and the pattern of which joint actions
  are valid is itself learnable; [Improving and Accelerating Offline RL in Large Discrete Action
  Spaces with Structured Policy
  Initialization](https://twkillian.github.io/papers/SPIN_LandersKillianHartvigsenDoryab_ICLR26.pdf)
  pre-trains an action structure model on valid action patterns and then trains lightweight control
  heads on top of it, reporting up to 39% higher reward and up to 12.8&times; faster convergence
- **Action validity separate from action value** — admissibility of a joint action and its expected
  return are distinct quantities with different sample requirements, and separating them keeps
  invalid regions out of the search rather than penalizing them after the fact; this is the same
  distinction that supports constraints in [irreversibility and
  risk]({{ '/research/irreversibility-and-risk/' | relative_url }})
- **Set-structured policies** — treating a joint action as an unordered set and modeling sub-action
  dependence with self-attention yields a permutation-invariant policy that shares statistical
  strength across combinations never observed in the data
  ([SAINT](https://arxiv.org/abs/2505.12109))
- **Traversal in place of enumeration** — organizing the action space so that a good joint action is
  reachable in a linear rather than combinatorial number of evaluations; [BraVE: Offline
  Reinforcement Learning for Discrete Combinatorial Action
  Spaces](https://twkillian.github.io/papers/BraVE_LandersKillianBarnesHartvigsenDoryab_NeurIPS25.pdf)
  uses tree-structured traversal to capture sub-action dependence at that cost
- **The offline case specifically** — none of the above can be validated by trying candidate joint
  actions, since coverage of the joint space in a fixed log is sparse by construction; see [offline
  RL]({{ '/research/offline-reinforcement-learning/' | relative_url }})

## Open questions

- How to quantify coverage of a combinatorial action space in a fixed dataset, and what pessimism
  means when almost every joint action is unobserved
- Whether learned action-validity models transfer across tasks that share sub-action semantics but
  differ in dynamics
- What discretization of a continuous control problem costs relative to modeling it directly, and
  when the factored discrete formulation is the better approximation
- How off-policy evaluation should be conducted when the behavior policy's support covers a
  vanishing fraction of the joint action space

Structured action spaces are the point at which a methodological result changes which problems can
be attempted at all: a [clinical or scientific
decision]({{ '/research/clinical-and-scientific-decision-making/' | relative_url }}) composed of
eight interacting choices is not approximated by a single choice among twelve, and making the
faithful formulation tractable is the prerequisite for working on it.
