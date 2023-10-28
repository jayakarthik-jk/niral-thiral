import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Container from "./Container";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function EventSection() {
  return (
    <section id="events" className="flex min-h-[70vh]">
      <Container>
        <div className="grid w-full grid-rows-[8] lg:grid-rows-6">
          <h1 className="title my-7 flex items-center justify-center text-3xl font-bold lg:row-span-1 lg:m-0">
            Events
          </h1>
          <div className="days row-span-6 flex flex-col px-5 pb-5 lg:grid lg:grid-cols-3 lg:grid-rows-3">
            <DayTile image="/techwar.jpg" day="Day 1" title="TECHWAR" />
            <DayTile image="/techathon.jpg" day="Day 2" title="TECHATHON" />
            <DayTile
              image="/technokratz.webp"
              day="Day 3"
              title="TECHNOKRATZ"
            />
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
  image: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative m-3 flex min-h-[300px] overflow-hidden rounded-lg border lg:col-span-1 lg:row-span-3",
        className,
      )}
    >
      <Image
        src={image}
        width={100}
        height={100}
        alt="image"
        className="absolute left-0 top-0 h-full w-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="z-10 flex h-full w-full flex-col items-center justify-center bg-black/50 text-white">
        <span className="text-sm">{day}</span>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
