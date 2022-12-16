import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {budou} from "@site/src/hooks/budou";

type FeatureItem = {
  title: string;
  png: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'めちゃ簡単',
    png: require('@site/static/img/features/onekosama.png').default,
    description: (
        budou("お猫様をお世話するより簡単にプラグインを管理できます。")
    ),
  },
  {
    title: '前提プラグインの自動解決',
    png: require('@site/static/img/features/tabs.png').default,
    description: (
        budou(
            "プラグインの依存関係を自動で解決してインストールします。前提プラグインのためにタブを無限増殖させることはもうありません！"
        )
    ),
  },
  {
    title: '使いやすい CLI',
    png: require('@site/static/img/features/computer_and_coffee.png').default,
    description: (
      budou(
          "色分けされたログ、APT/NPM ライクなコマンド、わかりやすいヒント表示。すべてが完璧です！"
      )
    ),
  },
];

function Feature({title, png, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
          <img className={styles.featureSvg}
               role="img"
               src={png} alt={title}/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Features(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
