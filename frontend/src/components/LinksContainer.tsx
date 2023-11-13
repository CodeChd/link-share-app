import isObjectEmpty from "../utils/isObjectEmpty";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useDispatch } from "react-redux";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DndLinksContainer from "../components/DndLinksContainer";
import { LinkType, dragDrop } from "../context/linkSlice";

interface LinkProps {
  linkItems: LinkType[];
  isError: boolean;
  platformError: boolean;
  linkError: boolean;
  loadingLinks: boolean;
}

const LinksContainer = ({
  linkItems,
  isError,
  platformError,
  linkError,
  loadingLinks,
}: LinkProps) => {
  const dispatch = useDispatch();

  const onDragEnd = (e: any) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    const draggedId: number = active.id;
    const targetId: number = over.id;
    dispatch(dragDrop({ draggedId, targetId }));
  };
  return (
    <div
      id="links"
      className="h-[30rem] overflow-y-auto flex flex-col gap-5 justify-start items-center px-[2rem] mb-4"
    >
      {isObjectEmpty(linkItems) || linkItems.length === 0 || isError ? (
        <div className="text-center bg-lightGrey/20 w-full h-full flex flex-col justify-center mb-2 rounded-lg">
          <img
            src="/images/illustration-empty.svg"
            alt="get_started"
            className="mx-auto"
          />
          <h2 className="text-richBlack text-h-m-b font-bold">
            Let's get you started
          </h2>
          <p className="text-mediumGrey max-w-[60vw]  tablet:max-w-[30vw] mx-auto">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </div>
      ) : loadingLinks ? (
        "Loading"
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={linkItems}
            strategy={verticalListSortingStrategy}
          >
            {linkItems.map((x: LinkType) => (
              <DndLinksContainer
                key={x.id}
                linkDetails={x}
                platformError={platformError}
                linkError={linkError}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default LinksContainer;
