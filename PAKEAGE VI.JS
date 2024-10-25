{
  "name": "@example/starter",
  "version": "0.0.1",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "@example/starter",
      "version": "0.0.1",
      "devDependencies": {
        "@astrojs/preact": "^1.0.2",
        "@astrojs/sitemap": "^1.0.0",
        "@netlify/netlify-marketing-tokens": "^1.1.0",
        "astro": "^2.0.0"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.2.0",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.1.0",
        "@jridgewell/trace-mapping": "^0.3.9"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@astrojs/compiler": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@astrojs/compiler/-/compiler-1.2.0.tgz",
      "integrity": "sha512-O8yPCyuq+PU9Fjht2tIW6WzSWiq8qDF1e8uAX2x+SOGFzKqOznp52UlDG2mSf+ekf0Z3R34sb64O7SgX+asTxg==",
      "dev": true
    },
    "node_modules/@astrojs/language-server": {
      "version": "0.28.3",
      "resolved": "https://registry.npmjs.org/@astrojs/language-server/-/language-server-0.28.3.tgz",
      "integrity": "sha512-fPovAX/X46eE2w03jNRMpQ7W9m2mAvNt4Ay65lD9wl1Z5vIQYxlg7Enp9qP225muTr4jSVB5QiLumFJmZMAaVA==",
      "dev": true,
      "dependencies": {
        "@vscode/emmet-helper": "^2.8.4",
        "events": "^3.3.0",
        "prettier": "^2.7.1",
        "prettier-plugin-astro": "^0.7.0",
        "source-map": "^0.7.3",
        "vscode-css-languageservice": "^6.0.1",
        "vscode-html-languageservice": "^5.0.0",
        "vscode-languageserver": "^8.0.1",
        "vscode-languageserver-protocol": "^3.17.1",
        "vscode-languageserver-textdocument": "^1.0.4",
        "vscode-languageserver-types": "^3.17.1",
        "vscode-uri": "^3.0.3"
      },
      "bin": {
        "astro-ls": "bin/nodeServer.js"
      }
    },
    "node_modules/@astrojs/markdown-remark": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@astrojs/markdown-remark/-/markdown-remark-2.0.1.tgz",
      "integrity": "sha512-xQF1rXGJN18m+zZucwRRtmNehuhPMMhZhi6HWKrtpEAKnHSPk8lqf1GXgKH7/Sypglu8ivdECZ+EGs6kOYVasQ==",
      "dev": true,
      "dependencies": {
        "@astrojs/prism": "^2.0.0",
        "github-slugger": "^1.4.0",
        "import-meta-resolve": "^2.1.0",
        "rehype-raw": "^6.1.1",
        "rehype-stringify": "^9.0.3",
        "remark-gfm": "^3.0.1",
        "remark-parse": "^10.0.1",
        "remark-rehype": "^10.1.0",
        "remark-smartypants": "^2.0.0",
        "shiki": "^0.11.1",
        "unified": "^10.1.2",
        "unist-util-visit": "^4.1.0",
        "vfile": "^5.3.2"
      },
      "peerDependencies": {
        "astro": "^2.0.2"
      }
    },
    "node_modules/@astrojs/markdown-remark/node_modules/github-slugger": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-1.5.0.tgz",
      "integrity": "sha512-wIh+gKBI9Nshz2o46B0B3f5k/W+WI9ZAv6y5Dn5WJ5SK1t0TnDimB4WE5rmTD05ZAIn8HALCZVmCsvj0w0v0lw==",
      "dev": true
    },
    "node_modules/@astrojs/preact": {
      "version": "1.0.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": ">=7.0.0-0 <8.0.0",
        "@babel/plugin-transform-react-jsx": "^7.17.12",
        "babel-plugin-module-resolver": "^4.1.0",
        "preact-render-to-string": "^5.2.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.12.0"
      },
      "peerDependencies": {
        "preact": "^10.6.5"
      }
    },
    "node_modules/@astrojs/prism": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@astrojs/prism/-/prism-2.0.0.tgz",
      "integrity": "sha512-YgeoeEPqsxaEpg0rwe/bUq3653LqSQnMjrLlpYwrbQQMQQqz6Y5yXN+RX3SfLJ6ppNb4+Fu2+Z49EXjk48Ihjw==",
      "dev": true,
      "dependencies": {
        "prismjs": "^1.28.0"
      },
      "engines": {
        "node": ">=16.12.0"
      }
    },
    "node_modules/@astrojs/sitemap": {
      "version": "1.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "sitemap": "^7.1.1",
        "zod": "^3.17.3"
      }
    },
    "node_modules/@astrojs/telemetry": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@astrojs/telemetry/-/telemetry-2.0.1.tgz",
      "integrity": "sha512-68BLBb9CcvQMkWHE6h6VTgm5g6agm3+xm8eb3cdkmX9nP1LSQ/fiD49Jb1qAgCtWcY8yQJiWQQXwcdyStD+VoA==",
      "dev": true,
      "dependencies": {
        "ci-info": "^3.3.1",
        "debug": "^4.3.4",
        "dlv": "^1.1.3",
        "dset": "^3.1.2",
        "is-docker": "^3.0.0",
        "is-wsl": "^2.2.0",
        "undici": "^5.20.0",
        "which-pm-runs": "^1.1.0"
      },
      "engines": {
        "node": ">=16.12.0"
      }
    },
    "node_modules/@astrojs/webapi": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/@astrojs/webapi/-/webapi-2.0.2.tgz",
      "integrity": "sha512-uSNtxLuvCWOcwy/DdIy30ocIcIUedEZpyhn1MHW3XuZ3PZHg4PMej3EP38Ns6uKgDKqMyEdscca9bMLuf4cO/w==",
      "dev": true,
      "dependencies": {
        "undici": "5.20.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/highlight": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.18.8",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.18.10",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "^2.1.0",
        "@babel/code-frame": "^7.18.6",
        "@babel/generator": "^7.18.10",
        "@babel/helper-compilation-targets": "^7.18.9",
        "@babel/helper-module-transforms": "^7.18.9",
        "@babel/helpers": "^7.18.9",
        "@babel/parser": "^7.18.10",
        "@babel/template": "^7.18.10",
        "@babel/traverse": "^7.18.10",
        "@babel/types": "^7.18.10",
        "convert-source-map": "^1.7.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.1",
        "semver": "^6.3.0"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/core/node_modules/semver": {
      "version": "6.3.0",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.18.12",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.10",
        "@jridgewell/gen-mapping": "^0.3.2",
        "jsesc": "^2.5.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/generator/node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/set-array": "^1.0.1",
        "@jridgewell/sourcemap-codec": "^1.4.10",
        "@jridgewell/trace-mapping": "^0.3.9"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/helper-annotate-as-pure": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.18.8",
        "@babel/helper-validator-option": "^7.18.6",
        "browserslist": "^4.20.2",
        "semver": "^6.3.0"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets/node_modules/semver": {
      "version": "6.3.0",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-environment-visitor": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-function-name": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.18.6",
        "@babel/types": "^7.18.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-hoist-variables": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-environment-visitor": "^7.18.9",
        "@babel/helper-module-imports": "^7.18.6",
        "@babel/helper-simple-access": "^7.18.6",
        "@babel/helper-split-export-declaration": "^7.18.6",
        "@babel/helper-validator-identifier": "^7.18.6",
        "@babel/template": "^7.18.6",
        "@babel/traverse": "^7.18.9",
        "@babel/types": "^7.18.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-simple-access": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-split-export-declaration": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.19.4",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.19.4.tgz",
      "integrity": "sha512-nHtDoQcuqFmwYNYPz3Rah5ph2p8PFeFCsZk9A/48dPc/rGocJ5J3hAAZ7pb76VWX3fZKu+uEr/FhH5jLx7umrw==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.19.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.19.1.tgz",
      "integrity": "sha512-awrNfaMtnHUr653GgGEs++LlAvW6w+DcPrOliSMXWCKo597CwL5Acf/wWdNkf/tfEQE3mjkeD1YOVZOUV/od1w==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.18.9",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.18.6",
        "@babel/traverse": "^7.18.9",
        "@babel/types": "^7.18.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/highlight": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.18.6",
        "chalk": "^2.0.0",
        "js-tokens": "^4.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.21.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.21.2.tgz",
      "integrity": "sha512-URpaIJQwEkEC2T9Kn+Ai6Xe/02iNaVCuT/PtoRz3GPVJVDpPd7mLo+VddTbhCRU9TXqW5mSrQfXZyi8kDKOVpQ==",
      "dev": true,
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.18.6",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx": {
      "version": "7.18.10",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.18.6",
        "@babel/helper-module-imports": "^7.18.6",
        "@babel/helper-plugin-utils": "^7.18.9",
        "@babel/plugin-syntax-jsx": "^7.18.6",
        "@babel/types": "^7.18.10"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.18.10",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.18.6",
        "@babel/parser": "^7.18.10",
        "@babel/types": "^7.18.10"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.18.11",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.18.6",
        "@babel/generator": "^7.18.10",
        "@babel/helper-environment-visitor": "^7.18.9",
        "@babel/helper-function-name": "^7.18.9",
        "@babel/helper-hoist-variables": "^7.18.6",
        "@babel/helper-split-export-declaration": "^7.18.6",
        "@babel/parser": "^7.18.11",
        "@babel/types": "^7.18.10",
        "debug": "^4.1.0",
        "globals": "^11.1.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.21.2",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.21.2.tgz",
      "integrity": "sha512-3wRZSs7jiFaB8AjxiiD+VqN5DTG2iRvJGQ+qYFrs/654lg6kGTQWIOFjlBo5RaXuAZjBmP3+OQH4dmhqiiyYxw==",
      "dev": true,
      "dependencies": {
        "@babel/helper-string-parser": "^7.19.4",
        "@babel/helper-validator-identifier": "^7.19.1",
        "to-fast-properties": "^2.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emmetio/abbreviation": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/@emmetio/abbreviation/-/abbreviation-2.2.3.tgz",
      "integrity": "sha512-87pltuCPt99aL+y9xS6GPZ+Wmmyhll2WXH73gG/xpGcQ84DRnptBsI2r0BeIQ0EB/SQTOe2ANPqFqj3Rj5FOGA==",
      "dev": true,
      "dependencies": {
        "@emmetio/scanner": "^1.0.0"
      }
    },
    "node_modules/@emmetio/css-abbreviation": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@emmetio/css-abbreviation/-/css-abbreviation-2.1.4.tgz",
      "integrity": "sha512-qk9L60Y+uRtM5CPbB0y+QNl/1XKE09mSO+AhhSauIfr2YOx/ta3NJw2d8RtCFxgzHeRqFRr8jgyzThbu+MZ4Uw==",
      "dev": true,
      "dependencies": {
        "@emmetio/scanner": "^1.0.0"
      }
    },
    "node_modules/@emmetio/scanner": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@emmetio/scanner/-/scanner-1.0.0.tgz",
      "integrity": "sha512-8HqW8EVqjnCmWXVpqAOZf+EGESdkR27odcMMMGefgKXtar00SoYNSryGv//TELI4T3QFsECo78p+0lmalk/CFA==",
      "dev": true
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.16.17.tgz",
      "integrity": "sha512-N9x1CMXVhtWEAMS7pNNONyA14f71VPQN9Cnavj1XQh6T7bskqiLLrSca4O0Vr8Wdcga943eThxnVp3JLnBMYtw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.16.17.tgz",
      "integrity": "sha512-MIGl6p5sc3RDTLLkYL1MyL8BMRN4tLMRCn+yRJJmEDvYZ2M7tmAf80hx1kbNEUX2KJ50RRtxZ4JHLvCfuB6kBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.16.17.tgz",
      "integrity": "sha512-a3kTv3m0Ghh4z1DaFEuEDfz3OLONKuFvI4Xqczqx4BqLyuFaFkuaG4j2MtA6fuWEFeC5x9IvqnX7drmRq/fyAQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.16.17.tgz",
      "integrity": "sha512-/2agbUEfmxWHi9ARTX6OQ/KgXnOWfsNlTeLcoV7HSuSTv63E4DqtAc+2XqGw1KHxKMHGZgbVCZge7HXWX9Vn+w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.16.17.tgz",
      "integrity": "sha512-2By45OBHulkd9Svy5IOCZt376Aa2oOkiE9QWUK9fe6Tb+WDr8hXL3dpqi+DeLiMed8tVXspzsTAvd0jUl96wmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.16.17.tgz",
      "integrity": "sha512-mt+cxZe1tVx489VTb4mBAOo2aKSnJ33L9fr25JXpqQqzbUIw/yzIzi+NHwAXK2qYV1lEFp4OoVeThGjUbmWmdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.16.17.tgz",
      "integrity": "sha512-8ScTdNJl5idAKjH8zGAsN7RuWcyHG3BAvMNpKOBaqqR7EbUhhVHOqXRdL7oZvz8WNHL2pr5+eIT5c65kA6NHug==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.16.17.tgz",
      "integrity": "sha512-iihzrWbD4gIT7j3caMzKb/RsFFHCwqqbrbH9SqUSRrdXkXaygSZCZg1FybsZz57Ju7N/SHEgPyaR0LZ8Zbe9gQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.16.17.tgz",
      "integrity": "sha512-7S8gJnSlqKGVJunnMCrXHU9Q8Q/tQIxk/xL8BqAP64wchPCTzuM6W3Ra8cIa1HIflAvDnNOt2jaL17vaW+1V0g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.16.17.tgz",
      "integrity": "sha512-kiX69+wcPAdgl3Lonh1VI7MBr16nktEvOfViszBSxygRQqSpzv7BffMKRPMFwzeJGPxcio0pdD3kYQGpqQ2SSg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.16.17.tgz",
      "integrity": "sha512-dTzNnQwembNDhd654cA4QhbS9uDdXC3TKqMJjgOWsC0yNCbpzfWoXdZvp0mY7HU6nzk5E0zpRGGx3qoQg8T2DQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.16.17.tgz",
      "integrity": "sha512-ezbDkp2nDl0PfIUn0CsQ30kxfcLTlcx4Foz2kYv8qdC6ia2oX5Q3E/8m6lq84Dj/6b0FrkgD582fJMIfHhJfSw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.16.17.tgz",
      "integrity": "sha512-dzS678gYD1lJsW73zrFhDApLVdM3cUF2MvAa1D8K8KtcSKdLBPP4zZSLy6LFZ0jYqQdQ29bjAHJDgz0rVbLB3g==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.16.17.tgz",
      "integrity": "sha512-ylNlVsxuFjZK8DQtNUwiMskh6nT0vI7kYl/4fZgV1llP5d6+HIeL/vmmm3jpuoo8+NuXjQVZxmKuhDApK0/cKw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.16.17.tgz",
      "integrity": "sha512-gzy7nUTO4UA4oZ2wAMXPNBGTzZFP7mss3aKR2hH+/4UUkCOyqmjXiKpzGrY2TlEUhbbejzXVKKGazYcQTZWA/w==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.16.17.tgz",
      "integrity": "sha512-mdPjPxfnmoqhgpiEArqi4egmBAMYvaObgn4poorpUaqmvzzbvqbowRllQ+ZgzGVMGKaPkqUmPDOOFQRUFDmeUw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.16.17.tgz",
      "integrity": "sha512-/PzmzD/zyAeTUsduZa32bn0ORug+Jd1EGGAUJvqfeixoEISYpGnAezN6lnJoskauoai0Jrs+XSyvDhppCPoKOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.16.17.tgz",
      "integrity": "sha512-2yaWJhvxGEz2RiftSk0UObqJa/b+rIAjnODJgv2GbGGpRwAfpgzyrg1WLK8rqA24mfZa9GvpjLcBBg8JHkoodg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.16.17.tgz",
      "integrity": "sha512-xtVUiev38tN0R3g8VhRfN7Zl42YCJvyBhRKw1RJjwE1d2emWTVToPLNEQj/5Qxc6lVFATDiy6LjVHYhIPrLxzw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.16.17.tgz",
      "integrity": "sha512-ga8+JqBDHY4b6fQAmOgtJJue36scANy4l/rL97W+0wYmijhxKetzZdKOJI7olaBaMhWt8Pac2McJdZLxXWUEQw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.16.17.tgz",
      "integrity": "sha512-WnsKaf46uSSF/sZhwnqE4L/F89AYNMiD4YtEcYekBt9Q7nj0DiId2XH2Ng2PHM54qi5oPrQ8luuzGszqi/veig==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.16.17.tgz",
      "integrity": "sha512-y+EHuSchhL7FjHgvQL/0fnnFmO4T1bhvWANX6gcnqTjtnKWbTvUMCpGnv2+t+31d7RzyEAYAd4u2fnIhHL6N/Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.1.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/set-array": "^1.0.0",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/set-array": {
      "version": "1.1.2",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.4.14",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.15",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "node_modules/@ljharb/has-package-exports-patterns": {
      "version": "0.0.1",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@netlify/netlify-marketing-tokens": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@netlify/netlify-marketing-tokens/-/netlify-marketing-tokens-1.1.0.tgz",
      "integrity": "sha512-uuA4/ZHwehv0P/MRf6XRqzlpPwyHYPaDr8uly0k4387sD2tmtoZpeXLJ3X+jZywW5YEblOWPVpUvyCpvFcD4BA==",
      "dev": true,
      "dependencies": {
        "style-dictionary": "^3.7.2",
        "token-transformer": "^0.0.29"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgr/utils": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/@pkgr/utils/-/utils-2.3.1.tgz",
      "integrity": "sha512-wfzX8kc1PMyUILA+1Z/EqoE4UCXGy0iRGMhPwdfae1+f0OXlLqCk+By+aMzgJBzR9AzS4CDizioG6Ss1gvAFJw==",
      "dev": true,
      "dependencies": {
        "cross-spawn": "^7.0.3",
        "is-glob": "^4.0.3",
        "open": "^8.4.0",
        "picocolors": "^1.0.0",
        "tiny-glob": "^0.2.9",
        "tslib": "^2.4.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/unts"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.0",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.0.tgz",
      "integrity": "sha512-+n8dL/9GWblDO0iU6eZAwEIJVr5DWigtle+Q6HLOrh/pdbXOhOtqzq8VPPE2zvNJzSKY4vH/z3iT3tn0A3ypiQ==",
      "dev": true,
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.6.4",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.6.4.tgz",
      "integrity": "sha512-tFkciB9j2K755yrTALxD44McOrk+gfpIpvC3sxHjRawj6PfnQxrse4Clq5y/Rq+G3mrBurMax/lG8Qn2t9mSsg==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.1",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.1.tgz",
      "integrity": "sha512-azBFKemX6kMg5Io+/rdGT0dkGreboUVR0Cdm3fz9QJWpaQGJRQXl7C+6hOTCZcMll7KFyEQpgbYI2lHdsS4U7g==",
      "dev": true,
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.18.3",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.18.3.tgz",
      "integrity": "sha512-1kbcJ40lLB7MHsj39U4Sh1uTd2E7rLEa79kmDpI6cy+XiXsteB3POdQomoq4FxszMrO3ZYchkhYJw7A2862b3w==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.3.0"
      }
    },
    "node_modules/@types/debug": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/@types/debug/-/debug-4.1.7.tgz",
      "integrity": "sha512-9AonUzyTjXXhEOa0DnqpzZi6VHlqKMswga9EXjpXnnqxwLtdvPPtlO8evrI5D9S6asFRCQ6v+wpiUKbw+vKqyg==",
      "dev": true,
      "dependencies": {
        "@types/ms": "*"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.0.tgz",
      "integrity": "sha512-WulqXMDUTYAXCjZnk6JtIHPigp55cVtDgDrO2gHRwhyJto21+1zbVCtOYB2L1F9w4qCQ0rOGWBnBe0FNTiEJIQ==",
      "dev": true
    },
    "node_modules/@types/hast": {
      "version": "2.3.4",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/json5": {
      "version": "0.0.30",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/mdast": {
      "version": "3.0.10",
      "resolved": "https://registry.npmjs.org/@types/mdast/-/mdast-3.0.10.tgz",
      "integrity": "sha512-W864tg/Osz1+9f4lrGTZpCSO5/z4608eUp19tbozkq2HJK6i3z1kT0H9tlADXuYIb1YYOBByU4Jsqkk75q48qA==",
      "dev": true,
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/ms": {
      "version": "0.7.31",
      "resolved": "https://registry.npmjs.org/@types/ms/-/ms-0.7.31.tgz",
      "integrity": "sha512-iiUgKzV9AuaEkZqkOLDIvlQiL6ltuZd9tGcW3gwpnX8JbuiuhFlEGmmFXEXkN50Cvq7Os88IY2v0dkDqXYWVgA==",
      "dev": true
    },
    "node_modules/@types/nlcst": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@types/nlcst/-/nlcst-1.0.0.tgz",
      "integrity": "sha512-3TGCfOcy8R8mMQ4CNSNOe3PG66HttvjcLzCoOpvXvDtfWOTi+uT/rxeOKm/qEwbM4SNe1O/PjdiBK2YcTjU4OQ==",
      "dev": true,
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/node": {
      "version": "17.0.45",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/parse5": {
      "version": "6.0.3",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/resolve": {
      "version": "1.20.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/sax": {
      "version": "1.2.4",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/unist": {
      "version": "2.0.6",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/yargs-parser": {
      "version": "21.0.0",
      "resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-21.0.0.tgz",
      "integrity": "sha512-iO9ZQHkZxHn4mSakYV0vFHAVDyEOIJQrV2uZ06HxEPcx+mt8swXoZHIbaaJ2crJYFfErySgktuTZ3BeLz+XmFA==",
      "dev": true
    },
    "node_modules/@vscode/emmet-helper": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/@vscode/emmet-helper/-/emmet-helper-2.8.6.tgz",
      "integrity": "sha512-IIB8jbiKy37zN8bAIHx59YmnIelY78CGHtThnibD/d3tQOKRY83bYVi9blwmZVUZh6l9nfkYH3tvReaiNxY9EQ==",
      "dev": true,
      "dependencies": {
        "emmet": "^2.3.0",
        "jsonc-parser": "^2.3.0",
        "vscode-languageserver-textdocument": "^1.0.1",
        "vscode-languageserver-types": "^3.15.1",
        "vscode-uri": "^2.1.2"
      }
    },
    "node_modules/@vscode/emmet-helper/node_modules/vscode-uri": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/vscode-uri/-/vscode-uri-2.1.2.tgz",
      "integrity": "sha512-8TEXQxlldWAuIODdukIb+TR5s+9Ds40eSJrw+1iDDA9IFORPjMELarNQE3myz5XIkWWpdprmJjm1/SxMlWOC8A==",
      "dev": true
    },
    "node_modules/@vscode/l10n": {
      "version": "0.0.11",
      "resolved": "https://registry.npmjs.org/@vscode/l10n/-/l10n-0.0.11.tgz",
      "integrity": "sha512-ukOMWnCg1tCvT7WnDfsUKQOFDQGsyR5tNgRpwmqi+5/vzU3ghdDXzvIM4IOPdSb3OeSsBNvmSL8nxIVOqi2WXA==",
      "dev": true
    },
    "node_modules/acorn": {
      "version": "8.8.2",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.8.2.tgz",
      "integrity": "sha512-xjIYgE8HBrkpd/sJqOGNspf8uHG+NOHGOw6a/Urj8taM2EXfdNAH2oFcPeIFfsv3+kz/mJrS5VuMqbNLjCa2vw==",
      "dev": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/ansi-align": {
      "version": "3.0.1",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.1.0"
      }
    },
    "node_modules/ansi-align/node_modules/ansi-regex": {
      "version": "5.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-align/node_modules/emoji-regex": {
      "version": "8.0.0",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/ansi-align/node_modules/string-width": {
      "version": "4.2.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-align/node_modules/strip-ansi": {
      "version": "6.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "3.2.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^1.9.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "1.0.10",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "sprintf-js": "~1.0.2"
      }
    },
    "node_modules/array-iterate": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/array-iterate/-/array-iterate-2.0.1.tgz",
      "integrity": "sha512-I1jXZMjAgCMmxT4qxXfPXa6SthSoE8h6gkSI9BGGNv8mP8G/v0blc+qFnZu6K42vTOiuME596QaLO0TP3Lk0xg==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/astro": {
      "version": "2.0.17",
      "resolved": "https://registry.npmjs.org/astro/-/astro-2.0.17.tgz",
      "integrity": "sha512-K/SAoe4Tfhg4XhOu1mFOp9qiC/m8YuBmL3//WAA+mcPTlg9A21nlXH/jmsfbizQdZn/AyoPrkTWQm1pnU05OsQ==",
      "dev": true,
      "dependencies": {
        "@astrojs/compiler": "^1.2.0",
        "@astrojs/language-server": "^0.28.3",
        "@astrojs/markdown-remark": "^2.0.1",
        "@astrojs/telemetry": "^2.0.1",
        "@astrojs/webapi": "^2.0.2",
        "@babel/core": "^7.18.2",
        "@babel/generator": "^7.18.2",
        "@babel/parser": "^7.18.4",
        "@babel/plugin-transform-react-jsx": "^7.17.12",
        "@babel/traverse": "^7.18.2",
        "@babel/types": "^7.18.4",
        "@types/babel__core": "^7.1.19",
        "@types/yargs-parser": "^21.0.0",
        "acorn": "^8.8.1",
        "boxen": "^6.2.1",
        "ci-info": "^3.3.1",
        "common-ancestor-path": "^1.0.1",
        "cookie": "^0.5.0",
        "debug": "^4.3.4",
        "deepmerge-ts": "^4.2.2",
        "devalue": "^4.2.0",
        "diff": "^5.1.0",
        "es-module-lexer": "^1.1.0",
        "estree-walker": "^3.0.1",
        "execa": "^6.1.0",
        "fast-glob": "^3.2.11",
        "github-slugger": "^2.0.0",
        "gray-matter": "^4.0.3",
        "html-escaper": "^3.0.3",
        "kleur": "^4.1.4",
        "magic-string": "^0.27.0",
        "mime": "^3.0.0",
        "ora": "^6.1.0",
        "path-to-regexp": "^6.2.1",
        "preferred-pm": "^3.0.3",
        "prompts": "^2.4.2",
        "rehype": "^12.0.1",
        "semver": "^7.3.8",
        "server-destroy": "^1.0.1",
        "shiki": "^0.11.1",
        "slash": "^4.0.0",
        "string-width": "^5.1.2",
        "strip-ansi": "^7.0.1",
        "supports-esm": "^1.0.0",
        "tsconfig-resolver": "^3.0.1",
        "typescript": "*",
        "unist-util-visit": "^4.1.0",
        "vfile": "^5.3.2",
        "vite": "^4.1.2",
        "vitefu": "^0.2.4",
        "yargs-parser": "^21.0.1",
        "zod": "^3.17.3"
      },
      "bin": {
        "astro": "astro.js"
      },
      "engines": {
        "node": ">=16.12.0",
        "npm": ">=6.14.0"
      }
    },
    "node_modules/babel-plugin-module-resolver": {
      "version": "4.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-babel-config": "^1.2.0",
        "glob": "^7.1.6",
        "pkg-up": "^3.1.0",
        "reselect": "^4.0.0",
        "resolve": "^1.13.1"
      },
      "engines": {
        "node": ">= 8.0.0"
      }
    },
    "node_modules/bail": {
      "version": "2.0.2",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/bl": {
      "version": "5.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "buffer": "^6.0.3",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      }
    },
    "node_modules/boxen": {
      "version": "6.2.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-align": "^3.0.1",
        "camelcase": "^6.2.0",
        "chalk": "^4.1.2",
        "cli-boxes": "^3.0.0",
        "string-width": "^5.0.1",
        "type-fest": "^2.5.0",
        "widest-line": "^4.0.1",
        "wrap-ansi": "^8.0.1"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/boxen/node_modules/ansi-styles": {
      "version": "4.3.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/boxen/node_modules/chalk": {
      "version": "4.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/boxen/node_modules/color-convert": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/boxen/node_modules/color-name": {
      "version": "1.1.4",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/boxen/node_modules/has-flag": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/boxen/node_modules/supports-color": {
      "version": "7.2.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.11",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.21.3",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "caniuse-lite": "^1.0.30001370",
        "electron-to-chromium": "^1.4.202",
        "node-releases": "^2.0.6",
        "update-browserslist-db": "^1.0.5"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/buffer": {
      "version": "6.0.3",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.2.1"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dev": true,
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/camel-case": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/camel-case/-/camel-case-4.1.2.tgz",
      "integrity": "sha512-gxGWBrTT1JuMx6R+o5PTXMmUnhnVzLQ9SNutD4YqKtI6ap897t3tKECYla6gCWEkplXnlNybEkZg9GEGxKFCgw==",
      "dev": true,
      "dependencies": {
        "pascal-case": "^3.1.2",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/camelcase": {
      "version": "6.3.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001378",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/capital-case": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/capital-case/-/capital-case-1.0.4.tgz",
      "integrity": "sha512-ds37W8CytHgwnhGGTi88pcPyR15qoNkOpYwmMMfnWqqWgESapLqvDx6huFjQ5vqWSn2Z06173XNA7LtMOeUh1A==",
      "dev": true,
      "dependencies": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case-first": "^2.0.2"
      }
    },
    "node_modules/ccount": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/chalk": {
      "version": "2.4.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/change-case": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/change-case/-/change-case-4.1.2.tgz",
      "integrity": "sha512-bSxY2ws9OtviILG1EiY5K7NNxkqg/JnRnFxLtKQ96JaviiIxi7djMrSd0ECT9AC+lttClmYwKw53BWpOMblo7A==",
      "dev": true,
      "dependencies": {
        "camel-case": "^4.1.2",
        "capital-case": "^1.0.4",
        "constant-case": "^3.0.4",
        "dot-case": "^3.0.4",
        "header-case": "^2.0.4",
        "no-case": "^3.0.4",
        "param-case": "^3.0.4",
        "pascal-case": "^3.1.2",
        "path-case": "^3.0.4",
        "sentence-case": "^3.0.4",
        "snake-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/character-entities": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/character-entities/-/character-entities-2.0.2.tgz",
      "integrity": "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/character-entities-html4": {
      "version": "2.1.0",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/character-entities-legacy": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/ci-info": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-3.8.0.tgz",
      "integrity": "sha512-eXTggHWSooYhq49F2opQhuHWgzucfF2YgODK4e1566GQs5BIfP30B0oenwBJHfWxAs2fyPB1s7Mg949zLf61Yw==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/sibiraj-s"
        }
      ],
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cli-boxes": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-cursor": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "restore-cursor": "^4.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-spinners": {
      "version": "2.7.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "dev": true,
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/cliui/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/cliui/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/cliui/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true
    },
    "node_modules/cliui/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true
    },
    "node_modules/cliui/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/clone": {
      "version": "1.0.4",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/color-convert": {
      "version": "1.9.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "1.1.3"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.3",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/comma-separated-tokens": {
      "version": "2.0.2",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/commander": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-8.3.0.tgz",
      "integrity": "sha512-OkTL9umf+He2DZkUq8f8J9of7yL6RJKI24dVITBmNfZBmri9zYZQrKkuXiKhyfPSu8tUhnVBB1iKXevvnlR4Ww==",
      "dev": true,
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/common-ancestor-path": {
      "version": "1.0.1",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/constant-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/constant-case/-/constant-case-3.0.4.tgz",
      "integrity": "sha512-I2hSBi7Vvs7BEuJDr5dDHfzb/Ruj3FyvFyh7KLilAjNQw3Be+xgqUBA2W6scVEcL0hL1dwPRtIqEPVUCKkSsyQ==",
      "dev": true,
      "dependencies": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case": "^2.0.2"
      }
    },
    "node_modules/convert-source-map": {
      "version": "1.8.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.1.1"
      }
    },
    "node_modules/cookie": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz",
      "integrity": "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==",
      "dev": true,
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/debug": {
      "version": "4.3.4",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.1.2"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decode-named-character-reference": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/decode-named-character-reference/-/decode-named-character-reference-1.0.2.tgz",
      "integrity": "sha512-O8x12RzrUF8xyVcY0KJowWsmaJxQbmy0/EtnNtHRpsOcT7dFk5W598coHqBVpmWo1oQQfsCqfCmkZN5DJrZVdg==",
      "dev": true,
      "dependencies": {
        "character-entities": "^2.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/deepmerge-ts": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/deepmerge-ts/-/deepmerge-ts-4.3.0.tgz",
      "integrity": "sha512-if3ZYdkD2dClhnXR5reKtG98cwyaRT1NeugQoAPTTfsOpV9kqyeiBF9Qa5RHjemb3KzD5ulqygv6ED3t5j9eJw==",
      "dev": true,
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/defaults": {
      "version": "1.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "clone": "^1.0.2"
      }
    },
    "node_modules/define-lazy-prop": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-2.0.0.tgz",
      "integrity": "sha512-Ds09qNh8yw3khSjiJjiUInaGX9xlqZDY7JVryGxdxV7NPeuqQfplOpQ66yJFZut3jLa5zOwkXw1g9EI2uKh4Og==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dequal": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/dequal/-/dequal-2.0.3.tgz",
      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/devalue": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/devalue/-/devalue-4.3.0.tgz",
      "integrity": "sha512-n94yQo4LI3w7erwf84mhRUkUJfhLoCZiLyoOZ/QFsDbcWNZePrLwbQpvZBUG2TNxwV3VjCKPxkiiQA6pe3TrTA==",
      "dev": true
    },
    "node_modules/diff": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/diff/-/diff-5.1.0.tgz",
      "integrity": "sha512-D+mk+qE8VC/PAUrlAU34N+VfXev0ghe5ywmpqrawphmVZc1bEfn56uo9qpyGp1p4xpzOHkSW4ztBd6L7Xx4ACw==",
      "dev": true,
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true
    },
    "node_modules/dot-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/dot-case/-/dot-case-3.0.4.tgz",
      "integrity": "sha512-Kv5nKlh6yRrdrGvxeJ2e5y2eRUpkUosIW4A2AS38zwSz27zu7ufDwQPi5Jhs3XAlGNetl3bmnGhQsMtkKJnj3w==",
      "dev": true,
      "dependencies": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/dset": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/dset/-/dset-3.1.2.tgz",
      "integrity": "sha512-g/M9sqy3oHe477Ar4voQxWtaPIFw1jTdKZuomOjhCcBx9nHUNn0pu6NopuFFrTh/TRZIKEj+76vLWFu9BNKk+Q==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.4.222",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emmet": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/emmet/-/emmet-2.3.6.tgz",
      "integrity": "sha512-pLS4PBPDdxuUAmw7Me7+TcHbykTsBKN/S9XJbUOMFQrNv9MoshzyMFK/R57JBm94/6HSL4vHnDeEmxlC82NQ4A==",
      "dev": true,
      "dependencies": {
        "@emmetio/abbreviation": "^2.2.3",
        "@emmetio/css-abbreviation": "^2.1.4"
      }
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-module-lexer": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.2.0.tgz",
      "integrity": "sha512-2BMfqBDeVCcOlLaL1ZAfp+D868SczNpKArrTM3dhpd7dK/OVlogzY15qpUngt+LMTq5UC/csb9vVQAgupucSbA==",
      "dev": true
    },
    "node_modules/esbuild": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.16.17.tgz",
      "integrity": "sha512-G8LEkV0XzDMNwXKgM0Jwu3nY3lSTwSGY6XbxM9cr9+s0T/qSV1q1JVPBGzm3dcjhCic9+emZDmMffkwgPeOeLg==",
      "dev": true,
      "hasInstallScript": true,
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/android-arm": "0.16.17",
        "@esbuild/android-arm64": "0.16.17",
        "@esbuild/android-x64": "0.16.17",
        "@esbuild/darwin-arm64": "0.16.17",
        "@esbuild/darwin-x64": "0.16.17",
        "@esbuild/freebsd-arm64": "0.16.17",
        "@esbuild/freebsd-x64": "0.16.17",
        "@esbuild/linux-arm": "0.16.17",
        "@esbuild/linux-arm64": "0.16.17",
        "@esbuild/linux-ia32": "0.16.17",
        "@esbuild/linux-loong64": "0.16.17",
        "@esbuild/linux-mips64el": "0.16.17",
        "@esbuild/linux-ppc64": "0.16.17",
        "@esbuild/linux-riscv64": "0.16.17",
        "@esbuild/linux-s390x": "0.16.17",
        "@esbuild/linux-x64": "0.16.17",
        "@esbuild/netbsd-x64": "0.16.17",
        "@esbuild/openbsd-x64": "0.16.17",
        "@esbuild/sunos-x64": "0.16.17",
        "@esbuild/win32-arm64": "0.16.17",
        "@esbuild/win32-ia32": "0.16.17",
        "@esbuild/win32-x64": "0.16.17"
      }
    },
    "node_modules/escalade": {
      "version": "3.1.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "1.0.5",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/esprima": {
      "version": "4.0.1",
      "dev": true,
      "license": "BSD-2-Clause",
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/estree-walker": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
      "integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
      "dev": true,
      "dependencies": {
        "@types/estree": "^1.0.0"
      }
    },
    "node_modules/events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "dev": true,
      "engines": {
        "node": ">=0.8.x"
      }
    },
    "node_modules/execa": {
      "version": "6.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cross-spawn": "^7.0.3",
        "get-stream": "^6.0.1",
        "human-signals": "^3.0.1",
        "is-stream": "^3.0.0",
        "merge-stream": "^2.0.0",
        "npm-run-path": "^5.1.0",
        "onetime": "^6.0.0",
        "signal-exit": "^3.0.7",
        "strip-final-newline": "^3.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/extend": {
      "version": "3.0.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/extend-shallow": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extendable": "^0.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.2.11",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fastq": {
      "version": "1.13.0",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-babel-config": {
      "version": "1.2.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json5": "^0.5.1",
        "path-exists": "^3.0.0"
      },
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/find-babel-config/node_modules/json5": {
      "version": "0.5.1",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/find-babel-config/node_modules/path-exists": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/find-yarn-workspace-root2": {
      "version": "1.2.16",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "micromatch": "^4.0.2",
        "pkg-dir": "^4.2.0"
      }
    },
    "node_modules/fs-extra": {
      "version": "10.1.0",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-10.1.0.tgz",
      "integrity": "sha512-oRXApq54ETRj4eMiFzGnHWGy+zo5raudjuxN0b8H7s/RU2oW0Wvsx9O0ACRN/kRq9E8Vu/ReskGB5o3ji+FzHQ==",
      "dev": true,
      "dependencies": {
        "graceful-fs": "^4.2.0",
        "jsonfile": "^6.0.1",
        "universalify": "^2.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
      "dev": true,
      "hasInstallScript": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.1",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true,
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-stream": {
      "version": "6.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/github-slugger": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-2.0.0.tgz",
      "integrity": "sha512-IaOQ9puYtjrkq7Y0Ygl9KDZnrf/aiUJYUpVf89y8kyaxbRG7Y1SrX/jaumrv81vc61+kiMempujsM3Yw7w5qcw==",
      "dev": true
    },
    "node_modules/glob": {
      "version": "7.2.3",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "5.1.2",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/globals": {
      "version": "11.12.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/globalyzer": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/globalyzer/-/globalyzer-0.1.0.tgz",
      "integrity": "sha512-40oNTM9UfG6aBmuKxk/giHn5nQ8RVz/SS4Ir6zgzOv9/qC3kKZ9v4etGTcJbEl/NyVQH7FGU7d+X1egr57Md2Q==",
      "dev": true
    },
    "node_modules/globrex": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/globrex/-/globrex-0.1.2.tgz",
      "integrity": "sha512-uHJgbwAMwNFf5mLst7IWLNg14x1CkeqglJb/K3doi4dw6q2IvAAmM/Y81kevy83wP+Sst+nutFTYOGg3d1lsxg==",
      "dev": true
    },
    "node_modules/graceful-fs": {
      "version": "4.2.10",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/gray-matter": {
      "version": "4.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-yaml": "^3.13.1",
        "kind-of": "^6.0.2",
        "section-matter": "^1.0.0",
        "strip-bom-string": "^1.0.0"
      },
      "engines": {
        "node": ">=6.0"
      }
    },
    "node_modules/has": {
      "version": "1.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/has-flag": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/has-package-exports": {
      "version": "1.2.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ljharb/has-package-exports-patterns": "0.0.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hast-util-from-parse5": {
      "version": "7.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "@types/parse5": "^6.0.0",
        "@types/unist": "^2.0.0",
        "hastscript": "^7.0.0",
        "property-information": "^6.0.0",
        "vfile": "^5.0.0",
        "vfile-location": "^4.0.0",
        "web-namespaces": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-is-element": {
      "version": "2.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "@types/unist": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-parse-selector": {
      "version": "3.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-raw": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/hast-util-raw/-/hast-util-raw-7.2.3.tgz",
      "integrity": "sha512-RujVQfVsOrxzPOPSzZFiwofMArbQke6DJjnFfceiEbFh7S05CbPt0cYN+A5YeD3pso0JQk6O1aHBnx9+Pm2uqg==",
      "dev": true,
      "dependencies": {
        "@types/hast": "^2.0.0",
        "@types/parse5": "^6.0.0",
        "hast-util-from-parse5": "^7.0.0",
        "hast-util-to-parse5": "^7.0.0",
        "html-void-elements": "^2.0.0",
        "parse5": "^6.0.0",
        "unist-util-position": "^4.0.0",
        "unist-util-visit": "^4.0.0",
        "vfile": "^5.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-to-html": {
      "version": "8.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "ccount": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-is-element": "^2.0.0",
        "hast-util-whitespace": "^2.0.0",
        "html-void-elements": "^2.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0",
        "stringify-entities": "^4.0.2",
        "unist-util-is": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-to-parse5": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/hast-util-to-parse5/-/hast-util-to-parse5-7.1.0.tgz",
      "integrity": "sha512-YNRgAJkH2Jky5ySkIqFXTQiaqcAtJyVE+D5lkN6CdtOqrnkLfGYYrEcKuHOJZlp+MwjSwuD3fZuawI+sic/RBw==",
      "dev": true,
      "dependencies": {
        "@types/hast": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-whitespace": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hastscript": {
      "version": "7.0.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-parse-selector": "^3.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/header-case": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/header-case/-/header-case-2.0.4.tgz",
      "integrity": "sha512-H/vuk5TEEVZwrR0lp2zed9OCo1uAILMlx0JEMgC26rzyJJ3N1v6XkwHHXJQdR2doSjcGPM6OKPYoJgf0plJ11Q==",
      "dev": true,
      "dependencies": {
        "capital-case": "^1.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/html-escaper": {
      "version": "3.0.3",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/html-void-elements": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/human-signals": {
      "version": "3.0.1",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.20.0"
      }
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/import-meta-resolve": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/import-meta-resolve/-/import-meta-resolve-2.2.1.tgz",
      "integrity": "sha512-C6lLL7EJPY44kBvA80gq4uMsVFw5x3oSKfuMl1cuZ2RkI5+UJqQXgn+6hlUew0y4ig7Ypt4CObAAIzU53Nfpuw==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/inflight": {
      "version": "1.0.6",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/is-buffer": {
      "version": "2.0.5",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.10.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has": "^1.0.3"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "dev": true,
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-extendable": {
      "version": "0.1.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-interactive": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-plain-obj": {
      "version": "4.1.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-stream": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-unicode-supported": {
      "version": "1.2.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-wsl": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.2.0.tgz",
      "integrity": "sha512-fKzAra0rGJUUBwGBgNkHZuToZcn+TtXHpeCgmkMJMMYx1sQDYaCSyjJBSCa2nH1DGm7s3n1oBnohoVTBaN7Lww==",
      "dev": true,
      "dependencies": {
        "is-docker": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-wsl/node_modules/is-docker": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
      "integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
      "dev": true,
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "3.14.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "2.5.2",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/json5": {
      "version": "2.2.1",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jsonc-parser": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-2.3.1.tgz",
      "integrity": "sha512-H8jvkz1O50L3dMZCsLqiuB2tA7muqbSg1AtGEkN0leAqGjsUzDJir3Zwr02BhqdcITPg3ei3mZ+HjMocAknhhg==",
      "dev": true
    },
    "node_modules/jsonfile": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-6.1.0.tgz",
      "integrity": "sha512-5dgndWOriYSm5cnYaJNhalLNDKOqFwyDB/rr1E9ZsGciGvKPs8R2xYGCacuf3z6K1YKDz182fd+fY3cn3pMqXQ==",
      "dev": true,
      "dependencies": {
        "universalify": "^2.0.0"
      },
      "optionalDependencies": {
        "graceful-fs": "^4.1.6"
      }
    },
    "node_modules/kind-of": {
      "version": "6.0.3",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/kleur": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-4.1.5.tgz",
      "integrity": "sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/load-yaml-file": {
      "version": "0.2.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.1.5",
        "js-yaml": "^3.13.0",
        "pify": "^4.0.1",
        "strip-bom": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/load-yaml-file/node_modules/strip-bom": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "dev": true
    },
    "node_modules/log-symbols": {
      "version": "5.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.0.0",
        "is-unicode-supported": "^1.1.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-symbols/node_modules/chalk": {
      "version": "5.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/longest-streak": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/longest-streak/-/longest-streak-3.1.0.tgz",
      "integrity": "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/lower-case": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/lower-case/-/lower-case-2.0.2.tgz",
      "integrity": "sha512-7fm3l3NAF9WfN6W3JOmf5drwpVqX78JtoGJ3A6W0a6ZnldM41w2fV5D490psKFTpMds8TJse/eHLFFsNHHjHgg==",
      "dev": true,
      "dependencies": {
        "tslib": "^2.0.3"
      }
    },
    "node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "dev": true,
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/magic-string": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.27.0.tgz",
      "integrity": "sha512-8UnnX2PeRAPZuN12svgR9j7M1uWMovg/CEnIwIG0LFkXSJJe4PdfUGiTGl8V9bsBHFUtfVINcSyYxd7q+kx9fA==",
      "dev": true,
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.4.13"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/markdown-table": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/markdown-table/-/markdown-table-3.0.3.tgz",
      "integrity": "sha512-Z1NL3Tb1M9wH4XESsCDEksWoKTdlUafKc4pt0GRwjUyXaCFZ+dc3g2erqB6zm3szA2IUSi7VnPI+o/9jnxh9hw==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/mdast-util-definitions": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/mdast-util-definitions/-/mdast-util-definitions-5.1.2.tgz",
      "integrity": "sha512-8SVPMuHqlPME/z3gqVwWY4zVXn8lqKv/pAhC57FuJ40ImXyBpmO5ukh98zB2v7Blql2FiHjHv9LVztSIqjY+MA==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "unist-util-visit": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-find-and-replace": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/mdast-util-find-and-replace/-/mdast-util-find-and-replace-2.2.2.tgz",
      "integrity": "sha512-MTtdFRz/eMDHXzeK6W3dO7mXUlF82Gom4y0oOgvHhh/HXZAGvIQDUvQ0SuUx+j2tv44b8xTHOm8K/9OoRFnXKw==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "escape-string-regexp": "^5.0.0",
        "unist-util-is": "^5.0.0",
        "unist-util-visit-parents": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-5.0.0.tgz",
      "integrity": "sha512-/veY75JbMK4j1yjvuUxuVsiS/hr/4iHs9FTT6cgTexxdE0Ly/glccBAkloH/DofkjRbZU3bnoj38mOmhkZ0lHw==",
      "dev": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mdast-util-from-markdown": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/mdast-util-from-markdown/-/mdast-util-from-markdown-1.3.0.tgz",
      "integrity": "sha512-HN3W1gRIuN/ZW295c7zi7g9lVBllMgZE40RxCX37wrTPWXCWtpvOZdfnuK+1WNpvZje6XuJeI3Wnb4TJEUem+g==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "decode-named-character-reference": "^1.0.0",
        "mdast-util-to-string": "^3.1.0",
        "micromark": "^3.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-decode-string": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "unist-util-stringify-position": "^3.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm/-/mdast-util-gfm-2.0.2.tgz",
      "integrity": "sha512-qvZ608nBppZ4icQlhQQIAdc6S3Ffj9RGmzwUKUWuEICFnd1LVkN3EktF7ZHAgfcEdvZB5owU9tQgt99e2TlLjg==",
      "dev": true,
      "dependencies": {
        "mdast-util-from-markdown": "^1.0.0",
        "mdast-util-gfm-autolink-literal": "^1.0.0",
        "mdast-util-gfm-footnote": "^1.0.0",
        "mdast-util-gfm-strikethrough": "^1.0.0",
        "mdast-util-gfm-table": "^1.0.0",
        "mdast-util-gfm-task-list-item": "^1.0.0",
        "mdast-util-to-markdown": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-autolink-literal": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-autolink-literal/-/mdast-util-gfm-autolink-literal-1.0.3.tgz",
      "integrity": "sha512-My8KJ57FYEy2W2LyNom4n3E7hKTuQk/0SES0u16tjA9Z3oFkF4RrC/hPAPgjlSpezsOvI8ObcXcElo92wn5IGA==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "ccount": "^2.0.0",
        "mdast-util-find-and-replace": "^2.0.0",
        "micromark-util-character": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-footnote": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-footnote/-/mdast-util-gfm-footnote-1.0.2.tgz",
      "integrity": "sha512-56D19KOGbE00uKVj3sgIykpwKL179QsVFwx/DCW0u/0+URsryacI4MAdNJl0dh+u2PSsD9FtxPFbHCzJ78qJFQ==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0",
        "micromark-util-normalize-identifier": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-strikethrough": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-strikethrough/-/mdast-util-gfm-strikethrough-1.0.3.tgz",
      "integrity": "sha512-DAPhYzTYrRcXdMjUtUjKvW9z/FNAMTdU0ORyMcbmkwYNbKocDpdk+PX1L1dQgOID/+vVs1uBQ7ElrBQfZ0cuiQ==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-table": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-table/-/mdast-util-gfm-table-1.0.7.tgz",
      "integrity": "sha512-jjcpmNnQvrmN5Vx7y7lEc2iIOEytYv7rTvu+MeyAsSHTASGCCRA79Igg2uKssgOs1i1po8s3plW0sTu1wkkLGg==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "markdown-table": "^3.0.0",
        "mdast-util-from-markdown": "^1.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-task-list-item": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-task-list-item/-/mdast-util-gfm-task-list-item-1.0.2.tgz",
      "integrity": "sha512-PFTA1gzfp1B1UaiJVyhJZA1rm0+Tzn690frc/L8vNX1Jop4STZgOE6bxUhnzdVSB+vm2GU1tIsuQcA9bxTQpMQ==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-phrasing": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/mdast-util-phrasing/-/mdast-util-phrasing-3.0.1.tgz",
      "integrity": "sha512-WmI1gTXUBJo4/ZmSk79Wcb2HcjPJBzM1nlI/OUWA8yk2X9ik3ffNbBGsU+09BFmXaL1IBb9fiuvq6/KMiNycSg==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "unist-util-is": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-hast": {
      "version": "12.3.0",
      "resolved": "https://registry.npmjs.org/mdast-util-to-hast/-/mdast-util-to-hast-12.3.0.tgz",
      "integrity": "sha512-pits93r8PhnIoU4Vy9bjW39M2jJ6/tdHyja9rrot9uujkN7UTU9SDnE6WNJz/IGyQk3XHX6yNNtrBH6cQzm8Hw==",
      "dev": true,
      "dependencies": {
        "@types/hast": "^2.0.0",
        "@types/mdast": "^3.0.0",
        "mdast-util-definitions": "^5.0.0",
        "micromark-util-sanitize-uri": "^1.1.0",
        "trim-lines": "^3.0.0",
        "unist-util-generated": "^2.0.0",
        "unist-util-position": "^4.0.0",
        "unist-util-visit": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-markdown": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/mdast-util-to-markdown/-/mdast-util-to-markdown-1.5.0.tgz",
      "integrity": "sha512-bbv7TPv/WC49thZPg3jXuqzuvI45IL2EVAr/KxF0BSdHsU0ceFHOmwQn6evxAh1GaoK/6GQ1wp4R4oW2+LFL/A==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "longest-streak": "^3.0.0",
        "mdast-util-phrasing": "^3.0.0",
        "mdast-util-to-string": "^3.0.0",
        "micromark-util-decode-string": "^1.0.0",
        "unist-util-visit": "^4.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-string": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/mdast-util-to-string/-/mdast-util-to-string-3.1.1.tgz",
      "integrity": "sha512-tGvhT94e+cVnQt8JWE9/b3cUQZWS732TJxXHktvP+BYo62PpYD53Ls/6cC60rW21dW+txxiM4zMdc6abASvZKA==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/merge-stream": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromark": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/micromark/-/micromark-3.1.0.tgz",
      "integrity": "sha512-6Mj0yHLdUZjHnOPgr5xfWIMqMWS12zDN6iws9SLuSz76W8jTtAv24MN4/CL7gJrl5vtxGInkkqDv/JIoRsQOvA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "@types/debug": "^4.0.0",
        "debug": "^4.0.0",
        "decode-named-character-reference": "^1.0.0",
        "micromark-core-commonmark": "^1.0.1",
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-combine-extensions": "^1.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-encode": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-subtokenize": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.1",
        "uvu": "^0.5.0"
      }
    },
    "node_modules/micromark-core-commonmark": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/micromark-core-commonmark/-/micromark-core-commonmark-1.0.6.tgz",
      "integrity": "sha512-K+PkJTxqjFfSNkfAhp4GB+cZPfQd6dxtTXnf+RjZOV7T4EEXnvgzOcnp+eSTmpGk9d1S9sL6/lqrgSNn/s0HZA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "decode-named-character-reference": "^1.0.0",
        "micromark-factory-destination": "^1.0.0",
        "micromark-factory-label": "^1.0.0",
        "micromark-factory-space": "^1.0.0",
        "micromark-factory-title": "^1.0.0",
        "micromark-factory-whitespace": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-classify-character": "^1.0.0",
        "micromark-util-html-tag-name": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-subtokenize": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.1",
        "uvu": "^0.5.0"
      }
    },
    "node_modules/micromark-extension-gfm": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm/-/micromark-extension-gfm-2.0.1.tgz",
      "integrity": "sha512-p2sGjajLa0iYiGQdT0oelahRYtMWvLjy8J9LOCxzIQsllMCGLbsLW+Nc+N4vi02jcRJvedVJ68cjelKIO6bpDA==",
      "dev": true,
      "dependencies": {
        "micromark-extension-gfm-autolink-literal": "^1.0.0",
        "micromark-extension-gfm-footnote": "^1.0.0",
        "micromark-extension-gfm-strikethrough": "^1.0.0",
        "micromark-extension-gfm-table": "^1.0.0",
        "micromark-extension-gfm-tagfilter": "^1.0.0",
        "micromark-extension-gfm-task-list-item": "^1.0.0",
        "micromark-util-combine-extensions": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-autolink-literal": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-autolink-literal/-/micromark-extension-gfm-autolink-literal-1.0.3.tgz",
      "integrity": "sha512-i3dmvU0htawfWED8aHMMAzAVp/F0Z+0bPh3YrbTPPL1v4YAlCZpy5rBO5p0LPYiZo0zFVkoYh7vDU7yQSiCMjg==",
      "dev": true,
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-footnote": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-footnote/-/micromark-extension-gfm-footnote-1.0.4.tgz",
      "integrity": "sha512-E/fmPmDqLiMUP8mLJ8NbJWJ4bTw6tS+FEQS8CcuDtZpILuOb2kjLqPEeAePF1djXROHXChM/wPJw0iS4kHCcIg==",
      "dev": true,
      "dependencies": {
        "micromark-core-commonmark": "^1.0.0",
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-strikethrough": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-strikethrough/-/micromark-extension-gfm-strikethrough-1.0.4.tgz",
      "integrity": "sha512-/vjHU/lalmjZCT5xt7CcHVJGq8sYRm80z24qAKXzaHzem/xsDYb2yLL+NNVbYvmpLx3O7SYPuGL5pzusL9CLIQ==",
      "dev": true,
      "dependencies": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-classify-character": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-table": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-table/-/micromark-extension-gfm-table-1.0.5.tgz",
      "integrity": "sha512-xAZ8J1X9W9K3JTJTUL7G6wSKhp2ZYHrFk5qJgY/4B33scJzE2kpfRL6oiw/veJTbt7jiM/1rngLlOKPWr1G+vg==",
      "dev": true,
      "dependencies": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-tagfilter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-tagfilter/-/micromark-extension-gfm-tagfilter-1.0.1.tgz",
      "integrity": "sha512-Ty6psLAcAjboRa/UKUbbUcwjVAv5plxmpUTy2XC/3nJFL37eHej8jrHrRzkqcpipJliuBH30DTs7+3wqNcQUVA==",
      "dev": true,
      "dependencies": {
        "micromark-util-types": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-task-list-item": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-task-list-item/-/micromark-extension-gfm-task-list-item-1.0.3.tgz",
      "integrity": "sha512-PpysK2S1Q/5VXi72IIapbi/jliaiOFzv7THH4amwXeYXLq3l1uo8/2Be0Ac1rEwK20MQEsGH2ltAZLNY2KI/0Q==",
      "dev": true,
      "dependencies": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-factory-destination": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-destination/-/micromark-factory-destination-1.0.0.tgz",
      "integrity": "sha512-eUBA7Rs1/xtTVun9TmV3gjfPz2wEwgK5R5xcbIM5ZYAtvGF6JkyaDsj0agx8urXnO31tEO6Ug83iVH3tdedLnw==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-factory-label": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-factory-label/-/micromark-factory-label-1.0.2.tgz",
      "integrity": "sha512-CTIwxlOnU7dEshXDQ+dsr2n+yxpP0+fn271pu0bwDIS8uqfFcumXpj5mLn3hSC8iw2MUr6Gx8EcKng1dD7i6hg==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "node_modules/micromark-factory-space": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-space/-/micromark-factory-space-1.0.0.tgz",
      "integrity": "sha512-qUmqs4kj9a5yBnk3JMLyjtWYN6Mzfcx8uJfi5XAveBniDevmZasdGBba5b4QsvRcAkmvGo5ACmSUmyGiKTLZew==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-factory-title": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-factory-title/-/micromark-factory-title-1.0.2.tgz",
      "integrity": "sha512-zily+Nr4yFqgMGRKLpTVsNl5L4PMu485fGFDOQJQBl2NFpjGte1e86zC0da93wf97jrc4+2G2GQudFMHn3IX+A==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "node_modules/micromark-factory-whitespace": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-whitespace/-/micromark-factory-whitespace-1.0.0.tgz",
      "integrity": "sha512-Qx7uEyahU1lt1RnsECBiuEbfr9INjQTGa6Err+gF3g0Tx4YEviPbqqGKNv/NrBaE7dVHdn1bVZKM/n5I/Bak7A==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-util-character": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-character/-/micromark-util-character-1.1.0.tgz",
      "integrity": "sha512-agJ5B3unGNJ9rJvADMJ5ZiYjBRyDpzKAOk01Kpi1TKhlT1APx3XZk6eN7RtSz1erbWHC2L8T3xLZ81wdtGRZzg==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-util-chunked": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-chunked/-/micromark-util-chunked-1.0.0.tgz",
      "integrity": "sha512-5e8xTis5tEZKgesfbQMKRCyzvffRRUX+lK/y+DvsMFdabAicPkkZV6gO+FEWi9RfuKKoxxPwNL+dFF0SMImc1g==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "node_modules/micromark-util-classify-character": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-classify-character/-/micromark-util-classify-character-1.0.0.tgz",
      "integrity": "sha512-F8oW2KKrQRb3vS5ud5HIqBVkCqQi224Nm55o5wYLzY/9PwHGXC01tr3d7+TqHHz6zrKQ72Okwtvm/xQm6OVNZA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-util-combine-extensions": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-combine-extensions/-/micromark-util-combine-extensions-1.0.0.tgz",
      "integrity": "sha512-J8H058vFBdo/6+AsjHp2NF7AJ02SZtWaVUjsayNFeAiydTxUwViQPxN0Hf8dp4FmCQi0UUFovFsEyRSUmFH3MA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-util-decode-numeric-character-reference": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-decode-numeric-character-reference/-/micromark-util-decode-numeric-character-reference-1.0.0.tgz",
      "integrity": "sha512-OzO9AI5VUtrTD7KSdagf4MWgHMtET17Ua1fIpXTpuhclCqD8egFWo85GxSGvxgkGS74bEahvtM0WP0HjvV0e4w==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "node_modules/micromark-util-decode-string": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-decode-string/-/micromark-util-decode-string-1.0.2.tgz",
      "integrity": "sha512-DLT5Ho02qr6QWVNYbRZ3RYOSSWWFuH3tJexd3dgN1odEuPNxCngTCXJum7+ViRAd9BbdxCvMToPOD/IvVhzG6Q==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "decode-named-character-reference": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "node_modules/micromark-util-encode": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-util-encode/-/micromark-util-encode-1.0.1.tgz",
      "integrity": "sha512-U2s5YdnAYexjKDel31SVMPbfi+eF8y1U4pfiRW/Y8EFVCy/vgxk/2wWTxzcqE71LHtCuCzlBDRU2a5CQ5j+mQA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ]
    },
    "node_modules/micromark-util-html-tag-name": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-html-tag-name/-/micromark-util-html-tag-name-1.1.0.tgz",
      "integrity": "sha512-BKlClMmYROy9UiV03SwNmckkjn8QHVaWkqoAqzivabvdGcwNGMMMH/5szAnywmsTBUzDsU57/mFi0sp4BQO6dA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ]
    },
    "node_modules/micromark-util-normalize-identifier": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-normalize-identifier/-/micromark-util-normalize-identifier-1.0.0.tgz",
      "integrity": "sha512-yg+zrL14bBTFrQ7n35CmByWUTFsgst5JhA4gJYoty4Dqzj4Z4Fr/DHekSS5aLfH9bdlfnSvKAWsAgJhIbogyBg==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "node_modules/micromark-util-resolve-all": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-resolve-all/-/micromark-util-resolve-all-1.0.0.tgz",
      "integrity": "sha512-CB/AGk98u50k42kvgaMM94wzBqozSzDDaonKU7P7jwQIuH2RU0TeBqGYJz2WY1UdihhjweivStrJ2JdkdEmcfw==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-types": "^1.0.0"
      }
    },
    "node_modules/micromark-util-sanitize-uri": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-sanitize-uri/-/micromark-util-sanitize-uri-1.1.0.tgz",
      "integrity": "sha512-RoxtuSCX6sUNtxhbmsEFQfWzs8VN7cTctmBPvYivo98xb/kDEoTCtJQX5wyzIYEmk/lvNFTat4hL8oW0KndFpg==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-encode": "^1.0.0",
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "node_modules/micromark-util-subtokenize": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-subtokenize/-/micromark-util-subtokenize-1.0.2.tgz",
      "integrity": "sha512-d90uqCnXp/cy4G881Ub4psE57Sf8YD0pim9QdjCRNjfas2M1u6Lbt+XZK9gnHL2XFhnozZiEdCa9CNfXSfQ6xA==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "dependencies": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "node_modules/micromark-util-symbol": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-util-symbol/-/micromark-util-symbol-1.0.1.tgz",
      "integrity": "sha512-oKDEMK2u5qqAptasDAwWDXq0tG9AssVwAx3E9bBF3t/shRIGsWIRG+cGafs2p/SnDSOecnt6hZPCE2o6lHfFmQ==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ]
    },
    "node_modules/micromark-util-types": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-types/-/micromark-util-types-1.0.2.tgz",
      "integrity": "sha512-DCfg/T8fcrhrRKTPjRrw/5LLvdGV7BHySf/1LOZx7TzWZdYRjogNtyNq885z3nNallwr3QUKARjqvHqX1/7t+w==",
      "dev": true,
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ]
    },
    "node_modules/micromatch": {
      "version": "4.0.5",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.2",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/mimic-fn": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/mri": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mri/-/mri-1.2.0.tgz",
      "integrity": "sha512-tzzskb3bG8LvYGFF/mDTpq3jpI6Q9wc3LEmBaghu+DdCssd1FakN7Bc0hVNmEyGq1bq3RgfkCb3cmQLpNPOroA==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/ms": {
      "version": "2.1.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.4",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.4.tgz",
      "integrity": "sha512-MqBkQh/OHTS2egovRtLk45wEyNXwF+cokD+1YPf9u5VfJiRdAiRwB2froX5Co9Rh20xs4siNPm8naNotSD6RBw==",
      "dev": true,
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/nlcst-to-string": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/nlcst-to-string/-/nlcst-to-string-3.1.1.tgz",
      "integrity": "sha512-63mVyqaqt0cmn2VcI2aH6kxe1rLAmSROqHMA0i4qqg1tidkfExgpb0FGMikMCn86mw5dFtBtEANfmSSK7TjNHw==",
      "dev": true,
      "dependencies": {
        "@types/nlcst": "^1.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/no-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/no-case/-/no-case-3.0.4.tgz",
      "integrity": "sha512-fgAN3jGAh+RoxUGZHTSOLJIqUc2wmoBwGR4tbpNAKmmovFoWq0OdRkb0VkldReO2a2iBT/OEulG9XSUc10r3zg==",
      "dev": true,
      "dependencies": {
        "lower-case": "^2.0.2",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.6",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/npm-run-path": {
      "version": "5.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^4.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/npm-run-path/node_modules/path-key": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/onetime": {
      "version": "6.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^4.0.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/open": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/open/-/open-8.4.2.tgz",
      "integrity": "sha512-7x81NCL719oNbsq/3mh+hVrAWmFuEYUqrq/Iw3kUzH8ReypT9QQ0BLoJS7/G9k6N81XjW4qHWtjWwe/9eLy1EQ==",
      "dev": true,
      "dependencies": {
        "define-lazy-prop": "^2.0.0",
        "is-docker": "^2.1.1",
        "is-wsl": "^2.2.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/open/node_modules/is-docker": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
      "integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
      "dev": true,
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ora": {
      "version": "6.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bl": "^5.0.0",
        "chalk": "^5.0.0",
        "cli-cursor": "^4.0.0",
        "cli-spinners": "^2.6.1",
        "is-interactive": "^2.0.0",
        "is-unicode-supported": "^1.1.0",
        "log-symbols": "^5.1.0",
        "strip-ansi": "^7.0.1",
        "wcwidth": "^1.0.1"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ora/node_modules/chalk": {
      "version": "5.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-try": {
      "version": "2.2.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/param-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/param-case/-/param-case-3.0.4.tgz",
      "integrity": "sha512-RXlj7zCYokReqWpOPH9oYivUzLYZ5vAPIfEmCTNViosC78F8F0H9y7T7gG2M39ymgutxF5gcFEsyZQSph9Bp3A==",
      "dev": true,
      "dependencies": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/parse-latin": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/parse-latin/-/parse-latin-5.0.1.tgz",
      "integrity": "sha512-b/K8ExXaWC9t34kKeDV8kGXBkXZ1HCSAZRYE7HR14eA1GlXX5L8iWhs8USJNhQU9q5ci413jCKF0gOyovvyRBg==",
      "dev": true,
      "dependencies": {
        "nlcst-to-string": "^3.0.0",
        "unist-util-modify-children": "^3.0.0",
        "unist-util-visit-children": "^2.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/parse5": {
      "version": "6.0.1",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pascal-case": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/pascal-case/-/pascal-case-3.1.2.tgz",
      "integrity": "sha512-uWlGT3YSnK9x3BQJaOdcZwrnV6hPpd8jFH1/ucpiLRPh/2zCVJKS19E4GvYHvaCcACn3foXZ0cLB9Wrx1KGe5g==",
      "dev": true,
      "dependencies": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/path-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/path-case/-/path-case-3.0.4.tgz",
      "integrity": "sha512-qO4qCFjXqVTrcbPt/hQfhTQ+VhFsqNKOPtytgNKkKxSoEp3XPUQ8ObFuePylOIok5gjn69ry8XiULxCwot3Wfg==",
      "dev": true,
      "dependencies": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-is-absolute": {
      "version": "1.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "6.2.1",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.0.0",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "4.0.1",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-dir": {
      "version": "4.2.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-dir/node_modules/find-up": {
      "version": "4.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^5.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-dir/node_modules/locate-path": {
      "version": "5.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^4.1.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-dir/node_modules/p-limit": {
      "version": "2.3.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-try": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pkg-dir/node_modules/p-locate": {
      "version": "4.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^2.2.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-up": {
      "version": "3.1.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pkg-up/node_modules/find-up": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/locate-path": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^3.0.0",
        "path-exists": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/p-limit": {
      "version": "2.3.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-try": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pkg-up/node_modules/p-locate": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/pkg-up/node_modules/path-exists": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.21",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.21.tgz",
      "integrity": "sha512-tP7u/Sn/dVxK2NnruI4H9BG+x+Wxz6oeZ1cJ8P6G/PZY0IKk4k/63TDsQf2kQq3+qoJeLm2kIBUNlZe3zgb4Zg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        }
      ],
      "dependencies": {
        "nanoid": "^3.3.4",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/preact": {
      "version": "10.10.3",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/preact"
      }
    },
    "node_modules/preact-render-to-string": {
      "version": "5.2.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pretty-format": "^3.8.0"
      },
      "peerDependencies": {
        "preact": ">=10"
      }
    },
    "node_modules/preferred-pm": {
      "version": "3.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^5.0.0",
        "find-yarn-workspace-root2": "1.2.16",
        "path-exists": "^4.0.0",
        "which-pm": "2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/prettier": {
      "version": "2.8.4",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-2.8.4.tgz",
      "integrity": "sha512-vIS4Rlc2FNh0BySk3Wkd6xmwxB0FpOndW5fisM5H8hsZSxU2VWVB5CWIkIjWvrHjIhxk2g3bfMKM87zNTrZddw==",
      "dev": true,
      "bin": {
        "prettier": "bin-prettier.js"
      },
      "engines": {
        "node": ">=10.13.0"
      },
      "funding": {
        "url": "https://github.com/prettier/prettier?sponsor=1"
      }
    },
    "node_modules/prettier-plugin-astro": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/prettier-plugin-astro/-/prettier-plugin-astro-0.7.2.tgz",
      "integrity": "sha512-mmifnkG160BtC727gqoimoxnZT/dwr8ASxpoGGl6EHevhfblSOeu+pwH1LAm5Qu1MynizktztFujHHaijLCkww==",
      "dev": true,
      "dependencies": {
        "@astrojs/compiler": "^0.31.3",
        "prettier": "^2.7.1",
        "sass-formatter": "^0.7.5",
        "synckit": "^0.8.4"
      },
      "engines": {
        "node": "^14.15.0 || >=16.0.0",
        "pnpm": ">=7.14.0"
      }
    },
    "node_modules/prettier-plugin-astro/node_modules/@astrojs/compiler": {
      "version": "0.31.4",
      "resolved": "https://registry.npmjs.org/@astrojs/compiler/-/compiler-0.31.4.tgz",
      "integrity": "sha512-6bBFeDTtPOn4jZaiD3p0f05MEGQL9pw2Zbfj546oFETNmjJFWO3nzHz6/m+P53calknCvyVzZ5YhoBLIvzn5iw==",
      "dev": true
    },
    "node_modules/pretty-format": {
      "version": "3.8.0",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prismjs": {
      "version": "1.29.0",
      "resolved": "https://registry.npmjs.org/prismjs/-/prismjs-1.29.0.tgz",
      "integrity": "sha512-Kx/1w86q/epKcmte75LNrEoT+lX8pBpavuAbvJWRXar7Hz8jrtF+e3vY751p0R8H9HdArwaCTNDDzHg/ScJK1Q==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/prompts": {
      "version": "2.4.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.5"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/prompts/node_modules/kleur": {
      "version": "3.0.3",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/property-information": {
      "version": "6.1.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/readable-stream": {
      "version": "3.6.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/rehype": {
      "version": "12.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "rehype-parse": "^8.0.0",
        "rehype-stringify": "^9.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-parse": {
      "version": "8.0.4",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "hast-util-from-parse5": "^7.0.0",
        "parse5": "^6.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-raw": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/rehype-raw/-/rehype-raw-6.1.1.tgz",
      "integrity": "sha512-d6AKtisSRtDRX4aSPsJGTfnzrX2ZkHQLE5kiUuGOeEoLpbEulFF4hj0mLPbsa+7vmguDKOVVEQdHKDSwoaIDsQ==",
      "dev": true,
      "dependencies": {
        "@types/hast": "^2.0.0",
        "hast-util-raw": "^7.2.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-stringify": {
      "version": "9.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^2.0.0",
        "hast-util-to-html": "^8.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-gfm": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/remark-gfm/-/remark-gfm-3.0.1.tgz",
      "integrity": "sha512-lEFDoi2PICJyNrACFOfDD3JlLkuSbOa5Wd8EPt06HUdptv8Gn0bxYTdbU/XXQ3swAPkEaGxxPN9cbnMHvVu1Ig==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "mdast-util-gfm": "^2.0.0",
        "micromark-extension-gfm": "^2.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-parse": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/remark-parse/-/remark-parse-10.0.1.tgz",
      "integrity": "sha512-1fUyHr2jLsVOkhbvPRBJ5zTKZZyD6yZzYaWCS6BPBdQ8vEMBCH+9zNCDA6tET/zHCi/jLqjCWtlJZUPk+DbnFw==",
      "dev": true,
      "dependencies": {
        "@types/mdast": "^3.0.0",
        "mdast-util-from-markdown": "^1.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-rehype": {
      "version": "10.1.0",
      "resolved": "https://registry.npmjs.org/remark-rehype/-/remark-rehype-10.1.0.tgz",
      "integrity": "sha512-EFmR5zppdBp0WQeDVZ/b66CWJipB2q2VLNFMabzDSGR66Z2fQii83G5gTBbgGEnEEA0QRussvrFHxk1HWGJskw==",
      "dev": true,
      "dependencies": {
        "@types/hast": "^2.0.0",
        "@types/mdast": "^3.0.0",
        "mdast-util-to-hast": "^12.1.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-smartypants": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/remark-smartypants/-/remark-smartypants-2.0.0.tgz",
      "integrity": "sha512-Rc0VDmr/yhnMQIz8n2ACYXlfw/P/XZev884QU1I5u+5DgJls32o97Vc1RbK3pfumLsJomS2yy8eT4Fxj/2MDVA==",
      "dev": true,
      "dependencies": {
        "retext": "^8.1.0",
        "retext-smartypants": "^5.1.0",
        "unist-util-visit": "^4.1.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/reselect": {
      "version": "4.1.6",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/resolve": {
      "version": "1.22.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.9.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/restore-cursor": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "onetime": "^5.1.0",
        "signal-exit": "^3.0.2"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/restore-cursor/node_modules/mimic-fn": {
      "version": "2.1.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/restore-cursor/node_modules/onetime": {
      "version": "5.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^2.1.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/retext": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/retext/-/retext-8.1.0.tgz",
      "integrity": "sha512-N9/Kq7YTn6ZpzfiGW45WfEGJqFf1IM1q8OsRa1CGzIebCJBNCANDRmOrholiDRGKo/We7ofKR4SEvcGAWEMD3Q==",
      "dev": true,
      "dependencies": {
        "@types/nlcst": "^1.0.0",
        "retext-latin": "^3.0.0",
        "retext-stringify": "^3.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-latin": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/retext-latin/-/retext-latin-3.1.0.tgz",
      "integrity": "sha512-5MrD1tuebzO8ppsja5eEu+ZbBeUNCjoEarn70tkXOS7Bdsdf6tNahsv2bY0Z8VooFF6cw7/6S+d3yI/TMlMVVQ==",
      "dev": true,
      "dependencies": {
        "@types/nlcst": "^1.0.0",
        "parse-latin": "^5.0.0",
        "unherit": "^3.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-smartypants": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/retext-smartypants/-/retext-smartypants-5.2.0.tgz",
      "integrity": "sha512-Do8oM+SsjrbzT2UNIKgheP0hgUQTDDQYyZaIY3kfq0pdFzoPk+ZClYJ+OERNXveog4xf1pZL4PfRxNoVL7a/jw==",
      "dev": true,
      "dependencies": {
        "@types/nlcst": "^1.0.0",
        "nlcst-to-string": "^3.0.0",
        "unified": "^10.0.0",
        "unist-util-visit": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-stringify": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/retext-stringify/-/retext-stringify-3.1.0.tgz",
      "integrity": "sha512-767TLOaoXFXyOnjx/EggXlb37ZD2u4P1n0GJqVdpipqACsQP+20W+BNpMYrlJkq7hxffnFk+jc6mAK9qrbuB8w==",
      "dev": true,
      "dependencies": {
        "@types/nlcst": "^1.0.0",
        "nlcst-to-string": "^3.0.0",
        "unified": "^10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/reusify": {
      "version": "1.0.4",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "3.18.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-3.18.0.tgz",
      "integrity": "sha512-J8C6VfEBjkvYPESMQYxKHxNOh4A5a3FlP+0BETGo34HEcE4eTlgCrO2+eWzlu2a/sHs2QUkZco+wscH7jhhgWg==",
      "dev": true,
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=14.18.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/s.color": {
      "version": "0.0.15",
      "resolved": "https://registry.npmjs.org/s.color/-/s.color-0.0.15.tgz",
      "integrity": "sha512-AUNrbEUHeKY8XsYr/DYpl+qk5+aM+DChopnWOPEzn8YKzOhv4l2zH6LzZms3tOZP3wwdOyc0RmTciyi46HLIuA==",
      "dev": true
    },
    "node_modules/sade": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/sade/-/sade-1.8.1.tgz",
      "integrity": "sha512-xal3CZX1Xlo/k4ApwCFrHVACi9fBqJ7V+mwhBsuf/1IOKbBy098Fex+Wa/5QMubw09pSZ/u8EY8PWgevJsXp1A==",
      "dev": true,
      "dependencies": {
        "mri": "^1.1.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.1.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/sass-formatter": {
      "version": "0.7.6",
      "resolved": "https://registry.npmjs.org/sass-formatter/-/sass-formatter-0.7.6.tgz",
      "integrity": "sha512-hXdxU6PCkiV3XAiSnX+XLqz2ohHoEnVUlrd8LEVMAI80uB1+OTScIkH9n6qQwImZpTye1r1WG1rbGUteHNhoHg==",
      "dev": true,
      "dependencies": {
        "suf-log": "^2.5.3"
      }
    },
    "node_modules/sax": {
      "version": "1.2.4",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/section-matter": {
      "version": "1.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "extend-shallow": "^2.0.1",
        "kind-of": "^6.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/semver": {
      "version": "7.3.8",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.8.tgz",
      "integrity": "sha512-NB1ctGL5rlHrPJtFDVIVzTyQylMLu9N9VICA6HSFJo8MCGVTMW6gfpicwKmmK/dAjTOrqu5l63JJOpDSrAis3A==",
      "dev": true,
      "dependencies": {
        "lru-cache": "^6.0.0"
      },
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/sentence-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/sentence-case/-/sentence-case-3.0.4.tgz",
      "integrity": "sha512-8LS0JInaQMCRoQ7YUytAo/xUu5W2XnQxV2HI/6uM6U7CITS1RqPElr30V6uIqyMKM9lJGRVFy5/4CuzcixNYSg==",
      "dev": true,
      "dependencies": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case-first": "^2.0.2"
      }
    },
    "node_modules/server-destroy": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/server-destroy/-/server-destroy-1.0.1.tgz",
      "integrity": "sha512-rb+9B5YBIEzYcD6x2VKidaa+cqYBJQKnU4oe4E3ANwRRN56yk/ua1YCJT1n21NTS8w6CcOclAKNP3PhdCXKYtQ==",
      "dev": true
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shiki": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/shiki/-/shiki-0.11.1.tgz",
      "integrity": "sha512-EugY9VASFuDqOexOgXR18ZV+TbFrQHeCpEYaXamO+SZlsnT/2LxuLBX25GGtIrwaEVFXUAbUQ601SWE2rMwWHA==",
      "dev": true,
      "dependencies": {
        "jsonc-parser": "^3.0.0",
        "vscode-oniguruma": "^1.6.1",
        "vscode-textmate": "^6.0.0"
      }
    },
    "node_modules/shiki/node_modules/jsonc-parser": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
      "integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
      "dev": true
    },
    "node_modules/signal-exit": {
      "version": "3.0.7",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/sisteransi": {
      "version": "1.0.5",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/sitemap": {
      "version": "7.1.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "^17.0.5",
        "@types/sax": "^1.2.1",
        "arg": "^5.0.0",
        "sax": "^1.2.4"
      },
      "bin": {
        "sitemap": "dist/cli.js"
      },
      "engines": {
        "node": ">=12.0.0",
        "npm": ">=5.6.0"
      }
    },
    "node_modules/slash": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/snake-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/snake-case/-/snake-case-3.0.4.tgz",
      "integrity": "sha512-LAOh4z89bGQvl9pFfNF8V146i7o7/CqFPbqzYgP+yYzDIDeS9HaNFtXABamRW+AQzEVODcvE79ljJ+8a9YSdMg==",
      "dev": true,
      "dependencies": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "node_modules/source-map": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.4.tgz",
      "integrity": "sha512-l3BikUxvPOcn5E74dZiq5BGsTb5yEwhaTSzccU6t4sDOH8NWJCstKO5QT2CvtFoK6F0saL7p9xHAqHOlCPJygA==",
      "dev": true,
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",
      "integrity": "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/space-separated-tokens": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/sprintf-js": {
      "version": "1.0.3",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "dev": true,
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/string_decoder/node_modules/safe-buffer": {
      "version": "5.2.1",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/stringify-entities": {
      "version": "4.0.3",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "character-entities-html4": "^2.0.0",
        "character-entities-legacy": "^3.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-bom": {
      "version": "4.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-bom-string": {
      "version": "1.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/strip-final-newline": {
      "version": "3.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/style-dictionary": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/style-dictionary/-/style-dictionary-3.7.2.tgz",
      "integrity": "sha512-Nd/qrPj1ikYX+sL/8PofMgfaJLRvGgT96Ty3dJLGNqtZmecVr3Xs+OZivMQEYmSCTiap/UyeV5SqwmAgn3/KKA==",
      "dev": true,
      "dependencies": {
        "chalk": "^4.0.0",
        "change-case": "^4.1.2",
        "commander": "^8.3.0",
        "fs-extra": "^10.0.0",
        "glob": "^7.2.0",
        "json5": "^2.2.0",
        "jsonc-parser": "^3.0.0",
        "lodash": "^4.17.15",
        "tinycolor2": "^1.4.1"
      },
      "bin": {
        "style-dictionary": "bin/style-dictionary"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/style-dictionary/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/style-dictionary/node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/style-dictionary/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/style-dictionary/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true
    },
    "node_modules/style-dictionary/node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/style-dictionary/node_modules/jsonc-parser": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
      "integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
      "dev": true
    },
    "node_modules/style-dictionary/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/suf-log": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/suf-log/-/suf-log-2.5.3.tgz",
      "integrity": "sha512-KvC8OPjzdNOe+xQ4XWJV2whQA0aM1kGVczMQ8+dStAO6KfEB140JEVQ9dE76ONZ0/Ylf67ni4tILPJB41U0eow==",
      "dev": true,
      "dependencies": {
        "s.color": "0.0.15"
      }
    },
    "node_modules/supports-color": {
      "version": "5.5.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^3.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/supports-esm": {
      "version": "1.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-package-exports": "^1.1.0"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/synckit": {
      "version": "0.8.5",
      "resolved": "https://registry.npmjs.org/synckit/-/synckit-0.8.5.tgz",
      "integrity": "sha512-L1dapNV6vu2s/4Sputv8xGsCdAVlb5nRDMFU/E27D44l5U6cw1g0dGd45uLc+OXjNMmF4ntiMdCimzcjFKQI8Q==",
      "dev": true,
      "dependencies": {
        "@pkgr/utils": "^2.3.1",
        "tslib": "^2.5.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/unts"
      }
    },
    "node_modules/tiny-glob": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/tiny-glob/-/tiny-glob-0.2.9.tgz",
      "integrity": "sha512-g/55ssRPUjShh+xkfx9UPDXqhckHEsHr4Vd9zX55oSdGZc/MD0m3sferOkwWtp98bv+kcVfEHtRJgBVJzelrzg==",
      "dev": true,
      "dependencies": {
        "globalyzer": "0.1.0",
        "globrex": "^0.1.2"
      }
    },
    "node_modules/tinycolor2": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/tinycolor2/-/tinycolor2-1.6.0.tgz",
      "integrity": "sha512-XPaBkWQJdsf3pLKJV9p4qN/S+fm2Oj8AIPo1BTUhg5oxkvm9+SVEGFdhyOz7tTdUTfvxMiAs4sp6/eZO2Ew+pw==",
      "dev": true
    },
    "node_modules/to-fast-properties": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/token-transformer": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/token-transformer/-/token-transformer-0.0.29.tgz",
      "integrity": "sha512-nKmLgbtLFEbCFyx7Rt+I4m9QWoMn24Mu7lJdspvSIYiLmq9fp1Q8lsbjrjSbsA6JXpjN1xtWxCgBkzCsna4wDw==",
      "dev": true,
      "dependencies": {
        "yargs": "^17.4.1"
      },
      "bin": {
        "token-transformer": "cli.js"
      }
    },
    "node_modules/trim-lines": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/trim-lines/-/trim-lines-3.0.1.tgz",
      "integrity": "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/trough": {
      "version": "2.1.0",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/tsconfig-resolver": {
      "version": "3.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.30",
        "@types/resolve": "^1.17.0",
        "json5": "^2.1.3",
        "resolve": "^1.17.0",
        "strip-bom": "^4.0.0",
        "type-fest": "^0.13.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/ifiokjr"
      }
    },
    "node_modules/tsconfig-resolver/node_modules/type-fest": {
      "version": "0.13.1",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/tslib": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.0.tgz",
      "integrity": "sha512-336iVw3rtn2BUK7ORdIAHTyxHGRIHVReokCR3XjbckJMK7ms8FysBfhLR8IXnAgy7T0PTPNBWKiH514FOW/WSg==",
      "dev": true
    },
    "node_modules/type-fest": {
      "version": "2.18.0",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=12.20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/typescript": {
      "version": "4.9.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-4.9.5.tgz",
      "integrity": "sha512-1FXk9E2Hm+QzZQ7z+McJiHL4NW1F2EzMu9Nq9i3zAaGqibafqYwCVU6WyWAuyQRRzOlxou8xZSyXLEN8oKj24g==",
      "dev": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=4.2.0"
      }
    },
    "node_modules/undici": {
      "version": "5.20.0",
      "resolved": "https://registry.npmjs.org/undici/-/undici-5.20.0.tgz",
      "integrity": "sha512-J3j60dYzuo6Eevbawwp1sdg16k5Tf768bxYK4TUJRH7cBM4kFCbf3mOnM/0E3vQYXvpxITbbWmBafaDbxLDz3g==",
      "dev": true,
      "dependencies": {
        "busboy": "^1.6.0"
      },
      "engines": {
        "node": ">=12.18"
      }
    },
    "node_modules/unherit": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/unherit/-/unherit-3.0.1.tgz",
      "integrity": "sha512-akOOQ/Yln8a2sgcLj4U0Jmx0R5jpIg2IUyRrWOzmEbjBtGzBdHtSeFKgoEcoH4KYIG/Pb8GQ/BwtYm0GCq1Sqg==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/unified": {
      "version": "10.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^2.0.0",
        "bail": "^2.0.0",
        "extend": "^3.0.0",
        "is-buffer": "^2.0.0",
        "is-plain-obj": "^4.0.0",
        "trough": "^2.0.0",
        "vfile": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-generated": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unist-util-generated/-/unist-util-generated-2.0.1.tgz",
      "integrity": "sha512-qF72kLmPxAw0oN2fwpWIqbXAVyEqUzDHMsbtPvOudIlUzXYFIeQIuxXQCRCFh22B7cixvU0MG7m3MW8FTq/S+A==",
      "dev": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-is": {
      "version": "5.1.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-modify-children": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/unist-util-modify-children/-/unist-util-modify-children-3.1.1.tgz",
      "integrity": "sha512-yXi4Lm+TG5VG+qvokP6tpnk+r1EPwyYL04JWDxLvgvPV40jANh7nm3udk65OOWquvbMDe+PL9+LmkxDpTv/7BA==",
      "dev": true,
      "dependencies": {
        "@types/unist": "^2.0.0",
        "array-iterate": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-position": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/unist-util-position/-/unist-util-position-4.0.4.tgz",
      "integrity": "sha512-kUBE91efOWfIVBo8xzh/uZQ7p9ffYRtUbMRZBNFYwf0RK8koUMx6dGUfwylLOKmaT2cs4wSW96QoYUSXAyEtpg==",
      "dev": true,
      "dependencies": {
        "@types/unist": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-stringify-position": {
      "version": "3.0.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/unist-util-visit/-/unist-util-visit-4.1.2.tgz",
      "integrity": "sha512-MSd8OUGISqHdVvfY9TPhyK2VdUrPgxkUtWSuMHF6XAAFuL4LokseigBnZtPnJMu+FbynTkFNnFlyjxpVKujMRg==",
      "dev": true,
      "dependencies": {
        "@types/unist": "^2.0.0",
        "unist-util-is": "^5.0.0",
        "unist-util-visit-parents": "^5.1.1"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit-children": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/unist-util-visit-children/-/unist-util-visit-children-2.0.2.tgz",
      "integrity": "sha512-+LWpMFqyUwLGpsQxpumsQ9o9DG2VGLFrpz+rpVXYIEdPy57GSy5HioC0g3bg/8WP9oCLlapQtklOzQ8uLS496Q==",
      "dev": true,
      "dependencies": {
        "@types/unist": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit-parents": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/unist-util-visit-parents/-/unist-util-visit-parents-5.1.3.tgz",
      "integrity": "sha512-x6+y8g7wWMyQhL1iZfhIPhDAs7Xwbn9nRosDXl7qoPTSCy0yNxnKc+hWokFifWQIDGi154rdUqKvbCa4+1kLhg==",
      "dev": true,
      "dependencies": {
        "@types/unist": "^2.0.0",
        "unist-util-is": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/universalify": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-2.0.0.tgz",
      "integrity": "sha512-hAZsKq7Yy11Zu1DE0OzWjw7nnLZmJZYTDZZyEFHZdUhV8FkH5MCfoU1XMaxXovpyW5nq5scPqq0ZDP9Zyl04oQ==",
      "dev": true,
      "engines": {
        "node": ">= 10.0.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.0.5",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.1.1",
        "picocolors": "^1.0.0"
      },
      "bin": {
        "browserslist-lint": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/upper-case": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/upper-case/-/upper-case-2.0.2.tgz",
      "integrity": "sha512-KgdgDGJt2TpuwBUIjgG6lzw2GWFRCW9Qkfkiv0DxqHHLYJHmtmdUIKcZd8rHgFSjopVTlw6ggzCm1b8MFQwikg==",
      "dev": true,
      "dependencies": {
        "tslib": "^2.0.3"
      }
    },
    "node_modules/upper-case-first": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/upper-case-first/-/upper-case-first-2.0.2.tgz",
      "integrity": "sha512-514ppYHBaKwfJRK/pNC6c/OxfGa0obSnAl106u97Ed0I625Nin96KAjttZF6ZL3e1XLtphxnqrOi9iWgm+u+bg==",
      "dev": true,
      "dependencies": {
        "tslib": "^2.0.3"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/uvu": {
      "version": "0.5.6",
      "resolved": "https://registry.npmjs.org/uvu/-/uvu-0.5.6.tgz",
      "integrity": "sha512-+g8ENReyr8YsOc6fv/NVJs2vFdHBnBNdfE49rshrTzDWOlUx4Gq7KOS2GD8eqhy2j+Ejq29+SbKH8yjkAqXqoA==",
      "dev": true,
      "dependencies": {
        "dequal": "^2.0.0",
        "diff": "^5.0.0",
        "kleur": "^4.0.3",
        "sade": "^1.7.3"
      },
      "bin": {
        "uvu": "bin.js"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/vfile": {
      "version": "5.3.4",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^2.0.0",
        "is-buffer": "^2.0.0",
        "unist-util-stringify-position": "^3.0.0",
        "vfile-message": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vfile-location": {
      "version": "4.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^2.0.0",
        "vfile": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vfile-message": {
      "version": "3.1.2",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^2.0.0",
        "unist-util-stringify-position": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vite": {
      "version": "4.1.4",
      "resolved": "https://registry.npmjs.org/vite/-/vite-4.1.4.tgz",
      "integrity": "sha512-3knk/HsbSTKEin43zHu7jTwYWv81f8kgAL99G5NWBcA1LKvtvcVAC4JjBH1arBunO9kQka+1oGbrMKOjk4ZrBg==",
      "dev": true,
      "dependencies": {
        "esbuild": "^0.16.14",
        "postcss": "^8.4.21",
        "resolve": "^1.22.1",
        "rollup": "^3.10.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      },
      "peerDependencies": {
        "@types/node": ">= 14",
        "less": "*",
        "sass": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/vitefu": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/vitefu/-/vitefu-0.2.4.tgz",
      "integrity": "sha512-fanAXjSaf9xXtOOeno8wZXIhgia+CZury481LsDaV++lSvcU2R9Ch2bPh3PYFyoHW+w9LqAeYRISVQjUIew14g==",
      "dev": true,
      "peerDependencies": {
        "vite": "^3.0.0 || ^4.0.0"
      },
      "peerDependenciesMeta": {
        "vite": {
          "optional": true
        }
      }
    },
    "node_modules/vscode-css-languageservice": {
      "version": "6.2.4",
      "resolved": "https://registry.npmjs.org/vscode-css-languageservice/-/vscode-css-languageservice-6.2.4.tgz",
      "integrity": "sha512-9UG0s3Ss8rbaaPZL1AkGzdjrGY8F+P+Ne9snsrvD9gxltDGhsn8C2dQpqQewHrMW37OvlqJoI8sUU2AWDb+qNw==",
      "dev": true,
      "dependencies": {
        "@vscode/l10n": "^0.0.11",
        "vscode-languageserver-textdocument": "^1.0.8",
        "vscode-languageserver-types": "^3.17.3",
        "vscode-uri": "^3.0.7"
      }
    },
    "node_modules/vscode-html-languageservice": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/vscode-html-languageservice/-/vscode-html-languageservice-5.0.4.tgz",
      "integrity": "sha512-tvrySfpglu4B2rQgWGVO/IL+skvU7kBkQotRlxA7ocSyRXOZUd6GA13XHkxo8LPe07KWjeoBlN1aVGqdfTK4xA==",
      "dev": true,
      "dependencies": {
        "@vscode/l10n": "^0.0.11",
        "vscode-languageserver-textdocument": "^1.0.8",
        "vscode-languageserver-types": "^3.17.2",
        "vscode-uri": "^3.0.7"
      }
    },
    "node_modules/vscode-jsonrpc": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/vscode-jsonrpc/-/vscode-jsonrpc-8.1.0.tgz",
      "integrity": "sha512-6TDy/abTQk+zDGYazgbIPc+4JoXdwC8NHU9Pbn4UJP1fehUyZmM4RHp5IthX7A6L5KS30PRui+j+tbbMMMafdw==",
      "dev": true,
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/vscode-languageserver": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/vscode-languageserver/-/vscode-languageserver-8.1.0.tgz",
      "integrity": "sha512-eUt8f1z2N2IEUDBsKaNapkz7jl5QpskN2Y0G01T/ItMxBxw1fJwvtySGB9QMecatne8jFIWJGWI61dWjyTLQsw==",
      "dev": true,
      "dependencies": {
        "vscode-languageserver-protocol": "3.17.3"
      },
      "bin": {
        "installServerIntoExtension": "bin/installServerIntoExtension"
      }
    },
    "node_modules/vscode-languageserver-protocol": {
      "version": "3.17.3",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-protocol/-/vscode-languageserver-protocol-3.17.3.tgz",
      "integrity": "sha512-924/h0AqsMtA5yK22GgMtCYiMdCOtWTSGgUOkgEDX+wk2b0x4sAfLiO4NxBxqbiVtz7K7/1/RgVrVI0NClZwqA==",
      "dev": true,
      "dependencies": {
        "vscode-jsonrpc": "8.1.0",
        "vscode-languageserver-types": "3.17.3"
      }
    },
    "node_modules/vscode-languageserver-textdocument": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-textdocument/-/vscode-languageserver-textdocument-1.0.8.tgz",
      "integrity": "sha512-1bonkGqQs5/fxGT5UchTgjGVnfysL0O8v1AYMBjqTbWQTFn721zaPGDYFkOKtfDgFiSgXM3KwaG3FMGfW4Ed9Q==",
      "dev": true
    },
    "node_modules/vscode-languageserver-types": {
      "version": "3.17.3",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-types/-/vscode-languageserver-types-3.17.3.tgz",
      "integrity": "sha512-SYU4z1dL0PyIMd4Vj8YOqFvHu7Hz/enbWtpfnVbJHU4Nd1YNYx8u0ennumc6h48GQNeOLxmwySmnADouT/AuZA==",
      "dev": true
    },
    "node_modules/vscode-oniguruma": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/vscode-oniguruma/-/vscode-oniguruma-1.7.0.tgz",
      "integrity": "sha512-L9WMGRfrjOhgHSdOYgCt/yRMsXzLDJSL7BPrOZt73gU0iWO4mpqzqQzOz5srxqTvMBaR0XZTSrVWo4j55Rc6cA==",
      "dev": true
    },
    "node_modules/vscode-textmate": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/vscode-textmate/-/vscode-textmate-6.0.0.tgz",
      "integrity": "sha512-gu73tuZfJgu+mvCSy4UZwd2JXykjK9zAZsfmDeut5dx/1a7FeTk0XwJsSuqQn+cuMCGVbIBfl+s53X4T19DnzQ==",
      "dev": true
    },
    "node_modules/vscode-uri": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/vscode-uri/-/vscode-uri-3.0.7.tgz",
      "integrity": "sha512-eOpPHogvorZRobNqJGhapa0JdwaxpjVvyBp0QIUMRMSf8ZAlqOdEquKuRmw9Qwu0qXtJIWqFtMkmvJjUZmMjVA==",
      "dev": true
    },
    "node_modules/wcwidth": {
      "version": "1.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "defaults": "^1.0.3"
      }
    },
    "node_modules/web-namespaces": {
      "version": "2.0.1",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-pm": {
      "version": "2.0.0",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "load-yaml-file": "^0.2.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=8.15"
      }
    },
    "node_modules/which-pm-runs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/which-pm-runs/-/which-pm-runs-1.1.0.tgz",
      "integrity": "sha512-n1brCuqClxfFfq/Rb0ICg9giSZqCS+pLtccdag6C2HyufBrh3fBOiy9nb6ggRMvWOVH5GrdJskj5iGTZNxd7SA==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/widest-line": {
      "version": "4.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "string-width": "^5.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.0.1",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.1.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true,
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true
    },
    "node_modules/yargs": {
      "version": "17.7.1",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.1.tgz",
      "integrity": "sha512-cwiTb08Xuv5fqF4AovYacTFNxk62th7LKJ6BL9IGUpTJrWoU7/7WdQGTP2SjKf1dUNBGzDd28p/Yfs/GI6JrLw==",
      "dev": true,
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true
    },
    "node_modules/yargs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.18.0",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zwitch": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/zwitch/-/zwitch-2.0.4.tgz",
      "integrity": "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==",
      "dev": true,
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    }
  },
  "dependencies": {
    "@ampproject/remapping": {
      "version": "2.2.0",
      "dev": true,
      "requires": {
        "@jridgewell/gen-mapping": "^0.1.0",
        "@jridgewell/trace-mapping": "^0.3.9"
      }
    },
    "@astrojs/compiler": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@astrojs/compiler/-/compiler-1.2.0.tgz",
      "integrity": "sha512-O8yPCyuq+PU9Fjht2tIW6WzSWiq8qDF1e8uAX2x+SOGFzKqOznp52UlDG2mSf+ekf0Z3R34sb64O7SgX+asTxg==",
      "dev": true
    },
    "@astrojs/language-server": {
      "version": "0.28.3",
      "resolved": "https://registry.npmjs.org/@astrojs/language-server/-/language-server-0.28.3.tgz",
      "integrity": "sha512-fPovAX/X46eE2w03jNRMpQ7W9m2mAvNt4Ay65lD9wl1Z5vIQYxlg7Enp9qP225muTr4jSVB5QiLumFJmZMAaVA==",
      "dev": true,
      "requires": {
        "@vscode/emmet-helper": "^2.8.4",
        "events": "^3.3.0",
        "prettier": "^2.7.1",
        "prettier-plugin-astro": "^0.7.0",
        "source-map": "^0.7.3",
        "vscode-css-languageservice": "^6.0.1",
        "vscode-html-languageservice": "^5.0.0",
        "vscode-languageserver": "^8.0.1",
        "vscode-languageserver-protocol": "^3.17.1",
        "vscode-languageserver-textdocument": "^1.0.4",
        "vscode-languageserver-types": "^3.17.1",
        "vscode-uri": "^3.0.3"
      }
    },
    "@astrojs/markdown-remark": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@astrojs/markdown-remark/-/markdown-remark-2.0.1.tgz",
      "integrity": "sha512-xQF1rXGJN18m+zZucwRRtmNehuhPMMhZhi6HWKrtpEAKnHSPk8lqf1GXgKH7/Sypglu8ivdECZ+EGs6kOYVasQ==",
      "dev": true,
      "requires": {
        "@astrojs/prism": "^2.0.0",
        "github-slugger": "^1.4.0",
        "import-meta-resolve": "^2.1.0",
        "rehype-raw": "^6.1.1",
        "rehype-stringify": "^9.0.3",
        "remark-gfm": "^3.0.1",
        "remark-parse": "^10.0.1",
        "remark-rehype": "^10.1.0",
        "remark-smartypants": "^2.0.0",
        "shiki": "^0.11.1",
        "unified": "^10.1.2",
        "unist-util-visit": "^4.1.0",
        "vfile": "^5.3.2"
      },
      "dependencies": {
        "github-slugger": {
          "version": "1.5.0",
          "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-1.5.0.tgz",
          "integrity": "sha512-wIh+gKBI9Nshz2o46B0B3f5k/W+WI9ZAv6y5Dn5WJ5SK1t0TnDimB4WE5rmTD05ZAIn8HALCZVmCsvj0w0v0lw==",
          "dev": true
        }
      }
    },
    "@astrojs/preact": {
      "version": "1.0.2",
      "dev": true,
      "requires": {
        "@babel/core": ">=7.0.0-0 <8.0.0",
        "@babel/plugin-transform-react-jsx": "^7.17.12",
        "babel-plugin-module-resolver": "^4.1.0",
        "preact-render-to-string": "^5.2.0"
      }
    },
    "@astrojs/prism": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@astrojs/prism/-/prism-2.0.0.tgz",
      "integrity": "sha512-YgeoeEPqsxaEpg0rwe/bUq3653LqSQnMjrLlpYwrbQQMQQqz6Y5yXN+RX3SfLJ6ppNb4+Fu2+Z49EXjk48Ihjw==",
      "dev": true,
      "requires": {
        "prismjs": "^1.28.0"
      }
    },
    "@astrojs/sitemap": {
      "version": "1.0.0",
      "dev": true,
      "requires": {
        "sitemap": "^7.1.1",
        "zod": "^3.17.3"
      }
    },
    "@astrojs/telemetry": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@astrojs/telemetry/-/telemetry-2.0.1.tgz",
      "integrity": "sha512-68BLBb9CcvQMkWHE6h6VTgm5g6agm3+xm8eb3cdkmX9nP1LSQ/fiD49Jb1qAgCtWcY8yQJiWQQXwcdyStD+VoA==",
      "dev": true,
      "requires": {
        "ci-info": "^3.3.1",
        "debug": "^4.3.4",
        "dlv": "^1.1.3",
        "dset": "^3.1.2",
        "is-docker": "^3.0.0",
        "is-wsl": "^2.2.0",
        "undici": "^5.20.0",
        "which-pm-runs": "^1.1.0"
      }
    },
    "@astrojs/webapi": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/@astrojs/webapi/-/webapi-2.0.2.tgz",
      "integrity": "sha512-uSNtxLuvCWOcwy/DdIy30ocIcIUedEZpyhn1MHW3XuZ3PZHg4PMej3EP38Ns6uKgDKqMyEdscca9bMLuf4cO/w==",
      "dev": true,
      "requires": {
        "undici": "5.20.0"
      }
    },
    "@babel/code-frame": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/highlight": "^7.18.6"
      }
    },
    "@babel/compat-data": {
      "version": "7.18.8",
      "dev": true
    },
    "@babel/core": {
      "version": "7.18.10",
      "dev": true,
      "requires": {
        "@ampproject/remapping": "^2.1.0",
        "@babel/code-frame": "^7.18.6",
        "@babel/generator": "^7.18.10",
        "@babel/helper-compilation-targets": "^7.18.9",
        "@babel/helper-module-transforms": "^7.18.9",
        "@babel/helpers": "^7.18.9",
        "@babel/parser": "^7.18.10",
        "@babel/template": "^7.18.10",
        "@babel/traverse": "^7.18.10",
        "@babel/types": "^7.18.10",
        "convert-source-map": "^1.7.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.1",
        "semver": "^6.3.0"
      },
      "dependencies": {
        "semver": {
          "version": "6.3.0",
          "dev": true
        }
      }
    },
    "@babel/generator": {
      "version": "7.18.12",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.10",
        "@jridgewell/gen-mapping": "^0.3.2",
        "jsesc": "^2.5.1"
      },
      "dependencies": {
        "@jridgewell/gen-mapping": {
          "version": "0.3.2",
          "dev": true,
          "requires": {
            "@jridgewell/set-array": "^1.0.1",
            "@jridgewell/sourcemap-codec": "^1.4.10",
            "@jridgewell/trace-mapping": "^0.3.9"
          }
        }
      }
    },
    "@babel/helper-annotate-as-pure": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.6"
      }
    },
    "@babel/helper-compilation-targets": {
      "version": "7.18.9",
      "dev": true,
      "requires": {
        "@babel/compat-data": "^7.18.8",
        "@babel/helper-validator-option": "^7.18.6",
        "browserslist": "^4.20.2",
        "semver": "^6.3.0"
      },
      "dependencies": {
        "semver": {
          "version": "6.3.0",
          "dev": true
        }
      }
    },
    "@babel/helper-environment-visitor": {
      "version": "7.18.9",
      "dev": true
    },
    "@babel/helper-function-name": {
      "version": "7.18.9",
      "dev": true,
      "requires": {
        "@babel/template": "^7.18.6",
        "@babel/types": "^7.18.9"
      }
    },
    "@babel/helper-hoist-variables": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.6"
      }
    },
    "@babel/helper-module-imports": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.6"
      }
    },
    "@babel/helper-module-transforms": {
      "version": "7.18.9",
      "dev": true,
      "requires": {
        "@babel/helper-environment-visitor": "^7.18.9",
        "@babel/helper-module-imports": "^7.18.6",
        "@babel/helper-simple-access": "^7.18.6",
        "@babel/helper-split-export-declaration": "^7.18.6",
        "@babel/helper-validator-identifier": "^7.18.6",
        "@babel/template": "^7.18.6",
        "@babel/traverse": "^7.18.9",
        "@babel/types": "^7.18.9"
      }
    },
    "@babel/helper-plugin-utils": {
      "version": "7.18.9",
      "dev": true
    },
    "@babel/helper-simple-access": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.6"
      }
    },
    "@babel/helper-split-export-declaration": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/types": "^7.18.6"
      }
    },
    "@babel/helper-string-parser": {
      "version": "7.19.4",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.19.4.tgz",
      "integrity": "sha512-nHtDoQcuqFmwYNYPz3Rah5ph2p8PFeFCsZk9A/48dPc/rGocJ5J3hAAZ7pb76VWX3fZKu+uEr/FhH5jLx7umrw==",
      "dev": true
    },
    "@babel/helper-validator-identifier": {
      "version": "7.19.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.19.1.tgz",
      "integrity": "sha512-awrNfaMtnHUr653GgGEs++LlAvW6w+DcPrOliSMXWCKo597CwL5Acf/wWdNkf/tfEQE3mjkeD1YOVZOUV/od1w==",
      "dev": true
    },
    "@babel/helper-validator-option": {
      "version": "7.18.6",
      "dev": true
    },
    "@babel/helpers": {
      "version": "7.18.9",
      "dev": true,
      "requires": {
        "@babel/template": "^7.18.6",
        "@babel/traverse": "^7.18.9",
        "@babel/types": "^7.18.9"
      }
    },
    "@babel/highlight": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/helper-validator-identifier": "^7.18.6",
        "chalk": "^2.0.0",
        "js-tokens": "^4.0.0"
      }
    },
    "@babel/parser": {
      "version": "7.21.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.21.2.tgz",
      "integrity": "sha512-URpaIJQwEkEC2T9Kn+Ai6Xe/02iNaVCuT/PtoRz3GPVJVDpPd7mLo+VddTbhCRU9TXqW5mSrQfXZyi8kDKOVpQ==",
      "dev": true
    },
    "@babel/plugin-syntax-jsx": {
      "version": "7.18.6",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.18.6"
      }
    },
    "@babel/plugin-transform-react-jsx": {
      "version": "7.18.10",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.18.6",
        "@babel/helper-module-imports": "^7.18.6",
        "@babel/helper-plugin-utils": "^7.18.9",
        "@babel/plugin-syntax-jsx": "^7.18.6",
        "@babel/types": "^7.18.10"
      }
    },
    "@babel/template": {
      "version": "7.18.10",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.18.6",
        "@babel/parser": "^7.18.10",
        "@babel/types": "^7.18.10"
      }
    },
    "@babel/traverse": {
      "version": "7.18.11",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.18.6",
        "@babel/generator": "^7.18.10",
        "@babel/helper-environment-visitor": "^7.18.9",
        "@babel/helper-function-name": "^7.18.9",
        "@babel/helper-hoist-variables": "^7.18.6",
        "@babel/helper-split-export-declaration": "^7.18.6",
        "@babel/parser": "^7.18.11",
        "@babel/types": "^7.18.10",
        "debug": "^4.1.0",
        "globals": "^11.1.0"
      }
    },
    "@babel/types": {
      "version": "7.21.2",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.21.2.tgz",
      "integrity": "sha512-3wRZSs7jiFaB8AjxiiD+VqN5DTG2iRvJGQ+qYFrs/654lg6kGTQWIOFjlBo5RaXuAZjBmP3+OQH4dmhqiiyYxw==",
      "dev": true,
      "requires": {
        "@babel/helper-string-parser": "^7.19.4",
        "@babel/helper-validator-identifier": "^7.19.1",
        "to-fast-properties": "^2.0.0"
      }
    },
    "@emmetio/abbreviation": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/@emmetio/abbreviation/-/abbreviation-2.2.3.tgz",
      "integrity": "sha512-87pltuCPt99aL+y9xS6GPZ+Wmmyhll2WXH73gG/xpGcQ84DRnptBsI2r0BeIQ0EB/SQTOe2ANPqFqj3Rj5FOGA==",
      "dev": true,
      "requires": {
        "@emmetio/scanner": "^1.0.0"
      }
    },
    "@emmetio/css-abbreviation": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@emmetio/css-abbreviation/-/css-abbreviation-2.1.4.tgz",
      "integrity": "sha512-qk9L60Y+uRtM5CPbB0y+QNl/1XKE09mSO+AhhSauIfr2YOx/ta3NJw2d8RtCFxgzHeRqFRr8jgyzThbu+MZ4Uw==",
      "dev": true,
      "requires": {
        "@emmetio/scanner": "^1.0.0"
      }
    },
    "@emmetio/scanner": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@emmetio/scanner/-/scanner-1.0.0.tgz",
      "integrity": "sha512-8HqW8EVqjnCmWXVpqAOZf+EGESdkR27odcMMMGefgKXtar00SoYNSryGv//TELI4T3QFsECo78p+0lmalk/CFA==",
      "dev": true
    },
    "@esbuild/android-arm": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.16.17.tgz",
      "integrity": "sha512-N9x1CMXVhtWEAMS7pNNONyA14f71VPQN9Cnavj1XQh6T7bskqiLLrSca4O0Vr8Wdcga943eThxnVp3JLnBMYtw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/android-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.16.17.tgz",
      "integrity": "sha512-MIGl6p5sc3RDTLLkYL1MyL8BMRN4tLMRCn+yRJJmEDvYZ2M7tmAf80hx1kbNEUX2KJ50RRtxZ4JHLvCfuB6kBg==",
      "dev": true,
      "optional": true
    },
    "@esbuild/android-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.16.17.tgz",
      "integrity": "sha512-a3kTv3m0Ghh4z1DaFEuEDfz3OLONKuFvI4Xqczqx4BqLyuFaFkuaG4j2MtA6fuWEFeC5x9IvqnX7drmRq/fyAQ==",
      "dev": true,
      "optional": true
    },
    "@esbuild/darwin-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.16.17.tgz",
      "integrity": "sha512-/2agbUEfmxWHi9ARTX6OQ/KgXnOWfsNlTeLcoV7HSuSTv63E4DqtAc+2XqGw1KHxKMHGZgbVCZge7HXWX9Vn+w==",
      "dev": true,
      "optional": true
    },
    "@esbuild/darwin-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.16.17.tgz",
      "integrity": "sha512-2By45OBHulkd9Svy5IOCZt376Aa2oOkiE9QWUK9fe6Tb+WDr8hXL3dpqi+DeLiMed8tVXspzsTAvd0jUl96wmg==",
      "dev": true,
      "optional": true
    },
    "@esbuild/freebsd-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.16.17.tgz",
      "integrity": "sha512-mt+cxZe1tVx489VTb4mBAOo2aKSnJ33L9fr25JXpqQqzbUIw/yzIzi+NHwAXK2qYV1lEFp4OoVeThGjUbmWmdw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/freebsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.16.17.tgz",
      "integrity": "sha512-8ScTdNJl5idAKjH8zGAsN7RuWcyHG3BAvMNpKOBaqqR7EbUhhVHOqXRdL7oZvz8WNHL2pr5+eIT5c65kA6NHug==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-arm": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.16.17.tgz",
      "integrity": "sha512-iihzrWbD4gIT7j3caMzKb/RsFFHCwqqbrbH9SqUSRrdXkXaygSZCZg1FybsZz57Ju7N/SHEgPyaR0LZ8Zbe9gQ==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.16.17.tgz",
      "integrity": "sha512-7S8gJnSlqKGVJunnMCrXHU9Q8Q/tQIxk/xL8BqAP64wchPCTzuM6W3Ra8cIa1HIflAvDnNOt2jaL17vaW+1V0g==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-ia32": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.16.17.tgz",
      "integrity": "sha512-kiX69+wcPAdgl3Lonh1VI7MBr16nktEvOfViszBSxygRQqSpzv7BffMKRPMFwzeJGPxcio0pdD3kYQGpqQ2SSg==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-loong64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.16.17.tgz",
      "integrity": "sha512-dTzNnQwembNDhd654cA4QhbS9uDdXC3TKqMJjgOWsC0yNCbpzfWoXdZvp0mY7HU6nzk5E0zpRGGx3qoQg8T2DQ==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-mips64el": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.16.17.tgz",
      "integrity": "sha512-ezbDkp2nDl0PfIUn0CsQ30kxfcLTlcx4Foz2kYv8qdC6ia2oX5Q3E/8m6lq84Dj/6b0FrkgD582fJMIfHhJfSw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-ppc64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.16.17.tgz",
      "integrity": "sha512-dzS678gYD1lJsW73zrFhDApLVdM3cUF2MvAa1D8K8KtcSKdLBPP4zZSLy6LFZ0jYqQdQ29bjAHJDgz0rVbLB3g==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-riscv64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.16.17.tgz",
      "integrity": "sha512-ylNlVsxuFjZK8DQtNUwiMskh6nT0vI7kYl/4fZgV1llP5d6+HIeL/vmmm3jpuoo8+NuXjQVZxmKuhDApK0/cKw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-s390x": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.16.17.tgz",
      "integrity": "sha512-gzy7nUTO4UA4oZ2wAMXPNBGTzZFP7mss3aKR2hH+/4UUkCOyqmjXiKpzGrY2TlEUhbbejzXVKKGazYcQTZWA/w==",
      "dev": true,
      "optional": true
    },
    "@esbuild/linux-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.16.17.tgz",
      "integrity": "sha512-mdPjPxfnmoqhgpiEArqi4egmBAMYvaObgn4poorpUaqmvzzbvqbowRllQ+ZgzGVMGKaPkqUmPDOOFQRUFDmeUw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/netbsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.16.17.tgz",
      "integrity": "sha512-/PzmzD/zyAeTUsduZa32bn0ORug+Jd1EGGAUJvqfeixoEISYpGnAezN6lnJoskauoai0Jrs+XSyvDhppCPoKOA==",
      "dev": true,
      "optional": true
    },
    "@esbuild/openbsd-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.16.17.tgz",
      "integrity": "sha512-2yaWJhvxGEz2RiftSk0UObqJa/b+rIAjnODJgv2GbGGpRwAfpgzyrg1WLK8rqA24mfZa9GvpjLcBBg8JHkoodg==",
      "dev": true,
      "optional": true
    },
    "@esbuild/sunos-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.16.17.tgz",
      "integrity": "sha512-xtVUiev38tN0R3g8VhRfN7Zl42YCJvyBhRKw1RJjwE1d2emWTVToPLNEQj/5Qxc6lVFATDiy6LjVHYhIPrLxzw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/win32-arm64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.16.17.tgz",
      "integrity": "sha512-ga8+JqBDHY4b6fQAmOgtJJue36scANy4l/rL97W+0wYmijhxKetzZdKOJI7olaBaMhWt8Pac2McJdZLxXWUEQw==",
      "dev": true,
      "optional": true
    },
    "@esbuild/win32-ia32": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.16.17.tgz",
      "integrity": "sha512-WnsKaf46uSSF/sZhwnqE4L/F89AYNMiD4YtEcYekBt9Q7nj0DiId2XH2Ng2PHM54qi5oPrQ8luuzGszqi/veig==",
      "dev": true,
      "optional": true
    },
    "@esbuild/win32-x64": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.16.17.tgz",
      "integrity": "sha512-y+EHuSchhL7FjHgvQL/0fnnFmO4T1bhvWANX6gcnqTjtnKWbTvUMCpGnv2+t+31d7RzyEAYAd4u2fnIhHL6N/Q==",
      "dev": true,
      "optional": true
    },
    "@jridgewell/gen-mapping": {
      "version": "0.1.1",
      "dev": true,
      "requires": {
        "@jridgewell/set-array": "^1.0.0",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "@jridgewell/resolve-uri": {
      "version": "3.1.0",
      "dev": true
    },
    "@jridgewell/set-array": {
      "version": "1.1.2",
      "dev": true
    },
    "@jridgewell/sourcemap-codec": {
      "version": "1.4.14",
      "dev": true
    },
    "@jridgewell/trace-mapping": {
      "version": "0.3.15",
      "dev": true,
      "requires": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "@ljharb/has-package-exports-patterns": {
      "version": "0.0.1",
      "dev": true
    },
    "@netlify/netlify-marketing-tokens": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@netlify/netlify-marketing-tokens/-/netlify-marketing-tokens-1.1.0.tgz",
      "integrity": "sha512-uuA4/ZHwehv0P/MRf6XRqzlpPwyHYPaDr8uly0k4387sD2tmtoZpeXLJ3X+jZywW5YEblOWPVpUvyCpvFcD4BA==",
      "dev": true,
      "requires": {
        "style-dictionary": "^3.7.2",
        "token-transformer": "^0.0.29"
      }
    },
    "@nodelib/fs.scandir": {
      "version": "2.1.5",
      "dev": true,
      "requires": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      }
    },
    "@nodelib/fs.stat": {
      "version": "2.0.5",
      "dev": true
    },
    "@nodelib/fs.walk": {
      "version": "1.2.8",
      "dev": true,
      "requires": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      }
    },
    "@pkgr/utils": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/@pkgr/utils/-/utils-2.3.1.tgz",
      "integrity": "sha512-wfzX8kc1PMyUILA+1Z/EqoE4UCXGy0iRGMhPwdfae1+f0OXlLqCk+By+aMzgJBzR9AzS4CDizioG6Ss1gvAFJw==",
      "dev": true,
      "requires": {
        "cross-spawn": "^7.0.3",
        "is-glob": "^4.0.3",
        "open": "^8.4.0",
        "picocolors": "^1.0.0",
        "tiny-glob": "^0.2.9",
        "tslib": "^2.4.0"
      }
    },
    "@types/babel__core": {
      "version": "7.20.0",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.0.tgz",
      "integrity": "sha512-+n8dL/9GWblDO0iU6eZAwEIJVr5DWigtle+Q6HLOrh/pdbXOhOtqzq8VPPE2zvNJzSKY4vH/z3iT3tn0A3ypiQ==",
      "dev": true,
      "requires": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "@types/babel__generator": {
      "version": "7.6.4",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.6.4.tgz",
      "integrity": "sha512-tFkciB9j2K755yrTALxD44McOrk+gfpIpvC3sxHjRawj6PfnQxrse4Clq5y/Rq+G3mrBurMax/lG8Qn2t9mSsg==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@types/babel__template": {
      "version": "7.4.1",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.1.tgz",
      "integrity": "sha512-azBFKemX6kMg5Io+/rdGT0dkGreboUVR0Cdm3fz9QJWpaQGJRQXl7C+6hOTCZcMll7KFyEQpgbYI2lHdsS4U7g==",
      "dev": true,
      "requires": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@types/babel__traverse": {
      "version": "7.18.3",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.18.3.tgz",
      "integrity": "sha512-1kbcJ40lLB7MHsj39U4Sh1uTd2E7rLEa79kmDpI6cy+XiXsteB3POdQomoq4FxszMrO3ZYchkhYJw7A2862b3w==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.3.0"
      }
    },
    "@types/debug": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/@types/debug/-/debug-4.1.7.tgz",
      "integrity": "sha512-9AonUzyTjXXhEOa0DnqpzZi6VHlqKMswga9EXjpXnnqxwLtdvPPtlO8evrI5D9S6asFRCQ6v+wpiUKbw+vKqyg==",
      "dev": true,
      "requires": {
        "@types/ms": "*"
      }
    },
    "@types/estree": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.0.tgz",
      "integrity": "sha512-WulqXMDUTYAXCjZnk6JtIHPigp55cVtDgDrO2gHRwhyJto21+1zbVCtOYB2L1F9w4qCQ0rOGWBnBe0FNTiEJIQ==",
      "dev": true
    },
    "@types/hast": {
      "version": "2.3.4",
      "dev": true,
      "requires": {
        "@types/unist": "*"
      }
    },
    "@types/json5": {
      "version": "0.0.30",
      "dev": true
    },
    "@types/mdast": {
      "version": "3.0.10",
      "resolved": "https://registry.npmjs.org/@types/mdast/-/mdast-3.0.10.tgz",
      "integrity": "sha512-W864tg/Osz1+9f4lrGTZpCSO5/z4608eUp19tbozkq2HJK6i3z1kT0H9tlADXuYIb1YYOBByU4Jsqkk75q48qA==",
      "dev": true,
      "requires": {
        "@types/unist": "*"
      }
    },
    "@types/ms": {
      "version": "0.7.31",
      "resolved": "https://registry.npmjs.org/@types/ms/-/ms-0.7.31.tgz",
      "integrity": "sha512-iiUgKzV9AuaEkZqkOLDIvlQiL6ltuZd9tGcW3gwpnX8JbuiuhFlEGmmFXEXkN50Cvq7Os88IY2v0dkDqXYWVgA==",
      "dev": true
    },
    "@types/nlcst": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@types/nlcst/-/nlcst-1.0.0.tgz",
      "integrity": "sha512-3TGCfOcy8R8mMQ4CNSNOe3PG66HttvjcLzCoOpvXvDtfWOTi+uT/rxeOKm/qEwbM4SNe1O/PjdiBK2YcTjU4OQ==",
      "dev": true,
      "requires": {
        "@types/unist": "*"
      }
    },
    "@types/node": {
      "version": "17.0.45",
      "dev": true
    },
    "@types/parse5": {
      "version": "6.0.3",
      "dev": true
    },
    "@types/resolve": {
      "version": "1.20.2",
      "dev": true
    },
    "@types/sax": {
      "version": "1.2.4",
      "dev": true,
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/unist": {
      "version": "2.0.6",
      "dev": true
    },
    "@types/yargs-parser": {
      "version": "21.0.0",
      "resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-21.0.0.tgz",
      "integrity": "sha512-iO9ZQHkZxHn4mSakYV0vFHAVDyEOIJQrV2uZ06HxEPcx+mt8swXoZHIbaaJ2crJYFfErySgktuTZ3BeLz+XmFA==",
      "dev": true
    },
    "@vscode/emmet-helper": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/@vscode/emmet-helper/-/emmet-helper-2.8.6.tgz",
      "integrity": "sha512-IIB8jbiKy37zN8bAIHx59YmnIelY78CGHtThnibD/d3tQOKRY83bYVi9blwmZVUZh6l9nfkYH3tvReaiNxY9EQ==",
      "dev": true,
      "requires": {
        "emmet": "^2.3.0",
        "jsonc-parser": "^2.3.0",
        "vscode-languageserver-textdocument": "^1.0.1",
        "vscode-languageserver-types": "^3.15.1",
        "vscode-uri": "^2.1.2"
      },
      "dependencies": {
        "vscode-uri": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/vscode-uri/-/vscode-uri-2.1.2.tgz",
          "integrity": "sha512-8TEXQxlldWAuIODdukIb+TR5s+9Ds40eSJrw+1iDDA9IFORPjMELarNQE3myz5XIkWWpdprmJjm1/SxMlWOC8A==",
          "dev": true
        }
      }
    },
    "@vscode/l10n": {
      "version": "0.0.11",
      "resolved": "https://registry.npmjs.org/@vscode/l10n/-/l10n-0.0.11.tgz",
      "integrity": "sha512-ukOMWnCg1tCvT7WnDfsUKQOFDQGsyR5tNgRpwmqi+5/vzU3ghdDXzvIM4IOPdSb3OeSsBNvmSL8nxIVOqi2WXA==",
      "dev": true
    },
    "acorn": {
      "version": "8.8.2",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.8.2.tgz",
      "integrity": "sha512-xjIYgE8HBrkpd/sJqOGNspf8uHG+NOHGOw6a/Urj8taM2EXfdNAH2oFcPeIFfsv3+kz/mJrS5VuMqbNLjCa2vw==",
      "dev": true
    },
    "ansi-align": {
      "version": "3.0.1",
      "dev": true,
      "requires": {
        "string-width": "^4.1.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "5.0.1",
          "dev": true
        },
        "emoji-regex": {
          "version": "8.0.0",
          "dev": true
        },
        "string-width": {
          "version": "4.2.3",
          "dev": true,
          "requires": {
            "emoji-regex": "^8.0.0",
            "is-fullwidth-code-point": "^3.0.0",
            "strip-ansi": "^6.0.1"
          }
        },
        "strip-ansi": {
          "version": "6.0.1",
          "dev": true,
          "requires": {
            "ansi-regex": "^5.0.1"
          }
        }
      }
    },
    "ansi-regex": {
      "version": "6.0.1",
      "dev": true
    },
    "ansi-styles": {
      "version": "3.2.1",
      "dev": true,
      "requires": {
        "color-convert": "^1.9.0"
      }
    },
    "arg": {
      "version": "5.0.2",
      "dev": true
    },
    "argparse": {
      "version": "1.0.10",
      "dev": true,
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "array-iterate": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/array-iterate/-/array-iterate-2.0.1.tgz",
      "integrity": "sha512-I1jXZMjAgCMmxT4qxXfPXa6SthSoE8h6gkSI9BGGNv8mP8G/v0blc+qFnZu6K42vTOiuME596QaLO0TP3Lk0xg==",
      "dev": true
    },
    "astro": {
      "version": "2.0.17",
      "resolved": "https://registry.npmjs.org/astro/-/astro-2.0.17.tgz",
      "integrity": "sha512-K/SAoe4Tfhg4XhOu1mFOp9qiC/m8YuBmL3//WAA+mcPTlg9A21nlXH/jmsfbizQdZn/AyoPrkTWQm1pnU05OsQ==",
      "dev": true,
      "requires": {
        "@astrojs/compiler": "^1.2.0",
        "@astrojs/language-server": "^0.28.3",
        "@astrojs/markdown-remark": "^2.0.1",
        "@astrojs/telemetry": "^2.0.1",
        "@astrojs/webapi": "^2.0.2",
        "@babel/core": "^7.18.2",
        "@babel/generator": "^7.18.2",
        "@babel/parser": "^7.18.4",
        "@babel/plugin-transform-react-jsx": "^7.17.12",
        "@babel/traverse": "^7.18.2",
        "@babel/types": "^7.18.4",
        "@types/babel__core": "^7.1.19",
        "@types/yargs-parser": "^21.0.0",
        "acorn": "^8.8.1",
        "boxen": "^6.2.1",
        "ci-info": "^3.3.1",
        "common-ancestor-path": "^1.0.1",
        "cookie": "^0.5.0",
        "debug": "^4.3.4",
        "deepmerge-ts": "^4.2.2",
        "devalue": "^4.2.0",
        "diff": "^5.1.0",
        "es-module-lexer": "^1.1.0",
        "estree-walker": "^3.0.1",
        "execa": "^6.1.0",
        "fast-glob": "^3.2.11",
        "github-slugger": "^2.0.0",
        "gray-matter": "^4.0.3",
        "html-escaper": "^3.0.3",
        "kleur": "^4.1.4",
        "magic-string": "^0.27.0",
        "mime": "^3.0.0",
        "ora": "^6.1.0",
        "path-to-regexp": "^6.2.1",
        "preferred-pm": "^3.0.3",
        "prompts": "^2.4.2",
        "rehype": "^12.0.1",
        "semver": "^7.3.8",
        "server-destroy": "^1.0.1",
        "shiki": "^0.11.1",
        "slash": "^4.0.0",
        "string-width": "^5.1.2",
        "strip-ansi": "^7.0.1",
        "supports-esm": "^1.0.0",
        "tsconfig-resolver": "^3.0.1",
        "typescript": "*",
        "unist-util-visit": "^4.1.0",
        "vfile": "^5.3.2",
        "vite": "^4.1.2",
        "vitefu": "^0.2.4",
        "yargs-parser": "^21.0.1",
        "zod": "^3.17.3"
      }
    },
    "babel-plugin-module-resolver": {
      "version": "4.1.0",
      "dev": true,
      "requires": {
        "find-babel-config": "^1.2.0",
        "glob": "^7.1.6",
        "pkg-up": "^3.1.0",
        "reselect": "^4.0.0",
        "resolve": "^1.13.1"
      }
    },
    "bail": {
      "version": "2.0.2",
      "dev": true
    },
    "balanced-match": {
      "version": "1.0.2",
      "dev": true
    },
    "base64-js": {
      "version": "1.5.1",
      "dev": true
    },
    "bl": {
      "version": "5.0.0",
      "dev": true,
      "requires": {
        "buffer": "^6.0.3",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      }
    },
    "boxen": {
      "version": "6.2.1",
      "dev": true,
      "requires": {
        "ansi-align": "^3.0.1",
        "camelcase": "^6.2.0",
        "chalk": "^4.1.2",
        "cli-boxes": "^3.0.0",
        "string-width": "^5.0.1",
        "type-fest": "^2.5.0",
        "widest-line": "^4.0.1",
        "wrap-ansi": "^8.0.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "4.3.0",
          "dev": true,
          "requires": {
            "color-convert": "^2.0.1"
          }
        },
        "chalk": {
          "version": "4.1.2",
          "dev": true,
          "requires": {
            "ansi-styles": "^4.1.0",
            "supports-color": "^7.1.0"
          }
        },
        "color-convert": {
          "version": "2.0.1",
          "dev": true,
          "requires": {
            "color-name": "~1.1.4"
          }
        },
        "color-name": {
          "version": "1.1.4",
          "dev": true
        },
        "has-flag": {
          "version": "4.0.0",
          "dev": true
        },
        "supports-color": {
          "version": "7.2.0",
          "dev": true,
          "requires": {
            "has-flag": "^4.0.0"
          }
        }
      }
    },
    "brace-expansion": {
      "version": "1.1.11",
      "dev": true,
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "3.0.2",
      "dev": true,
      "requires": {
        "fill-range": "^7.0.1"
      }
    },
    "browserslist": {
      "version": "4.21.3",
      "dev": true,
      "requires": {
        "caniuse-lite": "^1.0.30001370",
        "electron-to-chromium": "^1.4.202",
        "node-releases": "^2.0.6",
        "update-browserslist-db": "^1.0.5"
      }
    },
    "buffer": {
      "version": "6.0.3",
      "dev": true,
      "requires": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.2.1"
      }
    },
    "busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dev": true,
      "requires": {
        "streamsearch": "^1.1.0"
      }
    },
    "camel-case": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/camel-case/-/camel-case-4.1.2.tgz",
      "integrity": "sha512-gxGWBrTT1JuMx6R+o5PTXMmUnhnVzLQ9SNutD4YqKtI6ap897t3tKECYla6gCWEkplXnlNybEkZg9GEGxKFCgw==",
      "dev": true,
      "requires": {
        "pascal-case": "^3.1.2",
        "tslib": "^2.0.3"
      }
    },
    "camelcase": {
      "version": "6.3.0",
      "dev": true
    },
    "caniuse-lite": {
      "version": "1.0.30001378",
      "dev": true
    },
    "capital-case": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/capital-case/-/capital-case-1.0.4.tgz",
      "integrity": "sha512-ds37W8CytHgwnhGGTi88pcPyR15qoNkOpYwmMMfnWqqWgESapLqvDx6huFjQ5vqWSn2Z06173XNA7LtMOeUh1A==",
      "dev": true,
      "requires": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case-first": "^2.0.2"
      }
    },
    "ccount": {
      "version": "2.0.1",
      "dev": true
    },
    "chalk": {
      "version": "2.4.2",
      "dev": true,
      "requires": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      }
    },
    "change-case": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/change-case/-/change-case-4.1.2.tgz",
      "integrity": "sha512-bSxY2ws9OtviILG1EiY5K7NNxkqg/JnRnFxLtKQ96JaviiIxi7djMrSd0ECT9AC+lttClmYwKw53BWpOMblo7A==",
      "dev": true,
      "requires": {
        "camel-case": "^4.1.2",
        "capital-case": "^1.0.4",
        "constant-case": "^3.0.4",
        "dot-case": "^3.0.4",
        "header-case": "^2.0.4",
        "no-case": "^3.0.4",
        "param-case": "^3.0.4",
        "pascal-case": "^3.1.2",
        "path-case": "^3.0.4",
        "sentence-case": "^3.0.4",
        "snake-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "character-entities": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/character-entities/-/character-entities-2.0.2.tgz",
      "integrity": "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ==",
      "dev": true
    },
    "character-entities-html4": {
      "version": "2.1.0",
      "dev": true
    },
    "character-entities-legacy": {
      "version": "3.0.0",
      "dev": true
    },
    "ci-info": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-3.8.0.tgz",
      "integrity": "sha512-eXTggHWSooYhq49F2opQhuHWgzucfF2YgODK4e1566GQs5BIfP30B0oenwBJHfWxAs2fyPB1s7Mg949zLf61Yw==",
      "dev": true
    },
    "cli-boxes": {
      "version": "3.0.0",
      "dev": true
    },
    "cli-cursor": {
      "version": "4.0.0",
      "dev": true,
      "requires": {
        "restore-cursor": "^4.0.0"
      }
    },
    "cli-spinners": {
      "version": "2.7.0",
      "dev": true
    },
    "cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "dev": true,
      "requires": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
          "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
          "dev": true
        },
        "ansi-styles": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
          "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
          "dev": true,
          "requires": {
            "color-convert": "^2.0.1"
          }
        },
        "color-convert": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
          "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
          "dev": true,
          "requires": {
            "color-name": "~1.1.4"
          }
        },
        "color-name": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
          "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
          "dev": true
        },
        "emoji-regex": {
          "version": "8.0.0",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
          "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
          "dev": true
        },
        "string-width": {
          "version": "4.2.3",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
          "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
          "dev": true,
          "requires": {
            "emoji-regex": "^8.0.0",
            "is-fullwidth-code-point": "^3.0.0",
            "strip-ansi": "^6.0.1"
          }
        },
        "strip-ansi": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
          "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
          "dev": true,
          "requires": {
            "ansi-regex": "^5.0.1"
          }
        },
        "wrap-ansi": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
          "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
          "dev": true,
          "requires": {
            "ansi-styles": "^4.0.0",
            "string-width": "^4.1.0",
            "strip-ansi": "^6.0.0"
          }
        }
      }
    },
    "clone": {
      "version": "1.0.4",
      "dev": true
    },
    "color-convert": {
      "version": "1.9.3",
      "dev": true,
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "dev": true
    },
    "comma-separated-tokens": {
      "version": "2.0.2",
      "dev": true
    },
    "commander": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-8.3.0.tgz",
      "integrity": "sha512-OkTL9umf+He2DZkUq8f8J9of7yL6RJKI24dVITBmNfZBmri9zYZQrKkuXiKhyfPSu8tUhnVBB1iKXevvnlR4Ww==",
      "dev": true
    },
    "common-ancestor-path": {
      "version": "1.0.1",
      "dev": true
    },
    "concat-map": {
      "version": "0.0.1",
      "dev": true
    },
    "constant-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/constant-case/-/constant-case-3.0.4.tgz",
      "integrity": "sha512-I2hSBi7Vvs7BEuJDr5dDHfzb/Ruj3FyvFyh7KLilAjNQw3Be+xgqUBA2W6scVEcL0hL1dwPRtIqEPVUCKkSsyQ==",
      "dev": true,
      "requires": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case": "^2.0.2"
      }
    },
    "convert-source-map": {
      "version": "1.8.0",
      "dev": true,
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "cookie": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz",
      "integrity": "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==",
      "dev": true
    },
    "cross-spawn": {
      "version": "7.0.3",
      "dev": true,
      "requires": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      }
    },
    "debug": {
      "version": "4.3.4",
      "dev": true,
      "requires": {
        "ms": "2.1.2"
      }
    },
    "decode-named-character-reference": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/decode-named-character-reference/-/decode-named-character-reference-1.0.2.tgz",
      "integrity": "sha512-O8x12RzrUF8xyVcY0KJowWsmaJxQbmy0/EtnNtHRpsOcT7dFk5W598coHqBVpmWo1oQQfsCqfCmkZN5DJrZVdg==",
      "dev": true,
      "requires": {
        "character-entities": "^2.0.0"
      }
    },
    "deepmerge-ts": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/deepmerge-ts/-/deepmerge-ts-4.3.0.tgz",
      "integrity": "sha512-if3ZYdkD2dClhnXR5reKtG98cwyaRT1NeugQoAPTTfsOpV9kqyeiBF9Qa5RHjemb3KzD5ulqygv6ED3t5j9eJw==",
      "dev": true
    },
    "defaults": {
      "version": "1.0.3",
      "dev": true,
      "requires": {
        "clone": "^1.0.2"
      }
    },
    "define-lazy-prop": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-2.0.0.tgz",
      "integrity": "sha512-Ds09qNh8yw3khSjiJjiUInaGX9xlqZDY7JVryGxdxV7NPeuqQfplOpQ66yJFZut3jLa5zOwkXw1g9EI2uKh4Og==",
      "dev": true
    },
    "dequal": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/dequal/-/dequal-2.0.3.tgz",
      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",
      "dev": true
    },
    "devalue": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/devalue/-/devalue-4.3.0.tgz",
      "integrity": "sha512-n94yQo4LI3w7erwf84mhRUkUJfhLoCZiLyoOZ/QFsDbcWNZePrLwbQpvZBUG2TNxwV3VjCKPxkiiQA6pe3TrTA==",
      "dev": true
    },
    "diff": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/diff/-/diff-5.1.0.tgz",
      "integrity": "sha512-D+mk+qE8VC/PAUrlAU34N+VfXev0ghe5ywmpqrawphmVZc1bEfn56uo9qpyGp1p4xpzOHkSW4ztBd6L7Xx4ACw==",
      "dev": true
    },
    "dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true
    },
    "dot-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/dot-case/-/dot-case-3.0.4.tgz",
      "integrity": "sha512-Kv5nKlh6yRrdrGvxeJ2e5y2eRUpkUosIW4A2AS38zwSz27zu7ufDwQPi5Jhs3XAlGNetl3bmnGhQsMtkKJnj3w==",
      "dev": true,
      "requires": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "dset": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/dset/-/dset-3.1.2.tgz",
      "integrity": "sha512-g/M9sqy3oHe477Ar4voQxWtaPIFw1jTdKZuomOjhCcBx9nHUNn0pu6NopuFFrTh/TRZIKEj+76vLWFu9BNKk+Q==",
      "dev": true
    },
    "eastasianwidth": {
      "version": "0.2.0",
      "dev": true
    },
    "electron-to-chromium": {
      "version": "1.4.222",
      "dev": true
    },
    "emmet": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/emmet/-/emmet-2.3.6.tgz",
      "integrity": "sha512-pLS4PBPDdxuUAmw7Me7+TcHbykTsBKN/S9XJbUOMFQrNv9MoshzyMFK/R57JBm94/6HSL4vHnDeEmxlC82NQ4A==",
      "dev": true,
      "requires": {
        "@emmetio/abbreviation": "^2.2.3",
        "@emmetio/css-abbreviation": "^2.1.4"
      }
    },
    "emoji-regex": {
      "version": "9.2.2",
      "dev": true
    },
    "es-module-lexer": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.2.0.tgz",
      "integrity": "sha512-2BMfqBDeVCcOlLaL1ZAfp+D868SczNpKArrTM3dhpd7dK/OVlogzY15qpUngt+LMTq5UC/csb9vVQAgupucSbA==",
      "dev": true
    },
    "esbuild": {
      "version": "0.16.17",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.16.17.tgz",
      "integrity": "sha512-G8LEkV0XzDMNwXKgM0Jwu3nY3lSTwSGY6XbxM9cr9+s0T/qSV1q1JVPBGzm3dcjhCic9+emZDmMffkwgPeOeLg==",
      "dev": true,
      "requires": {
        "@esbuild/android-arm": "0.16.17",
        "@esbuild/android-arm64": "0.16.17",
        "@esbuild/android-x64": "0.16.17",
        "@esbuild/darwin-arm64": "0.16.17",
        "@esbuild/darwin-x64": "0.16.17",
        "@esbuild/freebsd-arm64": "0.16.17",
        "@esbuild/freebsd-x64": "0.16.17",
        "@esbuild/linux-arm": "0.16.17",
        "@esbuild/linux-arm64": "0.16.17",
        "@esbuild/linux-ia32": "0.16.17",
        "@esbuild/linux-loong64": "0.16.17",
        "@esbuild/linux-mips64el": "0.16.17",
        "@esbuild/linux-ppc64": "0.16.17",
        "@esbuild/linux-riscv64": "0.16.17",
        "@esbuild/linux-s390x": "0.16.17",
        "@esbuild/linux-x64": "0.16.17",
        "@esbuild/netbsd-x64": "0.16.17",
        "@esbuild/openbsd-x64": "0.16.17",
        "@esbuild/sunos-x64": "0.16.17",
        "@esbuild/win32-arm64": "0.16.17",
        "@esbuild/win32-ia32": "0.16.17",
        "@esbuild/win32-x64": "0.16.17"
      }
    },
    "escalade": {
      "version": "3.1.1",
      "dev": true
    },
    "escape-string-regexp": {
      "version": "1.0.5",
      "dev": true
    },
    "esprima": {
      "version": "4.0.1",
      "dev": true
    },
    "estree-walker": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
      "integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
      "dev": true,
      "requires": {
        "@types/estree": "^1.0.0"
      }
    },
    "events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "dev": true
    },
    "execa": {
      "version": "6.1.0",
      "dev": true,
      "requires": {
        "cross-spawn": "^7.0.3",
        "get-stream": "^6.0.1",
        "human-signals": "^3.0.1",
        "is-stream": "^3.0.0",
        "merge-stream": "^2.0.0",
        "npm-run-path": "^5.1.0",
        "onetime": "^6.0.0",
        "signal-exit": "^3.0.7",
        "strip-final-newline": "^3.0.0"
      }
    },
    "extend": {
      "version": "3.0.2",
      "dev": true
    },
    "extend-shallow": {
      "version": "2.0.1",
      "dev": true,
      "requires": {
        "is-extendable": "^0.1.0"
      }
    },
    "fast-glob": {
      "version": "3.2.11",
      "dev": true,
      "requires": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      }
    },
    "fastq": {
      "version": "1.13.0",
      "dev": true,
      "requires": {
        "reusify": "^1.0.4"
      }
    },
    "fill-range": {
      "version": "7.0.1",
      "dev": true,
      "requires": {
        "to-regex-range": "^5.0.1"
      }
    },
    "find-babel-config": {
      "version": "1.2.0",
      "dev": true,
      "requires": {
        "json5": "^0.5.1",
        "path-exists": "^3.0.0"
      },
      "dependencies": {
        "json5": {
          "version": "0.5.1",
          "dev": true
        },
        "path-exists": {
          "version": "3.0.0",
          "dev": true
        }
      }
    },
    "find-up": {
      "version": "5.0.0",
      "dev": true,
      "requires": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      }
    },
    "find-yarn-workspace-root2": {
      "version": "1.2.16",
      "dev": true,
      "requires": {
        "micromatch": "^4.0.2",
        "pkg-dir": "^4.2.0"
      }
    },
    "fs-extra": {
      "version": "10.1.0",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-10.1.0.tgz",
      "integrity": "sha512-oRXApq54ETRj4eMiFzGnHWGy+zo5raudjuxN0b8H7s/RU2oW0Wvsx9O0ACRN/kRq9E8Vu/ReskGB5o3ji+FzHQ==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.2.0",
        "jsonfile": "^6.0.1",
        "universalify": "^2.0.0"
      }
    },
    "fs.realpath": {
      "version": "1.0.0",
      "dev": true
    },
    "fsevents": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
      "dev": true,
      "optional": true
    },
    "function-bind": {
      "version": "1.1.1",
      "dev": true
    },
    "gensync": {
      "version": "1.0.0-beta.2",
      "dev": true
    },
    "get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true
    },
    "get-stream": {
      "version": "6.0.1",
      "dev": true
    },
    "github-slugger": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/github-slugger/-/github-slugger-2.0.0.tgz",
      "integrity": "sha512-IaOQ9puYtjrkq7Y0Ygl9KDZnrf/aiUJYUpVf89y8kyaxbRG7Y1SrX/jaumrv81vc61+kiMempujsM3Yw7w5qcw==",
      "dev": true
    },
    "glob": {
      "version": "7.2.3",
      "dev": true,
      "requires": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      }
    },
    "glob-parent": {
      "version": "5.1.2",
      "dev": true,
      "requires": {
        "is-glob": "^4.0.1"
      }
    },
    "globals": {
      "version": "11.12.0",
      "dev": true
    },
    "globalyzer": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/globalyzer/-/globalyzer-0.1.0.tgz",
      "integrity": "sha512-40oNTM9UfG6aBmuKxk/giHn5nQ8RVz/SS4Ir6zgzOv9/qC3kKZ9v4etGTcJbEl/NyVQH7FGU7d+X1egr57Md2Q==",
      "dev": true
    },
    "globrex": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/globrex/-/globrex-0.1.2.tgz",
      "integrity": "sha512-uHJgbwAMwNFf5mLst7IWLNg14x1CkeqglJb/K3doi4dw6q2IvAAmM/Y81kevy83wP+Sst+nutFTYOGg3d1lsxg==",
      "dev": true
    },
    "graceful-fs": {
      "version": "4.2.10",
      "dev": true
    },
    "gray-matter": {
      "version": "4.0.3",
      "dev": true,
      "requires": {
        "js-yaml": "^3.13.1",
        "kind-of": "^6.0.2",
        "section-matter": "^1.0.0",
        "strip-bom-string": "^1.0.0"
      }
    },
    "has": {
      "version": "1.0.3",
      "dev": true,
      "requires": {
        "function-bind": "^1.1.1"
      }
    },
    "has-flag": {
      "version": "3.0.0",
      "dev": true
    },
    "has-package-exports": {
      "version": "1.2.3",
      "dev": true,
      "requires": {
        "@ljharb/has-package-exports-patterns": "0.0.1"
      }
    },
    "hast-util-from-parse5": {
      "version": "7.1.0",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "@types/parse5": "^6.0.0",
        "@types/unist": "^2.0.0",
        "hastscript": "^7.0.0",
        "property-information": "^6.0.0",
        "vfile": "^5.0.0",
        "vfile-location": "^4.0.0",
        "web-namespaces": "^2.0.0"
      }
    },
    "hast-util-is-element": {
      "version": "2.1.2",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "@types/unist": "^2.0.0"
      }
    },
    "hast-util-parse-selector": {
      "version": "3.1.0",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0"
      }
    },
    "hast-util-raw": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/hast-util-raw/-/hast-util-raw-7.2.3.tgz",
      "integrity": "sha512-RujVQfVsOrxzPOPSzZFiwofMArbQke6DJjnFfceiEbFh7S05CbPt0cYN+A5YeD3pso0JQk6O1aHBnx9+Pm2uqg==",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "@types/parse5": "^6.0.0",
        "hast-util-from-parse5": "^7.0.0",
        "hast-util-to-parse5": "^7.0.0",
        "html-void-elements": "^2.0.0",
        "parse5": "^6.0.0",
        "unist-util-position": "^4.0.0",
        "unist-util-visit": "^4.0.0",
        "vfile": "^5.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      }
    },
    "hast-util-to-html": {
      "version": "8.0.3",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "ccount": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-is-element": "^2.0.0",
        "hast-util-whitespace": "^2.0.0",
        "html-void-elements": "^2.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0",
        "stringify-entities": "^4.0.2",
        "unist-util-is": "^5.0.0"
      }
    },
    "hast-util-to-parse5": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/hast-util-to-parse5/-/hast-util-to-parse5-7.1.0.tgz",
      "integrity": "sha512-YNRgAJkH2Jky5ySkIqFXTQiaqcAtJyVE+D5lkN6CdtOqrnkLfGYYrEcKuHOJZlp+MwjSwuD3fZuawI+sic/RBw==",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      }
    },
    "hast-util-whitespace": {
      "version": "2.0.0",
      "dev": true
    },
    "hastscript": {
      "version": "7.0.2",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-parse-selector": "^3.0.0",
        "property-information": "^6.0.0",
        "space-separated-tokens": "^2.0.0"
      }
    },
    "header-case": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/header-case/-/header-case-2.0.4.tgz",
      "integrity": "sha512-H/vuk5TEEVZwrR0lp2zed9OCo1uAILMlx0JEMgC26rzyJJ3N1v6XkwHHXJQdR2doSjcGPM6OKPYoJgf0plJ11Q==",
      "dev": true,
      "requires": {
        "capital-case": "^1.0.4",
        "tslib": "^2.0.3"
      }
    },
    "html-escaper": {
      "version": "3.0.3",
      "dev": true
    },
    "html-void-elements": {
      "version": "2.0.1",
      "dev": true
    },
    "human-signals": {
      "version": "3.0.1",
      "dev": true
    },
    "ieee754": {
      "version": "1.2.1",
      "dev": true
    },
    "import-meta-resolve": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/import-meta-resolve/-/import-meta-resolve-2.2.1.tgz",
      "integrity": "sha512-C6lLL7EJPY44kBvA80gq4uMsVFw5x3oSKfuMl1cuZ2RkI5+UJqQXgn+6hlUew0y4ig7Ypt4CObAAIzU53Nfpuw==",
      "dev": true
    },
    "inflight": {
      "version": "1.0.6",
      "dev": true,
      "requires": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "inherits": {
      "version": "2.0.4",
      "dev": true
    },
    "is-buffer": {
      "version": "2.0.5",
      "dev": true
    },
    "is-core-module": {
      "version": "2.10.0",
      "dev": true,
      "requires": {
        "has": "^1.0.3"
      }
    },
    "is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "dev": true
    },
    "is-extendable": {
      "version": "0.1.1",
      "dev": true
    },
    "is-extglob": {
      "version": "2.1.1",
      "dev": true
    },
    "is-fullwidth-code-point": {
      "version": "3.0.0",
      "dev": true
    },
    "is-glob": {
      "version": "4.0.3",
      "dev": true,
      "requires": {
        "is-extglob": "^2.1.1"
      }
    },
    "is-interactive": {
      "version": "2.0.0",
      "dev": true
    },
    "is-number": {
      "version": "7.0.0",
      "dev": true
    },
    "is-plain-obj": {
      "version": "4.1.0",
      "dev": true
    },
    "is-stream": {
      "version": "3.0.0",
      "dev": true
    },
    "is-unicode-supported": {
      "version": "1.2.0",
      "dev": true
    },
    "is-wsl": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.2.0.tgz",
      "integrity": "sha512-fKzAra0rGJUUBwGBgNkHZuToZcn+TtXHpeCgmkMJMMYx1sQDYaCSyjJBSCa2nH1DGm7s3n1oBnohoVTBaN7Lww==",
      "dev": true,
      "requires": {
        "is-docker": "^2.0.0"
      },
      "dependencies": {
        "is-docker": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
          "integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
          "dev": true
        }
      }
    },
    "isexe": {
      "version": "2.0.0",
      "dev": true
    },
    "js-tokens": {
      "version": "4.0.0",
      "dev": true
    },
    "js-yaml": {
      "version": "3.14.1",
      "dev": true,
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      }
    },
    "jsesc": {
      "version": "2.5.2",
      "dev": true
    },
    "json5": {
      "version": "2.2.1",
      "dev": true
    },
    "jsonc-parser": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-2.3.1.tgz",
      "integrity": "sha512-H8jvkz1O50L3dMZCsLqiuB2tA7muqbSg1AtGEkN0leAqGjsUzDJir3Zwr02BhqdcITPg3ei3mZ+HjMocAknhhg==",
      "dev": true
    },
    "jsonfile": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-6.1.0.tgz",
      "integrity": "sha512-5dgndWOriYSm5cnYaJNhalLNDKOqFwyDB/rr1E9ZsGciGvKPs8R2xYGCacuf3z6K1YKDz182fd+fY3cn3pMqXQ==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.6",
        "universalify": "^2.0.0"
      }
    },
    "kind-of": {
      "version": "6.0.3",
      "dev": true
    },
    "kleur": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-4.1.5.tgz",
      "integrity": "sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==",
      "dev": true
    },
    "load-yaml-file": {
      "version": "0.2.0",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.5",
        "js-yaml": "^3.13.0",
        "pify": "^4.0.1",
        "strip-bom": "^3.0.0"
      },
      "dependencies": {
        "strip-bom": {
          "version": "3.0.0",
          "dev": true
        }
      }
    },
    "locate-path": {
      "version": "6.0.0",
      "dev": true,
      "requires": {
        "p-locate": "^5.0.0"
      }
    },
    "lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "dev": true
    },
    "log-symbols": {
      "version": "5.1.0",
      "dev": true,
      "requires": {
        "chalk": "^5.0.0",
        "is-unicode-supported": "^1.1.0"
      },
      "dependencies": {
        "chalk": {
          "version": "5.0.1",
          "dev": true
        }
      }
    },
    "longest-streak": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/longest-streak/-/longest-streak-3.1.0.tgz",
      "integrity": "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g==",
      "dev": true
    },
    "lower-case": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/lower-case/-/lower-case-2.0.2.tgz",
      "integrity": "sha512-7fm3l3NAF9WfN6W3JOmf5drwpVqX78JtoGJ3A6W0a6ZnldM41w2fV5D490psKFTpMds8TJse/eHLFFsNHHjHgg==",
      "dev": true,
      "requires": {
        "tslib": "^2.0.3"
      }
    },
    "lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "dev": true,
      "requires": {
        "yallist": "^4.0.0"
      }
    },
    "magic-string": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.27.0.tgz",
      "integrity": "sha512-8UnnX2PeRAPZuN12svgR9j7M1uWMovg/CEnIwIG0LFkXSJJe4PdfUGiTGl8V9bsBHFUtfVINcSyYxd7q+kx9fA==",
      "dev": true,
      "requires": {
        "@jridgewell/sourcemap-codec": "^1.4.13"
      }
    },
    "markdown-table": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/markdown-table/-/markdown-table-3.0.3.tgz",
      "integrity": "sha512-Z1NL3Tb1M9wH4XESsCDEksWoKTdlUafKc4pt0GRwjUyXaCFZ+dc3g2erqB6zm3szA2IUSi7VnPI+o/9jnxh9hw==",
      "dev": true
    },
    "mdast-util-definitions": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/mdast-util-definitions/-/mdast-util-definitions-5.1.2.tgz",
      "integrity": "sha512-8SVPMuHqlPME/z3gqVwWY4zVXn8lqKv/pAhC57FuJ40ImXyBpmO5ukh98zB2v7Blql2FiHjHv9LVztSIqjY+MA==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "unist-util-visit": "^4.0.0"
      }
    },
    "mdast-util-find-and-replace": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/mdast-util-find-and-replace/-/mdast-util-find-and-replace-2.2.2.tgz",
      "integrity": "sha512-MTtdFRz/eMDHXzeK6W3dO7mXUlF82Gom4y0oOgvHhh/HXZAGvIQDUvQ0SuUx+j2tv44b8xTHOm8K/9OoRFnXKw==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "escape-string-regexp": "^5.0.0",
        "unist-util-is": "^5.0.0",
        "unist-util-visit-parents": "^5.0.0"
      },
      "dependencies": {
        "escape-string-regexp": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-5.0.0.tgz",
          "integrity": "sha512-/veY75JbMK4j1yjvuUxuVsiS/hr/4iHs9FTT6cgTexxdE0Ly/glccBAkloH/DofkjRbZU3bnoj38mOmhkZ0lHw==",
          "dev": true
        }
      }
    },
    "mdast-util-from-markdown": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/mdast-util-from-markdown/-/mdast-util-from-markdown-1.3.0.tgz",
      "integrity": "sha512-HN3W1gRIuN/ZW295c7zi7g9lVBllMgZE40RxCX37wrTPWXCWtpvOZdfnuK+1WNpvZje6XuJeI3Wnb4TJEUem+g==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "decode-named-character-reference": "^1.0.0",
        "mdast-util-to-string": "^3.1.0",
        "micromark": "^3.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-decode-string": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "unist-util-stringify-position": "^3.0.0",
        "uvu": "^0.5.0"
      }
    },
    "mdast-util-gfm": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm/-/mdast-util-gfm-2.0.2.tgz",
      "integrity": "sha512-qvZ608nBppZ4icQlhQQIAdc6S3Ffj9RGmzwUKUWuEICFnd1LVkN3EktF7ZHAgfcEdvZB5owU9tQgt99e2TlLjg==",
      "dev": true,
      "requires": {
        "mdast-util-from-markdown": "^1.0.0",
        "mdast-util-gfm-autolink-literal": "^1.0.0",
        "mdast-util-gfm-footnote": "^1.0.0",
        "mdast-util-gfm-strikethrough": "^1.0.0",
        "mdast-util-gfm-table": "^1.0.0",
        "mdast-util-gfm-task-list-item": "^1.0.0",
        "mdast-util-to-markdown": "^1.0.0"
      }
    },
    "mdast-util-gfm-autolink-literal": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-autolink-literal/-/mdast-util-gfm-autolink-literal-1.0.3.tgz",
      "integrity": "sha512-My8KJ57FYEy2W2LyNom4n3E7hKTuQk/0SES0u16tjA9Z3oFkF4RrC/hPAPgjlSpezsOvI8ObcXcElo92wn5IGA==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "ccount": "^2.0.0",
        "mdast-util-find-and-replace": "^2.0.0",
        "micromark-util-character": "^1.0.0"
      }
    },
    "mdast-util-gfm-footnote": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-footnote/-/mdast-util-gfm-footnote-1.0.2.tgz",
      "integrity": "sha512-56D19KOGbE00uKVj3sgIykpwKL179QsVFwx/DCW0u/0+URsryacI4MAdNJl0dh+u2PSsD9FtxPFbHCzJ78qJFQ==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0",
        "micromark-util-normalize-identifier": "^1.0.0"
      }
    },
    "mdast-util-gfm-strikethrough": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-strikethrough/-/mdast-util-gfm-strikethrough-1.0.3.tgz",
      "integrity": "sha512-DAPhYzTYrRcXdMjUtUjKvW9z/FNAMTdU0ORyMcbmkwYNbKocDpdk+PX1L1dQgOID/+vVs1uBQ7ElrBQfZ0cuiQ==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      }
    },
    "mdast-util-gfm-table": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-table/-/mdast-util-gfm-table-1.0.7.tgz",
      "integrity": "sha512-jjcpmNnQvrmN5Vx7y7lEc2iIOEytYv7rTvu+MeyAsSHTASGCCRA79Igg2uKssgOs1i1po8s3plW0sTu1wkkLGg==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "markdown-table": "^3.0.0",
        "mdast-util-from-markdown": "^1.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      }
    },
    "mdast-util-gfm-task-list-item": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/mdast-util-gfm-task-list-item/-/mdast-util-gfm-task-list-item-1.0.2.tgz",
      "integrity": "sha512-PFTA1gzfp1B1UaiJVyhJZA1rm0+Tzn690frc/L8vNX1Jop4STZgOE6bxUhnzdVSB+vm2GU1tIsuQcA9bxTQpMQ==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "mdast-util-to-markdown": "^1.3.0"
      }
    },
    "mdast-util-phrasing": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/mdast-util-phrasing/-/mdast-util-phrasing-3.0.1.tgz",
      "integrity": "sha512-WmI1gTXUBJo4/ZmSk79Wcb2HcjPJBzM1nlI/OUWA8yk2X9ik3ffNbBGsU+09BFmXaL1IBb9fiuvq6/KMiNycSg==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "unist-util-is": "^5.0.0"
      }
    },
    "mdast-util-to-hast": {
      "version": "12.3.0",
      "resolved": "https://registry.npmjs.org/mdast-util-to-hast/-/mdast-util-to-hast-12.3.0.tgz",
      "integrity": "sha512-pits93r8PhnIoU4Vy9bjW39M2jJ6/tdHyja9rrot9uujkN7UTU9SDnE6WNJz/IGyQk3XHX6yNNtrBH6cQzm8Hw==",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "@types/mdast": "^3.0.0",
        "mdast-util-definitions": "^5.0.0",
        "micromark-util-sanitize-uri": "^1.1.0",
        "trim-lines": "^3.0.0",
        "unist-util-generated": "^2.0.0",
        "unist-util-position": "^4.0.0",
        "unist-util-visit": "^4.0.0"
      }
    },
    "mdast-util-to-markdown": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/mdast-util-to-markdown/-/mdast-util-to-markdown-1.5.0.tgz",
      "integrity": "sha512-bbv7TPv/WC49thZPg3jXuqzuvI45IL2EVAr/KxF0BSdHsU0ceFHOmwQn6evxAh1GaoK/6GQ1wp4R4oW2+LFL/A==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "@types/unist": "^2.0.0",
        "longest-streak": "^3.0.0",
        "mdast-util-phrasing": "^3.0.0",
        "mdast-util-to-string": "^3.0.0",
        "micromark-util-decode-string": "^1.0.0",
        "unist-util-visit": "^4.0.0",
        "zwitch": "^2.0.0"
      }
    },
    "mdast-util-to-string": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/mdast-util-to-string/-/mdast-util-to-string-3.1.1.tgz",
      "integrity": "sha512-tGvhT94e+cVnQt8JWE9/b3cUQZWS732TJxXHktvP+BYo62PpYD53Ls/6cC60rW21dW+txxiM4zMdc6abASvZKA==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0"
      }
    },
    "merge-stream": {
      "version": "2.0.0",
      "dev": true
    },
    "merge2": {
      "version": "1.4.1",
      "dev": true
    },
    "micromark": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/micromark/-/micromark-3.1.0.tgz",
      "integrity": "sha512-6Mj0yHLdUZjHnOPgr5xfWIMqMWS12zDN6iws9SLuSz76W8jTtAv24MN4/CL7gJrl5vtxGInkkqDv/JIoRsQOvA==",
      "dev": true,
      "requires": {
        "@types/debug": "^4.0.0",
        "debug": "^4.0.0",
        "decode-named-character-reference": "^1.0.0",
        "micromark-core-commonmark": "^1.0.1",
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-combine-extensions": "^1.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-encode": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-subtokenize": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.1",
        "uvu": "^0.5.0"
      }
    },
    "micromark-core-commonmark": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/micromark-core-commonmark/-/micromark-core-commonmark-1.0.6.tgz",
      "integrity": "sha512-K+PkJTxqjFfSNkfAhp4GB+cZPfQd6dxtTXnf+RjZOV7T4EEXnvgzOcnp+eSTmpGk9d1S9sL6/lqrgSNn/s0HZA==",
      "dev": true,
      "requires": {
        "decode-named-character-reference": "^1.0.0",
        "micromark-factory-destination": "^1.0.0",
        "micromark-factory-label": "^1.0.0",
        "micromark-factory-space": "^1.0.0",
        "micromark-factory-title": "^1.0.0",
        "micromark-factory-whitespace": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-classify-character": "^1.0.0",
        "micromark-util-html-tag-name": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-subtokenize": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.1",
        "uvu": "^0.5.0"
      }
    },
    "micromark-extension-gfm": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm/-/micromark-extension-gfm-2.0.1.tgz",
      "integrity": "sha512-p2sGjajLa0iYiGQdT0oelahRYtMWvLjy8J9LOCxzIQsllMCGLbsLW+Nc+N4vi02jcRJvedVJ68cjelKIO6bpDA==",
      "dev": true,
      "requires": {
        "micromark-extension-gfm-autolink-literal": "^1.0.0",
        "micromark-extension-gfm-footnote": "^1.0.0",
        "micromark-extension-gfm-strikethrough": "^1.0.0",
        "micromark-extension-gfm-table": "^1.0.0",
        "micromark-extension-gfm-tagfilter": "^1.0.0",
        "micromark-extension-gfm-task-list-item": "^1.0.0",
        "micromark-util-combine-extensions": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-extension-gfm-autolink-literal": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-autolink-literal/-/micromark-extension-gfm-autolink-literal-1.0.3.tgz",
      "integrity": "sha512-i3dmvU0htawfWED8aHMMAzAVp/F0Z+0bPh3YrbTPPL1v4YAlCZpy5rBO5p0LPYiZo0zFVkoYh7vDU7yQSiCMjg==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-extension-gfm-footnote": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-footnote/-/micromark-extension-gfm-footnote-1.0.4.tgz",
      "integrity": "sha512-E/fmPmDqLiMUP8mLJ8NbJWJ4bTw6tS+FEQS8CcuDtZpILuOb2kjLqPEeAePF1djXROHXChM/wPJw0iS4kHCcIg==",
      "dev": true,
      "requires": {
        "micromark-core-commonmark": "^1.0.0",
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-normalize-identifier": "^1.0.0",
        "micromark-util-sanitize-uri": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-extension-gfm-strikethrough": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-strikethrough/-/micromark-extension-gfm-strikethrough-1.0.4.tgz",
      "integrity": "sha512-/vjHU/lalmjZCT5xt7CcHVJGq8sYRm80z24qAKXzaHzem/xsDYb2yLL+NNVbYvmpLx3O7SYPuGL5pzusL9CLIQ==",
      "dev": true,
      "requires": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-classify-character": "^1.0.0",
        "micromark-util-resolve-all": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-extension-gfm-table": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-table/-/micromark-extension-gfm-table-1.0.5.tgz",
      "integrity": "sha512-xAZ8J1X9W9K3JTJTUL7G6wSKhp2ZYHrFk5qJgY/4B33scJzE2kpfRL6oiw/veJTbt7jiM/1rngLlOKPWr1G+vg==",
      "dev": true,
      "requires": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-extension-gfm-tagfilter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-tagfilter/-/micromark-extension-gfm-tagfilter-1.0.1.tgz",
      "integrity": "sha512-Ty6psLAcAjboRa/UKUbbUcwjVAv5plxmpUTy2XC/3nJFL37eHej8jrHrRzkqcpipJliuBH30DTs7+3wqNcQUVA==",
      "dev": true,
      "requires": {
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-extension-gfm-task-list-item": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-task-list-item/-/micromark-extension-gfm-task-list-item-1.0.3.tgz",
      "integrity": "sha512-PpysK2S1Q/5VXi72IIapbi/jliaiOFzv7THH4amwXeYXLq3l1uo8/2Be0Ac1rEwK20MQEsGH2ltAZLNY2KI/0Q==",
      "dev": true,
      "requires": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-factory-destination": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-destination/-/micromark-factory-destination-1.0.0.tgz",
      "integrity": "sha512-eUBA7Rs1/xtTVun9TmV3gjfPz2wEwgK5R5xcbIM5ZYAtvGF6JkyaDsj0agx8urXnO31tEO6Ug83iVH3tdedLnw==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-factory-label": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-factory-label/-/micromark-factory-label-1.0.2.tgz",
      "integrity": "sha512-CTIwxlOnU7dEshXDQ+dsr2n+yxpP0+fn271pu0bwDIS8uqfFcumXpj5mLn3hSC8iw2MUr6Gx8EcKng1dD7i6hg==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-factory-space": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-space/-/micromark-factory-space-1.0.0.tgz",
      "integrity": "sha512-qUmqs4kj9a5yBnk3JMLyjtWYN6Mzfcx8uJfi5XAveBniDevmZasdGBba5b4QsvRcAkmvGo5ACmSUmyGiKTLZew==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-factory-title": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-factory-title/-/micromark-factory-title-1.0.2.tgz",
      "integrity": "sha512-zily+Nr4yFqgMGRKLpTVsNl5L4PMu485fGFDOQJQBl2NFpjGte1e86zC0da93wf97jrc4+2G2GQudFMHn3IX+A==",
      "dev": true,
      "requires": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-factory-whitespace": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-factory-whitespace/-/micromark-factory-whitespace-1.0.0.tgz",
      "integrity": "sha512-Qx7uEyahU1lt1RnsECBiuEbfr9INjQTGa6Err+gF3g0Tx4YEviPbqqGKNv/NrBaE7dVHdn1bVZKM/n5I/Bak7A==",
      "dev": true,
      "requires": {
        "micromark-factory-space": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-util-character": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-character/-/micromark-util-character-1.1.0.tgz",
      "integrity": "sha512-agJ5B3unGNJ9rJvADMJ5ZiYjBRyDpzKAOk01Kpi1TKhlT1APx3XZk6eN7RtSz1erbWHC2L8T3xLZ81wdtGRZzg==",
      "dev": true,
      "requires": {
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-util-chunked": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-chunked/-/micromark-util-chunked-1.0.0.tgz",
      "integrity": "sha512-5e8xTis5tEZKgesfbQMKRCyzvffRRUX+lK/y+DvsMFdabAicPkkZV6gO+FEWi9RfuKKoxxPwNL+dFF0SMImc1g==",
      "dev": true,
      "requires": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "micromark-util-classify-character": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-classify-character/-/micromark-util-classify-character-1.0.0.tgz",
      "integrity": "sha512-F8oW2KKrQRb3vS5ud5HIqBVkCqQi224Nm55o5wYLzY/9PwHGXC01tr3d7+TqHHz6zrKQ72Okwtvm/xQm6OVNZA==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-util-combine-extensions": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-combine-extensions/-/micromark-util-combine-extensions-1.0.0.tgz",
      "integrity": "sha512-J8H058vFBdo/6+AsjHp2NF7AJ02SZtWaVUjsayNFeAiydTxUwViQPxN0Hf8dp4FmCQi0UUFovFsEyRSUmFH3MA==",
      "dev": true,
      "requires": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-util-decode-numeric-character-reference": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-decode-numeric-character-reference/-/micromark-util-decode-numeric-character-reference-1.0.0.tgz",
      "integrity": "sha512-OzO9AI5VUtrTD7KSdagf4MWgHMtET17Ua1fIpXTpuhclCqD8egFWo85GxSGvxgkGS74bEahvtM0WP0HjvV0e4w==",
      "dev": true,
      "requires": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "micromark-util-decode-string": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-decode-string/-/micromark-util-decode-string-1.0.2.tgz",
      "integrity": "sha512-DLT5Ho02qr6QWVNYbRZ3RYOSSWWFuH3tJexd3dgN1odEuPNxCngTCXJum7+ViRAd9BbdxCvMToPOD/IvVhzG6Q==",
      "dev": true,
      "requires": {
        "decode-named-character-reference": "^1.0.0",
        "micromark-util-character": "^1.0.0",
        "micromark-util-decode-numeric-character-reference": "^1.0.0",
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "micromark-util-encode": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-util-encode/-/micromark-util-encode-1.0.1.tgz",
      "integrity": "sha512-U2s5YdnAYexjKDel31SVMPbfi+eF8y1U4pfiRW/Y8EFVCy/vgxk/2wWTxzcqE71LHtCuCzlBDRU2a5CQ5j+mQA==",
      "dev": true
    },
    "micromark-util-html-tag-name": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-html-tag-name/-/micromark-util-html-tag-name-1.1.0.tgz",
      "integrity": "sha512-BKlClMmYROy9UiV03SwNmckkjn8QHVaWkqoAqzivabvdGcwNGMMMH/5szAnywmsTBUzDsU57/mFi0sp4BQO6dA==",
      "dev": true
    },
    "micromark-util-normalize-identifier": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-normalize-identifier/-/micromark-util-normalize-identifier-1.0.0.tgz",
      "integrity": "sha512-yg+zrL14bBTFrQ7n35CmByWUTFsgst5JhA4gJYoty4Dqzj4Z4Fr/DHekSS5aLfH9bdlfnSvKAWsAgJhIbogyBg==",
      "dev": true,
      "requires": {
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "micromark-util-resolve-all": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/micromark-util-resolve-all/-/micromark-util-resolve-all-1.0.0.tgz",
      "integrity": "sha512-CB/AGk98u50k42kvgaMM94wzBqozSzDDaonKU7P7jwQIuH2RU0TeBqGYJz2WY1UdihhjweivStrJ2JdkdEmcfw==",
      "dev": true,
      "requires": {
        "micromark-util-types": "^1.0.0"
      }
    },
    "micromark-util-sanitize-uri": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/micromark-util-sanitize-uri/-/micromark-util-sanitize-uri-1.1.0.tgz",
      "integrity": "sha512-RoxtuSCX6sUNtxhbmsEFQfWzs8VN7cTctmBPvYivo98xb/kDEoTCtJQX5wyzIYEmk/lvNFTat4hL8oW0KndFpg==",
      "dev": true,
      "requires": {
        "micromark-util-character": "^1.0.0",
        "micromark-util-encode": "^1.0.0",
        "micromark-util-symbol": "^1.0.0"
      }
    },
    "micromark-util-subtokenize": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-subtokenize/-/micromark-util-subtokenize-1.0.2.tgz",
      "integrity": "sha512-d90uqCnXp/cy4G881Ub4psE57Sf8YD0pim9QdjCRNjfas2M1u6Lbt+XZK9gnHL2XFhnozZiEdCa9CNfXSfQ6xA==",
      "dev": true,
      "requires": {
        "micromark-util-chunked": "^1.0.0",
        "micromark-util-symbol": "^1.0.0",
        "micromark-util-types": "^1.0.0",
        "uvu": "^0.5.0"
      }
    },
    "micromark-util-symbol": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/micromark-util-symbol/-/micromark-util-symbol-1.0.1.tgz",
      "integrity": "sha512-oKDEMK2u5qqAptasDAwWDXq0tG9AssVwAx3E9bBF3t/shRIGsWIRG+cGafs2p/SnDSOecnt6hZPCE2o6lHfFmQ==",
      "dev": true
    },
    "micromark-util-types": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/micromark-util-types/-/micromark-util-types-1.0.2.tgz",
      "integrity": "sha512-DCfg/T8fcrhrRKTPjRrw/5LLvdGV7BHySf/1LOZx7TzWZdYRjogNtyNq885z3nNallwr3QUKARjqvHqX1/7t+w==",
      "dev": true
    },
    "micromatch": {
      "version": "4.0.5",
      "dev": true,
      "requires": {
        "braces": "^3.0.2",
        "picomatch": "^2.3.1"
      }
    },
    "mime": {
      "version": "3.0.0",
      "dev": true
    },
    "mimic-fn": {
      "version": "4.0.0",
      "dev": true
    },
    "minimatch": {
      "version": "3.1.2",
      "dev": true,
      "requires": {
        "brace-expansion": "^1.1.7"
      }
    },
    "mri": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mri/-/mri-1.2.0.tgz",
      "integrity": "sha512-tzzskb3bG8LvYGFF/mDTpq3jpI6Q9wc3LEmBaghu+DdCssd1FakN7Bc0hVNmEyGq1bq3RgfkCb3cmQLpNPOroA==",
      "dev": true
    },
    "ms": {
      "version": "2.1.2",
      "dev": true
    },
    "nanoid": {
      "version": "3.3.4",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.4.tgz",
      "integrity": "sha512-MqBkQh/OHTS2egovRtLk45wEyNXwF+cokD+1YPf9u5VfJiRdAiRwB2froX5Co9Rh20xs4siNPm8naNotSD6RBw==",
      "dev": true
    },
    "nlcst-to-string": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/nlcst-to-string/-/nlcst-to-string-3.1.1.tgz",
      "integrity": "sha512-63mVyqaqt0cmn2VcI2aH6kxe1rLAmSROqHMA0i4qqg1tidkfExgpb0FGMikMCn86mw5dFtBtEANfmSSK7TjNHw==",
      "dev": true,
      "requires": {
        "@types/nlcst": "^1.0.0"
      }
    },
    "no-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/no-case/-/no-case-3.0.4.tgz",
      "integrity": "sha512-fgAN3jGAh+RoxUGZHTSOLJIqUc2wmoBwGR4tbpNAKmmovFoWq0OdRkb0VkldReO2a2iBT/OEulG9XSUc10r3zg==",
      "dev": true,
      "requires": {
        "lower-case": "^2.0.2",
        "tslib": "^2.0.3"
      }
    },
    "node-releases": {
      "version": "2.0.6",
      "dev": true
    },
    "npm-run-path": {
      "version": "5.1.0",
      "dev": true,
      "requires": {
        "path-key": "^4.0.0"
      },
      "dependencies": {
        "path-key": {
          "version": "4.0.0",
          "dev": true
        }
      }
    },
    "once": {
      "version": "1.4.0",
      "dev": true,
      "requires": {
        "wrappy": "1"
      }
    },
    "onetime": {
      "version": "6.0.0",
      "dev": true,
      "requires": {
        "mimic-fn": "^4.0.0"
      }
    },
    "open": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/open/-/open-8.4.2.tgz",
      "integrity": "sha512-7x81NCL719oNbsq/3mh+hVrAWmFuEYUqrq/Iw3kUzH8ReypT9QQ0BLoJS7/G9k6N81XjW4qHWtjWwe/9eLy1EQ==",
      "dev": true,
      "requires": {
        "define-lazy-prop": "^2.0.0",
        "is-docker": "^2.1.1",
        "is-wsl": "^2.2.0"
      },
      "dependencies": {
        "is-docker": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-2.2.1.tgz",
          "integrity": "sha512-F+i2BKsFrH66iaUFc0woD8sLy8getkwTwtOBjvs56Cx4CgJDeKQeqfz8wAYiSb8JOprWhHH5p77PbmYCvvUuXQ==",
          "dev": true
        }
      }
    },
    "ora": {
      "version": "6.1.2",
      "dev": true,
      "requires": {
        "bl": "^5.0.0",
        "chalk": "^5.0.0",
        "cli-cursor": "^4.0.0",
        "cli-spinners": "^2.6.1",
        "is-interactive": "^2.0.0",
        "is-unicode-supported": "^1.1.0",
        "log-symbols": "^5.1.0",
        "strip-ansi": "^7.0.1",
        "wcwidth": "^1.0.1"
      },
      "dependencies": {
        "chalk": {
          "version": "5.0.1",
          "dev": true
        }
      }
    },
    "p-limit": {
      "version": "3.1.0",
      "dev": true,
      "requires": {
        "yocto-queue": "^0.1.0"
      }
    },
    "p-locate": {
      "version": "5.0.0",
      "dev": true,
      "requires": {
        "p-limit": "^3.0.2"
      }
    },
    "p-try": {
      "version": "2.2.0",
      "dev": true
    },
    "param-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/param-case/-/param-case-3.0.4.tgz",
      "integrity": "sha512-RXlj7zCYokReqWpOPH9oYivUzLYZ5vAPIfEmCTNViosC78F8F0H9y7T7gG2M39ymgutxF5gcFEsyZQSph9Bp3A==",
      "dev": true,
      "requires": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "parse-latin": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/parse-latin/-/parse-latin-5.0.1.tgz",
      "integrity": "sha512-b/K8ExXaWC9t34kKeDV8kGXBkXZ1HCSAZRYE7HR14eA1GlXX5L8iWhs8USJNhQU9q5ci413jCKF0gOyovvyRBg==",
      "dev": true,
      "requires": {
        "nlcst-to-string": "^3.0.0",
        "unist-util-modify-children": "^3.0.0",
        "unist-util-visit-children": "^2.0.0"
      }
    },
    "parse5": {
      "version": "6.0.1",
      "dev": true
    },
    "pascal-case": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/pascal-case/-/pascal-case-3.1.2.tgz",
      "integrity": "sha512-uWlGT3YSnK9x3BQJaOdcZwrnV6hPpd8jFH1/ucpiLRPh/2zCVJKS19E4GvYHvaCcACn3foXZ0cLB9Wrx1KGe5g==",
      "dev": true,
      "requires": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "path-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/path-case/-/path-case-3.0.4.tgz",
      "integrity": "sha512-qO4qCFjXqVTrcbPt/hQfhTQ+VhFsqNKOPtytgNKkKxSoEp3XPUQ8ObFuePylOIok5gjn69ry8XiULxCwot3Wfg==",
      "dev": true,
      "requires": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "path-exists": {
      "version": "4.0.0",
      "dev": true
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "dev": true
    },
    "path-key": {
      "version": "3.1.1",
      "dev": true
    },
    "path-parse": {
      "version": "1.0.7",
      "dev": true
    },
    "path-to-regexp": {
      "version": "6.2.1",
      "dev": true
    },
    "picocolors": {
      "version": "1.0.0",
      "dev": true
    },
    "picomatch": {
      "version": "2.3.1",
      "dev": true
    },
    "pify": {
      "version": "4.0.1",
      "dev": true
    },
    "pkg-dir": {
      "version": "4.2.0",
      "dev": true,
      "requires": {
        "find-up": "^4.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "4.1.0",
          "dev": true,
          "requires": {
            "locate-path": "^5.0.0",
            "path-exists": "^4.0.0"
          }
        },
        "locate-path": {
          "version": "5.0.0",
          "dev": true,
          "requires": {
            "p-locate": "^4.1.0"
          }
        },
        "p-limit": {
          "version": "2.3.0",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "4.1.0",
          "dev": true,
          "requires": {
            "p-limit": "^2.2.0"
          }
        }
      }
    },
    "pkg-up": {
      "version": "3.1.0",
      "dev": true,
      "requires": {
        "find-up": "^3.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.3.0",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "3.0.0",
          "dev": true
        }
      }
    },
    "postcss": {
      "version": "8.4.21",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.21.tgz",
      "integrity": "sha512-tP7u/Sn/dVxK2NnruI4H9BG+x+Wxz6oeZ1cJ8P6G/PZY0IKk4k/63TDsQf2kQq3+qoJeLm2kIBUNlZe3zgb4Zg==",
      "dev": true,
      "requires": {
        "nanoid": "^3.3.4",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      }
    },
    "preact": {
      "version": "10.10.3",
      "dev": true,
      "peer": true
    },
    "preact-render-to-string": {
      "version": "5.2.2",
      "dev": true,
      "requires": {
        "pretty-format": "^3.8.0"
      }
    },
    "preferred-pm": {
      "version": "3.0.3",
      "dev": true,
      "requires": {
        "find-up": "^5.0.0",
        "find-yarn-workspace-root2": "1.2.16",
        "path-exists": "^4.0.0",
        "which-pm": "2.0.0"
      }
    },
    "prettier": {
      "version": "2.8.4",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-2.8.4.tgz",
      "integrity": "sha512-vIS4Rlc2FNh0BySk3Wkd6xmwxB0FpOndW5fisM5H8hsZSxU2VWVB5CWIkIjWvrHjIhxk2g3bfMKM87zNTrZddw==",
      "dev": true
    },
    "prettier-plugin-astro": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/prettier-plugin-astro/-/prettier-plugin-astro-0.7.2.tgz",
      "integrity": "sha512-mmifnkG160BtC727gqoimoxnZT/dwr8ASxpoGGl6EHevhfblSOeu+pwH1LAm5Qu1MynizktztFujHHaijLCkww==",
      "dev": true,
      "requires": {
        "@astrojs/compiler": "^0.31.3",
        "prettier": "^2.7.1",
        "sass-formatter": "^0.7.5",
        "synckit": "^0.8.4"
      },
      "dependencies": {
        "@astrojs/compiler": {
          "version": "0.31.4",
          "resolved": "https://registry.npmjs.org/@astrojs/compiler/-/compiler-0.31.4.tgz",
          "integrity": "sha512-6bBFeDTtPOn4jZaiD3p0f05MEGQL9pw2Zbfj546oFETNmjJFWO3nzHz6/m+P53calknCvyVzZ5YhoBLIvzn5iw==",
          "dev": true
        }
      }
    },
    "pretty-format": {
      "version": "3.8.0",
      "dev": true
    },
    "prismjs": {
      "version": "1.29.0",
      "resolved": "https://registry.npmjs.org/prismjs/-/prismjs-1.29.0.tgz",
      "integrity": "sha512-Kx/1w86q/epKcmte75LNrEoT+lX8pBpavuAbvJWRXar7Hz8jrtF+e3vY751p0R8H9HdArwaCTNDDzHg/ScJK1Q==",
      "dev": true
    },
    "prompts": {
      "version": "2.4.2",
      "dev": true,
      "requires": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.5"
      },
      "dependencies": {
        "kleur": {
          "version": "3.0.3",
          "dev": true
        }
      }
    },
    "property-information": {
      "version": "6.1.1",
      "dev": true
    },
    "queue-microtask": {
      "version": "1.2.3",
      "dev": true
    },
    "readable-stream": {
      "version": "3.6.0",
      "dev": true,
      "requires": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      }
    },
    "rehype": {
      "version": "12.0.1",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "rehype-parse": "^8.0.0",
        "rehype-stringify": "^9.0.0",
        "unified": "^10.0.0"
      }
    },
    "rehype-parse": {
      "version": "8.0.4",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "hast-util-from-parse5": "^7.0.0",
        "parse5": "^6.0.0",
        "unified": "^10.0.0"
      }
    },
    "rehype-raw": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/rehype-raw/-/rehype-raw-6.1.1.tgz",
      "integrity": "sha512-d6AKtisSRtDRX4aSPsJGTfnzrX2ZkHQLE5kiUuGOeEoLpbEulFF4hj0mLPbsa+7vmguDKOVVEQdHKDSwoaIDsQ==",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "hast-util-raw": "^7.2.0",
        "unified": "^10.0.0"
      }
    },
    "rehype-stringify": {
      "version": "9.0.3",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "hast-util-to-html": "^8.0.0",
        "unified": "^10.0.0"
      }
    },
    "remark-gfm": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/remark-gfm/-/remark-gfm-3.0.1.tgz",
      "integrity": "sha512-lEFDoi2PICJyNrACFOfDD3JlLkuSbOa5Wd8EPt06HUdptv8Gn0bxYTdbU/XXQ3swAPkEaGxxPN9cbnMHvVu1Ig==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "mdast-util-gfm": "^2.0.0",
        "micromark-extension-gfm": "^2.0.0",
        "unified": "^10.0.0"
      }
    },
    "remark-parse": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/remark-parse/-/remark-parse-10.0.1.tgz",
      "integrity": "sha512-1fUyHr2jLsVOkhbvPRBJ5zTKZZyD6yZzYaWCS6BPBdQ8vEMBCH+9zNCDA6tET/zHCi/jLqjCWtlJZUPk+DbnFw==",
      "dev": true,
      "requires": {
        "@types/mdast": "^3.0.0",
        "mdast-util-from-markdown": "^1.0.0",
        "unified": "^10.0.0"
      }
    },
    "remark-rehype": {
      "version": "10.1.0",
      "resolved": "https://registry.npmjs.org/remark-rehype/-/remark-rehype-10.1.0.tgz",
      "integrity": "sha512-EFmR5zppdBp0WQeDVZ/b66CWJipB2q2VLNFMabzDSGR66Z2fQii83G5gTBbgGEnEEA0QRussvrFHxk1HWGJskw==",
      "dev": true,
      "requires": {
        "@types/hast": "^2.0.0",
        "@types/mdast": "^3.0.0",
        "mdast-util-to-hast": "^12.1.0",
        "unified": "^10.0.0"
      }
    },
    "remark-smartypants": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/remark-smartypants/-/remark-smartypants-2.0.0.tgz",
      "integrity": "sha512-Rc0VDmr/yhnMQIz8n2ACYXlfw/P/XZev884QU1I5u+5DgJls32o97Vc1RbK3pfumLsJomS2yy8eT4Fxj/2MDVA==",
      "dev": true,
      "requires": {
        "retext": "^8.1.0",
        "retext-smartypants": "^5.1.0",
        "unist-util-visit": "^4.1.0"
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true
    },
    "reselect": {
      "version": "4.1.6",
      "dev": true
    },
    "resolve": {
      "version": "1.22.1",
      "dev": true,
      "requires": {
        "is-core-module": "^2.9.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      }
    },
    "restore-cursor": {
      "version": "4.0.0",
      "dev": true,
      "requires": {
        "onetime": "^5.1.0",
        "signal-exit": "^3.0.2"
      },
      "dependencies": {
        "mimic-fn": {
          "version": "2.1.0",
          "dev": true
        },
        "onetime": {
          "version": "5.1.2",
          "dev": true,
          "requires": {
            "mimic-fn": "^2.1.0"
          }
        }
      }
    },
    "retext": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/retext/-/retext-8.1.0.tgz",
      "integrity": "sha512-N9/Kq7YTn6ZpzfiGW45WfEGJqFf1IM1q8OsRa1CGzIebCJBNCANDRmOrholiDRGKo/We7ofKR4SEvcGAWEMD3Q==",
      "dev": true,
      "requires": {
        "@types/nlcst": "^1.0.0",
        "retext-latin": "^3.0.0",
        "retext-stringify": "^3.0.0",
        "unified": "^10.0.0"
      }
    },
    "retext-latin": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/retext-latin/-/retext-latin-3.1.0.tgz",
      "integrity": "sha512-5MrD1tuebzO8ppsja5eEu+ZbBeUNCjoEarn70tkXOS7Bdsdf6tNahsv2bY0Z8VooFF6cw7/6S+d3yI/TMlMVVQ==",
      "dev": true,
      "requires": {
        "@types/nlcst": "^1.0.0",
        "parse-latin": "^5.0.0",
        "unherit": "^3.0.0",
        "unified": "^10.0.0"
      }
    },
    "retext-smartypants": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/retext-smartypants/-/retext-smartypants-5.2.0.tgz",
      "integrity": "sha512-Do8oM+SsjrbzT2UNIKgheP0hgUQTDDQYyZaIY3kfq0pdFzoPk+ZClYJ+OERNXveog4xf1pZL4PfRxNoVL7a/jw==",
      "dev": true,
      "requires": {
        "@types/nlcst": "^1.0.0",
        "nlcst-to-string": "^3.0.0",
        "unified": "^10.0.0",
        "unist-util-visit": "^4.0.0"
      }
    },
    "retext-stringify": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/retext-stringify/-/retext-stringify-3.1.0.tgz",
      "integrity": "sha512-767TLOaoXFXyOnjx/EggXlb37ZD2u4P1n0GJqVdpipqACsQP+20W+BNpMYrlJkq7hxffnFk+jc6mAK9qrbuB8w==",
      "dev": true,
      "requires": {
        "@types/nlcst": "^1.0.0",
        "nlcst-to-string": "^3.0.0",
        "unified": "^10.0.0"
      }
    },
    "reusify": {
      "version": "1.0.4",
      "dev": true
    },
    "rollup": {
      "version": "3.18.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-3.18.0.tgz",
      "integrity": "sha512-J8C6VfEBjkvYPESMQYxKHxNOh4A5a3FlP+0BETGo34HEcE4eTlgCrO2+eWzlu2a/sHs2QUkZco+wscH7jhhgWg==",
      "dev": true,
      "requires": {
        "fsevents": "~2.3.2"
      }
    },
    "run-parallel": {
      "version": "1.2.0",
      "dev": true,
      "requires": {
        "queue-microtask": "^1.2.2"
      }
    },
    "s.color": {
      "version": "0.0.15",
      "resolved": "https://registry.npmjs.org/s.color/-/s.color-0.0.15.tgz",
      "integrity": "sha512-AUNrbEUHeKY8XsYr/DYpl+qk5+aM+DChopnWOPEzn8YKzOhv4l2zH6LzZms3tOZP3wwdOyc0RmTciyi46HLIuA==",
      "dev": true
    },
    "sade": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/sade/-/sade-1.8.1.tgz",
      "integrity": "sha512-xal3CZX1Xlo/k4ApwCFrHVACi9fBqJ7V+mwhBsuf/1IOKbBy098Fex+Wa/5QMubw09pSZ/u8EY8PWgevJsXp1A==",
      "dev": true,
      "requires": {
        "mri": "^1.1.0"
      }
    },
    "safe-buffer": {
      "version": "5.1.2",
      "dev": true
    },
    "sass-formatter": {
      "version": "0.7.6",
      "resolved": "https://registry.npmjs.org/sass-formatter/-/sass-formatter-0.7.6.tgz",
      "integrity": "sha512-hXdxU6PCkiV3XAiSnX+XLqz2ohHoEnVUlrd8LEVMAI80uB1+OTScIkH9n6qQwImZpTye1r1WG1rbGUteHNhoHg==",
      "dev": true,
      "requires": {
        "suf-log": "^2.5.3"
      }
    },
    "sax": {
      "version": "1.2.4",
      "dev": true
    },
    "section-matter": {
      "version": "1.0.0",
      "dev": true,
      "requires": {
        "extend-shallow": "^2.0.1",
        "kind-of": "^6.0.0"
      }
    },
    "semver": {
      "version": "7.3.8",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.8.tgz",
      "integrity": "sha512-NB1ctGL5rlHrPJtFDVIVzTyQylMLu9N9VICA6HSFJo8MCGVTMW6gfpicwKmmK/dAjTOrqu5l63JJOpDSrAis3A==",
      "dev": true,
      "requires": {
        "lru-cache": "^6.0.0"
      }
    },
    "sentence-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/sentence-case/-/sentence-case-3.0.4.tgz",
      "integrity": "sha512-8LS0JInaQMCRoQ7YUytAo/xUu5W2XnQxV2HI/6uM6U7CITS1RqPElr30V6uIqyMKM9lJGRVFy5/4CuzcixNYSg==",
      "dev": true,
      "requires": {
        "no-case": "^3.0.4",
        "tslib": "^2.0.3",
        "upper-case-first": "^2.0.2"
      }
    },
    "server-destroy": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/server-destroy/-/server-destroy-1.0.1.tgz",
      "integrity": "sha512-rb+9B5YBIEzYcD6x2VKidaa+cqYBJQKnU4oe4E3ANwRRN56yk/ua1YCJT1n21NTS8w6CcOclAKNP3PhdCXKYtQ==",
      "dev": true
    },
    "shebang-command": {
      "version": "2.0.0",
      "dev": true,
      "requires": {
        "shebang-regex": "^3.0.0"
      }
    },
    "shebang-regex": {
      "version": "3.0.0",
      "dev": true
    },
    "shiki": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/shiki/-/shiki-0.11.1.tgz",
      "integrity": "sha512-EugY9VASFuDqOexOgXR18ZV+TbFrQHeCpEYaXamO+SZlsnT/2LxuLBX25GGtIrwaEVFXUAbUQ601SWE2rMwWHA==",
      "dev": true,
      "requires": {
        "jsonc-parser": "^3.0.0",
        "vscode-oniguruma": "^1.6.1",
        "vscode-textmate": "^6.0.0"
      },
      "dependencies": {
        "jsonc-parser": {
          "version": "3.2.0",
          "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
          "integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
          "dev": true
        }
      }
    },
    "signal-exit": {
      "version": "3.0.7",
      "dev": true
    },
    "sisteransi": {
      "version": "1.0.5",
      "dev": true
    },
    "sitemap": {
      "version": "7.1.1",
      "dev": true,
      "requires": {
        "@types/node": "^17.0.5",
        "@types/sax": "^1.2.1",
        "arg": "^5.0.0",
        "sax": "^1.2.4"
      }
    },
    "slash": {
      "version": "4.0.0",
      "dev": true
    },
    "snake-case": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/snake-case/-/snake-case-3.0.4.tgz",
      "integrity": "sha512-LAOh4z89bGQvl9pFfNF8V146i7o7/CqFPbqzYgP+yYzDIDeS9HaNFtXABamRW+AQzEVODcvE79ljJ+8a9YSdMg==",
      "dev": true,
      "requires": {
        "dot-case": "^3.0.4",
        "tslib": "^2.0.3"
      }
    },
    "source-map": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.4.tgz",
      "integrity": "sha512-l3BikUxvPOcn5E74dZiq5BGsTb5yEwhaTSzccU6t4sDOH8NWJCstKO5QT2CvtFoK6F0saL7p9xHAqHOlCPJygA==",
      "dev": true
    },
    "source-map-js": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",
      "integrity": "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==",
      "dev": true
    },
    "space-separated-tokens": {
      "version": "2.0.1",
      "dev": true
    },
    "sprintf-js": {
      "version": "1.0.3",
      "dev": true
    },
    "streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "dev": true
    },
    "string_decoder": {
      "version": "1.3.0",
      "dev": true,
      "requires": {
        "safe-buffer": "~5.2.0"
      },
      "dependencies": {
        "safe-buffer": {
          "version": "5.2.1",
          "dev": true
        }
      }
    },
    "string-width": {
      "version": "5.1.2",
      "dev": true,
      "requires": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      }
    },
    "stringify-entities": {
      "version": "4.0.3",
      "dev": true,
      "requires": {
        "character-entities-html4": "^2.0.0",
        "character-entities-legacy": "^3.0.0"
      }
    },
    "strip-ansi": {
      "version": "7.0.1",
      "dev": true,
      "requires": {
        "ansi-regex": "^6.0.1"
      }
    },
    "strip-bom": {
      "version": "4.0.0",
      "dev": true
    },
    "strip-bom-string": {
      "version": "1.0.0",
      "dev": true
    },
    "strip-final-newline": {
      "version": "3.0.0",
      "dev": true
    },
    "style-dictionary": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/style-dictionary/-/style-dictionary-3.7.2.tgz",
      "integrity": "sha512-Nd/qrPj1ikYX+sL/8PofMgfaJLRvGgT96Ty3dJLGNqtZmecVr3Xs+OZivMQEYmSCTiap/UyeV5SqwmAgn3/KKA==",
      "dev": true,
      "requires": {
        "chalk": "^4.0.0",
        "change-case": "^4.1.2",
        "commander": "^8.3.0",
        "fs-extra": "^10.0.0",
        "glob": "^7.2.0",
        "json5": "^2.2.0",
        "jsonc-parser": "^3.0.0",
        "lodash": "^4.17.15",
        "tinycolor2": "^1.4.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
          "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
          "dev": true,
          "requires": {
            "color-convert": "^2.0.1"
          }
        },
        "chalk": {
          "version": "4.1.2",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
          "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
          "dev": true,
          "requires": {
            "ansi-styles": "^4.1.0",
            "supports-color": "^7.1.0"
          }
        },
        "color-convert": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
          "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
          "dev": true,
          "requires": {
            "color-name": "~1.1.4"
          }
        },
        "color-name": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
          "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
          "dev": true
        },
        "has-flag": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
          "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
          "dev": true
        },
        "jsonc-parser": {
          "version": "3.2.0",
          "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.2.0.tgz",
          "integrity": "sha512-gfFQZrcTc8CnKXp6Y4/CBT3fTc0OVuDofpre4aEeEpSBPV5X5v4+Vmx+8snU7RLPrNHPKSgLxGo9YuQzz20o+w==",
          "dev": true
        },
        "supports-color": {
          "version": "7.2.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
          "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
          "dev": true,
          "requires": {
            "has-flag": "^4.0.0"
          }
        }
      }
    },
    "suf-log": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/suf-log/-/suf-log-2.5.3.tgz",
      "integrity": "sha512-KvC8OPjzdNOe+xQ4XWJV2whQA0aM1kGVczMQ8+dStAO6KfEB140JEVQ9dE76ONZ0/Ylf67ni4tILPJB41U0eow==",
      "dev": true,
      "requires": {
        "s.color": "0.0.15"
      }
    },
    "supports-color": {
      "version": "5.5.0",
      "dev": true,
      "requires": {
        "has-flag": "^3.0.0"
      }
    },
    "supports-esm": {
      "version": "1.0.0",
      "dev": true,
      "requires": {
        "has-package-exports": "^1.1.0"
      }
    },
    "supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "dev": true
    },
    "synckit": {
      "version": "0.8.5",
      "resolved": "https://registry.npmjs.org/synckit/-/synckit-0.8.5.tgz",
      "integrity": "sha512-L1dapNV6vu2s/4Sputv8xGsCdAVlb5nRDMFU/E27D44l5U6cw1g0dGd45uLc+OXjNMmF4ntiMdCimzcjFKQI8Q==",
      "dev": true,
      "requires": {
        "@pkgr/utils": "^2.3.1",
        "tslib": "^2.5.0"
      }
    },
    "tiny-glob": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/tiny-glob/-/tiny-glob-0.2.9.tgz",
      "integrity": "sha512-g/55ssRPUjShh+xkfx9UPDXqhckHEsHr4Vd9zX55oSdGZc/MD0m3sferOkwWtp98bv+kcVfEHtRJgBVJzelrzg==",
      "dev": true,
      "requires": {
        "globalyzer": "0.1.0",
        "globrex": "^0.1.2"
      }
    },
    "tinycolor2": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/tinycolor2/-/tinycolor2-1.6.0.tgz",
      "integrity": "sha512-XPaBkWQJdsf3pLKJV9p4qN/S+fm2Oj8AIPo1BTUhg5oxkvm9+SVEGFdhyOz7tTdUTfvxMiAs4sp6/eZO2Ew+pw==",
      "dev": true
    },
    "to-fast-properties": {
      "version": "2.0.0",
      "dev": true
    },
    "to-regex-range": {
      "version": "5.0.1",
      "dev": true,
      "requires": {
        "is-number": "^7.0.0"
      }
    },
    "token-transformer": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/token-transformer/-/token-transformer-0.0.29.tgz",
      "integrity": "sha512-nKmLgbtLFEbCFyx7Rt+I4m9QWoMn24Mu7lJdspvSIYiLmq9fp1Q8lsbjrjSbsA6JXpjN1xtWxCgBkzCsna4wDw==",
      "dev": true,
      "requires": {
        "yargs": "^17.4.1"
      }
    },
    "trim-lines": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/trim-lines/-/trim-lines-3.0.1.tgz",
      "integrity": "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg==",
      "dev": true
    },
    "trough": {
      "version": "2.1.0",
      "dev": true
    },
    "tsconfig-resolver": {
      "version": "3.0.1",
      "dev": true,
      "requires": {
        "@types/json5": "^0.0.30",
        "@types/resolve": "^1.17.0",
        "json5": "^2.1.3",
        "resolve": "^1.17.0",
        "strip-bom": "^4.0.0",
        "type-fest": "^0.13.1"
      },
      "dependencies": {
        "type-fest": {
          "version": "0.13.1",
          "dev": true
        }
      }
    },
    "tslib": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.0.tgz",
      "integrity": "sha512-336iVw3rtn2BUK7ORdIAHTyxHGRIHVReokCR3XjbckJMK7ms8FysBfhLR8IXnAgy7T0PTPNBWKiH514FOW/WSg==",
      "dev": true
    },
    "type-fest": {
      "version": "2.18.0",
      "dev": true
    },
    "typescript": {
      "version": "4.9.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-4.9.5.tgz",
      "integrity": "sha512-1FXk9E2Hm+QzZQ7z+McJiHL4NW1F2EzMu9Nq9i3zAaGqibafqYwCVU6WyWAuyQRRzOlxou8xZSyXLEN8oKj24g==",
      "dev": true
    },
    "undici": {
      "version": "5.20.0",
      "resolved": "https://registry.npmjs.org/undici/-/undici-5.20.0.tgz",
      "integrity": "sha512-J3j60dYzuo6Eevbawwp1sdg16k5Tf768bxYK4TUJRH7cBM4kFCbf3mOnM/0E3vQYXvpxITbbWmBafaDbxLDz3g==",
      "dev": true,
      "requires": {
        "busboy": "^1.6.0"
      }
    },
    "unherit": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/unherit/-/unherit-3.0.1.tgz",
      "integrity": "sha512-akOOQ/Yln8a2sgcLj4U0Jmx0R5jpIg2IUyRrWOzmEbjBtGzBdHtSeFKgoEcoH4KYIG/Pb8GQ/BwtYm0GCq1Sqg==",
      "dev": true
    },
    "unified": {
      "version": "10.1.2",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "bail": "^2.0.0",
        "extend": "^3.0.0",
        "is-buffer": "^2.0.0",
        "is-plain-obj": "^4.0.0",
        "trough": "^2.0.0",
        "vfile": "^5.0.0"
      }
    },
    "unist-util-generated": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unist-util-generated/-/unist-util-generated-2.0.1.tgz",
      "integrity": "sha512-qF72kLmPxAw0oN2fwpWIqbXAVyEqUzDHMsbtPvOudIlUzXYFIeQIuxXQCRCFh22B7cixvU0MG7m3MW8FTq/S+A==",
      "dev": true
    },
    "unist-util-is": {
      "version": "5.1.1",
      "dev": true
    },
    "unist-util-modify-children": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/unist-util-modify-children/-/unist-util-modify-children-3.1.1.tgz",
      "integrity": "sha512-yXi4Lm+TG5VG+qvokP6tpnk+r1EPwyYL04JWDxLvgvPV40jANh7nm3udk65OOWquvbMDe+PL9+LmkxDpTv/7BA==",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "array-iterate": "^2.0.0"
      }
    },
    "unist-util-position": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/unist-util-position/-/unist-util-position-4.0.4.tgz",
      "integrity": "sha512-kUBE91efOWfIVBo8xzh/uZQ7p9ffYRtUbMRZBNFYwf0RK8koUMx6dGUfwylLOKmaT2cs4wSW96QoYUSXAyEtpg==",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0"
      }
    },
    "unist-util-stringify-position": {
      "version": "3.0.2",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0"
      }
    },
    "unist-util-visit": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/unist-util-visit/-/unist-util-visit-4.1.2.tgz",
      "integrity": "sha512-MSd8OUGISqHdVvfY9TPhyK2VdUrPgxkUtWSuMHF6XAAFuL4LokseigBnZtPnJMu+FbynTkFNnFlyjxpVKujMRg==",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "unist-util-is": "^5.0.0",
        "unist-util-visit-parents": "^5.1.1"
      }
    },
    "unist-util-visit-children": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/unist-util-visit-children/-/unist-util-visit-children-2.0.2.tgz",
      "integrity": "sha512-+LWpMFqyUwLGpsQxpumsQ9o9DG2VGLFrpz+rpVXYIEdPy57GSy5HioC0g3bg/8WP9oCLlapQtklOzQ8uLS496Q==",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0"
      }
    },
    "unist-util-visit-parents": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/unist-util-visit-parents/-/unist-util-visit-parents-5.1.3.tgz",
      "integrity": "sha512-x6+y8g7wWMyQhL1iZfhIPhDAs7Xwbn9nRosDXl7qoPTSCy0yNxnKc+hWokFifWQIDGi154rdUqKvbCa4+1kLhg==",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "unist-util-is": "^5.0.0"
      }
    },
    "universalify": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-2.0.0.tgz",
      "integrity": "sha512-hAZsKq7Yy11Zu1DE0OzWjw7nnLZmJZYTDZZyEFHZdUhV8FkH5MCfoU1XMaxXovpyW5nq5scPqq0ZDP9Zyl04oQ==",
      "dev": true
    },
    "update-browserslist-db": {
      "version": "1.0.5",
      "dev": true,
      "requires": {
        "escalade": "^3.1.1",
        "picocolors": "^1.0.0"
      }
    },
    "upper-case": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/upper-case/-/upper-case-2.0.2.tgz",
      "integrity": "sha512-KgdgDGJt2TpuwBUIjgG6lzw2GWFRCW9Qkfkiv0DxqHHLYJHmtmdUIKcZd8rHgFSjopVTlw6ggzCm1b8MFQwikg==",
      "dev": true,
      "requires": {
        "tslib": "^2.0.3"
      }
    },
    "upper-case-first": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/upper-case-first/-/upper-case-first-2.0.2.tgz",
      "integrity": "sha512-514ppYHBaKwfJRK/pNC6c/OxfGa0obSnAl106u97Ed0I625Nin96KAjttZF6ZL3e1XLtphxnqrOi9iWgm+u+bg==",
      "dev": true,
      "requires": {
        "tslib": "^2.0.3"
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "dev": true
    },
    "uvu": {
      "version": "0.5.6",
      "resolved": "https://registry.npmjs.org/uvu/-/uvu-0.5.6.tgz",
      "integrity": "sha512-+g8ENReyr8YsOc6fv/NVJs2vFdHBnBNdfE49rshrTzDWOlUx4Gq7KOS2GD8eqhy2j+Ejq29+SbKH8yjkAqXqoA==",
      "dev": true,
      "requires": {
        "dequal": "^2.0.0",
        "diff": "^5.0.0",
        "kleur": "^4.0.3",
        "sade": "^1.7.3"
      }
    },
    "vfile": {
      "version": "5.3.4",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "is-buffer": "^2.0.0",
        "unist-util-stringify-position": "^3.0.0",
        "vfile-message": "^3.0.0"
      }
    },
    "vfile-location": {
      "version": "4.0.1",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "vfile": "^5.0.0"
      }
    },
    "vfile-message": {
      "version": "3.1.2",
      "dev": true,
      "requires": {
        "@types/unist": "^2.0.0",
        "unist-util-stringify-position": "^3.0.0"
      }
    },
    "vite": {
      "version": "4.1.4",
      "resolved": "https://registry.npmjs.org/vite/-/vite-4.1.4.tgz",
      "integrity": "sha512-3knk/HsbSTKEin43zHu7jTwYWv81f8kgAL99G5NWBcA1LKvtvcVAC4JjBH1arBunO9kQka+1oGbrMKOjk4ZrBg==",
      "dev": true,
      "requires": {
        "esbuild": "^0.16.14",
        "fsevents": "~2.3.2",
        "postcss": "^8.4.21",
        "resolve": "^1.22.1",
        "rollup": "^3.10.0"
      }
    },
    "vitefu": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/vitefu/-/vitefu-0.2.4.tgz",
      "integrity": "sha512-fanAXjSaf9xXtOOeno8wZXIhgia+CZury481LsDaV++lSvcU2R9Ch2bPh3PYFyoHW+w9LqAeYRISVQjUIew14g==",
      "dev": true,
      "requires": {}
    },
    "vscode-css-languageservice": {
      "version": "6.2.4",
      "resolved": "https://registry.npmjs.org/vscode-css-languageservice/-/vscode-css-languageservice-6.2.4.tgz",
      "integrity": "sha512-9UG0s3Ss8rbaaPZL1AkGzdjrGY8F+P+Ne9snsrvD9gxltDGhsn8C2dQpqQewHrMW37OvlqJoI8sUU2AWDb+qNw==",
      "dev": true,
      "requires": {
        "@vscode/l10n": "^0.0.11",
        "vscode-languageserver-textdocument": "^1.0.8",
        "vscode-languageserver-types": "^3.17.3",
        "vscode-uri": "^3.0.7"
      }
    },
    "vscode-html-languageservice": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/vscode-html-languageservice/-/vscode-html-languageservice-5.0.4.tgz",
      "integrity": "sha512-tvrySfpglu4B2rQgWGVO/IL+skvU7kBkQotRlxA7ocSyRXOZUd6GA13XHkxo8LPe07KWjeoBlN1aVGqdfTK4xA==",
      "dev": true,
      "requires": {
        "@vscode/l10n": "^0.0.11",
        "vscode-languageserver-textdocument": "^1.0.8",
        "vscode-languageserver-types": "^3.17.2",
        "vscode-uri": "^3.0.7"
      }
    },
    "vscode-jsonrpc": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/vscode-jsonrpc/-/vscode-jsonrpc-8.1.0.tgz",
      "integrity": "sha512-6TDy/abTQk+zDGYazgbIPc+4JoXdwC8NHU9Pbn4UJP1fehUyZmM4RHp5IthX7A6L5KS30PRui+j+tbbMMMafdw==",
      "dev": true
    },
    "vscode-languageserver": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/vscode-languageserver/-/vscode-languageserver-8.1.0.tgz",
      "integrity": "sha512-eUt8f1z2N2IEUDBsKaNapkz7jl5QpskN2Y0G01T/ItMxBxw1fJwvtySGB9QMecatne8jFIWJGWI61dWjyTLQsw==",
      "dev": true,
      "requires": {
        "vscode-languageserver-protocol": "3.17.3"
      }
    },
    "vscode-languageserver-protocol": {
      "version": "3.17.3",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-protocol/-/vscode-languageserver-protocol-3.17.3.tgz",
      "integrity": "sha512-924/h0AqsMtA5yK22GgMtCYiMdCOtWTSGgUOkgEDX+wk2b0x4sAfLiO4NxBxqbiVtz7K7/1/RgVrVI0NClZwqA==",
      "dev": true,
      "requires": {
        "vscode-jsonrpc": "8.1.0",
        "vscode-languageserver-types": "3.17.3"
      }
    },
    "vscode-languageserver-textdocument": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-textdocument/-/vscode-languageserver-textdocument-1.0.8.tgz",
      "integrity": "sha512-1bonkGqQs5/fxGT5UchTgjGVnfysL0O8v1AYMBjqTbWQTFn721zaPGDYFkOKtfDgFiSgXM3KwaG3FMGfW4Ed9Q==",
      "dev": true
    },
    "vscode-languageserver-types": {
      "version": "3.17.3",
      "resolved": "https://registry.npmjs.org/vscode-languageserver-types/-/vscode-languageserver-types-3.17.3.tgz",
      "integrity": "sha512-SYU4z1dL0PyIMd4Vj8YOqFvHu7Hz/enbWtpfnVbJHU4Nd1YNYx8u0ennumc6h48GQNeOLxmwySmnADouT/AuZA==",
      "dev": true
    },
    "vscode-oniguruma": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/vscode-oniguruma/-/vscode-oniguruma-1.7.0.tgz",
      "integrity": "sha512-L9WMGRfrjOhgHSdOYgCt/yRMsXzLDJSL7BPrOZt73gU0iWO4mpqzqQzOz5srxqTvMBaR0XZTSrVWo4j55Rc6cA==",
      "dev": true
    },
    "vscode-textmate": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/vscode-textmate/-/vscode-textmate-6.0.0.tgz",
      "integrity": "sha512-gu73tuZfJgu+mvCSy4UZwd2JXykjK9zAZsfmDeut5dx/1a7FeTk0XwJsSuqQn+cuMCGVbIBfl+s53X4T19DnzQ==",
      "dev": true
    },
    "vscode-uri": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/vscode-uri/-/vscode-uri-3.0.7.tgz",
      "integrity": "sha512-eOpPHogvorZRobNqJGhapa0JdwaxpjVvyBp0QIUMRMSf8ZAlqOdEquKuRmw9Qwu0qXtJIWqFtMkmvJjUZmMjVA==",
      "dev": true
    },
    "wcwidth": {
      "version": "1.0.1",
      "dev": true,
      "requires": {
        "defaults": "^1.0.3"
      }
    },
    "web-namespaces": {
      "version": "2.0.1",
      "dev": true
    },
    "which": {
      "version": "2.0.2",
      "dev": true,
      "requires": {
        "isexe": "^2.0.0"
      }
    },
    "which-pm": {
      "version": "2.0.0",
      "dev": true,
      "requires": {
        "load-yaml-file": "^0.2.0",
        "path-exists": "^4.0.0"
      }
    },
    "which-pm-runs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/which-pm-runs/-/which-pm-runs-1.1.0.tgz",
      "integrity": "sha512-n1brCuqClxfFfq/Rb0ICg9giSZqCS+pLtccdag6C2HyufBrh3fBOiy9nb6ggRMvWOVH5GrdJskj5iGTZNxd7SA==",
      "dev": true
    },
    "widest-line": {
      "version": "4.0.1",
      "dev": true,
      "requires": {
        "string-width": "^5.0.1"
      }
    },
    "wrap-ansi": {
      "version": "8.0.1",
      "dev": true,
      "requires": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "6.1.0",
          "dev": true
        }
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "dev": true
    },
    "y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true
    },
    "yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true
    },
    "yargs": {
      "version": "17.7.1",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.1.tgz",
      "integrity": "sha512-cwiTb08Xuv5fqF4AovYacTFNxk62th7LKJ6BL9IGUpTJrWoU7/7WdQGTP2SjKf1dUNBGzDd28p/Yfs/GI6JrLw==",
      "dev": true,
      "requires": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
          "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
          "dev": true
        },
        "emoji-regex": {
          "version": "8.0.0",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
          "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
          "dev": true
        },
        "string-width": {
          "version": "4.2.3",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
          "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
          "dev": true,
          "requires": {
            "emoji-regex": "^8.0.0",
            "is-fullwidth-code-point": "^3.0.0",
            "strip-ansi": "^6.0.1"
          }
        },
        "strip-ansi": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
          "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
          "dev": true,
          "requires": {
            "ansi-regex": "^5.0.1"
          }
        }
      }
    },
    "yargs-parser": {
      "version": "21.1.1",
      "dev": true
    },
    "yocto-queue": {
      "version": "0.1.0",
      "dev": true
    },
    "zod": {
      "version": "3.18.0",
      "dev": true
    },
    "zwitch": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/zwitch/-/zwitch-2.0.4.tgz",
      "integrity": "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==",
      "dev": true
    }
  }
}
