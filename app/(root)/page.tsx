import Link from "next/link";
import React from "react";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";

const questions = [
  {
    _id: "1",
    title: "How to train a CNN model?",
    description: "I stuck at training ResNet model.",
    tags: [
      {
        _id: "1",
        name: "Machine learning",
      },
      {
        _id: "2",
        name: "CNN model",
      },
    ],
    author: {
      _id: "1",
      name: "Tuan Nghia",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid",
    },
    upvotes: 100,
    answers: 5,
    createdAt: new Date(),
    views: 100,
  },
  {
    _id: "2",
    title: "Need help for SetTimeOut in NextJS",
    description: "I try to use SetTimeOut in NextJS",
    tags: [{ _id: "1", name: "nextjs" }],
    author: {
      _id: "1",
      name: "Tuan Nghia",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid",
    },
    upvotes: 100,
    answers: 5,
    createdAt: new Date(),
    views: 100,
  },
];
const test = async () => {
  try {
    await dbConnect();
  } catch (error) {
    return handleError(error);
  }
};
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  await test();
  const { query = "", filter = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name?.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search question..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};
export default Home;
