(ns akap-browser.server.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.util.response :as response]))

(defn index-file
  []
  (-> (response/resource-response "index.html" {:root "public"})
      (response/content-type "text/html")))

(defn browser-file
  []
  (-> (response/resource-response "browser.html" {:root "public"})
      (response/content-type "text/html")))

(defn details-file
  []
  (-> (response/resource-response "details.html" {:root "public"})
      (response/content-type "text/html")))

(defroutes app-routes
           (GET "/" [] (index-file))

           (GET "/browser" [] (browser-file))

           (GET "/browser/*" [] (details-file))

           (route/resources "/" {:root "public"})
           (route/not-found "Not Found"))

(def dev-app (wrap-reload (wrap-defaults #'app-routes site-defaults)))
