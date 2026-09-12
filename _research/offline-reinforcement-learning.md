---
title: Offline reinforcement learning
card_title: Offline RL
eyebrow: Research &middot; Offline RL
framing: Policy learning and evaluation from fixed logs of prior decisions, without further interaction.
summary: >-
  Learning to act from data someone else collected, for reasons you cannot fully
  reconstruct, in a world you cannot go back and query.
order: 1
tags:
  - RL
  - Offline RL
---

## Overview

Offline reinforcement learning derives a policy from a fixed log of prior decisions, with no
opportunity to query the environment about actions the log does not contain. Coverage in such a
dataset follows the behavior policy that produced it, so the policies with the highest estimated
value are frequently the ones supported by the least evidence, and unconstrained value backups
extrapolate into that gap. Work in the area therefore divides between restricting learning to the
region the data supports and quantifying what the data licenses — which policies can be
distinguished, at what confidence, and under which assumptions about how the log was generated.

## Themes

- **Behavior-policy support and distributional shift** — separating high estimated value from thin
  coverage; pessimism under uncertainty as a penalty on unsupported actions; locating the point at
  which conservatism binds tightly enough to discard policies worth considering
- **Confounding in observational logs** — clinical and scientific records are produced by
  decision-makers conditioning on covariates the log never stores, so the identifying assumptions
  are usually the load-bearing part of the argument; grounding transfer in counterfactual
  estimation rather than distributional similarity, as in [Counterfactually Guided Policy Transfer
  in Clinical Settings](https://twkillian.github.io/papers/KillianGhassemiJoshi_2022CHIL.pdf)
- **Off-policy evaluation** — importance-weighted and doubly-robust estimators, their variance
  under long horizons and limited overlap, and interval estimates and safe-policy-improvement
  bounds in place of point estimates
- **State representation under partial observability** — an offline policy acts on a summary of an
  incomplete history rather than on the state itself, and the choice of summary changes the
  learned policy measurably, as quantified in [An Empirical Study of Representation Learning for
  Reinforcement Learning in
  Healthcare](https://twkillian.github.io/papers/KillianZhangSubramanianFatemiGhassemi_2020ML4H.pdf)
- **Data-constrained regimes** — when a dataset is too small to identify an optimal policy, weaker
  claims remain recoverable: [Medical Dead-ends and Learning to Identify High-Risk States and
  Treatments](https://twkillian.github.io/papers/FatemiKillianSubramanianGhassemi_2021NeurIPS.pdf)
  uses negative outcomes to learn which behaviors to avoid rather than which to select
- **Tractability under action structure** — methods that score every action stop being computable
  well before the statistics degrade; see [structured action
  spaces]({{ '/research/structured-action-spaces/' | relative_url }})

## Open questions

Established offline RL benchmarks hold fixed full observability, dense immediate reward, retryable
actions, and a characterizable logging policy. The lab works on the regime in which several of
those assumptions fail at once, which is the regime that [clinical and scientific
records]({{ '/research/clinical-and-scientific-decision-making/' | relative_url }}) produce.

- Whether method rankings established at benchmark dataset sizes hold as datasets shrink toward
  the sizes available in practice
- How pessimism should be allocated when uncertainty originates in unobserved confounders rather
  than in sampling error
- What off-policy evaluation can establish when the outcome is delayed, proxied, or observed at
  irregular intervals; see [delayed and unreliable
  feedback]({{ '/research/delayed-and-unreliable-feedback/' | relative_url }})
- Which value estimates remain usable near states from which an acceptable outcome is no longer
  reachable; see [irreversibility and
  risk]({{ '/research/irreversibility-and-risk/' | relative_url }})

Also relevant: [BraVE: Offline Reinforcement Learning for Discrete Combinatorial Action
Spaces](https://twkillian.github.io/papers/BraVE_LandersKillianBarnesHartvigsenDoryab_NeurIPS25.pdf),
which addresses offline value estimation when the joint action space cannot be enumerated.
