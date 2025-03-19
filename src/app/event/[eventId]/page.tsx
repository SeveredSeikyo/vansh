// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import eventsData from "@/data/vansh.events.json"; // Move file to /data/
// import EventDetails from "@/components/EventDetails";
// import { useParams } from "next/navigation";

// // Generate static paths for pre-rendering
// export async function generateStaticParams() {
//   return eventsData.map((event) => ({
//     eventId: event.eventId.toString(),
//   }));
// }

// export default function EventDetail() {
//   const { eventId } = useParams();

//   // Type assertion to guarantee eventId is a string
//   if (!eventId) return <div>Loading...</div>;

//   return (
//     <div>
//       <Header />
//       <main className="flex-1 pt-16 pb-16">
//         <EventDetails eventId={eventId as string} /> {/* ✅ Type cast here */}
//       </main>
//       <Footer />
//     </div>
//   );
// }

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import eventsData from "@/data/vansh.events.json";
import EventDetailClient from "./EventDetailClient";
import StickyComponent from "@/components/StickyComponent";
//import type { PageProps } from "next";

// ✅ Define type for params
// type PageProps = {
//   params: {
//     eventId: string;
//   };
// };

export function generateStaticParams() {
  return eventsData.map((event) => ({
    eventId: event.eventId.toString(),
  }));
}

export default async function EventDetail({ params }: { params: Promise<{ eventId: string }>}) {
  const { eventId } = await params;

  return (
    <div>
      <Header />
      <main className="flex-1 pt-16 pb-16">
        <EventDetailClient eventId={eventId} />
      </main>
      <StickyComponent/>
      <Footer />
    </div>
  );
}

