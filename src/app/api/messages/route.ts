import { fetchMessagesFromDb } from "@/lib/messages"; // Import the new function
import { supabase } from "@/lib/supabase";
import { MessagesSchema } from "@/schema";
import type { MessagesCacheType, MessagesType } from "@/types"; // Added MessagesType
import { validateExperienceId } from "@/utils/validate";
import type { NextRequest } from "next/server";
import { parse } from "valibot";

const CACHE_DURATION = 60 * 1000;
const messageCache: MessagesCacheType = {
  data: null,
  lastFetched: 0,
};

export async function GET() {
  const now = Date.now();

  if (messageCache.data && now - messageCache.lastFetched < CACHE_DURATION) {
    return new Response(JSON.stringify(messageCache.data, null, 4), {
      status: 200,
    });
  }

  try {
    const messages = await fetchMessagesFromDb(); // Use the refactored function
    messageCache.data = messages;
    messageCache.lastFetched = now;
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    // Avoid leaking internal error details
    return new Response("Failed to fetch messages", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let parsedBody: MessagesType;
  try {
    // Await the json parsing
    const body = await req.json();
    parsedBody = parse(MessagesSchema, body);
  } catch (e) {
    console.error("Failed to parse request body:", e);
    return new Response("Invalid request body", { status: 400 });
  }

  const { username, content, experience_id } = parsedBody;

  // Consider validating before inserting
  validateExperienceId(experience_id);

  const { error } = await supabase.from("messages").insert({
    username,
    content,
    experience_id,
  });

  if (error) {
    console.error(error);
    return new Response("Failed to create message", { status: 500 });
  }

  // Invalidate cache on successful post
  messageCache.data = null;
  messageCache.lastFetched = 0;

  return new Response("Message created successfully", { status: 201 });
}
