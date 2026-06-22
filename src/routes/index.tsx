import { createFileRoute } from "@tanstack/react-router";
import AshuPortfolio from "@/components/AshuPortfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashu.AI — AI Builder, Consultant & Strategist" },
      {
        name: "description",
        content:
          "I turn AI into business advantage. Production-grade AI systems, automation, and strategic consulting for startups and enterprises.",
      },
      { property: "og:title", content: "Ashu.AI — AI Builder & Consultant" },
      {
        property: "og:description",
        content: "AI systems that automate, accelerate and scale operations.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AshuPortfolio,
});
