import { create } from "zustand";

interface CommentState {
  helpfulCount: number;
  notHelpfulCount: number;
  userComment: "helpful" | "notHelpful" | null;
  setHelpful: () => void;
  setNotHelpful: () => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  helpfulCount: 0,
  notHelpfulCount: 0,
  userComment: null,
  setHelpful: () =>
    set((state) => ({
      helpfulCount: state.userComment === "helpful" ? state.helpfulCount : state.helpfulCount + 1,
      notHelpfulCount: state.userComment === "notHelpful" ? state.notHelpfulCount - 1 : state.notHelpfulCount,
      userComment: "helpful",
    })),
  setNotHelpful: () =>
    set((state) => ({
      notHelpfulCount: state.userComment === "notHelpful" ? state.notHelpfulCount : state.notHelpfulCount + 1,
      helpfulCount: state.userComment === "helpful" ? state.helpfulCount - 1 : state.helpfulCount,
      userComment: "notHelpful",
    })),
}));
