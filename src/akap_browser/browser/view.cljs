(ns akap-browser.browser.view
  (:require [clojure.string :as str]
            [re-frame.core :as rf]
            [goog.string.format]
            [akap-browser.browser.event-dispatch :as d]))

;; -- Domino 5 - View Functions ----------------------------------------------

(defn header
  []
  [:div#header
   [:h1 "AKAP node browser"]])

(defn node-hash-form
  []
  (let [node-hash @(rf/subscribe [:db :form-data :node-hash])]
    [:div#node-hash-form.container
     [:div.row
      [:div.col
       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Node hash"]]
         [:input {:type "text"
                  :class "form-control"
                  :id "node-hash"
                  :placeholder "Node hash: 0x1234..."
                  :value node-hash
                  :on-change #(d/dispatch-form-data :node-hash (-> % .-target .-value))}]]
        [:button {:type "submit"
                  :class "btn btn-primary mb-2"
                  :disabled (not (and (str/starts-with? (str/trim (or node-hash "")) "0x") (<= 3 (count (str/trim (or node-hash ""))))))
                  :on-click d/dispatch-lookup-1}
         "Lookup"]]]]]))

(defn parent-hash-form
  []
  [:div#parent-hash-form.container
   [:div.row
    [:div.col
     [:form.form-inline
      [:div.input-group.mb-2.mr-sm-2
       [:div.input-group-prepend
        [:div.input-group-text "Parent hash"]]
       [:input {:type "text"
                :class "form-control"
                :id "parent-hash"
                :placeholder "Parent hash: 0x1234... or blank if root"
                :value @(rf/subscribe [:db :form-data :parent-hash])
                :on-change #(d/dispatch-form-data :parent-hash (-> % .-target .-value))}]]]]]])

(defn node-label-form
  []
  (let [node-label @(rf/subscribe [:db :form-data :node-label])]
    [:div#node-label-form.container
     [:div.row
      [:div.col
       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Node label"]]
         [:input {:type "text"
                  :class "form-control"
                  :id "parent-hash"
                  :placeholder "Node label"
                  :value node-label
                  :on-change #(d/dispatch-form-data :node-label (-> % .-target .-value))}]]
        [:button {:type "submit"
                  :class "btn btn-primary mb-2"
                  :disabled (not (<= 1 (count node-label) 32))
                  :on-click d/dispatch-lookup-2}
         "Lookup"]]]]]))

(defn form-separator
  []
  [:div#form-separator
   [:div "or"]])

(defn no-provider
  []
  (when @(rf/subscribe [:db :no-provider])
    [:div#no-provider
     [:div "It doesn't look like your web browser is Ethereum enabled!"]
     [:div "But don't worry! It's easy to get started, just install one of the below plugins:"]
     [:div#plugins
      [:div#dapper [:a {:href "https://www.meetdapper.com/" :target "_blank"} [:img {:src "/_img/dapper-logo.png"}]]]
      [:div#metamask [:a {:href "https://metamask.io/" :target "_blank"} [:img {:src "/_img/metamask-logo.png"}]]]]
     [:div "If you're new to blockchain and Ethereum, Dapper is probably your easier option. If you already have Ether, then you should try MetaMask."]]))

(defn footer-clearance
  []
  [:div#footer-clearance])

(defn footer
  []
  [:div#footer
   [:a {:href "https://akap.me"} "AKA protocol"]
   ", the LDAP of "
   [:a {:href "https://www.ethereum.org"} "Ethereum"]
   ", is "
   [:a {:href "https://github.com/cfelde/akap"} "open source software"]
   ". Copyright 2020, all rights reserved."])

(defn ui
 []
 [:div#ui
  [header]
  (when @(rf/subscribe [:db :handler])
    [:div
     [node-hash-form]
     [form-separator]
     [parent-hash-form]
     [node-label-form]])
  (when @(rf/subscribe [:db :no-provider])
    [no-provider])
  [footer-clearance]
  [footer]])

