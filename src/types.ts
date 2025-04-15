import type { InferInput } from "valibot";
import type { MessagesCacheSchema, MessagesSchema } from "./schema";

export type MessagesType = InferInput<typeof MessagesSchema>;
export type MessagesCacheType = InferInput<typeof MessagesCacheSchema>;
