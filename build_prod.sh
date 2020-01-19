#!/usr/bin/env bash

# This will build in prod mode
lein do clean, cljsbuild once min-browser min-details
