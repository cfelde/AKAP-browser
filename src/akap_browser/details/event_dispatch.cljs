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

(defn dispatch-view-parent
  [e]
  (rf/dispatch [:view-parent])
  (.preventDefault e))

(defn dispatch-save-node-attribute
  [k e]
  (rf/dispatch [:save-node-attribute k])
  (.preventDefault e))
