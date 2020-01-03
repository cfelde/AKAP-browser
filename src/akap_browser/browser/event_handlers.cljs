(ns akap-browser.browser.event-handlers
  (:require [clojure.string :as str]
            [day8.re-frame.http-fx]
            [re-frame.core :as rf]
            [promesa.core :as p :include-macros true]))

;; -- Domino 2 - Event Handlers -----------------------------------------------

(rf/reg-fx
  :exec-lookup-1
  (fn [[handler node-hash]]
    (let [node-hash (if (or (nil? node-hash) (empty? (str/trim node-hash))) "" (str/trim node-hash))]
      (if (.hashCheck handler node-hash)
        (set! (.. js/window -location -href) (str "/browser/" node-hash))))))

(rf/reg-fx
  :exec-lookup-2
  (fn [[handler parent-hash node-label]]
    (let [parent-hash (if (or (nil? parent-hash) (empty? (str/trim parent-hash))) "0x0" (str/trim parent-hash))]
      (p/let [result (p/promise (.hashOf handler parent-hash node-label))]
        (if result (set! (.. js/window -location -href) (str "/browser/" result "?p=" parent-hash "&l=" node-label)))))))

(rf/reg-event-fx
  :initialize
  (fn [_ _]
    {:db {:provider nil
          :handler nil
          :no-provider false
          :form-data {:node-hash nil
                      :parent-hash nil
                      :node-label nil}}}))

(rf/reg-event-fx
  :inject-provider
  (fn [{:keys [db]} [_ provider]]
    {:db (assoc db :provider provider
                   :handler (js/Handler. provider))}))

(rf/reg-event-fx
  :no-provider
  (fn [{:keys [db]} _]
    {:db (assoc db :no-provider true)}))

(rf/reg-event-fx
  :form-data
  (fn [{:keys [db]} [_ k v]]
    {:db (assoc-in db [:form-data k] v)}))

(rf/reg-event-fx
  :lookup-1
  (fn [{:keys [db]} _]
    (if-let [handler (:handler db)]
      {:db db
       :exec-lookup-1 [handler (-> db :form-data :node-hash)]}
      {:db db})))

(rf/reg-event-fx
  :lookup-2
  (fn [{:keys [db]} _]
    (if-let [handler (:handler db)]
      {:db db
       :exec-lookup-2 [handler (-> db :form-data :parent-hash) (-> db :form-data :node-label)]}
      {:db db})))
