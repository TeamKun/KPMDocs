import {loadDefaultJapaneseParser} from 'budoux';
import React, {ReactElement} from 'react';

const parser = loadDefaultJapaneseParser()

export const budou = (text): ReactElement => {
    return (
        <>{
            parser.parse(text)
            .map((token) => (<span key={token}>{token}</span>))
        }</>
    )
}
