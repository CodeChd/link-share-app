import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LinkType {
  _id?: number;
  id: number;
  image: string;
  name: string;
  link: string;
}

const initialState: {
  linkItem: LinkType[];
} = localStorage.getItem("userLinks")
  ? JSON.parse(localStorage.getItem("userLinks") as string)
  : { linkItem: [] };

const link = createSlice({
  name: "link",
  initialState,
  reducers: {
    addLink: (
      state: { linkItem: LinkType[] },
      action: PayloadAction<LinkType>
    ) => {
      const link: LinkType = action.payload;

      const existingLink = state.linkItem.find((x) => x.id === link.id);

      if (existingLink) {
        state.linkItem = state.linkItem.map((x) =>
          x.id === link.id ? link : x
        );
      } else {
        state.linkItem = [...state.linkItem, link];

        //Updating IDs to accommodate removed items.
        state.linkItem = state.linkItem.map((link, index) => ({
          ...link,
          id: index + 1,
        }));
      }
      localStorage.setItem("userLinks", JSON.stringify(state));
    },
    removeLink: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const updatedLinks = state.linkItem.filter((x) => x.id !== idToRemove);

      // Updating IDs to accommodate removed items.
      const updatedLinkItem = updatedLinks.map((link, index) => ({
        ...link,
        id: index + 1,
      }));

      state.linkItem = updatedLinkItem;
      localStorage.setItem("userLinks", JSON.stringify(state));
    },
    dragDrop: (
      state: { linkItem: LinkType[] },
      action: PayloadAction<{ draggedId: number; targetId: number }>
    ) => {
      const { draggedId, targetId } = action.payload;

      const fromIndex = state.linkItem.findIndex((x) => x.id === draggedId);
      const toIndex = state.linkItem.findIndex((x) => x.id === targetId);

      const linkItemUpdated = [...state.linkItem];
      const [draggedLink] = linkItemUpdated.splice(fromIndex, 1);
      linkItemUpdated.splice(toIndex, 0, draggedLink);

      // Updating IDs to accommodate moved items.
      const UpdatedLinks = linkItemUpdated.map((link, index) => ({
        ...link,
        id: index + 1,
      }));
      state.linkItem = UpdatedLinks;
      localStorage.setItem("userLinks", JSON.stringify(state));
    },
  },
});

export const { addLink, removeLink, dragDrop } = link.actions;

export default link.reducer;
