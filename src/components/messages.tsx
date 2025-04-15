"use client";
import type { MessagesType } from "@/types";
import { Card, CardContent, CardHeader } from "@mui/material";
import { use } from "react";
import { ulid } from "ulid";

export default function Messages({
  messages: messagesPromise,
}: {
  messages: Promise<MessagesType[]>;
}) {
  const allMessages = use(messagesPromise);

  return (
    <>
      {allMessages.map((message) => (
        <Card variant="outlined" key={ulid()}>
          <CardHeader
            title={message.username}
            subheader={`Experience ID: ${message.experience_id || "N/A"}`}
          />
          <CardContent>{message.content}</CardContent>
        </Card>
      ))}
    </>
  );
}
