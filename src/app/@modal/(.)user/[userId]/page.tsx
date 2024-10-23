import { Modal } from "@/app/ui/modal";
import UserPanel from "@/app/ui/userPanel";

export default async function UserModal({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params)?.userId;

  return <Modal><UserPanel userId={userId} /></Modal>;
}
