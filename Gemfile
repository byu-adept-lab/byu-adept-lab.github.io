source "https://rubygems.org"

# Matches the gem set that actions/jekyll-build-pages runs in CI, so a local build
# and the deployed build stay in step. See .github/workflows/pages.yml.
gem "jekyll", "~> 3.9"
gem "webrick", "~> 1.8"

# _config.yml sets `kramdown: input: GFM`. Jekyll 4 bundles this parser; Jekyll 3.x
# does not, so it has to be requested explicitly.
gem "kramdown-parser-gfm", "~> 1.1"

group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end
