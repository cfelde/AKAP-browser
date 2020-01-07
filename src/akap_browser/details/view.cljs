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
        is-approved @(rf/subscribe [:db :node-data :is-approved])

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
        token-uri (or new-token-uri token-uri)

        have-calc-node-hash (= @(rf/subscribe [:db :node-hash]) @(rf/subscribe [:db :calc-node-hash]))
        saving @(rf/subscribe [:db :saving])
        handler @(rf/subscribe [:db :handler])]

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
                  :class "btn btn-primary mb-2"
                  :disabled saving
                  :on-click d/dispatch-view-parent}
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
        (when (and is-approved have-calc-node-hash)
          [:button {:type "submit"
                    :class "btn btn-primary mb-2"
                    :disabled saving
                    :on-click d/dispatch-claim-node}
           (if (= :claim saving)
             [:span {:class "spinner-border spinner-border-sm"
                     :role "status"
                     :aria-hidden "true"}]
             "Reclaim")])]

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
                    :class "btn btn-primary mb-2"
                    :disabled saving
                    :on-click (partial d/dispatch-save-node-attribute :see-also)}
           (if (= :see-also saving)
             [:span {:class "spinner-border spinner-border-sm"
                     :role "status"
                     :aria-hidden "true"}]
             "Save")])]

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
                    :class "btn btn-primary mb-2"
                    :disabled (or saving (not (.addressCheck handler see-address)))
                    :on-click (partial d/dispatch-save-node-attribute :see-address)}
           (if (= :see-address saving)
             [:span {:class "spinner-border spinner-border-sm"
                     :role "status"
                     :aria-hidden "true"}]
             "Save")])]

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
                    :class "btn btn-primary mb-2"
                    :disabled saving
                    :on-click (partial d/dispatch-save-node-attribute :node-body)}
           (if (= :node-body saving)
             [:span {:class "spinner-border spinner-border-sm"
                     :role "status"
                     :aria-hidden "true"}]
             "Save")])]

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
                    :class "btn btn-primary mb-2"
                    :disabled saving
                    :on-click (partial d/dispatch-save-node-attribute :token-uri)}
           (if (= :token-uri saving)
             [:span {:class "spinner-border spinner-border-sm"
                     :role "status"
                     :aria-hidden "true"}]
             "Save")])]]]]))

(defn node-events
  []
  (letfn [(render-attribute
            [[key value]]
            [:div.event-row {:key (gensym)} [:div.event-attribute-key key ":"] [:div.event-attribute-value value]])
          (render-event
            [event]
            [:div.event
             {:key (gensym)}
             [:div.event-row [:div.event-attribute-key "Event type:"] [:div.event-attribute-value (nth event 0)]]
             [:div.event-row [:div.event-attribute-key "Block number:"] [:div.event-attribute-value (nth event 1)]]
             [:div.event-row [:div.event-attribute-key "Transaction hash:"] [:div.event-attribute-value (nth event 2)]]
             (map render-attribute (->> event (drop 3) (partition 2)))])]
    (let [events @(rf/subscribe [:db :node-events])]
      (if (empty? events)
        [:div#node-events
         [:div.separator [:div "No recent events on this node"]]]
        [:div#node-events
         [:div.separator [:div "Events on this node within last 30 days"]]
         (map render-event events)]))))

(defn loading-node
  []
  [:div [:div#node-not-found "Loading.."]])

(defn node-claim
  []
  [:div
   [:div#node-not-found
    (str "No node on " @(rf/subscribe [:db :node-hash]))]
   (when (and (= @(rf/subscribe [:db :node-hash]) @(rf/subscribe [:db :calc-node-hash]))
              (or (= "0x0" @(rf/subscribe [:db :parent-hash])) @(rf/subscribe [:db :is-parent-owner])))
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
      [:div
       [node-details]
       [node-events]]
      [node-claim]))

  (when @(rf/subscribe [:db :no-provider])
    [no-provider])

  [footer-clearance]
  [footer]])

