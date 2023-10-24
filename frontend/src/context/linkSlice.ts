import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LinkType {
  id: number;
  image: string;
  name: string;
  link?: string;
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
        //Resetting IDs to accommodate removed items.
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
  },
});

export const { addLink, removeLink } = link.actions;

export default link.reducer;
