import Modal from "../Modal";
import { Button } from "@/components/ui/button";

export default function ModalExample() {
  return (
    <div className="p-6">
      <Modal
        trigger={<Button>Open Modal</Button>}
        title="Example Modal"
        description="This is a modal with Mentor Health theme"
      >
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
}
