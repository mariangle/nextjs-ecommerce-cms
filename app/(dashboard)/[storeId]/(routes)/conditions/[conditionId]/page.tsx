import prismadb from "@/lib/prismadb";

import { ConditionForm } from "./components/condition-form";

const ConditionPage = async ({
  params
}: {
  params: { conditionId: string }
}) => {
  const condition = await prismadb.condition.findUnique({
    where: {
      id: params.conditionId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ConditionForm initialData={condition} />
      </div>
    </div>
  );
}

export default ConditionPage;