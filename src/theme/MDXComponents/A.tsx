
import type { Props } from "@theme/MDXComponents/A"
import React from "react";
import Link from "@docusaurus/Link";

const parseJavadocLink = (link) => {
    let javadocLink = link.substring(8, link.indexOf("?"));

    const regex = /^(?<packageName>[a-z.]+(?<!\.))(\.(?<className>(([A-Z$][a-zA-Z$]*)(\.)?)+))?(?<methodWithArgument>[a-z][a-zA-Z]*\(.*\))?$/

    const match = javadocLink.match(regex)

    if (match === null) {
        return null
    }

    const packageName = match.groups.packageName

    let className = match.groups.className
    if (className && className.endsWith("."))
        className = className.substring(0, className.length - 1)

    const methodWithArgument = match.groups.methodWithArgument

    return {
        pkg: packageName,
        clazz: className,
        method: methodWithArgument
    }
}

const buildJavadocURL = (pkg: string, clazz?: string, method?: string, version?: string) => {
    let path = "/javadoc?redirect=1"

    if (version)
        path += "&version=" + version

    path += "&package=" + pkg

    if (clazz)
        path += "&class=" + clazz

    if (method)
        path += "&method=" + method

    return path
}

export default function MDXA(props: Props): JSX.Element {
    let link = props.href;
    let text = props.children;

    if (link.startsWith("javadoc:")) {
        const parsed = parseJavadocLink(link)
        if (!parsed) {
            return <span dangerouslySetInnerHTML={{
                __html: `<a href="javascript:alert('Invalid javadoc link');" style="text-decoration: line-through">${props.children}</a>`
            }} />
        }

        const { pkg, clazz, method } = parsed

        const query = new URLSearchParams(link.substring(link.indexOf("?") + 1))
        const version = query.has("version") ? query.get("version") : undefined

        link = buildJavadocURL(pkg, clazz, method, version)

        if (!text)
            text = clazz ? clazz + (method ? "." + method : "") : pkg
    }

    return <Link {...props} to={link}>{text}</Link>
}
