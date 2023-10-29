import Container from "./Container";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function EventSection() {
  return (
    <section
      id="events"
      className="flex min-h-[80vh] bg-gradient-to-b from-white via-slate-400/70 to-slate-300 pb-10 pt-20 md:pt-32"
    >
      <Container>
        <div className="grid w-full grid-rows-[8] lg:grid-rows-6">
          <h1 className="title my-7 flex items-center justify-center text-3xl font-bold text-slate-700 lg:row-span-1 lg:m-0">
            Events
          </h1>
          <div className="days flex flex-col px-5 pb-5 lg:row-span-5 lg:grid lg:grid-cols-3 lg:grid-rows-3">
            <DayTile day="Day 1" title="TECHWAR" />
            <DayTile day="Day 2" title="TECHATHON" />
            <DayTile day="Day 3" title="TECHNOKRATZ" />
          </div>
          <div className="row-span-1 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 px-5 py-5 text-center text-base font-medium text-slate-700 lg:py-16">
            <p className="ml-0 mr-auto max-w-2xl rounded-lg border bg-gradient-to-br from-white/30 to-white/20 p-5 shadow-sm backdrop-blur-lg lg:text-left">
              NIRAL THIRAL is an exciting three-day tech carnival designed to
              foster a spirit of innovation, creativity, and technological
              advancement. This carnival will be a melting pot of ideas, where
              students can participate, compete, and explore various fields in
              the realm of technology.
            </p>
            <p className="ml-auto mr-0 max-w-2xl rounded-lg  border bg-gradient-to-br from-white/20 to-white/30 p-5 shadow-sm backdrop-blur-lg lg:text-right">
              Apart from the thrill of competition, participants stand a chance
              to win exciting prizes, gain recognition, and network with
              like-minded individuals. The event will also provide a valuable
              learning experience, offering insights into technologies in the
              ever-evolving world of tech.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DayTile({
  day,
  title,
  image,
  className,
}: {
  day: string;
  title: string;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative m-3 flex min-h-[300px] cursor-pointer overflow-hidden rounded-lg border border-white bg-gradient-to-br from-white to-white/20 shadow-md backdrop-blur-lg transition-all duration-300 hover:bg-white lg:col-span-1 lg:row-span-3",
        className,
      )}
    >
      {image && (
        <Image
          src={image}
          width={100}
          height={100}
          alt="image"
          className="absolute left-0 top-0 h-full w-full scale-110 blur transition-transform duration-300 group-hover:scale-125"
        />
      )}
      <div className="z-10 flex h-full w-full flex-col items-center justify-center text-slate-600">
        <span className="text-sm">{day}</span>
        <h1 className="text-3xl font-bold">{title}</h1>
        <span className="my-3 text-xs font-extralight">
          click to know more &rarr;
        </span>
      </div>
    </div>
  );
}
