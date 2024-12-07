import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  console.log(session);
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: ROUTES.SIGN_IN });
  };
  return (
    <>
      <form className="px-10 pt-[100px]" action={handleSignOut}>
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};
export default Home;
