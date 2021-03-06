import fs from 'fs'
import path from 'path'

import { CustomNodeJsGlobal } from '../types/Global'
declare const global: CustomNodeJsGlobal

const writeSchema = () => `
/// NOTE: This file is automatically generated by qiMS and Prisma.
/// Any revisions you make to this file are likely to be
/// automatically overwritten. Make changes within the admin UI
/// instead.

/// Connect to the Postgres database
datasource db {
  provider = "postgresql"
  url      = "${global.env.DATABASE_URL}"
}

/// Generate the schema.prisma from the introspected database;
/// generate the PrismaClient
generator client {
  provider = "prisma-client-js"
  output   = "../../dist/generated/client"
}

/// Generate the GraphQL API
generator typegraphql {
  provider = "typegraphql-prisma"
  output   = "../../dist/generated/type-graphql"

  /// Because we're writing directly to the dist folder,
  /// the generated code needs to be transpiled to .js
  emitTranspiledCode = true
}
`

export const writeDefaultPrismaSchema = () => {
  if (!fs.existsSync(path.join(__dirname, '../../src/prisma')))
    fs.mkdirSync(path.join(__dirname, '../../src/prisma'))

  fs.writeFileSync(path.join(__dirname, '../../src/prisma/schema.prisma'), writeSchema())
}
