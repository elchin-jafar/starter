export const RevalidateTags = {
  users: {
    base: ["users"] as const,
    list: (params: { limit: number; skip: number }) =>
      ["users", "list", params] as const,
    search: (params: { q: string; limit: number; skip: number }) =>
      ["users", "search", params] as const,
    byId: (id: number) => ["userById", id] as const,
  },
} as const;
