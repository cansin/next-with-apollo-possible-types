const withPossibleTypes = require("./index");

const dir = process.cwd();

describe("possibleTypes", () => {
  it("can accept options", () => {
    const options = {
      possibleTypes: {
        gqlUrl: "https://www.example.com/graphql",
        output: "./path/to/possibleTypes.json",
      },
    };
    const nextConfig = withPossibleTypes(options);

    const webpackConfig = nextConfig.webpack(
      { output: { publicPath: undefined }, plugins: [] },
      { dev: false, dir, isServer: false, config: options }
    );

    expect(nextConfig).toEqual({
      webpack: expect.any(Function),
      possibleTypes: {
        gqlUrl: "https://www.example.com/graphql",
        output: "./path/to/possibleTypes.json",
      },
    });

    expect(webpackConfig).toEqual({
      output: {
        publicPath: undefined,
      },
      plugins: [
        {
          build: expect.any(Function),
          clearCacheOnUpdate: false,
          compilationNameFilter: undefined,
          files: {},
          firstRun: true,
          watch: expect.any(Function),
        },
      ],
    });
  });
});
