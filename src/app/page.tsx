import Messages from "@/components/messages";
import { fetchMessagesFromDb } from "@/lib/messages";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Suspense } from "react";

export default function Home() {
  // Call the database function directly and await the result
  const messages = fetchMessagesFromDb();

  return (
    <Suspense
      fallback={
        <Box
          width={"100%"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          minHeight="50vh"
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
