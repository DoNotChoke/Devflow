import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";
interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}
interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}
const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-36">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
    </>
    <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
    <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
      {message}
    </p>
    {button && (
      <Link href={button.href}>
        <Button
          className="paragraph-medium mt-5 min-h-[46px]
        rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500"
        >
          {button.text}
        </Button>
      </Link>
    )}
  </div>
);
const DataRendered = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success) {
    const lightError = "/images/light-error.png";
    const darkError = "/images/dark-error.png";
    return (
      <StateSkeleton
        image={{ light: lightError, dark: darkError, alt: "Error State" }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }
  if (!data || data.length === 0) {
    const lightImage = "/images/light-illustration.png";
    const darkImage = "/images/dark-illustration.png";
    return (
      <StateSkeleton
        image={{ light: lightImage, dark: darkImage, alt: "Empty State" }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  }
  return <div>{render(data)}</div>;
};
export default DataRendered;
