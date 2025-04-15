import type { InferInput } from "valibot";
import type {
  MessagesCacheSchema,
  MessagesSchema,
  ExperienceDetailsSchema,
} from "./schema";

export type MessagesType = InferInput<typeof MessagesSchema>;
export type MessagesCacheType = InferInput<typeof MessagesCacheSchema>;
export type ExperienceDetailsType = InferInput<typeof ExperienceDetailsSchema>;
