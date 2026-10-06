---
title: Data curation
card_title: Data curation
eyebrow: Research &middot; Data curation
framing: Choosing the training examples that make a model learn the right things.
summary: >-
  Data selection and trajectory curation for efficient mid-training, where
  coverage and learnability matter as much as example quality.
order: 7
tags:
  - LLMs
  - Data Curation
  - Mid-training
---

## Overview

The examples used during mid-training determine which capabilities a model can acquire and how
efficiently it acquires them. Data curation is therefore more than filtering for surface quality:
it is a sequential selection problem over a limited training budget, where the value of an
example depends on the current student, the examples already selected, and the coverage still
missing from the training distribution.

## Themes

- **Learnability-aware selection** — prefer examples that measurably reduce the student's loss,
  rather than assuming teacher confidence or answer quality predicts training value
- **Coverage and diversity** — balance high-value examples against redundant data so a curated set
  spans the behaviors the student needs to acquire
- **Trajectory and trace curation** — select complete reasoning traces and weight them according
  to the learning signal they provide
- **Budgeted mid-training** — allocate a fixed compute and data budget where it changes the model
  most, while keeping the selection procedure practical at scale

## Open questions

- How to estimate an example's marginal learning value without repeatedly training the model
- How to define coverage for reasoning behaviors that are difficult to label directly
- When curation should optimize immediate loss reduction versus durable generalization
