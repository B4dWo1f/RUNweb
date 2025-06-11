```
rbenv install 3.2.3
rbenv global 3.2.3
```

Uuse a `.ruby-version` file to lock the ruby version:
```
.ruby-version
3.2.3
```

Use `bundler` to manage dependencies cleanly:
```
gem install bundler
```

with `Gemfile`:
```
source "https://rubygems.org"
gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.7"  # Needed for Ruby >= 3.0
```

Install gems locally:
```
bundle config set --local path 'vendor/bundle'
bundle install
```

Build or serve:
```
bundle exec jekyll build
bundle exec jekyll serve
```

To deploy `bin/deploy_website.sh`
```
#!/bin/bash

set -e  # Exit on error

JEKYLL_DIR="$HOME/CODES/web/RUNweb"
PUBLIC_DIR="/var/www/html/RUNweb"
LOGFILE="$HOME/jekyll_build.log"
ERRFILE="$HOME/jekyll_build.err"
RBENV_VERSION="3.2.3"

# Ensure correct Ruby version
export RBENV_VERSION="$RBENV_VERSION"
eval "$(rbenv init - bash)"

echo "🕓 $(date)" >> "$LOGFILE"

(
   cd "$JEKYLL_DIR"

   # Optional: check Ruby and Bundler version
   echo "Using Ruby: $(ruby -v)" >> "$LOGFILE"
   echo "Using Bundler: $(bundle -v)" >> "$LOGFILE"

   # Build the site
   # Inside cd "$JEKYLL_DIR"
   bundle config set --local path 'vendor/bundle'
   bundle install >> "$LOGFILE" 2>> "$ERRFILE"
   bundle exec jekyll build >> "$LOGFILE" 2>> "$ERRFILE"

   # Ensure destination exists
   mkdir -p "$PUBLIC_DIR"

   # Link the site contents
   ln -fs "$JEKYLL_DIR/_site/"* "$PUBLIC_DIR/"

   # Link plots (if not already there)
   ln -sfn /storage/PLOTS/Spain6_1/ "$PUBLIC_DIR/assets/images/Spain6_1"
)

echo "✅ Site deployed successfully at $(date)" >> "$LOGFILE"
```
