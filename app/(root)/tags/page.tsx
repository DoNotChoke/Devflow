import React from "react";

import TagCard from "@/components/cards/TagCard";
import DataRendered from "@/components/DataRendered";
import LocalSearch from "@/components/Search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });
  const { tags } = data || {};
  return (
    <>
      <h1 className="h1-bold text-light100_dark900 text-3xl">Tags</h1>
      <section className="mt-10">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          otherClasses="flex-1"
        />
      </section>
      <DataRendered
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />
    </>
  );
};
export default Tags;
