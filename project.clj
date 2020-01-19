(defproject akap-browser "0.1.0-SNAPSHOT"
  :description "AKAP node browser"
  :url "https://akap.me/browser"
  :license {:name "Apache License Version 2.0"
            :url "http://www.apache.org/licenses/"}

  :min-lein-version "2.9.1"

  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/clojurescript "1.10.520"]
                 [reagent  "0.8.1"]
                 [reagent-utils "0.3.3"]
                 [re-frame "0.10.9"]
                 [day8.re-frame/http-fx "0.1.6"]
                 [funcool/promesa "4.0.2"]

                 ; Server side stuff
                 [ring "1.8.0"]
                 [ring/ring-defaults "0.3.2"]
                 [compojure "1.6.1"]]

  :plugins [[lein-figwheel "0.5.19"]
            [lein-cljsbuild "1.1.7" :exclusions [[org.clojure/clojure]]]
            [lein-ring "0.12.5"]]

  :source-paths ["src"]

  :cljsbuild {:builds
              [{:id "dev-browser"
                :source-paths ["src"]

                :figwheel {:on-jsload "akap-browser.browser.core/on-js-reload"
                           :open-urls ["http://localhost:3449/"]}

                :compiler {:main akap-browser.browser.core
                           :asset-path "/_js/compiled/out_browser"
                           :output-to "resources/public/_js/compiled/akap_browser.js"
                           :output-dir "resources/public/_js/compiled/out_browser"
                           :source-map-timestamp true
                           :preloads [devtools.preload]}}

               {:id "min-browser"
                :source-paths ["src"]
                :compiler {:output-to "resources/public/_js/compiled/akap_browser.js"
                           :output-dir "target/out_browser_min"
                           :main akap-browser.browser.core
                           :optimizations :advanced
                           :pretty-print false
                           :externs ["externs/externs.js"]}}

               {:id "dev-details"
                :source-paths ["src"]

                :figwheel {:on-jsload "akap-browser.details.core/on-js-reload"}

                :compiler {:main akap-browser.details.core
                           :asset-path "/_js/compiled/out_details"
                           :output-to "resources/public/_js/compiled/akap_details.js"
                           :output-dir "resources/public/_js/compiled/out_details"
                           :source-map-timestamp true
                           :preloads [devtools.preload]}}

               {:id "min-details"
                :source-paths ["src"]
                :compiler {:output-to "resources/public/_js/compiled/akap_details.js"
                           :output-dir "target/out_details_min"
                           :main akap-browser.details.core
                           :optimizations :advanced
                           :pretty-print false
                           :externs ["externs/externs.js"]}}]}

  :ring {:handler akap-browser.server.handler/dev-app}

  :figwheel {:css-dirs ["resources/public/_css"]
             :ring-handler akap-browser.server.handler/dev-app}

  :profiles {:dev {:dependencies [[binaryage/devtools "0.9.10"]
                                  [figwheel-sidecar "0.5.19"]]
                   :source-paths ["src" "dev"]
                   :clean-targets ^{:protect false} ["resources/public/_js/compiled"
                                                     :target-path]}})
