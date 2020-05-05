const heading = /^[#]{1,6}\s.*/gi;

const paragraph = /^(?!([#]{1,6}\s.*)|((-\s.*\n?)+)|((1\.\s.*\n?)+)|(^>\s.+)).+/gm;

const uList = /(-\s.*\n?)+/gi;

const oList = /(^1\.\s.*\n?)+/gim;

const bold = /\*\*(.*?)\*\*/gi;

const italic = /\*(.*?)\*/gi;

const blockQuote = /^>\s.+/gm;

const link = /(?:__|[*#])|\[(.*?)\]\((.*?)\)/g;

const replaceLinks = (markdownLink: string, ...capturedGroups: any) => {
    const [label, url] = capturedGroups;
    return `<a href="${url}">${label}</a>`;
};

const replaceHeadings = (markdown: string) => {
    const [hashes, ...content] = markdown.split(' ');
    const size = hashes.length;

    const tag: any = `h${size}`;

    return `<${tag}>${content.join(' ')}</${tag}>`;
};

type ListType = 'ol' | 'ul';

type ListDivider = '1. ' | '- ';

function replaceLists(markdown: string, type: ListType, divider: ListDivider) {
    const entries = markdown.split(divider);

    const elements = entries.filter((e) => e.length > 0).map((e) => `<li>${e.replace(/\r?\n|\r/g, '')}</li>`);

    const htmlString = elements.reduce((acc: string, el: string, i: number) => {
        if (i === elements.length - 1) {
            return acc + el + `</${type}>`;
        }
        return acc + el;
    }, `<${type}>`);

    return htmlString;
}

type BoldItalicDivider = '*' | '**';
type EmphasisType = 'strong' | 'em';

const replaceEmphasis = (markdown: string, type: EmphasisType, divider: BoldItalicDivider) => {
    const [a, content, b] = markdown.split(divider);

    return `<${type}>${content}</${type}>`;
};

const replaceParagraphs = (match: string) => {
    return `<p>${match}</p>`;
};

const replaceBlockQuotes = (match: string) => {
    const [blank, quote] = match.split('> ');
    return `<blockquote><p>${quote}</p></blockquote>`;
};

const createReplacer = (replacer: any, ...extraArgs: any) => (match: string, ...replaceArgs: any) =>
    replacer(match, ...extraArgs, ...replaceArgs);

const patternsAndReplacers = [
    { pattern: paragraph, replacer: createReplacer(replaceParagraphs) },
    { pattern: heading, replacer: createReplacer(replaceHeadings) },
    { pattern: uList, replacer: createReplacer(replaceLists, 'ul', '- ') },
    { pattern: oList, replacer: createReplacer(replaceLists, 'ol', '1. ') },
    { pattern: bold, replacer: createReplacer(replaceEmphasis, 'strong', '**') },
    { pattern: italic, replacer: createReplacer(replaceEmphasis, 'em', '*') },
    { pattern: blockQuote, replacer: createReplacer(replaceBlockQuotes) },
    { pattern: link, replacer: createReplacer(replaceLinks) },
];

export default patternsAndReplacers;
