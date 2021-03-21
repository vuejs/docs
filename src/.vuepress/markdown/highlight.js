const { parse } = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
const MARKER = '__INLINE_TEMPLATE_STRING__'

/**
 * @param {(code: string, lang?: string) => string} fancyHighlight
 */
module.exports = fancyHighlight => {
  prism.languages['vue-html'] = prism.languages.extend('markup', {})

  prism.languages.insertBefore('vue-html', 'tag', {
    interpolation: {
      pattern: /{{((?!}})(.|\n))*}}/,
      inside: {
        punctuation: /^{{|}}$/,
        'inline-js language-js': {
          pattern: /.*/,
          inside: prism.languages.javascript
        }
      }
    }
  })

  prism.languages['vue-html'].tag.inside = prism.languages.insertBefore(
    'inside',
    'attr-value',
    {
      directive: {
        pattern: /(?<=\s)((v-[a-z0-9-]+)|:|@|#)(((?<=[:@#])|:)([a-z0-9-]+|(\[[^\]]+\])))?(\.[a-z0-9]+)*="[^"]+"/i,
        inside: {
          'punctuation directive-shorthand': /^[:@#]/,
          'identifier directive-name': /^v-[a-z0-9-]+/i,
          'directive-argument': [
            {
              pattern: /^((?<=[:@#])|:)[a-z0-9-]+/i,
              inside: {
                punctuation: /^:/,
                identifier: /[a-z0-9-]+/i
              }
            },
            {
              pattern: /^((?<=[:@#])|:)(\[[^\]]+\])/,
              inside: {
                punctuation: /^\[|\]$/,
                'inline-js language-js': {
                  pattern: /.*/,
                  inside: prism.languages.javascript
                }
              }
            }
          ],
          'directive-modifier': {
            pattern: /^.[a-z0-9-]+/i,
            inside: {
              punctuation: /^./,
              identifier: /[a-z0-9-]+/i
            }
          },
          'directive-expression': {
            pattern: /^=(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: {
              punctuation: [/^=/, /^["']|["']$/],
              'inline-js language-js': {
                pattern: /.*/,
                inside: prism.languages.javascript
              }
            }
          }
        }
      }
    },
    prism.languages['vue-html'].tag
  )

  /**
   * Highlight template strings in JavaScript.
   *
   * @param {string} code
   * @param {string|undefined} lang?
   */
  return function highlight(code, lang) {
    if (lang !== 'js') {
      return fancyHighlight(code, lang)
    }

    const source = extractTemplate(code)
    if (!source) return fancyHighlight(code, lang)

    try {
      const copy = code.replace(source, MARKER)
      const output = fancyHighlight(copy, lang)
      const template = `<span class="language-html">${prism.highlight(
        source,
        prism.languages['vue-html'],
        'html'
      )}</span>`

      return output.replace(MARKER, template)
    } catch (error) {
      console.log(error)

      return fancyHighlight(code, lang)
    }
  }
}

/**
 * @param {string} code
 */
function extractTemplate(code) {
  try {
    const AST = parse(code, { sourceType: 'module' })

    let source = ''

    traverse(AST, {
      /**
       * @param {import("@babel/traverse").NodePath<import('@babel/types').ObjectExpression>} node$
       */
      ObjectExpression(node$) {
        /**
         * @type {import("@babel/traverse").NodePath<import("@babel/types").ObjectProperty>|null}
         */
        const property$ = node$.get('properties').find(node$ => {
          if (node$.isObjectProperty()) {
            const key$ = node$.get('key')

            return key$.isIdentifier({ name: 'template' })
          }
        })

        if (!property$) return

        const template$ = property$.get('value')

        if (template$.isTemplateLiteral()) {
          if (template$.get('quasis').length === 1) {
            const item$ = template$.get('quasis')[0]

            if (item$.isTemplateElement()) {
              source = item$.node.value.raw
            }
          }
        } else if (template$.isStringLiteral()) {
          source = template$.node.value
        }
      }
    })

    return source
  } catch (error) {
    return ''
  }
}

module.exports()
