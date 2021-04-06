const fs = require('fs')
const path = require('path')
const { transformFromAstSync } = require('@babel/core')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default


const uniqueId = (() => {
    let n = 0
    return () => {
        n += 1
        return n
    }
})()

const analyze = (source, modules) => {
    const code = fs.readFileSync(source, { encoding: 'utf-8' })

    const ast = parser.parse(code, {
        sourceType: 'module'
    })

    const moduleId = uniqueId()

    const deps = {}

    traverse(ast, {
        ImportDeclaration({ node }) {
            const dir = path.dirname(source)
            const rawSource = node.source.value
            const depSource = path.resolve(dir, rawSource + '.js')
            const id = analyze(depSource, modules)
            deps[rawSource] = id
        }
    })

    const transformed = transformFromAstSync(ast, code, {
        presets: [
            '@babel/preset-env',
        ]
    })

    modules[moduleId] = {
        code: transformed.code,
        deps,
    }

    return moduleId
}

const codeFromModules = (modules) => {
    let obj = ''
    for(const [id, m] of Object.entries(modules)) {
        let s = `
            ${id}: {
                code: function(require, modules, exports) { ${m.code} },
                deps: ${JSON.stringify(m.deps, null, 4)}
            },
        `
        obj += s
    }

    obj = `{${obj}}`

    const s = `
    (function(modules) {
        const require = function(id) {
            let { code, deps } = modules[id]

            const localRequire = function(name) {
                return require(deps[name])
            }

            const localModule = {
                exports: {

                }
            }

            // 执行代码
            code(localRequire, localModule, localModule.exports)

            return localModule.exports
        }

        require(1)
    })(${obj})
    `

    return s
}

const __main = () => {
    const root = './src/main.js'

    const modules = {}
    analyze(root, modules)

    const s = codeFromModules(modules)
    fs.writeFileSync('./dist/a.js', s)
}

__main()
