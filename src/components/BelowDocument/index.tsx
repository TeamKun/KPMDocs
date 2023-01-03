import React from "react"
import DocCard from "@theme/DocCard"
// @ts-ignore
import { useDocById } from "@docusaurus/theme-common/internal"

type BelowDocumentProps = {
  docId: string
  message?: string

  small?: boolean
}

const BelowDocument: React.FC<BelowDocumentProps> = ({ docId, message, small }) => {
  const doc = useDocById(docId)
  if (!doc) {
    throw new Error(`Document with id ${docId} not found`)
  }

  const smallMode = !small
    ? undefined
    : {
        width: "350px",
      }

  const displayMessage = message ? message : "詳しくは以下のドキュメントを参照してください："

  return (
    <>
      <p>{displayMessage}</p>
      <div style={smallMode}>
        <DocCard
          item={{
            type: "link",
            label: doc.title,
            docId: doc.id,
            href: "/docs/" + doc.id,
          }}
        />
      </div>
    </>
  )
}

export default BelowDocument
