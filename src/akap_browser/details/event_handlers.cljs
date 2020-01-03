(ns akap-browser.details.event-handlers
  (:require [clojure.string :as str]
            [day8.re-frame.http-fx]
            [re-frame.core :as rf]
            [promesa.core :as p :include-macros true]))

;; -- Domino 2 - Event Handlers -----------------------------------------------

(rf/reg-fx
  :exec-load-details
  (fn [[handler node-hash]]
    (p/let [result (p/promise (.loadDetails handler node-hash))]
      (if result
        (do
          (rf/dispatch [:node-hash node-hash])
          (doall (map #(rf/dispatch [:node-data (first %) (second %)]) (js->clj result :keywordize-keys true)))
          (rf/dispatch [:loaded true]))
        (set! (.. js/window -location -href) "/browser")))))

(rf/reg-fx
  :exec-calc-node-hash
  (fn [[handler parent-hash node-label]]
    (if (and parent-hash node-label)
      (p/let [result (p/promise (.hashOf handler parent-hash node-label))]
        (if result (rf/dispatch [:calculated-node-hash result]))))))

(rf/reg-fx
  :exec-claim-node
  (fn [[handler parent-hash node-label]]
    (if (and parent-hash node-label)
      (p/let [result (p/promise (.claim handler parent-hash node-label))]
       (if result (js/window.location.reload))))))

(rf/reg-event-fx
  :initialize
  (fn [_ _]
    (letfn [(url-node-hash
              []
              (str/replace-first js/window.location.pathname "/browser/" ""))
            (url-parent-hash
              []
              (.get (js/URLSearchParams. js/window.location.search) "p"))
            (url-node-label
              []
              (.get (js/URLSearchParams. js/window.location.search) "l"))]

      {:db {:provider nil
            :handler nil
            :no-provider false

            :loaded false
            :saving false

            :raw-node-hash (url-node-hash)
            :node-hash nil

            :parent-hash (url-parent-hash)
            :node-label (url-node-label)
            :calc-node-hash nil

            :node-data {:node-hash nil
                        :parent-hash nil
                        :owner-address nil
                        :expiry nil
                        :see-also nil
                        :see-address nil
                        :node-body nil
                        :token-uri nil
                        :is-approved false}

            :new-node-data {:see-also nil
                            :see-address nil
                            :node-body nil
                            :token-uri nil}}})))

(rf/reg-event-fx
  :inject-provider
  (fn [{:keys [db]} [_ provider]]
    (let [handler (js/Handler. provider)]
      {:db (assoc db :provider provider
                     :handler handler)
       :exec-load-details [handler (:raw-node-hash db)]
       :exec-calc-node-hash [handler (:parent-hash db) (:node-label db)]})))

(rf/reg-event-fx
  :no-provider
  (fn [{:keys [db]} _]
    {:db (assoc db :no-provider true)}))

(rf/reg-event-fx
  :loaded
  (fn [{:keys [db]} [_ v]]
    {:db (assoc db :loaded v)}))

(rf/reg-event-fx
  :node-hash
  (fn [{:keys [db]} [_ v]]
    {:db (assoc db :node-hash v)}))

(rf/reg-event-fx
  :calculated-node-hash
  (fn [{:keys [db]} [_ v]]
    {:db (assoc db :calc-node-hash v)}))

(rf/reg-event-fx
  :node-data
  (fn [{:keys [db]} [_ k v]]
    {:db (assoc-in db [:node-data k] v)}))

(rf/reg-event-fx
  :new-node-data
  (fn [{:keys [db]} [_ k v]]
    (if (-> db :node-data :is-approved)
      {:db (assoc-in db [:new-node-data k] v)}
      {:db db})))

(rf/reg-event-fx
  :claim-node
  (fn [{:keys [db]} _]
    {:db (assoc db :saving true)
     :exec-claim-node [(:handler db) (:parent-hash db) (:node-label db)]}))