import Container from "./Container";
import Image from "next/image";

function ContactSection() {
  return (
    <section id="contact" className="my-10 min-h-[250px]">
      <Container>
        <div className="flex w-full flex-row justify-around md:flex-col">
          <Socials />
          <div className="body flex items-center justify-center">
            <Details />
          </div>
        </div>
      </Container>
    </section>
  );
}

const Socials = () => {
  return (
    <div className="header flex flex-col items-center justify-center gap-3 md:p-10">
      <p className="text-sm font-light text-slate-500">Having Question?</p>
      <h1 className="text-center text-2xl font-extrabold">CONTACT US</h1>
      <div className="socials flex gap-3">
        <Insta className="w-7" />
        <Email className="w-7" />
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="left-details flex w-fit flex-col items-start justify-center gap-5 md:flex-row">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-600">Address: </span>
        <h2 className="text-sm">OMR, Kazhipattur</h2>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-600">Mobile: </span>
        <h2 className="text-sm">9080388158</h2>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-600">Email: </span>
        <h2 className="text-sm">testmail@gmail.com</h2>
      </div>
    </div>
  );
};

const Insta = ({ className }: { className?: string }) => (
  <a href="https://www.instagram.com/_niral_thiral_2k23">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 56.7 56.7"
      enableBackground="new 0 0 56.7 56.7"
      className={className}
    >
      <g>
        <path
          d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7
 c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"
        />
        <circle cx="41.5" cy="16.4" r="2.9" />
        <path
          d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9
 h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3
 s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6
 c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"
        />
      </g>
    </svg>
  </a>
);

const Email = ({ className }: { className?: string }) => (
  <a
    className="flex items-center justify-center"
    href="mailto:niralthiral.2k23@gmail.com"
  >
    <Image
      className={className}
      src={"/email.svg"}
      width={10}
      height={10}
      alt="email"
    />
  </a>
);

export default ContactSection;
