(ns akap-browser.details.query
  (:require [re-frame.core :as rf]))

;; -- Domino 4 - Query  -------------------------------------------------------

(rf/reg-sub
  :db
  (fn [db [_ & keys]]
    (get-in db keys)))
