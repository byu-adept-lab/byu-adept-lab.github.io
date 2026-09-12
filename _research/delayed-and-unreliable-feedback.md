---
title: Delayed and unreliable feedback
card_title: Delayed feedback
eyebrow: Research &middot; Delayed and unreliable feedback
framing: Credit assignment when the outcome arrives late, arrives noisy, or never arrives at all.
summary: >-
  Credit assignment when outcomes arrive long after the decision that caused them —
  or arrive too corrupted to trust.
order: 3
tags:
  - RL
  - Delayed Feedback
  - Scientific Discovery
---

## Overview

Standard reinforcement learning formulations assume reward is dense, immediate, and an accurate
measurement of the objective. Deployed sequential decision problems violate all three: a treatment
decision resolves over days, an experiment over weeks, and the available readout is often a proxy
for the quantity of interest. Delay does more than slow learning down — it widens the effective
horizon, inflates the variance of any estimator that has to bridge the gap between decision and
outcome, and raises the cost of exploration, since the effect of a new behavior cannot be
determined quickly. Corruption compounds delay: noise in an immediate signal can be averaged, while
noise in a late signal must first be attributed to the decisions that could have produced it.

## Themes

- **Delay thresholds** — whether a given algorithm admits a delay beyond which learning fails
  outright, what governs that threshold, and how delay biases the training signal rather than
  merely diluting it
- **Credit assignment over long horizons** — attributing an outcome across the decisions preceding
  it when several are plausible causes, and reporting how well determined that attribution is
- **Sparse terminal signal** — when the only reliable feedback is the terminal outcome, its value
  depends on how far back it can be propagated; distributional value estimation surfaces
  unrecoverable states earlier than expectation-based estimation ([Risk Sensitive Dead-end
  Identification in Safety-Critical Offline Reinforcement
  Learning](https://twkillian.github.io/papers/KillianParbhooGhassemi_2023TMLR.pdf)), which
  connects this area to [irreversibility and
  risk]({{ '/research/irreversibility-and-risk/' | relative_url }})
- **Irregular and unreliable observation** — an outcome is recorded at uneven intervals and with
  varying fidelity, so the confidence attached to a training signal has to depend on when it was
  measured and by what instrument rather than on sample count alone
- **Proxies and surrogate signals** — learning against a stand-in when the true outcome is too slow
  or too costly to measure, and establishing the conditions under which that substitution preserves
  the ordering over policies rather than redefining the objective
- **Exploration under expensive feedback** — a slow or costly outcome measurement makes allocation
  of a fixed evaluation budget part of the algorithm rather than a hyperparameter; how many
  candidate behaviors to run, and how long to wait on each before committing, becomes a decision
  problem in its own right
- **Acting on unresolved commitments** — in an experimental pipeline the next decision is made while
  earlier attempts are still pending, so outstanding commitments belong in the state description

## Open questions

- Whether delay thresholds can be predicted from properties of the environment and the estimator,
  rather than measured after the fact
- How to combine attribution over delayed outcomes with the coverage limits that already constrain
  [off-policy evaluation]({{ '/research/offline-reinforcement-learning/' | relative_url }})
- What a policy should optimize when the delayed outcome and the fast surrogate disagree, and how
  that disagreement can be detected from logged data
- How to represent pending, unresolved decisions in a state so that planning over them remains
  tractable in the [experimental and clinical
  settings]({{ '/research/clinical-and-scientific-decision-making/' | relative_url }}) that produce
  them
