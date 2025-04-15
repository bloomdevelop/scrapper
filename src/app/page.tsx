import Messages from "@/components/messages";
import type { MessagesType } from "@/types";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Suspense } from "react";

async function getMessages(): Promise<MessagesType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000";
  const res = await fetch(`https://${baseUrl}/api/messages`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
    const errorBody = await res.text();
    console.error(`Error body: ${errorBody}`);
    throw new Error("Failed to fetch messages");
  }

  try {
    return await res.json();
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error("Failed to parse message data");
  }
}

export default function Home() {
  const messages = getMessages();

  return (
    <Suspense
      fallback={
        <Box
          width={"100%"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress variant="indeterminate" />
        </Box>
      }
    >
      <Stack gap={4}>
        <Messages messages={messages} />
      </Stack>
    </Suspense>
  );
}
