// import javadocs from "../javadocs.json"

import * as path from "path";

const javadocs = [
    {
        "version": "v3.0.0-pre8",
        "releaseDate": 1672336880,
        "mainFeatures": [
            "JavaDoc 初期バージョン",
            "KPM 自己アップグレーダ"
        ]
    },
    {
        "version": "v3.0.0-pre9",
        "releaseDate": 1674536840,
        "mainFeatures": [
            "**モジュールの細分化**",
            "KPM Registry の実装",
            "デバッグ用プロパティ"
        ]
    },
    {
        "version": "v3.0.0-pre10",
        "releaseDate": 1676812830,
        "mainFeatures": [
            "**多言語化**",
            "関西弁"
        ]
    },
    {
        "version": "v3.0.0",
        "releaseDate": 1677753951,
        "mainFeatures": [
            "KPM v3 正式リリース"
        ]
    }
]

const TARGET_REPO = "https://github.com/TeamKUN/TeamKUNPluginManager"
const TARGET_VERSIONS = javadocs.map((javadoc) => javadoc.version)
const DEST_DIR = "static/javadoc"

const git = require("simple-git")
const fs = require("fs")
const child_process = require("child_process")

const temp_dir = "javadoc_temp"
const destOrigin = `${temp_dir}/target_origin`

const isWindows = process.platform === "win32"
const MAVEN_COMMAND = isWindows ? "mvn.cmd" : "mvn"


const init = async () => {
    fs.mkdirSync(temp_dir)
    await git().clone(TARGET_REPO, destOrigin)
}

const attach_process = (proc): Promise<void> => {
    proc.stdout.on("data", (data) => {
        process.stdout.write(data.toString());
    });

    proc.stderr.on("data", (data) => {
        process.stderr.write(data.toString());
    });

    proc.on("close", (code) => {
        console.log(`Process exited with code ${code}`);
    });

    // Wait for process to exit
    return new Promise((resolve, reject) => {
        proc.on("close", (code) => {
            if (code === 0)
                resolve()
            else
                reject()
        })
    })
}

const deepCopy = (src: string, dest: string) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            deepCopy(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

const generateJavadoc = async (version) => {
    const origin = `${temp_dir}/gen/${version}`

    fs.mkdirSync(origin, { recursive: true })

    deepCopy(destOrigin, origin)

    const repo = git(origin)
    await repo.checkout(version)

    const installProc = child_process.spawn(MAVEN_COMMAND, ["install", "-DskipTests"], {
        cwd: origin,
        env: process.env
    })
    await attach_process(installProc)

    const javadocProc = child_process.spawn(MAVEN_COMMAND, ["javadoc:javadoc", "-Dmaven.javadoc.failOnError=false"], {
        cwd: origin,
        env: process.env
    })
    await attach_process(javadocProc)

    const dest = `${DEST_DIR}/${version}`
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest, { recursive: true })

    const javadocDir = `${origin}/KPMDaemon/target/site/apidocs`
    deepCopy(javadocDir, dest)

    fs.rmSync(origin, { recursive: true })
}

const main = async () => {
    await init()
    for (const version of TARGET_VERSIONS)
        await generateJavadoc(version)
}

main().then(r => console.log("Done!")).catch(e => console.error(e)).finally(() => {
    fs.rmSync(temp_dir, { recursive: true })
});

