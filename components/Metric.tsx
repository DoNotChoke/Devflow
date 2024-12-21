import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor: boolean;
}
const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={
            (cn("small-regular line-clamp-1"), isAuthor ? "max-sm:hidden" : "")
          }
        >
          {title}
        </span>
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};
export default Metric;