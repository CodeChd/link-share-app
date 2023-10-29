import { CSS } from "@dnd-kit/utilities";
import Links from "./Links";
import { useSortable } from "@dnd-kit/sortable";
import { LinkType } from "../context/linkSlice";

const SortableLinks = ({ link }: { link: LinkType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
      transition: {
        duration: 600,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <Links
      key={link?.id}
      data={link}
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      style={styles}
    />
  );
};

export default SortableLinks;
