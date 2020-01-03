(ns akap-browser.details.event-dispatch
  (:require [re-frame.core :as rf]
            [clojure.string :as str]))

;; -- Domino 1 - Event Dispatch -----------------------------------------------

(defn dispatch-new-node-data
  [k v]
  (rf/dispatch [:new-node-data k v]))

(defn dispatch-claim-node
  [e]
  (rf/dispatch [:claim-node])
  (.preventDefault e))
