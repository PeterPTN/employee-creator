import { describe, it } from "vitest";
import reducer, {
    setAtCurrentNav,
    setIsModalOpen
} from './appSlice';

const initialState = {
    isModalOpen: false,
    atCurrentNav: ""
}

describe("App Slice Actions", () => {
    it("should return the initial state", () => {
        // State, action
        expect(reducer(undefined, { type: undefined })).toEqual({
            isModalOpen: false,
            atCurrentNav: ""
        })
    })

    it("should set isModalOpen", () => {
        expect(reducer(initialState, setIsModalOpen(true))).toEqual({
            isModalOpen: true,
            atCurrentNav: ""
        })
    })

    it("should set atCurrentNav", () => {
        expect(reducer(initialState, setAtCurrentNav("create"))).toEqual({
            isModalOpen: false,
            atCurrentNav: "create"
        })
    })
})