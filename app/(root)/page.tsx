import Link from "next/link";
import React from "react";

import LocalSearch from "@/components/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

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
    author: { _id: "1", name: "Tuan Nghia" },
    upvote: 100,
    answers: 5,
  },
  {
    _id: "2",
    title: "Need help for SetTimeOut in NextJS",
    description: "I try to use SetTimeOut in NextJS",
    tags: [{ _id: "1", name: "NextJS" }],
    author: { _id: "1", name: "Tuan Nghia" },
    upvote: 100,
    answers: 5,
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase()),
  );
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
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};
export default Home;
