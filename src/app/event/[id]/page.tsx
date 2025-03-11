//import Event360View from "@/components/Event360View";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Event = {
  id: string;
  title: string;
  time: string;
  day:string,
  location: string;
  category: string;
  image: string;
};

const events: Event[] = [
  { id: "1", title: "Tech Innovation Summit 2025", time: "09:00 - 11:30",day:"day1", location: "Anderson Hall", category: "Tech", image: "/tech-innovation.jpg" },
  { id: "2", title: "Cultural Dance Performance", time: "13:00 - 15:00",day:"day2", location: "Main Auditorium", category: "Concerts", image: "/tech-innovation.jpg" },
  { id: "3", title: "Startup Pitch Competition", time: "15:30 - 17:30",day:"day1", location: "Business Center", category: "Tech", image: "/tech-innovation.jpg" },
  { id: "4", title: "AI & Machine Learning Workshop", time: "10:00 - 12:30",day:"day2", location: "Tech Lab 2", category: "Tech", image: "/tech-innovation.jpg" },
  { id: "5", title: "Music Fest: Indie Night", time: "19:00 - 22:00",day:"day1", location: "Open Air Theater", category: "Concerts", image: "/tech-innovation.jpg" },
  { id: "6", title: "Cybersecurity Awareness Panel", time: "14:00 - 16:00",day:"day2", location: "Room B102", category: "Tech", image: "/cultural-event.jpg" },
  { id: "7", title: "Hackathon: Build the Future", time: "08:00 - 20:00",day:"day1", location: "Innovation Hub", category: "Tech", image: "/cultural-event.jpg" },
  { id: "8", title: "Film Screening: Sci-Fi Classics", time: "18:00 - 21:00",day:"day2", location: "Cinema Hall", category: "Arts", image: "/cultural-event.jpg" },
  { id: "9", title: "Yoga & Meditation Session", time: "07:00 - 08:30",day:"day1", location: "Wellness Center", category: "Arts", image: "/cultural-event.jpg" },
  { id: "10", title: "E-Sports Tournament: Valorant", time: "16:00 - 22:00",day:"day2", location: "Gaming Arena", category: "Esports", image: "/cultural-event.jpg" },
];

export function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }));
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = events.find((item) => item.id === id);

  if (!event) {
    return <h1>Event not found</h1>;
  }

//   const basePath = "/";
//   const fileName =
//     "images.pexels.com/photos/29562858/pexels-photo-29562858/free-photo-of-scenic-view-of-vung-tau-city-from-above.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-16">
        <div className="p-2 flex flex-col">
          <h1>{event.title}</h1>
          <p>{event.time}</p>
          <p>{event.day}</p>
          <p>{event.location}</p>
          <p>{event.category}</p>
          <img src={event.image} alt={event.title} />
          {/* <h3>Directions</h3>
          <div>
            <Event360View basePath={basePath} fileName={fileName} />
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
