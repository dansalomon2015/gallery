module.exports = {
    presets: ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
                alias: {
                    "@src": "./src",
                    "@images": "./src/images",
                },
            },
        ],
    ],
};
