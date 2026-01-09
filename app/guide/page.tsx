import { redirect } from "next/navigation";
import { getFirstStep } from "@/data/guide";

export default function GuidePage() {
  const firstStep = getFirstStep();
  redirect(`/guide/${firstStep.id}`);
}
