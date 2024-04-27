import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["lib/graphql/*.graphql"],
  generates: {
    "__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  // ignoreNoDocuments: true,
}

export default config
