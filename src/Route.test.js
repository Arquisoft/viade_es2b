import Route from "./Route";

it("Route constructor works", () => {
    const route = new Route(1, 3, 5, 7, 9);
    expect(route.id).toBe(1);
    expect(route.name).toBe(3);
    expect(route.description).toBe(5);
    expect(route.gpx).toBe(7);
    expect(route.images).toBe(9);
    expect(route.priv).toBe(false);
    expect(route.shared).toBe(false);
});