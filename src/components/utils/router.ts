export const seroalizeSearchParams = (params: Record<string, string>) => {
  const strParams = new URLSearchParams(params);
  return strParams.toString();
};
