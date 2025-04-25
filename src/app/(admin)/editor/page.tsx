import TextoEditor from "@/components/ui/textEditor";
import getTokenInfos from "@/lib/getTokenInfos";

export default async function EditorPage() {
  let isEditor = false;

  // VALIDA SE TEM PERMISSAO - MUDAR NO FUTURO
  const user = await getTokenInfos();
  if (user?.role != null) {
    if (["admin", "writer"].includes(user?.role.toString().toLowerCase()))
      isEditor = true;
  }

  return <TextoEditor editable={isEditor} />;
}
