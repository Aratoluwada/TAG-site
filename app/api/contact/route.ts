import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleContact(request);
}
