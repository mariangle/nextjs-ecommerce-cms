"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps {
  entities: string;
  entityId: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entities,
  entityId,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entities}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entities}/{${entityId}}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entities}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entities}/{${entityId}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entities}/{${entityId}}`} />
    </>
  );
};