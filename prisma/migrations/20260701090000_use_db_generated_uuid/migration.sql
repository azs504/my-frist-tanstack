-- Drop all FK constraints first (before altering PK columns they reference)
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postId_fkey";
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- Convert UserProfile.id from TEXT to UUID with DB-level default
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey";
ALTER TABLE "UserProfile" ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
ALTER TABLE "UserProfile" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id");

-- Convert Post.userId (FK ref column) from TEXT to UUID
ALTER TABLE "Post" ALTER COLUMN "userId" TYPE UUID USING "userId"::uuid;

-- Convert Post.id from TEXT to UUID with DB-level default
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey";
ALTER TABLE "Post" ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
ALTER TABLE "Post" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- Convert Tag.id from TEXT to UUID with DB-level default
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey";
ALTER TABLE "Tag" ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- Convert PostTag FK ref columns from TEXT to UUID
ALTER TABLE "PostTag" ALTER COLUMN "postId" TYPE UUID USING "postId"::uuid;
ALTER TABLE "PostTag" ALTER COLUMN "tagId" TYPE UUID USING "tagId"::uuid;

-- Convert PostTag.id from TEXT to UUID with DB-level default
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_pkey";
ALTER TABLE "PostTag" ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
ALTER TABLE "PostTag" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_pkey" PRIMARY KEY ("id");

-- Convert Comment FK ref columns from TEXT to UUID
ALTER TABLE "Comment" ALTER COLUMN "userId" TYPE UUID USING "userId"::uuid;
ALTER TABLE "Comment" ALTER COLUMN "postId" TYPE UUID USING "postId"::uuid;

-- Convert Comment.id from TEXT to UUID with DB-level default
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey";
ALTER TABLE "Comment" ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- Re-add all FK constraints
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
