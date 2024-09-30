type BuildUrlParams = {
  url: string;
  baseUrl?: string;
  params?: unknown;
};

export const buildUrl = ({ url, baseUrl, params }: BuildUrlParams): string => {
  const fullUrl = new URL(url, baseUrl);

  if (params) {
    const filteredParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(params).filter(([_, value]) => value !== undefined),
    );

    const searchParams = new URLSearchParams(filteredParams);
    fullUrl.search = searchParams.toString();
  }

  return fullUrl.toString();
};
