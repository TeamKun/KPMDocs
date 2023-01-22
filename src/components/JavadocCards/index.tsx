import styles from "./styles.module.css"
import Link from "@docusaurus/Link";
import React from "react";
import javadocs from "@site/javadocs.json"

interface JavadocItem {
    version: string;
    releaseDate: number;
    mainFeatures: string[];
}


function JavadocCard(props: JavadocItem) {

    const releasedDate = new Date(props.releaseDate * 1000)
    const timeZoneOffset = releasedDate.getTimezoneOffset() * -1
    const isPositiveTZ = !timeZoneOffset.toString().startsWith("-")
    const offsetString = "UTC" + (isPositiveTZ ? "+": "") + (timeZoneOffset / 60)
    const releasedDateString = `${releasedDate.toLocaleDateString()} ${releasedDate.toLocaleTimeString('ja-JP')} ${offsetString}`

    return (
        <div className={styles.javadocCard}>
            <div>
                <h3>{props.version}</h3>
                <span>Primary changes:</span>
                <ul>
                    {props.mainFeatures.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.javadocLink}>
                <Link className={"button button--primary button--lg"} href={"/javadoc?redirect=1&version=" + props.version}>
                    Jump!
                </Link>
                <p className={styles.releaseDate}>(Released on {releasedDateString})</p>
            </div>
        </div>
    );
}


export default function JavadocCards(): JSX.Element {
    return (
        <>
            <section className={styles.javadocs}>
                <div className={"container " + styles.javadocView}>
                    <h2>The Javadoc of TeamKUNPluginManager</h2>
                    {javadocs.map((props, idx) => (
                        <JavadocCard key={idx} {...props} />
                    ))}
                </div>
            </section>
            <footer className={styles.javadocsFooter}>
                <p>
                    <span>注：このページからリンクされている Javadoc ページは、ダークモードに対応していません！ </span>
                </p>
            </footer>
        </>
    )
}
