import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { FaCar, FaClock, FaWhatsapp, FaLocationArrow, FaPlaneArrival  } from "react-icons/fa";


const VENDOR_NUMBER = "2349039759971";

const CARS = [
  { 
    id: 1, 
    name: "Toyota Corolla 2020", 
    type: "Sedan", 
    seats: 5, 
    gearbox: "Automatic", 
    price: 35000, 
    img: "https://images.pexels.com/photos/37140081/pexels-photo-37140081.jpeg" 
},

  { 
    id: 2, 
    name: "Toyota Camry 2021", 
    type: "Sedan", 
    seats: 5, 
    gearbox: "Automatic", 
    price: 45000, 
    img: "https://images.pexels.com/photos/13936547/pexels-photo-13936547.jpeg" 
},

  { id: 3, 
    name: "Honda CR-V 2019", 
    type: "SUV", 
    seats: 5, 
    gearbox: "Automatic", 
    price: 65000, 
    img: "https://images.pexels.com/photos/18961838/pexels-photo-18961838.jpeg" 
},
  {
     id: 4, 
     name: "Toyota Land Cruiser Prado", 
     type: "SUV", 
     seats: 7, 
     gearbox: "Automatic", 
     price: 120000, 
     img: "https://images.pexels.com/photos/18029630/pexels-photo-18029630.jpeg" 
    },

  { 
    id: 5, 
    name: "Toyota Hiace Bus", 
    type: "Bus", 
    seats: 14, 
    gearbox: "Manual", 
    price: 90000, 
    img: "https://images.pexels.com/photos/20940679/pexels-photo-20940679.jpeg" 
},

  { 
    id: 6, 
    name: "Mercedes E-Class 2018", 
    type: "Luxury", 
    seats: 5, 
    gearbox: "Automatic", 
    price: 150000, 
    img: "https://images.pexels.com/photos/17233279/pexels-photo-17233279.jpeg" },
];

const FILTERS = ["All", "Sedan", "SUV", "Bus", "Luxury"];
const naira = (n) => "₦" + n.toLocaleString("en-NG");


const waLink = (message) =>
  `https://wa.me/${VENDOR_NUMBER}?text=${encodeURIComponent(message)}`;

function CarCard({ car }) {

  const [days, setDays] = useState(1);
  const total = car.price * days;

  const message =
    `Hello, I'd like to rent the ${car.name} for ${days} day${days > 1 ? "s" : ""} ` +
    `(${naira(total)}). Is it available?`;

  return (

    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-900/10 bg-white">
      <div className="relative aspect-16/10 bg-stone-200">
        <img src={car.img} alt={car.name} loading="lazy" className="absolute inset-0 h-full w-full object-fill hover:scale-105 transition duration-300 ease-in-out" />
        <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-medium text-stone-100">
          {car.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl leading-snug">{car.name}</h3>
        <p className="mt-1 text-sm text-stone-500">
          {car.seats} seats · {car.gearbox}
        </p>

        <p className="mt-4 text-sm text-stone-500">
          <span className="text-2xl font-semibold text-stone-900">{naira(car.price)}</span> / day
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-900/10 pt-4 text-sm">
          <span className="text-stone-600">Days</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDays((d) => Math.max(1, d - 1))}
              className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
              aria-label="Fewer days"
            >
              −
            </button>
            <span className="w-6 text-center font-medium">{days}</span>
            <button
              onClick={() => setDays((d) => Math.min(30, d + 1))}
              className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
              aria-label="More days"
            >
              +
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm text-stone-600">
          Estimated total: <strong className="text-stone-900">{naira(total)}</strong>
        </p>

        <a
          href={waLink(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 rounded-lg bg-orange-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-800"
        >
          Rent now
        </a>
      </div>
    </article>
  );
}


export default function HomePages() {
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ 

    name: "", 
    phone: "", 
    note: "" 
});
const [scrolled, setScrolled] = useState(false);

  const shown = filter === "All" ? CARS : CARS.filter((c) => c.type === filter);

  const sendContact = (e) => {
    e.preventDefault();
    const msg =
      `Hello, my name is ${form.name} (${form.phone}). ` +
      (form.note || "I'd like to ask about renting a car.");
    window.open(waLink(msg), "_blank");
  };

  const field =
    "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-700";

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

}, []);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
    
     <header
  className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
    scrolled
      ? "border-b border-stone-900/10 bg-stone-100/95 text-stone-900 shadow-sm backdrop-blur"
      : "border-b border-transparent bg-transparent text-white"
  }`}
>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

        <div className="flex items-center gap-2">

          <a href="#top" className="font-serif md:text-2xl text-xl font-semibold"><span className="text-orange-700">DV</span> Drive</a>
          <FaCar className="text-orange-700" size={26}/>
        </div>
          
          <nav className="hidden gap-8 text-md md:flex">
            <a href="#fleet" className="hover:text-orange-700">Fleet</a>
            <a href="#services" className="hover:text-orange-700">Services</a>
            <a href="#about" className="hover:text-orange-700">About</a>
            <a href="#contact" className="hover:text-orange-700">Contact</a>
          </nav>
          <a
            href={waLink("Hello, I'd like to rent a car.")}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-stone-100 hover:bg-stone-700"
          >
            Chat with us
          </a>
        </div>
      </header>


      

<section
  id="top"
  className="relative isolate min-h-[720px] overflow-hidden bg-stone-950 text-white"
>

  <div
    className="absolute inset-0 -z-20 bg-cover bg-center"
    style={{ backgroundImage: "url('Sunset Drive Beside the City Skyline.png')" }}
  />

  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />

  <div className="mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
    <div className="max-w-2xl">

      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
        Car hire in Abuja
      </p>

      <h1 className="font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
        Pick a car.
        <br />
        Message us.
        <br />
        <span className="text-orange-600">Drive today.</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
        No long forms, no waiting on email. Choose your car,
        tap the button, and your request lands straight on our WhatsApp.
      </p>

  
      <div className="mt-7 flex flex-wrap gap-4">
        <a
          href="#fleet"
          className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-8 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          See the cars <span className="text-xl">→</span>
        </a>

        <a
          href="#contact"
          className="rounded-full border border-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
        >
          Contact us
        </a>
      </div>

  
     
<div className="mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
  {[
    {
      icon: FaCar,
      number: "6+",
      label: "cars ready",
    },
    {
      icon: FaWhatsapp,
      number: "24/7",
      label: "WhatsApp replies",
    },
    {
      icon: FaPlaneArrival,
      number: "Free",
      label: "airport pickup",
    },
  ].map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.label}
        className="flex items-center gap-2 rounded-xl border border-white/50 bg-black/20 px-3 py-4 backdrop-blur-sm sm:gap-4 sm:px-5"
      >
        <Icon className="shrink-0 text-2xl text-orange-500 sm:text-3xl" />

        <div>
          <p className="text-lg font-bold sm:text-2xl">
            {item.number}
          </p>

          <p className="mt-1 text-[10px] text-white/90 sm:text-sm">
            {item.label}
          </p>
        </div>
      </div>
    );
  })}
</div>


    </div>
  </div>
</section>




      <section id="fleet" className="scroll-mt-20 border-t border-stone-900/10 bg-stone-200/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-4xl">Our fleet</h2>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    filter === f ? "bg-stone-900 text-stone-100" : "border border-orange-700 hover:bg-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="font-serif text-4xl">Services</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {[
            ["Self-drive rental", "Daily, weekly or monthly. Fuel, ID and a refundable deposit, that's it."],
            ["Chauffeur-driven", "Vetted drivers who know Abuja's roads, for meetings, events and long days."],
            ["Airport transfers", "We track your flight and meet you at Nnamdi Azikiwe arrivals."],
            ["Weddings & events", "Clean, decorated cars for convoys. Tell us the date and we'll plan it."],
          ].map(([title, text], i) => (
            <div key={title} className="flex gap-5 border-t border-stone-300 pt-5">
              <span className="font-serif text-2xl text-orange-700">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-stone-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-stone-900 py-16 text-stone-100">

        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-1 md:grid-cols-2">

          <div className="flex flex-col gap-6 lg:gap-12">

            <h1 className="font-serif lg:text-4xl text-3xl leading-tight">A small special team that actually picks up the phone.
            </h1>

            <div className="text-stone-300 space-y-4">
            <p>
              <span className="text-orange-500 font-bold">DV</span> Drive started with three cars and one rule: if a customer messages,
              someone answers. The fleet is bigger now, but that rule hasn't changed.
            </p>
            <p>
              Every car is serviced on schedule and cleaned before each trip.
              The price you see is the price you pay, with no surprise charges at handover.
            </p>
          </div>
          </div>
          
            
          <div className="rounded-sm shadow-stone-800 shadow hover:scale-105 transition duration-300 ease-in-out" >
          
            <img src="Sunset Drive Beside the City Skyline.png" className="h-full object-fill "/>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl">Get in touch</h2>
          <p className="mt-4 max-w-sm text-stone-600">
            Questions about a car, a long-term deal, or an event? Send us a note or give us a call and
            we'll attend to you.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-stone-700">

            <div className="flex items-center gap-2">
            <FaPhone className="text-orange-700" size={16} />
            <li>Phone: +2349039759971</li>
            </div>

            <div className="flex items-center gap-2">
            <FaWhatsapp className="text-orange-700" size={16}/>
            <li>WhatsApp: +2349039759971</li>
            </div>

            <div className="flex items-center gap-2">
            <FaLocationArrow className="text-orange-700" size={16}/>
            <li>Address: Wuse 2, Abuja, FCT</li>
            </div>

            <div className="flex items-center gap-2">
            <FaClock className="text-orange-700" size={16}/>
            <li>Hours: Mon–Sat 8am – 8pm</li>
            </div>
          </ul>
        </div>

        <form onSubmit={sendContact} className="space-y-4">
          <input required className={field} placeholder="Your name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required className={field} placeholder="Phone number"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea rows={4} className={field} placeholder="What do you need?"
            value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <button className="w-full rounded-lg bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800">
            Send via WhatsApp
          </button>
        </form>
      </section>

      <footer className="border-t border-stone-900/10 py-6 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} DV Drive. All rights reserved.
      </footer>
    </div>
  );
}