import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import { updateStatus } from "../../../../redux/reducers/profileReducer";


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={updateStatus}
                                                isOwner={false}/>);
        const instance = component.root;
        expect(instance.props.status).toBe("test text");
    });

    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={updateStatus}
                                                isOwner={false}/>);
        const instance = component.root;
        let span = instance.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={updateStatus}
                                                isOwner={false}/>);
        const instance = component.root;
        expect(() => {
            let input = instance.findByType("input");
        }).toThrow();
    });

    test("after creation span should be contains correct text", () => {
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={updateStatus}
                                                isOwner={false}/>);
        const instance = component.root;
        let span = instance.findByType("span");
        expect(span.children[0]).toBe("test text");
    });

    test("input should be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={updateStatus}
                                                isOwner={true}/>);
        const instance = component.root;
        console.log(instance);
        let span = instance.findByType("span");
        span.props.onClick();
        let input = instance.findByType("input");
        expect(input.props.value).toBe("test text");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"test text"}
                                                updateStatus={mockCallback}
                                                isOwner={false}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});