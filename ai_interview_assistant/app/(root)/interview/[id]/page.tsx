import React from "react";
import Image from "next/image";

import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/components/shared/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Agent from "@/components/shared/Agent";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  console.log(interview, "interview from interview/[id]/page");
  if (!interview) {
    redirect("/");
  }
  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 h-fit rounded-lg capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name || ""}
        userId={user?.id || ""}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default page;
