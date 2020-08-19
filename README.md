# next-with-apollo-possible-types

[![size](https://img.shields.io/bundlephobia/minzip/next-with-apollo-possible-types)](https://bundlephobia.com/result?p=next-with-apollo-possible-types)
[![dependencies](https://img.shields.io/librariesio/release/npm/next-with-apollo-possible-types)](https://libraries.io/npm/next-with-apollo-possible-types)
[![build](https://img.shields.io/travis/com/cansin/next-with-apollo-possible-types)](https://travis-ci.com/github/cansin/next-with-apollo-possible-types)
[![downloads](https://img.shields.io/npm/dm/next-with-apollo-possible-types)](https://www.npmjs.com/package/next-with-apollo-possible-types)
[![license](https://img.shields.io/github/license/cansin/next-with-apollo-possible-types)](https://github.com/cansin/next-with-apollo-possible-types/blob/master/LICENSE)

Higher order Next.js config to generate GraphQL fragment types for Apollo 
(as described at [https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically](https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically]).

## Install

```bash
yarn add next-with-apollo-possible-types
```

## Basic Usage

Update or create `next.config.js` with

```js
const withPossibleTypes = require("next-with-apollo-possible-types");

module.exports = withSitemap({
  withPossibleTypes: {
    gqlUrl: "http://localhost:8000/graphql",
  },
  // .
  // ..
  // ... other Next.js config
});
```

Add `possibleTypes.json` your `.gitignore`

```git
possibleTypes.json
```

## Configuration

There are options you can use to customize the behavior of this plugin
by adding `sitemap` object in the Next.js config in `next.config.js`.
Alongside those given `sitemap` options, this library would also rely
on your Next.js config values [`exportPathMap`](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap),
[`exportTrailingSlash`](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash),
and [`pageExtensions`](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)
to come up with the correct `sitemap.xml` content.

```js
const withPossibleTypes = require("next-with-apollo-possible-types");

module.exports = withSitemap({
  possibleTypes: {
    gqlUrl: "https://www.example.com/graphql",
    output: "./path/to/possibleTypes.json"
  },
});
```

### Available Options

- **gqlUrl:** string - the GraphQL endpoint URL.
  - defaults to `/graphql`.
- **output:** string - The file path of the Fragment types JSON to be created.
  - defaults to `./possibleTypes.json`.