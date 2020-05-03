import Group from "./Group";

it("Group constructor works", () => {
    const group = new Group(1, 2, 3);
    expect(group.id).toBe(1);
    expect(group.name).toBe(2);
    expect(group.members).toBe(3);
});