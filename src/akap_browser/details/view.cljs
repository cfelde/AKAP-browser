(ns akap-browser.details.view
  (:require [clojure.string :as str]
            [re-frame.core :as rf]
            [goog.string.format]
            [akap-browser.details.event-dispatch :as d]))

;; -- Domino 5 - View Functions ----------------------------------------------

(defn header
  []
  [:div#header
   [:h1 "AKAP node details"]])

(defn node-details
  []
  (let [node-hash (or @(rf/subscribe [:db :node-data :node-hash]) "")
        parent-hash (or @(rf/subscribe [:db :node-data :parent-hash]) "")
        owner-address (or @(rf/subscribe [:db :node-data :owner-address]) "")
        expiry @(rf/subscribe [:db :node-data :expiry])
        expiry (if expiry (js/Date. (* 1000 expiry)) "")
        see-also (or @(rf/subscribe [:db :node-data :see-also]) "")
        see-address (or @(rf/subscribe [:db :node-data :see-address]) "")
        node-body (or @(rf/subscribe [:db :node-data :node-body]) "")
        token-uri (or @(rf/subscribe [:db :node-data :token-uri]) "")
        is-approved (or @(rf/subscribe [:db :node-data :is-approved]) "")

        new-see-also @(rf/subscribe [:db :new-node-data :see-also])
        new-see-address @(rf/subscribe [:db :new-node-data :see-address])
        new-node-body @(rf/subscribe [:db :new-node-data :node-body])
        new-token-uri @(rf/subscribe [:db :new-node-data :token-uri])

        updated-see-also (and new-see-also (not= see-also new-see-also))
        updated-see-address (and new-see-address (not= see-address new-see-address))
        updated-node-body (and new-node-body (not= node-body new-node-body))
        updated-token-uri (and new-token-uri (not= token-uri new-token-uri))

        see-also (or new-see-also see-also)
        see-address (or new-see-address see-address)
        node-body (or new-node-body node-body)
        token-uri (or new-token-uri token-uri)]

    [:div#node-details.container
     [:div.row
      [:div.col
       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Node hash"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only true
                  :id "node-hash"
                  :value node-hash}]]]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Parent hash"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only true
                  :id "parent-hash"
                  :value parent-hash}]]
        [:button {:type "submit"
                  :class "btn btn-primary mb-2"}
         "View"]]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Owner address"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only true
                  :id "owner-address"
                  :value owner-address}]]]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Expiry"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only true
                  :id "expiry"
                  :value expiry}]]
        (when is-approved
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"}
           "Reclaim"])]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "See also"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only (not is-approved)
                  :id "see-also"
                  :value see-also
                  :on-change #(d/dispatch-new-node-data :see-also (-> % .-target .-value))}]]
        (when updated-see-also
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"}
           "Save"])]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "See address"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only (not is-approved)
                  :id "see-address"
                  :value see-address
                  :on-change #(d/dispatch-new-node-data :see-address (-> % .-target .-value))}]]
        (when updated-see-address
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"}
           "Save"])]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Node body"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only (not is-approved)
                  :id "node-body"
                  :value node-body
                  :on-change #(d/dispatch-new-node-data :node-body (-> % .-target .-value))}]]
        (when updated-node-body
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"}
           "Save"])]

       [:form.form-inline
        [:div.input-group.mb-2.mr-sm-2
         [:div.input-group-prepend
          [:div.input-group-text "Token URI"]]
         [:input {:type "text"
                  :class "form-control"
                  :read-only (not is-approved)
                  :id "token-uri"
                  :value token-uri
                  :on-change #(d/dispatch-new-node-data :token-uri (-> % .-target .-value))}]]
        (when updated-token-uri
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"}
           "Save"])]]]]))

(defn loading-node
  []
  [:div [:div#node-not-found "Loading.."]])

(defn node-claim
  []
  [:div
   [:div#node-not-found
    (str "No node on " @(rf/subscribe [:db :node-hash]))]
   (when (= @(rf/subscribe [:db :node-hash]) @(rf/subscribe [:db :calc-node-hash]))
     [:div#claim-node
      [:button {:type "button"
                :class "btn btn-primary"
                :disabled @(rf/subscribe [:db :saving])
                :on-click d/dispatch-claim-node}
       (if @(rf/subscribe [:db :saving])
         [:span {:class "spinner-border spinner-border-sm"
                 :role "status"
                 :aria-hidden "true"}]
         "Claim this node")]])])

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

  (when (and @(rf/subscribe [:db :handler]) (not @(rf/subscribe [:db :loaded])))
    [loading-node])

  (when (and @(rf/subscribe [:db :handler]) @(rf/subscribe [:db :loaded]))
    (if @(rf/subscribe [:db :node-data :node-hash])
      [node-details]
      [node-claim]))

  (when @(rf/subscribe [:db :no-provider])
    [no-provider])

  [footer-clearance]
  [footer]])

