import type MarkdownIt from 'markdown-it';

export default function(md: MarkdownIt) {
  md.renderer.rules.image = (...props) => {
    const [tokens, idx] = props;
    const token = tokens[idx];
    const attrs = [];
    if (token.attrs) {
      for (const [key, value] of token.attrs) {
        if (key === 'alt') {
          attrs.push(`${key}="${token.content}"`);
        } else {
          attrs.push(`${key}="${value}"`);
        }
      }
    }
    return `<ClientOnly><Image ${attrs.join(' ')} :preview-mask="false" /></ClientOnly>`;
  };
}
