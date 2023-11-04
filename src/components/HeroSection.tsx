import { cn } from "@/lib/utils";
import Container from "./Container";
import Counter from "./Counter";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-[100vh] bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-white"></div>
      <Container className="flex-col items-center justify-center gap-10">
        <Logo />
        <Counter />
      </Container>
    </section>
  );
}

const Logo = ({ className }: { className?: string }) => (
  <div className="relative">
    <ColorLogo className="absolute blur-lg" />
    <svg
      width="431"
      height="241"
      viewBox="0 0 431 241"
      className={cn("w-80 -translate-x-5 md:w-96", className)}
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M125.438 47.3381C112.438 36.3381 114.438 4.3749 147.938 8.33814C186.374 12.8853 175.438 45.3381 164.938 62.8381"
        stroke="white"
        strokeWidth="15"
        strokeLinejoin="round"
      />
      <path
        d="M193 89.5V48H220V89.5L193 115.5"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M246 85.5C246 37 271.307 80.7046 274 85.5C303.768 138.5 326 85.5 346 28"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M302.453 45.1668C310.453 42.1888 296.453 21.6668 289.453 38.6668C286.075 46.8699 289.076 48.8154 293.453 48.2997C296.332 47.9604 299.807 46.5557 302.453 45.1668Z"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M102.5 80.338V49.3381L121 48.3381M155 48.3381H121M121 48.3381V66.3381C141 53.3381 170 69.838 157.5 91.338C145 112.838 111.013 107.072 98.5 103.838C54 92.338 24.5 67.3381 7 98.338"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M304 201.5V160H331V201.5L304 227.5"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M388.262 207L380.763 207.145L395.762 207H388.262ZM423 160.908H430.5V147.245L418.973 154.581L423 160.908ZM369.687 201.761C365.91 196.249 366.141 192.898 366.584 191.546C367.019 190.221 368.124 189.237 369.814 188.973C371.466 188.715 373.821 189.191 375.999 191.513C378.199 193.859 380.598 198.573 380.763 207.145L395.761 206.855C395.545 195.677 392.345 187.016 386.941 181.252C381.513 175.465 374.257 173.098 367.501 174.152C360.784 175.201 354.685 179.686 352.33 186.876C349.983 194.039 351.839 202.251 357.313 210.239L369.687 201.761ZM395.762 207C395.762 192.688 399.249 186.371 403.707 182.079C406.2 179.68 409.317 177.611 413.344 175.255C417.144 173.031 422.14 170.345 427.027 167.235L418.973 154.581C414.36 157.517 410.264 159.678 405.768 162.308C401.501 164.806 397.122 167.598 393.304 171.273C385.144 179.129 380.762 189.811 380.762 207H395.762ZM415.5 160.908V185.204H430.5V160.908H415.5ZM415.5 185.204V231.5H430.5V185.204H415.5Z"
        fill="white"
      />
      <path
        d="M393.29 144.358C401.381 141.638 388.048 120.677 380.505 137.444C376.866 145.534 379.803 147.575 384.194 147.2C387.083 146.953 390.601 145.661 393.29 144.358Z"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M233 158.5C220 147.5 222 115.537 255.5 119.5C293.935 124.047 283 156.5 272.5 174"
        stroke="white"
        strokeWidth="15"
        strokeLinejoin="round"
      />
      <path
        d="M209 160H236.5M236.5 160C245.677 160 250.823 160 260 160M236.5 160C246.5 191.952 200 207.091 191 198.5C169 177.5 275.064 161.5 264.257 211C261.201 225 243 236.645 219 232C161.833 220.935 111.5 187.5 95 222"
        stroke="white"
        strokeWidth="15"
      />
    </svg>
  </div>
);

const ColorLogo = ({ className }: { className?: string }) => (
  <svg
    width="431"
    height="241"
    viewBox="0 0 431 241"
    fill="none"
    className={cn("w-80 -translate-x-5 md:w-96", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M125.438 47.3381C112.438 36.3381 114.438 4.3749 147.938 8.33814C186.374 12.8853 175.438 45.3381 164.938 62.8381"
      stroke="url(#paint0_linear_26_2)"
      strokeWidth="15"
      strokeLinejoin="round"
    />
    <path
      d="M193 89.5V48H220V89.5L193 115.5"
      stroke="url(#paint1_linear_26_2)"
      strokeWidth="15"
    />
    <path
      d="M246 85.5C246 37 271.307 80.7046 274 85.5C303.768 138.5 326 85.5 346 28"
      stroke="url(#paint2_linear_26_2)"
      strokeWidth="15"
    />
    <path
      d="M302.453 45.1668C310.453 42.1888 296.453 21.6668 289.453 38.6668C286.075 46.8699 289.076 48.8154 293.453 48.2997C296.332 47.9604 299.807 46.5557 302.453 45.1668Z"
      stroke="#2184EA"
      strokeWidth="15"
    />
    <path
      d="M102.5 80.338V49.3381L121 48.3381M155 48.3381H121M121 48.3381V66.3381C141 53.3381 170 69.838 157.5 91.338C145 112.838 111.013 107.072 98.5 103.838C54 92.338 24.5 67.3381 7 98.338"
      stroke="url(#paint3_linear_26_2)"
      strokeWidth="15"
    />
    <path
      d="M304 201.5V160H331V201.5L304 227.5"
      stroke="url(#paint4_linear_26_2)"
      strokeWidth="15"
    />
    <path
      d="M388.262 207L380.763 207.145L395.762 207H388.262ZM423 160.908H430.5V147.245L418.973 154.581L423 160.908ZM369.687 201.761C365.91 196.249 366.141 192.898 366.584 191.546C367.019 190.221 368.124 189.237 369.814 188.973C371.466 188.715 373.821 189.191 375.999 191.513C378.199 193.859 380.598 198.573 380.763 207.145L395.761 206.855C395.545 195.677 392.345 187.016 386.941 181.252C381.513 175.465 374.257 173.098 367.501 174.152C360.784 175.201 354.685 179.686 352.33 186.876C349.983 194.039 351.839 202.251 357.313 210.239L369.687 201.761ZM395.762 207C395.762 192.688 399.249 186.371 403.707 182.079C406.2 179.68 409.317 177.611 413.344 175.255C417.144 173.031 422.14 170.345 427.027 167.235L418.973 154.581C414.36 157.517 410.264 159.678 405.768 162.308C401.501 164.806 397.122 167.598 393.304 171.273C385.144 179.129 380.762 189.811 380.762 207H395.762ZM415.5 160.908V185.204H430.5V160.908H415.5ZM415.5 185.204V231.5H430.5V185.204H415.5Z"
      fill="url(#paint5_linear_26_2)"
    />
    <path
      d="M393.29 144.358C401.381 141.638 388.048 120.677 380.505 137.444C376.866 145.534 379.803 147.575 384.194 147.2C387.083 146.953 390.601 145.661 393.29 144.358Z"
      stroke="#9114AE"
      strokeWidth="15"
    />
    <path
      d="M233 158.5C220 147.5 222 115.537 255.5 119.5C293.935 124.047 283 156.5 272.5 174"
      stroke="url(#paint6_linear_26_2)"
      strokeWidth="15"
      strokeLinejoin="round"
    />
    <path
      d="M209 160H236.5M236.5 160C245.677 160 250.823 160 260 160M236.5 160C246.5 191.952 200 207.091 191 198.5C169 177.5 275.064 161.5 264.257 211C261.201 225 243 236.645 219 232C161.833 220.935 111.5 187.5 95 222"
      stroke="url(#paint7_linear_26_2)"
      strokeWidth="15"
    />
    <defs>
      <linearGradient
        id="paint0_linear_26_2"
        x1="174.438"
        y1="54.3381"
        x2="80"
        y2="19.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#13BCE2" />
        <stop offset="1" stopColor="#2A6CED" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_26_2"
        x1="206.5"
        y1="48"
        x2="206.5"
        y2="115.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0EDCE0" />
        <stop offset="1" stopColor="#2955ED" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_26_2"
        x1="352.5"
        y1="28"
        x2="246"
        y2="79"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2955ED" />
        <stop offset="1" stopColor="#0FDDE1" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_26_2"
        x1="175"
        y1="58"
        x2="7.00002"
        y2="106"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0AEFDE" />
        <stop offset="0.817723" stopColor="#2854EC" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_26_2"
        x1="317.5"
        y1="160"
        x2="317.5"
        y2="227.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9013AD" />
        <stop offset="1" stopColor="#632AAD" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_26_2"
        x1="359.5"
        y1="152.5"
        x2="448"
        y2="162"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.22396" stopColor="#9013AD" />
        <stop offset="1" stopColor="#5F2AAD" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_26_2"
        x1="282"
        y1="165.5"
        x2="226"
        y2="147"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9114AE" />
        <stop offset="1" stopColor="#5F2AAD" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_26_2"
        x1="264"
        y1="160"
        x2="95"
        y2="210"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9114AE" />
        <stop offset="0.468757" stopColor="#632AAD" />
      </linearGradient>
    </defs>
  </svg>
);
