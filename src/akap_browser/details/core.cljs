(ns akap-browser.details.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as rf]
              [akap-browser.details.event-dispatch :as ed]
              [akap-browser.details.event-handlers :as eh]
              [akap-browser.details.query :as q]
              [akap-browser.details.view :as v]))

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
