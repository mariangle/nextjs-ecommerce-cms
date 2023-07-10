import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn, columns } from "./components/columns"
import { EntityClient as CategoriesClient } from "@/components/client";

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard?.label ?? '',
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <CategoriesClient<CategoryColumn> 
          data={formattedCategories} 
          description="Manage categories for your store"
          searchKey="name"
          columns={columns}
          entity="Category"
          entities="categories"
          entityId="categoryId"
        />
      </div>
    </div>
  );
};

export default CategoriesPage;