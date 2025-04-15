import * as v from "valibot";

export const MessagesSchema = v.object({
  username: v.string(),
  content: v.string(),
  experience_id: v.number(),
});

export const MessagesCacheSchema = v.object({
  data: v.union([v.array(MessagesSchema), v.null(), v.undefined()]),
  lastFetched: v.number(),
});
