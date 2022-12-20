const info = require('./kpm.json')

let infoCache

const kpmInfoData = {
    name: undefined,
    short_name: undefined,
    url: undefined,
    version: {
        name: undefined,
        url: undefined,
    },
    license: {
        name: undefined,
        url: undefined,
    }
}

const getInfo = () => {
    if (!infoCache)
        infoCache = Object.assign(kpmInfoData, replaceVariables(info, info))

    return infoCache
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


const variableRegex = /{([^}]+)}/g
const replaceVariables = (current, root) => {
    // Variable format: {toml.path.to}

    if (typeof current !== 'object')
        return replaceVariables(current, root)

    if (Array.isArray(current)) {
        const result = []
        for (const item of current)
            result.push(replaceVariables(item, root))
        return result
    }

    const result = {}
    for (const key in current) {
        const value = current[key]
        if (typeof value === 'string') {
            const matches = value.match(variableRegex)
            if (matches) {
                let resultValue = value
                for (const match of matches) {
                    const variable = match.substring(1, match.length - 1)
                    const variableValue = getData(root, variable)
                    if (variableValue === undefined)
                        throw new Error(`Unknown variable: ${variable}`)
                    resultValue = resultValue.replace(match, variableValue)
                }
                result[key] = resultValue
            } else {
                result[key] = value
            }
        } else {
            result[key] = replaceVariables(value, root)
        }
    }

    return result
}



module.exports = getInfo
