import { reorderArray } from "../../src/utils/helpers";
import { CHANNELS_LIST } from "../testutils";

describe("reorderArray", () => {
  it("should reorder array", () => {
    const newChannelsOrder = reorderArray({
      list: CHANNELS_LIST,
      startIndex: 1,
      endIndex: 0
    });

    expect(newChannelsOrder[0]).toEqual("default");
  });
});
