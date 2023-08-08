import DocForm from "@/components/DocForm";
import EncryptedDocForm from "@/components/EncryptedDocForm";
import { saveEncrypted } from "@/helpers/uploadDoc";

export default function Page() {
  return <EncryptedDocForm callAction={saveEncrypted} />;
}
