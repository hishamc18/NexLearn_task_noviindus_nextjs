"use client";

import { Dialog } from "@headlessui/react";
import PrimaryButton from "../../Common/PrimaryButton";

interface ComprehensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  paragraph: string;
}

export default function ComprehensionModal({ isOpen, onClose, paragraph }: ComprehensionModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-3xl w-full bg-white rounded-lg p-6 space-y-4">
          <Dialog.Title className="text-[16px] font-bold">Comprehensive Paragraph</Dialog.Title>
          <hr />
          <Dialog.Description className="text-gray-700 text-[14px] whitespace-pre-wrap">
            {paragraph}
          </Dialog.Description>
          <div className="flex justify-end">
            <div className="md:w-[300px] w-[200px]">
              <PrimaryButton text="Minimize" onClick={onClose}/>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
