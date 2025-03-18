// app/event/[eventId]/EventDetailClient.tsx
"use client";

import EventDetails from "@/components/EventDetails";

export default function EventDetailClient({ eventId }: { eventId: string }) {
  return <EventDetails eventId={eventId} />;
}
