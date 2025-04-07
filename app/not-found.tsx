import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-between h-screen">
      <Image
        src="/assets/not-found.png"
        width={500}
        height={500}
        alt="Not found image"
        className="w-1/2 h-auto object-cover "
      />
      <div className="w-1/2 flex flex-col items-center text-center gap-5">
        <h1 className="text-9xl font-bold">Oops!</h1>
        <p className="text-lg">404 - Page not found</p>
        <Link
          href="/"
          className="bg-white w-fit text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-300"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
