import javadocs from "../javadocs.json"

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
        console.log(data.toString())
    })
    proc.stderr.on("data", (data) => {
        console.error(data.toString())
    })

    proc.on("close", (code) => {
        console.log(`Process exited with code ${code}`)
    })

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

const deepCopy = (src, dest) => {
    if (fs.lstatSync(src).isDirectory() && !fs.existsSync(dest)) {
        fs.mkdirSync(dest, {
            recursive: true
        })
    }

    fs.readdirSync(src).forEach((file) => {
        const srcPath = `${src}/${file}`
        const destPath = `${dest}/${file}`
        if (fs.lstatSync(srcPath).isDirectory()) {
            deepCopy(srcPath, destPath)
        }
        else {
            fs.createWriteStream(destPath).write(fs.readFileSync(srcPath))
        }
    })
}

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

