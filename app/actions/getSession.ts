import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]/route";

export default async function getSession() {
  return await getServerSession(authOptions);
}
