export default function (md) {
  md.renderer.rules.image = (...props) => {
    const [tokens, idx] = props
    const token = tokens[idx]
    let attrs = ''
    for (const [key, value] of token.attrs) {
      if (key === 'alt') {
        attrs += `${key}="${token.content}"`
      }
      else {
        attrs += `${key}="${value}"`
      }
    }
    return `<Image ${attrs} :preview-mask="false" />`
  }
};
