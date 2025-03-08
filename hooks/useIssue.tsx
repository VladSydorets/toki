import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useIssue(issueId?: number) {
  const {
    data: issue,
    error,
    isLoading,
    mutate,
  } = useSWR(issueId ? `/api/issues/${issueId}` : null, fetcher);

  return { issue, error, isLoading, mutate };
}
