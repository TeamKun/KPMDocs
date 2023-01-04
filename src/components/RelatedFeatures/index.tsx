import React from "react"
import DocCard from "@theme/DocCard"
// @ts-ignore
import { useDocById } from "@docusaurus/theme-common/internal"

type RelatedFeatureProps = {
  docNames: string[]
  headerLevel?: number
}

const RelatedFeatures: React.FC<RelatedFeatureProps> = ({ docNames, headerLevel = 3 }) => {
  const docs = docNames.map((docName) => {
    const doc = useDocById("use-kpm/features/" + docName)
    if (!doc) {
      throw new Error(`Document with id ${docName} not found`)
    }
    return doc
  })

  const Header = `h${headerLevel}` as keyof JSX.IntrinsicElements

  const DocCards = docs.map((doc) => {
      let path = "/docs/" + doc.id
      if (path.endsWith("/README")) {
          path = path.slice(0, -6)
      }

    return (
      <span style={{ display: "inline-block", width: "250px", marginRight: "1rem" }}>
        <DocCard
          item={{
            type: "link",
            label: doc.title,
            docId: doc.id,
            href: path,
          }}
        />
      </span>
    )
  })

  return (
    <div>
      {!headerLevel ? undefined : <Header>関連項目</Header>}
      {DocCards}
    </div>
  )
}

export default RelatedFeatures
