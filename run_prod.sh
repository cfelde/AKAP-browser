#!/usr/bin/env bash

# This will build in prod mode and start serving content on port 3000
lein do clean, cljsbuild once min-browser min-details, ring server
