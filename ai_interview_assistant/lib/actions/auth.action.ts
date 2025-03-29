"use server";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      // profileURL,
      // resumeURL,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error(error, "error from SignUp");
    if (error.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error: any) {
    console.error(error, "error from SignIn");
    return {
      success: false,
      message: "Failed to login",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // milliseconds
  });

  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    maxAge: ONE_WEEK * 1000, // milliseconds
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error: any) {
    console.error(error, "error from getCurrentUser");
    return null;
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  // console.log(user, "user from GET CURRENT USER");
  return !!user;
}
