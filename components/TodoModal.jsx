import { arrayUnion, doc, setDoc } from "firebase/firestore";
import React, { useContext, Fragment } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { db } from "@/firebase";
import { AuthContext } from "@/context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";

function TodoModal({ showModal, setShowModal }) {
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].checked
    );
    const taskTitle = e.target[0].value;
    const taskDescription = e.target[1].value;
    const dueDate = e.target[2].value;
    const important = e.target[3].checked;
    const userRef = doc(db, "users", currentUser.uid);
    setDoc(
      userRef,
      {
        Todos: arrayUnion({
          taskTitle,
          taskDescription,
          dueDate,
          important,
          addedOn: new Date(),
        }),
      },
      { merge: true }
    );
    setShowModal(false);
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle "
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block lg:w-[40rem] md:w-[80%] w-full text-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-gray-800"
              >
                Add a memo!
              </Dialog.Title>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="task-title" className="sr-only">
                      Task Title
                    </label>
                    <input
                      type="text"
                      name="task-title"
                      id="task-title"
                      placeholder="Task Title"
                      className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="task-description" className="sr-only">
                      Task Description
                    </label>
                    <textarea
                      id="task-description"
                      name="task-description"
                      rows={3}
                      placeholder="Task Description"
                      className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 max-h-96"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="due-date" className="sr-only">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="due-date"
                      id="due-date"
                      placeholder="Due Date"
                      className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="important"
                        name="important"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-200 rounded focus:ring-gray-600"
                      />
                      <label
                        htmlFor="important"
                        className="ml-2 block text-sm text-gray-800"
                      >
                        Important
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center items-center gap-2 ">
                    <button
                      type="button"
                      className="flex flex-1 justify-center items-center px-5 py-2 font-bold bg-red-500 hover:bg-red-600 transition duration-300 text-gray-100 rounded-md shadow-md hover:text-white hover:shadow-lg"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="flex flex-1 justify-center items-center px-5 py-2 font-bold bg-green-500 hover:bg-green-600 transition duration-300 text-gray-100 rounded-md shadow-md hover:text-white hover:shadow-lg"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default TodoModal;
