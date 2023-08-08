import DocForm from "@/components/DocForm";
import { saveDoc } from "@/helpers/uploadDoc";

export default function Page() {
  return <DocForm callAction={saveDoc} />;
}
