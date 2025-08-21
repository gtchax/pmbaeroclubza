import { Hero2 } from "@/components/sections/hero2";
import { FlightTraining } from "@/components/sections/flight-training";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero2 />
      <FlightTraining />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
