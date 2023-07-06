"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps {
  entity: string;
  entityId: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entity,
  entityId,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entity}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entity}/{${entityId}}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entity}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entity}/{${entityId}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entity}/{${entityId}}`} />
    </>
  );
};