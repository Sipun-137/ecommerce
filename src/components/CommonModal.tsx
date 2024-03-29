"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
interface ParentObjectType {
  modalTitle: String | undefined;
  MainContent: any | undefined;
  showButton: boolean | undefined;
  buttonComponent: any | undefined;
  show: boolean;
  setShow: any | undefined;
}
export default function CommonModal({
  modalTitle,
  MainContent,
  showButton,
  buttonComponent,
  show,
  setShow,
}: ParentObjectType) {
  return (
    <>
      <Transition.Root appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-900"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={"w-screen max-w-md"}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl text-black ">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                      <div className=" flex items-start justify-between">
                        <Dialog.Title>{modalTitle}</Dialog.Title>
                      </div>
                      <div className="mt-20">{MainContent}</div>
                    </div>
                    {showButton ? (
                      <div className="border-t border-gray-300 px-4 py-6 sm:px-6">
                        {buttonComponent}
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}


