# ADEPT Lab website — how to update it

The website for the [ADEPT Lab](https://byu-adept-lab.github.io/) at Brigham Young
University. It is a [Jekyll](https://jekyllrb.com/) site: the pages are assembled from
templates when the site is built, so you almost never have to touch a template.

Adding news, photos, people, or papers means editing one **YAML** file in `_data/` — a
plain text file of labelled values, one label per line. Two rules for every file in this
guide: **indent with spaces, never tabs**, and keep the indentation exactly as the
surrounding entries have it.

## Where each thing lives

| To do this | Edit this file | Put the image file here |
| --- | --- | --- |
| Add a news item | `_data/news.yml` | — |
| Add photos to the hero header | `_data/hero_slides.yml` | `assets/img/hero/` |
| Add a figure to the research slideshow | `_data/research_figures.yml` | `assets/img/research/` |
| Add or remove people | `_data/people.yml` | `assets/img/people/` |
| Add a publication | `_data/publications.yml` | — |

Every one of those files opens with a comment block describing its own fields, and several
include a commented-out template you can copy. Lines starting with `#` are comments:
Jekyll ignores them, so they never appear on the site. Those comments are maintained
alongside the templates that read them — **if this guide and a file's own comments ever
disagree, trust the file.**

---

## 1. Add a news item

1. Open **`_data/news.yml`**.
2. Add a two-line entry **just below the comment block at the top**, above the existing
   entries. Newest first.
3. Save.

This is the most recent real entry in the file, to copy and edit:

```yaml
- date: 2026-08-03
  text: 'The ADEPT Lab opens at BYU Computer Science. We are <a href="/joining/">recruiting</a> graduate and undergraduate researchers now.'
```

- **`date`** must be `YYYY-MM-DD`. It is reformatted for display, so the example above
  renders as `Aug 3, 2026`.
- **`text`** is one sentence. It may contain HTML, which is why the link above works. Wrap
  the whole value in single quotes as shown — the quotes keep punctuation such as `: ` from
  confusing the file (see [Troubleshooting](#troubleshooting)).

**What happens:** the item appears at the top of the *What has been happening* list on the
homepage, which shows the **five most recent**, and at the top of the archive at
**`/news/`**, which lists **every** item — nothing falls off the site as you add more. Both
lists render from the same fragment, `_includes/news-list.html`, so the data file is the
only thing you ever edit. Anything that needs more than a sentence, or needs to stay
readable, should be a post instead — see
[Other things you may need to add](#other-things-you-may-need-to-add).

---

## 2. Add pictures to the hero header

The hero is the navy band at the top of the homepage. **Every entry in
`_data/hero_slides.yml` is commented out today**, which is why the space beside the
"ADEPT Lab" heading shows the ADEPT lockup. Add a photo and it takes that space instead,
turning the hero into a slideshow of lab activity.

1. Put the photo in **`assets/img/hero/`**. Use a lowercase, hyphenated filename with no
   spaces, e.g. `lab-meeting-2026-09.jpg`.
2. Open **`_data/hero_slides.yml`**. At the bottom are two commented-out example entries.
   Either delete the `#` and one space from the start of each line of one of them and edit
   the values, or write a fresh entry.
3. Write the `alt` line. It is required — see [Alt text](#alt-text).
4. Save.

An entry looks like this — it is the first of the two commented-out examples in the file,
with the `#` characters removed:

```yaml
- image: /assets/img/hero/lab-meeting-2026-09.jpg
  alt: Members of the ADEPT Lab at a whiteboard during a weekly meeting
  caption: Weekly lab meeting
```

- **`image`** — the path starting from the site root, i.e. `/assets/img/hero/` plus your
  filename.
- **`alt`** — required on every entry.
- **`caption`** — optional. Prints in small type under the photo.

**What happens:** one entry renders as a plain photo with no controls. Two or more turn it
into a slideshow with ◀ ▶ buttons and a row of dashes underneath — **it does not advance on
its own**, so a visitor moves it by hand. That is deliberate, not something missing: unlike
the research slideshow, the hero carries no `data-carousel-autoplay` attribute in
`index.html`. Comment every entry back out and the hero returns to the lockup, so an empty
file is a perfectly good state.

The frame is a fixed **3:2 landscape box and it crops** to fill that shape from the centre,
so landscape photos survive and portrait photos lose their top and bottom. Sizes are in
[Image specifications](#image-specifications).

---

## 3. Add pictures to the research slideshow

This is the slideshow of paper figures. It appears twice — beside the *About* paragraphs on
the homepage, and at the top of `/research/`. Both pages use the same file, so **one edit
updates both**.

Each entry is a figure from one of the lab's papers, so adding one usually follows adding
the paper to `_data/publications.yml`. Most use Figure 1; when another figure tells the
story better, preserve its source figure number in the filename.

1. Crop the figure out of the paper's PDF and save it as a **PNG, 1400–2000 px wide, under
   ~500 KB**.
2. Put it in **`assets/img/research/`**, named lowercase and hyphenated ending in
   `-figN.png`, where `N` is its source figure number, e.g. `saint-fig1.png`.
3. Note the PNG's exact pixel width and height — the entry needs them.
4. Open **`_data/research_figures.yml`** and add an entry at the end. The browser shuffles
   the figures on each page load; file order is the fallback when JavaScript is unavailable.
5. Copy `paper`, `url`, and `areas` **verbatim** from that paper's entry in
   `_data/publications.yml`, then write your own `alt` and `caption` and fill in `width`
   and `height`.
6. Save.

This is the real `saint-fig1.png` entry, to copy and edit:

```yaml
- image: /assets/img/research/saint-fig1.png
  alt: >-
    A left-to-right block diagram of a policy network. A circle holding the
    state s and a box labelled Sub-Action Embedding Table both feed a tall
    State Conditioning block, whose state-aware embeddings pass into a
    Transformer Block marked as repeated L times. Its output X enters a dashed
    group marked as repeated for each of the A sub-actions, containing a
    Decision MLP that emits distribution parameters and a Sample Sub-Action
    step that draws sub-action a-i. A Concat block gathers the sampled
    sub-actions into the final action vector a.
  caption: >-
    Self-attention over sub-action embeddings, conditioned on the state, lets
    each sub-action be chosen with the others in view and in no fixed order.
  paper: "SAINT: Attention-Based Policies for Discrete Combinatorial Action Spaces"
  url: "https://arxiv.org/abs/2505.12109"
  areas: [structured-action-spaces]
  width: 1689
  height: 472
```

- **`>-`** lets a long value run over several indented lines; Jekyll joins them back into
  one line. Keep the continuation lines indented as shown.
- **`alt`** — required. It is **not printed on the page**: it exists to be read aloud to
  someone who cannot see the figure, so describe the picture in detail. Quotation marks in
  it are safe — this is the one `alt` the templates escape. See [Alt text](#alt-text).
- **`caption`** — one plain sentence, **about 200 characters**, which comes out at roughly
  two lines on the page. The IsoCompute entry runs to three and is visibly the odd one out.
- **`paper`** and **`url`** — the title and link, copied from `publications.yml`; together
  they make the link under the figure, with the title as the link text. Notice that `paper`
  here is wrapped in **double quotes**, because the title contains `: ` — a colon followed
  by a space is what makes quoting necessary.
- **`areas`** — copied from the paper's own `areas` list. It draws the small area chips
  under the caption. A paper in none of the lab's areas gets `areas: []` and renders no
  chips at all, which is the right answer — the IsoCompute entry does exactly that.
- **`width`** and **`height`** — the PNG's **real pixel dimensions**. They reserve the
  space before the image loads, so the page does not jump. If you replace a PNG, correct
  these.

**What happens:** the figure joins the slideshow on the homepage and on `/research/`. The
slideshow **starts in a random order on each page load**, advances on its own every 12
seconds, and carries a **pause button** beside the arrows. Every figure shares one fixed
frame, and figures are **matted, never cropped**
— a very wide one is centred with space above and below, because cropping a plot would cut
data out of it. The frame is sized to the tallest figure in the set (1483 × 1103), so a
taller one renders narrower than the column rather than cropping; widening the frame means
editing its `aspect-ratio` in `assets/css/style.css`.

Because `paper`, `url`, and `areas` are copied here by hand, **editing a paper's title or
link in `publications.yml` means editing it here too** if that paper has a figure.

---

## 4. Add people

Everything on `/people/` and in the People section of the homepage is rendered from
**`_data/people.yml`**. Nobody is written into a page directly.

The **`group`** field decides where a person appears:

| `group` | Appears | How it renders |
| --- | --- | --- |
| `pi` | Homepage and `/people/` | Large card with a photo |
| `current` | Homepage and `/people/` | Photo tiles in a slideshow, three rows to a page |
| `past` | `/people/` only, as **Alumni** | Compact list: name, level, years, destination |
| `collaborators` | `/people/` only | Photo-card grid |

**`order`** sorts people inside a group, lowest number first. **`name`** is the only field
the templates require, and every other field is simply left out of the page when missing —
but a person with no `group` belongs to no section and therefore appears nowhere, so always
set it.

One thing to expect before it surprises you: **the current-students slideshow is shuffled
on every page load**, so nobody sits permanently at the front and a reload reorders the
tiles. `order` still sets the authored order, which is what the shuffle starts from and
what a visitor with JavaScript turned off sees. Only `current` shuffles; alumni stay in
`order`.

### Add a current student

1. Open **`_data/people.yml`**.
2. Add an entry among the other `group: current` entries, with an `order` number that puts
   it where you want it.
3. Save.

This is a real entry from the file:

```yaml
- name: Avery Example
  group: current
  order: 10
  level: PhD
  blurb: Offline policy learning when the logged data is thin.
  tags:
    - RL
    - Offline RL
  email: avery.example@byu.edu
```

`Avery Example` is one of the placeholders, so the quickest way to add a real student is to
type over one of them. The fields worth knowing:

- **`level`** — the degree level, e.g. `PhD`, `Master's`, `Undergraduate`. It renders as the
  first chip next to the name, outlined rather than filled. Any string works. Wrap it in
  double quotes if it contains an apostrophe, as the file does with `level: "Master's"`.
- **`role`** — an uppercase kicker above the name, e.g. `Principal Investigator`. It is
  redundant with `level`; students usually want one or the other, not both.
- **`blurb`** — two or three sentences on what they work on. Use `>-` for anything longer
  than one line, as in section 3.
- **`tags`** — freeform, see [Tags](#tags) below.
- **`photo`** — see [Headshots](#headshots). A person with no photo gets the ADEPT mark in
  the same square, so you can add someone before you have their picture.

The full set of supported fields is in the **`# TEMPLATE`** block at the bottom of
`_data/people.yml`, which lists every one with a note on what it does. Copy that block,
delete the `#` from the start of each line, and delete the lines you do not need.

A few fields take an **ID or handle, not a URL**: `scholar` (the Google Scholar user ID, or
a full URL if you prefer), `github`, `orcid`, `bluesky`, `twitter`, `linkedin`. `website`,
`cv`, and `email` take a full address. Each one that is present adds a small link under the
person's name; `website` also turns the name itself into a link.

### Add an alum

Alumni are the same file, with `group: past`:

```yaml
- name: Imogen Stub
  group: past
  order: 10
  level: PhD
  years: 2026–2031
  next: Postdoctoral researcher at a research university
```

- **`years`** — the span they were in the lab.
- **`next`** — where they went, shown on the page after the label `NOW`.

Alumni render as a **compact list, not photo cards**, so `photo` and `blurb` are ignored for
this group — adding them does nothing. `website` still works and links the name.

### Delete the placeholder people

The file currently contains invented people so the pages could be built and checked before
there were real ones. They sit under two banners reading
`# PLACEHOLDERS — DELETE OR REPLACE`:

- **Six `current` students**, `Avery Example` through `Tobias Mockup`. Every surname is a
  placeholder word — Example, Placeholder, Sample, Testcase, Fixture, Mockup.
- **Five `past` alumni**, `Imogen Stub` through `Marcus Stand-In` — Stub, Boilerplate,
  Lorem, Ipsum, Stand-In.

To remove them: open `_data/people.yml`, and for each banner, delete the banner comment and
every entry beneath it, stopping before the next banner. Keep the `# TEMPLATE` block at the
end of the file — it is commented out, so it never renders, and it is the easiest thing to
copy from later. Keep the **Taylor W. Killian** entry at the top.

**What happens once they are gone:**

- With no `current` entries, `/people/` shows the **Open positions** recruiting panel where
  the student slideshow was. The homepage carries that panel already, so its People section
  simply loses the student tiles.
- With no `past` entries, the **Alumni** heading and list disappear from `/people/`
  completely. An empty group renders nothing at all, so there is no leftover heading to
  clean up. **Collaborators** behaves the same way — that section is invisible today
  because the group is empty.
- The PI heading is written into both pages, so if you delete the PI entry you get a
  *Principal Investigator* heading with nothing under it. Keep that entry.

### Tags

`tags` are **freeform**. Write whatever describes the work — `RL`, `Healthcare`, `LLMs`,
`Delayed Feedback`, anything — and each one renders as a chip. **A brand-new tag needs no
code change and no registration anywhere.**

`_data/tags.yml` only sets an optional accent colour, keyed by the lowercased tag, so `RL`,
`rl`, and `Rl` all match the `rl:` key. A tag that is not listed there falls back to a
default colour and still looks right. The same file colours the topic chips on the research
pages.

### Headshots

Put the file in **`assets/img/people/`** and reference it from the site root, as the PI's
entry does:

```yaml
- name: Taylor W. Killian
  group: pi
  photo: /assets/img/people/TKillian_Headshot.jpg
  photo_alt: Taylor W. Killian
```

`photo_alt` is optional; without it the alt text is the person's name, which is the right
thing for a plain headshot. Sizes are in [Image specifications](#image-specifications).

---

## 5. Add a publication

**`_data/publications.yml`** is a list of year groups, newest year first, and newest paper
first inside each year.

1. Open **`_data/publications.yml`**.
2. Find the `- year:` group for the paper's year. If that year is not there yet, add a new
   `- year: 2027` group with a `papers:` line under it, above the existing `- year: 2026`
   group.
3. Add the paper as the first entry under `papers:`.
4. Save.

This is a real entry, shown with its year group so you can see the indentation:

```yaml
- year: 2022
  papers:
    - title: "Counterfactually Guided Policy Transfer in Clinical Settings"
      authors: "<strong>Taylor W. Killian</strong>, Marzyeh Ghassemi, Shalmali Joshi"
      venue: "Conference on Health, Inference and Learning (CHIL) 2022"
      featured: false
      areas: [offline-reinforcement-learning, clinical-and-scientific-decision-making]
      links:
        - text: "Paper"
          url: "https://twkillian.github.io/papers/KillianGhassemiJoshi_2022CHIL.pdf"
        - text: "Poster"
          url: "https://twkillian.github.io/papers/KillianGhassemiJoshi_2022CHIL_poster.pdf"
```

- **`title`** and **`authors`** are the only two that always render. `authors` is treated as
  HTML, which is why `<strong>` works — wrap lab members' names in it.
- **`venue`** and **`description`** are optional. `description` is one or two sentences on
  what the paper does; the entry above has none.
- **`links`** is a list of `text` / `url` pairs, so alongside `Paper` and `Code` you can add
  `Website`, `Poster`, `Data`, `Forum`, `Thesis` — whatever the paper has. PDFs hosted on
  the PI's own site need the **full** `https://` URL; they are not files in this repository.
- **`featured: true`** puts the paper in the *Publications · Featured* block on the
  homepage — the short selected list a visitor meets before `/publications/`. `false`
  leaves it on `/publications/` only. **Six papers carry it today**, and that is an
  editorial judgement rather than a setting: the block is only useful while it stays short,
  so flagging a new paper is usually a reason to unflag an older one.
- **`areas`** is explained next.

**What happens:** the paper appears on `/publications/` under its year heading, on each
research-area page named in `areas`, and — if you flagged it — on the homepage.

### `areas` — which research pages list the paper

`areas` is a list of **slugs that must match the filenames in `_research/`**, minus the
`.md`. The five that exist today:

```
clinical-and-scientific-decision-making
delayed-and-unreliable-feedback
irreversibility-and-risk
offline-reinforcement-learning
structured-action-spaces
```

Each research-area page builds its own **Related papers** list by collecting every
publication whose `areas` contains that page's slug. So:

- Adding a slug to a paper is all it takes to make the paper appear on that area's page.
  There is nothing to edit on the page itself.
- A paper with **no `areas`** still appears on `/publications/`, but on no area page. That is
  a normal choice for work outside the lab's themes.
- An area with **no matching papers** shows `Stay tuned!` under *Related papers*. That is
  what `/research/delayed-and-unreliable-feedback/` shows now.
- A misspelled slug matches nothing and fails silently. Copy it from the filename.

---

## Image specifications

**The rule: save an image at about twice the size it is displayed at, and no larger.**
Twice is what a high-resolution screen needs to look sharp; past that, the extra pixels are
weight every visitor downloads and nobody ever sees. The logos the site ships and the PI's
headshot have all been brought down to it. A photo straight off a phone is several thousand
pixels wide and several megabytes — **downscale it before you commit it.** On a Mac,
Preview's *Tools → Adjust Size* is enough.

| Image | Directory | Shape on the page | Save it at | Keep under |
| --- | --- | --- | --- | --- |
| Headshot (PI, students, collaborators) | `assets/img/people/` | Square, **cropped** from the centre to 1:1 | **640 × 640** | ~150 KB |
| Hero header photo | `assets/img/hero/` | Landscape, **cropped** to 3:2 | ~1200 px wide | ~300 KB |
| Research figure | `assets/img/research/` | Any ratio, **never cropped** — matted to fit | 1400–2000 px wide | ~500 KB |

Notes on each:

- **Headshots** are displayed in a fixed square and cropped from the centre, never
  stretched, so a square original is safest — an off-centre face in a wide photo can lose
  an ear. **Square and about 640 × 640 is the whole specification**: the biggest headshot
  on the site is the PI's card at 312 px, and the PI's own file is exactly 640 × 640 at
  60 KB.
- **Hero photos** are cropped to a 3:2 landscape frame about 640 px wide, so ~1200 px wide
  covers a high-resolution screen with room to spare.
- **Research figures** are matted rather than cropped, so they can be any shape; the
  existing nine run from roughly 5:1 to 4:3. They are the exception to the rule above,
  held at 1400–2000 px because plot text and hairlines need the resolution. Keep them as
  PNG — they are plots and line art, which JPEG blurs.

The size ceilings are guidelines, not enforced anywhere. They matter because these images
load on the front page: the first hero photo and the first research figure load
immediately, and the rest load as a visitor pages through the slideshows. The existing
nine figures run 25–248 KB each, about 1.2 MB for the set. The ~500 KB ceiling is the one
written into the header of `_data/research_figures.yml`, and staying well under it is what
keeps the front page quick on a phone.

### Alt text

**Every image needs alt text.** It is the sentence a screen reader speaks in place of the
picture, and it is what shows if the image fails to load. Describe *what is in the picture*
rather than repeating the caption or the title, and do not start with "Image of".

Where it goes:

| Image | Field | Required? |
| --- | --- | --- |
| Hero photo | `alt:` in `_data/hero_slides.yml` | Yes |
| Research figure | `alt:` in `_data/research_figures.yml` | Yes |
| Headshot | `photo_alt:` in `_data/people.yml` | Optional — defaults to the person's name |

A **double quote inside alt text is only safe in `_data/research_figures.yml`**, the one the
template escapes — the SPIN entry quotes a label off its own figure. In the other two, use
single quotes or none.

For a photo, one sentence is enough: *Members of the ADEPT Lab at a whiteboard during a
weekly meeting*. For a plot or a diagram, describe the axes, the shapes, and what they
show, at whatever length that takes — the existing entries in `_data/research_figures.yml`
run several sentences each, and that is the standard to match.

---

## Preview your changes locally

Build the site on your own machine and look at it before pushing.

```bash
cd path/to/byu-adept-lab.github.io
bundle install
bundle exec jekyll serve --watch --host 127.0.0.1 --port 4000
```

Then open **http://127.0.0.1:4000**.

- **Ruby** is pinned to **3.2.2** by the `.ruby-version` file at the repository root.
  [rbenv](https://github.com/rbenv/rbenv) reads that file and selects the right interpreter
  automatically when you `cd` into the directory.
- **`bundle install`** installs the gems into **`vendor/bundle/`** inside the repository,
  not system-wide, because `.bundle/config` sets `BUNDLE_PATH: "vendor/bundle"`. Both
  `vendor/` and `.bundle/` are ignored by git. You only need to run it again if `Gemfile`
  changes.
- **Jekyll is pinned to `~> 3.9`** in `Gemfile` deliberately: that is the version GitHub
  Pages builds with, so what you see locally is what gets published.
- **`--watch`** rebuilds the site every time you save a file, so leave the server running
  while you edit and just refresh the browser. `_config.yml` is the one exception — Jekyll
  does not watch it, so stop the server with `Ctrl-C` and start it again after changing it.

**A server may already be running.** To check:

```bash
lsof -ti:4000
```

If that prints a number, something is already serving on port 4000 — open the browser
rather than starting a second one. Starting a second server on the same port fails with
`Address already in use`.

---

## Publishing

**The repository has not been created or pushed yet, so nothing is deploying right now.**
Once it is on GitHub, this is what will happen.

`.github/workflows/pages.yml` is a GitHub Actions workflow that runs on every push to the
**`main`** branch, and can also be started by hand from the repository's **Actions** tab. It
builds the site with `actions/jekyll-build-pages` and publishes it with
`actions/deploy-pages`. A deploy that is already running is allowed to finish rather than
being cancelled by the next push, so two quick pushes publish in order.

So: **commit, push to `main`, and the site updates itself.** Watch the build under the
**Actions** tab; a red build means the site did not change.

One setting has to be right for any of it to work. Under
**Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**, not
"Deploy from a branch." If that is wrong, the workflow appears to succeed while the
published site never changes.

Because the published build runs on GitHub rather than on your laptop, a broken local Ruby
install does not stop you from publishing.

---

## Troubleshooting

These are the problems that actually came up building the site.

**The build fails with a YAML error and points at a line you just edited.** Almost always
one of three things:

1. **A colon followed by a space inside an unquoted value.** `text: Accepted: great news`
   is read as a label called `text: Accepted`, and the file stops parsing. Either wrap the
   whole value in quotes — `text: 'Accepted: great news'` — or use an em dash instead of the
   colon. This is why some titles in `_data/publications.yml` and
   `_data/research_figures.yml` are in double quotes and others are not.
2. **A tab character.** YAML indentation must be spaces. Some editors insert a tab when you
   press Tab; if a line looks correctly indented but still errors, that is the first thing
   to check.
3. **Indentation that does not line up** with the entries around it. Copy a neighbouring
   entry and type over its values rather than writing one from scratch.

**A date shows up wrong, or an item sorts to the wrong place.** Dates must be `YYYY-MM-DD`.

**An image does not appear.** Check that the path in the YAML file starts with a `/` and
matches the file's real name exactly, including capitalisation — `/assets/img/people/` plus
the filename. The file must actually be in that directory.

**A paper is missing from a research-area page.** Its `areas` list is missing the page's
slug, or the slug is misspelled. The slug is the `_research/` filename without `.md`.

**`Address already in use` when starting the preview server.** A server is already on port
4000. See [Preview your changes locally](#preview-your-changes-locally).

**You changed `_config.yml` and nothing happened.** Restart the preview server.

---

## Other things you may need to add

### A research area

Add a Markdown file to **`_research/`**. The filename becomes both the URL and the slug used
by publication `areas` — `_research/offline-reinforcement-learning.md` is served at
`/research/offline-reinforcement-learning/` — so use a lowercase, hyphenated name. The block
between the `---` lines at the top of the file is its **front matter**, the page's settings.
This is the real front matter of that page:

```markdown
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

The body of the page in Markdown. Use `##` for section headings.
```

`order` sorts the area cards on the homepage and `/research/`, lowest first; the five
existing areas use `1` through `5`, so a sixth would be `order: 6`. `card_title` is the
short label for cards, where the full `title` would wrap badly. `summary` is the text shown
on the cards, so it has to stand alone without the rest of the page. You do not need a
`layout:` line — `_config.yml` applies the research layout to everything in `_research/`
automatically.

Two things do not update themselves when you add an area. The *At a glance* panel on the
homepage says **5** research areas, and that number is typed into `index.html`. The
`description:` lines in `_config.yml` and at the top of `index.html` and `research.html`
also name the five areas. Change those by hand.

### A post

News items are one sentence; a post is anything longer. Add a Markdown file to **`_posts/`**
named **`YYYY-MM-DD-slug.md`**. The date in the filename is what orders it, so it has to be
there and it has to parse.

This is the front matter of the one post that exists, `2026-08-03-the-adept-lab-is-open.md`:

```markdown
---
layout: post
title: The ADEPT Lab is open
eyebrow: Updates &middot; Announcement
framing: A short note on what the lab is for, and who we are looking for.
author: Taylor W. Killian
description: >-
  The ADEPT Lab has opened at BYU Computer Science, working on adaptive,
  person-centered methods for sequential decision-making in messy, high-stakes
  settings. We are recruiting our first students.
---

The post body in Markdown.
```

`layout: post` is required here — posts have no default layout. The post then appears on
`/blog/` on its own. `description` is used for search-engine previews and as the excerpt on
the Updates index; leave it out and the index truncates the opening of the body instead, so
it is worth writing.

### A navigation link

Edit **`_data/nav.yml`**; the order of the list is the order in the navigation bar.

```yaml
- title: Teaching
  url: /teaching/
```

`url` must match the target page's own `permalink` exactly, trailing slash and all, or the
current-page highlight will not light up when you are on that page.

---

## Reference

### Repository layout

```
_config.yml            Site-wide settings: title, URL, PI details, plugins
_data/                 Everything editable as data — start here
_includes/             Reusable page fragments (nav, footer, person card, slideshows)
_layouts/              Page shells: default, page, post, research
_research/             One Markdown file per research area
_posts/                Posts, named YYYY-MM-DD-slug.md
assets/css/style.css   The entire stylesheet, in labelled sections
assets/img/            Logos, the social card, and the people/ hero/ research/ folders
assets/js/             Navigation menu and slideshow paging
index.html             Homepage
research.html  people.html  publications.html  joining.html  news.html  blog.html
.github/workflows/     GitHub Actions deployment
```

If you do need to change how something looks, all of the styling is in
`assets/css/style.css`, which is organised into labelled sections
(`/* === People === */` and so on). Find the right section rather than appending to the
bottom of the file.

`_design-reference/` holds renders of the lab's slide template that the visual design came
from. It is listed under `exclude:` in `_config.yml`, so it never ships to the built site —
it is reference material for humans only. `README.md`, `Gemfile`, `Gemfile.lock`,
`vendor/`, and `.bundle/` are excluded for the same reason.

### Logo and icon files

All of these are in `assets/img/` and are derived from the official artwork. There is no
redrawn or approximated version of the mark — pick the variant whose colour suits the
background it sits on.

| File | When to use it |
| --- | --- |
| `adept-full.png` | The original lockup, navy on white |
| `adept-full-transparent.png` | The navy lockup on a transparent background, for light backgrounds |
| `adept-full-white.png` | White lockup, for navy or dark backgrounds. This is the hero fallback |
| `adept-mark-navy.png` | The mark alone, navy. Stands in for a missing headshot |
| `adept-mark-navy-original.png` | Nothing on the site — the full-resolution original, see below |
| `adept-mark-white.png` | The mark alone, white, for navy or dark backgrounds |
| `byu-wordmark-white.svg` | The university's own monogram — see below |
| `favicon.png`, `apple-touch-icon.png` | Browser tab and iOS home-screen icon |
| `adept-social-card.jpg` | Intended as the preview image for shared links, but **not wired up yet** — see below |

`adept-mark-navy-original.png` looks like clutter and is not. It is the full-resolution
original that the shipped `adept-mark-navy.png` was downscaled from, nothing regenerates
it, and `_config.yml` already excludes it from the published site. **Leave it in the
repository.**

`adept-social-card.jpg` is in the repository and nothing currently points at it, so a link
to the site shared on Slack, Bluesky, or Twitter shows text with no picture. To turn it on,
add one line to `_config.yml`:

```yaml
image: /assets/img/adept-social-card.jpg
```

### The BYU monogram

`byu-wordmark-white.svg` is **not ours**. It is a byte-for-byte copy of the official white
BYU monogram the university serves from its own CDN and uses on
[brand.byu.edu](https://brand.byu.edu) and [cs.byu.edu](https://cs.byu.edu). It appears
once, in the header, as a link to `byu.edu`.

[BYU's brand policy](https://brand.byu.edu/monogram) governs it. The parts that bear on this
site: never recreate or redraw it; use only the approved colours, navy on light or white on
dark, and do not tint it; keep clear space around it; and do not stretch it — the file's
`width`/`height` carry its 80 × 23 ratio, so set `width` alone and let the height follow.
It has a **56 px minimum width**, which is why the header renders it at 72 px, steps to
60 px on small screens, and drops it entirely below 360 px rather than going under the
minimum.
