#!/usr/bin/env msu

# modules
msu_require "console"

# module variables
pid_jekyll_web=
pid_jekyll_admin=

log "starting jekyll incremental builds"
jekyll build --source web --quiet --incremental --watch &
pid_jekyll_web=$!
jekyll build --source admin --quiet --incremental --watch &
pid_jekyll_admin=$!

log "starting app in development mode"
export NODE_ENV=development
export DEBUG="mtc-ke:*"
nodemon app.js

log "cleaning up"
kill -KILL ${pid_jekyll_web} ${pid_jekyll_admin}
