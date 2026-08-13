import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Leadership } from "@/components/leadership";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Leadership />
        <SectionDivider />
        <Education />
      </main>
      <SectionDivider />
      <Contact />
    </>
  );
}
