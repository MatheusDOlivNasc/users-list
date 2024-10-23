import UserPanel from "@/app/ui/userPanel";

export default async function UserModal({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params)?.userId;

  return (
    <div className="flex justify-center">
      <UserPanel userId={userId} />
    </div>
  );
}
