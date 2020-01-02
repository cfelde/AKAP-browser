(ns akap-browser.browser.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as rf]
              [akap-browser.browser.event-dispatch :as ed]
              [akap-browser.browser.event-handlers :as eh]
              [akap-browser.browser.query :as q]
              [akap-browser.browser.view :as v]))

(defn on-js-reload
  [])

(defn ^:export inject-provider
  [provider]
  (when provider
    (rf/dispatch [:inject-provider provider]))
  (when (not provider)
    (rf/dispatch [:no-provider])))

(defn ^:export run
  []
  (rf/dispatch-sync [:initialize])
  (reagent/render [v/ui] (js/document.getElementById "app")))
