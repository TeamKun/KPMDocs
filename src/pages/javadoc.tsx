import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import JavadocCards from "@site/src/components/JavadocCards";
import { useLocation } from 'react-router-dom';
import javadocs from "@site/javadocs.json";


function redirectMode(params: URLSearchParams) {
    const pkg = params.has("package") ? params.get("package") : null
    let version = params.has("version") ? params.get("version") : null
    const clazz = params.has("class") ? params.get("class") : null
    const method = params.has("method") ? params.get("method") : null

    if (!version || version === "latest")
        version = javadocs[javadocs.length - 1].version

    let refPath = `/javadoc/${version}/index.html?`

    if (pkg) {
        refPath+= pkg.replace(/\./g, "/")
        if (!clazz)
            refPath += "/package-summary.html"
    }

    if (clazz)
        refPath += `/${clazz}.html`

    if (method)
        refPath += "#" + method.replace("(", "-").replace(")", "-")

    window.location.replace(refPath)  // redirect to javadoc without saving history of this redirect page


    return <div>Redirecting...</div>
}

export default function Javadoc(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    if (query.has("redirect") && query.get("redirect") === "1" || query.get("redirect") === "true")
        return redirectMode(query)
    
    return (
        <Layout title={siteConfig.title} description="TeamKUNPluginManager - 最も高度なプラグイン管理ツール">
        <main>
            <JavadocCards />
        </main>
        </Layout>
    )
}
