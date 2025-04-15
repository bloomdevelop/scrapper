import { supabase } from "./supabase";
import type { MessagesType } from "@/types";

export async function fetchMessagesFromDb(): Promise<MessagesType[]> {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages from DB:", error);
    // In a real app, you might want more robust error handling
    throw new Error("Failed to fetch messages from database");
  }

  // Ensure you return an array, even if messages is null/undefined
  return messages || [];
}
