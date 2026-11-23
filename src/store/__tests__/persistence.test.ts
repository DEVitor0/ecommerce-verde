import { makeStore } from "..";
import { attachPersistence, hydrateStore } from "../persistence";
import { addItem } from "../slices/cartSlice";
import { setCurrency } from "../slices/uiSlice";
import { toggleWishlist } from "../slices/wishlistSlice";

describe("persistência", () => {
  it("grava somente o que muda e reidrata em outra store", () => {
    const first = makeStore();
    const stop = attachPersistence(first);
    first.dispatch(addItem({ productId: "p01", quantity: 2 }));
    first.dispatch(toggleWishlist("p03"));
    first.dispatch(setCurrency("USD"));
    stop();

    const second = makeStore();
    hydrateStore(second);
    expect(second.getState().cart.lines).toEqual([{ productId: "p01", quantity: 2 }]);
    expect(second.getState().wishlist.ids).toEqual(["p03"]);
    expect(second.getState().ui.currency).toBe("USD");
  });

  it("sobrevive a dados corrompidos no localStorage", () => {
    window.localStorage.setItem("jardim:cart", "{não é json");
    const store = makeStore();
    expect(() => hydrateStore(store)).not.toThrow();
    expect(store.getState().cart.lines).toEqual([]);
  });
});
