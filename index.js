const fs = require("fs");

const fetch = require("cross-fetch");
const PrebuildPlugin = require("prebuild-webpack-plugin");

function withApolloPossibleTypes(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack(webpackConfig, options) {
      let config = webpackConfig;
      if (typeof nextConfig.webpack === "function") {
        config = nextConfig.webpack(config, options);
      }

      const {
        isServer,
        config: { possibleTypes },
      } = options;

      if (isServer) {
        return config;
      }

      const {
        gqlUrl = "/graphql",
        output = "./possibleTypes.json",
      } = possibleTypes;

      console.log("> Generating Apollo possibleTypes");
      console.log(`\t> GraphQL url: "${gqlUrl}"`);
      console.log(`\t> Output file: "${output}"`);

      config.plugins.push(
        new PrebuildPlugin({
          build: () => {
            fetch(gqlUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                variables: {},
                query:
                  "{ __schema { types { kind name possibleTypes { name } } } }",
              }),
            })
              .then((result) => result.json())
              .then((result) => {
                const possibleTypes = {};

                result.data.__schema.types.forEach((supertype) => {
                  if (supertype.possibleTypes) {
                    possibleTypes[supertype.name] = supertype.possibleTypes.map(
                      (subtype) => subtype.name
                    );
                  }
                });

                fs.writeFile(output, JSON.stringify(possibleTypes), (err) => {
                  if (err) {
                    console.error(`\t> Error writing ${output}`, err);
                  } else {
                    console.log(
                      "\t> Possible types are successfully extracted!"
                    );
                  }
                });
              });
          },
        })
      );

      return config;
    },
  };
}

module.exports = withApolloPossibleTypes;
