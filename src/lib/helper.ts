export default function mapInitialToUnanswered(
    status: Record<number, "answered" | "unanswered" | "review" | "initial">
  ): Record<number, "answered" | "unanswered" | "review"> {
    return Object.fromEntries(
      Object.entries(status).map(([key, value]) => [
        key,
        value === "initial" ? "unanswered" : value,
      ])
    ) as Record<number, "answered" | "unanswered" | "review">;
  }
