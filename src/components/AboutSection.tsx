import Image from "next/image";
import Container from "./Container";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex h-[80vh] items-center bg-cover bg-center bg-no-repeat md:bg-[url(/cse-dep.jpg)]"
    >
      <div className="absolute z-10 h-full w-full bg-gradient-to-b from-white from-10% via-transparent"></div>
      <Container className="min-h-full py-10">
        <div className="z-20 flex h-full max-w-5xl flex-col items-center justify-around rounded-lg p-5 md:mt-14 md:flex-row md:gap-5 md:border md:bg-gradient-to-br md:from-white/60 md:to-white/30 md:text-slate-800 md:backdrop-blur-md">
          <header className="m-3 flex w-full min-w-[40%] flex-col items-center ">
            <h3 className="text-center font-bold md:text-xl">
              Department of Computer Science and Engineering
            </h3>
            <Image
              className="my-5 w-full rounded-lg md:hidden"
              src="/cse-dep.jpg"
              width={100}
              height={100}
              alt="image"
            />
            <h1 className="mt-2 text-center text-3xl font-extrabold md:text-4xl">
              Welcomes You All !!
            </h1>
          </header>
          <div className="content my-5 flex max-w-xs flex-col justify-center space-y-5 text-center text-sm md:max-w-3xl md:text-base">
            <p className="">
              Join us for three days of technological extravaganza at Anand
              Institue of Higher Technology, as we present {`"NIRAL THIRAL"`}, a
              vibrant and dynamic platform for students from schools and
              colleges conducted by the Department of Computer Science and
              Engineering, to engage, learn, and showcase their skills in a
              myriad of tech-driven competitions and events.
            </p>
            <p className="">
              Students from schools and colleges are welcome to be a part of
              this enthralling event. Whether {"you're"} a beginner eager to
              explore the world of tech or an experienced enthusiast looking to
              showcase your innovations, NIRAL THIRAL has something for
              everyone.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
