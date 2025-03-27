import { db } from "@/firebase/admin";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interviews[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  console.log(interviews, "interviews from getUserId");

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interviews[]; //TODO WHY AS INTERVIEW[]
}

export async function getLatestInterviews(params: GetLatestInterviewsParams) {
  const { userId, limit = 20 } = params;
  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interviews[];
}

export async function getInterviewById(id: string): Promise<Interviews | null> {
  const interview = await db.collection("interviews").doc(id).get();

  console.log(interview.data(), "interview from getInterviewById");

  return interview.data() as Interviews | null; //TODO WHY AS INTERVIEW[]
}
