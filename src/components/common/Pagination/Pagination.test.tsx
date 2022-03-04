import React from "react";
import { create } from "react-test-renderer";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
    test("pages count should be 200 but should be showed 15", () => {
        const component = create(<Pagination totalItemsCount={200} currentPage={1}
                                             onPageChanged={() => {}}
                                             pageSize={1} portionSize={15}/>)
        const instance = component.root;
        let spans = instance.findAllByType("span");
        expect(spans.length).toBe(15);
    })
})