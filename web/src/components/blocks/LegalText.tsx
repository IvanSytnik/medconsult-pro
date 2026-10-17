import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

const H2 = 'text-xl font-bold text-secondary-900 mb-4'

function splitLines(nodes: SerializedLexicalNode[]): SerializedLexicalNode[][] {
  const lines: SerializedLexicalNode[][] = [[]]
  for (const node of nodes) {
    if (node.type === 'linebreak') lines.push([])
    else lines[lines.length - 1].push(node)
  }
  return lines
}

const linkConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => <h2 className={H2}>{nodesToJSX({ nodes: node.children })}</h2>,
  link: ({ node, nodesToJSX }) => (
    <a href={node.fields.url ?? '#'} className="text-primary-600 hover:underline">
      {nodesToJSX({ nodes: node.children })}
    </a>
  ),
})

/** Impressum: each line of a paragraph is its own row with a small gap, as in the original layout. */
const impressumConverters: JSXConvertersFunction = (args) => ({
  ...linkConverter(args),
  paragraph: ({ node, nodesToJSX }) => {
    const lines = splitLines(node.children)
    return (
      <p className="text-secondary-600 mb-6">
        {lines.map((line, index) => (
          <span key={index} className={index < lines.length - 1 ? 'block mb-1' : 'block'}>
            {nodesToJSX({ nodes: line })}
          </span>
        ))}
      </p>
    )
  },
})

const privacyConverters: JSXConvertersFunction = (args) => ({
  ...linkConverter(args),
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-secondary-600 leading-relaxed whitespace-pre-line mb-10">{nodesToJSX({ nodes: node.children })}</p>
  ),
})

export default function LegalText({ data, variant }: { data: SerializedEditorState | null | undefined; variant: 'impressum' | 'privacy' }) {
  if (!data) return null
  return (
    <RichText
      data={data}
      disableContainer
      converters={variant === 'impressum' ? impressumConverters : privacyConverters}
    />
  )
}
