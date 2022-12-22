import React from "react";
import DocCard from "@theme/DocCard";
// @ts-ignore
import {useDocById} from "@docusaurus/theme-common/internal";

type BelowDocumentProps = {
    docId: string;
    noInfo?: boolean;
}

const BelowDocument: React.FC<BelowDocumentProps> = ({ docId, noInfo }) => {

    const doc = useDocById(docId);
    if (!doc) {
        throw new Error(`Document with id ${docId} not found`);
    }

    return (
        <div>
            {!noInfo && (<p>詳しくは以下のドキュメントを参照してください：</p>)}
            <DocCard item={{
                type: "link",
                label: doc.title,
                docId: doc.id,
                href: "/docs/" + doc.id,
            }} />
        </div>
    );
};

export default BelowDocument;
