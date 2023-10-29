import Image from "next/image";
import Container from "./Container";
import { cn } from "@/lib/utils";

function SponserSection() {
  return (
    <section
      id="sponsers"
      className="flex h-[30vh] w-full items-center bg-gradient-to-b from-slate-300 to-white"
    >
      <Container className="flex-col items-center justify-normal gap-5 lg:flex-row">
        <h1 className="flex w-1/2 items-center justify-center text-center font-bold md:text-2xl">
          OUR SPONSERS
        </h1>
        <ul className="my-10 flex w-full justify-around">
          <SponserTile imageURL="/poorvika.svg" />
          <SponserTile imageURL="/poorvika.svg" />
          <SponserTile imageURL="/poorvika.svg" />
        </ul>
      </Container>
    </section>
  );
}

const SponserTile = ({
  imageURL,
  className,
}: {
  imageURL: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "m-2 flex items-center justify-center rounded-lg",
        className,
      )}
    >
      <Image
        src={imageURL}
        width={80}
        height={80}
        alt="sponser"
        className="w-full"
      />
    </div>
  );
};

export default SponserSection;
