const { rpSkin } = process.env;
const compiler = require('vue-template-compiler');
const postcss = require('postcss');
const cheerio = require('cheerio');
const REPLACE_COLOR = '#fa7b7b';
let colors = [];
let backgroundColors = [];
let borderColors = {};
const includeBorderProps = ['border', 'border-top', 'border-bottom', 'border-left', 'border-right', 'border-color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color']

const setColorClass = (content) => {
    const $ = cheerio.load(content);
    $(colors.toString()).addClass('root-color')
    $(backgroundColors.toString()).addClass('root-background-color')
    for (const bcs in borderColors) {
        $(borderColors[bcs].toString()).addClass(`root-${bcs}`)
    }
    return $('body').html()
}

const extractColor = css => css.walkRules(rule => {
    rule.walkDecls(decl => {
        if (decl.prop === 'color' && decl.value === REPLACE_COLOR) {
            colors.push(rule.selector)
        }
        if (decl.prop === 'background-color' && decl.value === REPLACE_COLOR) {
            backgroundColors.push(rule.selector)
        } else if (decl.prop === 'background') {
            const propvalue = postcss.list.space(decl.value)[0]
            const len = propvalue.length
            if ((len === 4 || len === 7) && /^#\w+/.test(propvalue)) {
                backgroundColors.push(rule.selector)
            }
        }
        if (includeBorderProps.includes(decl.prop)) {
            const propvalue = postcss.list.space(decl.value)
            const color = propvalue.length === 1 ?  propvalue[0] :  propvalue[2];
            if (color === REPLACE_COLOR) {
                if (borderColors[decl.prop]) {
                    borderColors[decl.prop].push(rule.selector)
                } else {
                    Object.assign(borderColors, {
                        [decl.prop]: [rule.selector]
                    })
                }
            }
        }
    })
})

exports.parseComponent = function (content, map, meta) {
    const extract = compiler.parseComponent(content)
    if (rpSkin === 'y') {
        colors = [];
        backgroundColors = [];
        borderColors = {};
        extract.styles.forEach(style => {
            const parseCss = postcss.parse(style.content);
            extractColor(parseCss)
        })
        extract.template.content = setColorClass(extract.template.content)
    }
    return extract
};
exports.compile = compiler.compile;
exports.compileToFunctions = compiler.compileToFunctions;
exports.ssrCompile = compiler.compile$1;
exports.ssrCompileToFunctions = compiler.compileToFunctions$1;
exports.generateCodeFrame = compiler.generateCodeFrame;