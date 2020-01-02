(ns akap-browser.browser.event-dispatch
  (:require [re-frame.core :as rf]
            [clojure.string :as str]))

;; -- Domino 1 - Event Dispatch -----------------------------------------------

(defn dispatch-form-data
  [k v]
  (rf/dispatch [:form-data k v]))

(defn dispatch-lookup-1
  [e]
  (rf/dispatch [:lookup-1])
  (.preventDefault e))

(defn dispatch-lookup-2
  [e]
  (rf/dispatch [:lookup-2])
  (.preventDefault e))
