# Migration `20200727210830-init`

This migration has been generated at 7/27/2020, 9:08:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Template" (
"id" text  NOT NULL ,
"name" text  NOT NULL ,
"columns" jsonb  NOT NULL ,
PRIMARY KEY ("id"))
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200727210830-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,14 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Template {
+  id      String @default(uuid()) @id
+  name    String
+  columns Json
+}
```


