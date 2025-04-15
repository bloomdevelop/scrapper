import { supabase } from "@/lib/supabase";
import { MessagesSchema } from "@/schema";
import type { MessagesCacheType } from "@/types";
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

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return new Response("Failed to fetch messages", { status: 500 });
  }

  messageCache.data = messages;
  messageCache.lastFetched = now;

  return new Response(JSON.stringify(messages), { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = req.json();
  const { username, content, experience_id } = parse(MessagesSchema, body);

  const { error } = await supabase.from("messages").insert({
    username,
    content,
    experience_id,
  });

  if (error) {
    console.error(error);
    return new Response("Failed to create message", { status: 500 });
  }

  return new Response("Message created successfully", { status: 201 });
}
