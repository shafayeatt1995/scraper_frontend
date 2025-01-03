export const useData = () => {
  return useState("data", () => ({
    isTablet: false,
    isMobile: false,
    activeTeam: { name: "Default team" },
  }));
};
