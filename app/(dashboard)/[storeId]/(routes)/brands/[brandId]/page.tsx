import prismadb from "@/lib/prismadb";

import { BrandForm } from "./components/brand-form";

const BrandPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const brand = await prismadb.brand.findUnique({
    where: {
      id: params.brandId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <BrandForm initialData={brand} />
      </div>
    </div>
  );
}

export default BrandPage;