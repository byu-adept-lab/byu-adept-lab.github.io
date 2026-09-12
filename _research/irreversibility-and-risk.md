---
title: Irreversibility and risk
card_title: Irreversibility &amp; risk
eyebrow: Research &middot; Irreversibility and risk
framing: Identifying states from which an acceptable outcome is no longer reachable, and detecting them early.
summary: >-
  States from which good outcomes are no longer reachable — how to recognize them,
  and how early you can be warned.
order: 2
tags:
  - RL
  - Healthcare
  - Uncertainty
---

## Overview

In high-stakes sequential decision problems the operative question is often not which action
carries the highest value but whether an acceptable outcome remains reachable at all. Dead-ends —
states from which no available sequence of actions reaches an acceptable outcome — are identifiable
under weaker conditions than optimal policies: negative outcomes in a log support a claim about
behaviors to avoid even where positive outcomes are too rare to support a claim about behaviors to
select. That asymmetry makes irreversibility tractable in precisely the data-constrained
[offline]({{ '/research/offline-reinforcement-learning/' | relative_url }}) regimes where value
estimation is least reliable.

## Themes

- **Dead-end identification** — separate value estimation over failure and success signals to
  locate states and treatments on the path to an unrecoverable outcome, as introduced in [Medical
  Dead-ends and Learning to Identify High-Risk States and
  Treatments](https://twkillian.github.io/papers/FatemiKillianSubramanianGhassemi_2021NeurIPS.pdf);
  the output is a set of actions to withhold rather than an action to take
- **Risk-sensitive detection** — estimating the distribution over returns rather than its
  expectation, which flags unrecoverable states earlier and exposes risk tolerance as a tunable
  parameter, as in [Risk Sensitive Dead-end Identification in Safety-Critical Offline Reinforcement
  Learning](https://twkillian.github.io/papers/KillianParbhooGhassemi_2023TMLR.pdf)
- **Uncertainty and observation timing** — confidence in a reachability claim depends on how
  recently the underlying state was measured; continuous-time evidential estimation produces
  uncertainty that widens with elapsed time since the last observation ([Continuous Time Evidential
  Distributions for Irregular Time
  Series](https://twkillian.github.io/papers/KillianZhangHartvigsenAmini_2023IMLH.pdf))
- **Action validity separate from action value** — treating admissibility of an action in a given
  state as a quantity to learn in its own right, which connects to [structured action
  spaces]({{ '/research/structured-action-spaces/' | relative_url }}), where validity structure is
  learnable directly from data
- **Degradation under misspecification** — a policy optimized against biased offline value
  estimates concentrates on the region where the bias is largest, whereas a reachability constraint
  degrades toward flagging recoverable states as dangerous; the false-positive rate is the quantity
  to characterize

## Open questions

- Whether dead-end identification transfers to populations with different physiology, weight-based
  dosing, and smaller sample sizes than the cohorts it was developed on
- How avoidance of irreversible transitions should be encoded as a constraint on policy learning
  without yielding policies that decline to act
- The relationship among irreversibility, progressive loss of influence over future outcomes, and
  rare catastrophic events, which are currently formulated separately
- How reachability claims should be reported alongside off-policy value estimates, and whether
  safe-policy-improvement bounds can be stated in terms of reachability rather than return

The clinical form of the question — whether a patient has passed the point at which available
treatment changes the outcome — is asked directly in practice, which is one reason the [clinical
setting]({{ '/research/clinical-and-scientific-decision-making/' | relative_url }}) drives this
line of work.
