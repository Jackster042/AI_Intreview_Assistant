import React from "react";
import Agent from "@/components/shared/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const page = async () => {
  const user = await getCurrentUser();
  console.log(user, "user from INTERVIEW PAGE");

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent
        userName={user?.name || ""}
        userId={user?.id || ""}
        type="generate"
      />
    </>
  );
};

export default page;
