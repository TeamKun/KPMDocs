const tomlPath = `${__dirname}/../kpm.toml`

let tomlCache

const loadInfo = () => {
    if (tomlCache)
        return tomlCache

    const fs = require('fs')
    const toml = require('toml')

    const tomlFile = fs.readFileSync(tomlPath, 'utf8')
    const tomlData = toml.parse(tomlFile)

    const data = replaceVariables(tomlData, tomlData)
    if (!data.project)
        throw new Error('Invalid info.toml file')

    tomlCache = data

    return data
}

const getData = (obj, key) => {
    const path = key.split('.')
    let current = obj
    for (const pathPart of path) {
        if (current[pathPart] === undefined)
            return undefined
        current = current[pathPart]
    }
    return current
}

const replaceVariables = (current, root) => {
    // Variable format: {toml.path.to}

    if (typeof current !== 'object')
        return replaceVariables(current, root)

    for (const key in current) {
        let value = current[key]
        if (typeof value === 'string') {
            // replace variables in string
            const regex = /{([^}]+)}/g
            const matches = value.match(regex)
            if (matches) {
                for (const match of matches) {
                    const variable = match.substring(1, match.length - 1)
                    const variableValue = getData(root, variable)
                    if (variableValue !== undefined)
                        current[key] = value = value.replace(match, variableValue)
                }
            }
        } else {
            replaceVariables(value, root)
        }
    }

    return current
}

module.exports = {
    loadInfo,
    project: loadInfo()
}
