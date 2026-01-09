import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStepById, getStepNavigation } from "@/data/guide";
import GuideLayoutClient from "@/components/GuideLayoutClient";
import StepContent from "@/components/StepContent";

interface PageProps {
  params: Promise<{ stepId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stepId } = await params;
  const step = getStepById(stepId);

  if (!step) {
    return {
      title: "Step Not Found - Vibe Code Guide",
    };
  }

  return {
    title: `${step.title} - Vibe Code Guide`,
    description: step.description,
  };
}

export default async function StepPage({ params }: PageProps) {
  const { stepId } = await params;
  const navigation = getStepNavigation(stepId);

  if (!navigation) {
    notFound();
  }

  const { current: step, phase } = navigation;

  return (
    <GuideLayoutClient stepId={stepId}>
      <StepContent step={step} phase={phase} navigation={navigation} />
    </GuideLayoutClient>
  );
}
