import Container from "./Container";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex h-[80vh] items-center bg-[url(/cse-dep.jpg)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute z-10 h-full w-full bg-gradient-to-b from-white from-10% via-transparent"></div>
      <Container className="min-h-full py-10">
        <div className="z-20 flex h-full w-fit flex-col items-center justify-around rounded-lg border bg-gradient-to-br from-white/50 to-white/20 p-5 text-slate-800 backdrop-blur-md md:mt-14 md:flex-row">
          <header className="m-3 flex w-full min-w-[40%] flex-col items-center ">
            <h3 className="text-center font-bold md:text-xl">
              Department of Computer Science and Engineering
            </h3>
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
