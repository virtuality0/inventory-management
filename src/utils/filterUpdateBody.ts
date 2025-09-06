export const filterUpdateBody = <T extends {}>(body: T) => {
  return Object.fromEntries(
    Object.entries(body).filter(([_, value]) => {
      return value !== undefined || value !== null;
    }),
  );
};
