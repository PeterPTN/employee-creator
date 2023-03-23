import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Nav from "./Nav";

// Figure out routing tests
describe('Nav Component', () => {
    beforeEach(() => {
        renderWithProviders(<Nav />)
    })

    it('should have a view all link', () => {
        const viewAllLink = screen.getByRole('view-link');
        expect(viewAllLink).toBeInTheDocument();
    })

    it("should have a create employee link", () => {
        const addLink = screen.getByRole('add-link');
        expect(addLink).toBeInTheDocument();
    })

    it('view all link should route to employee page', () => {
        const viewAllLink = screen.getByRole('view-link');
        expect(viewAllLink).toBeInTheDocument();
        fireEvent.click(viewAllLink);
    })

    it('add link should route to create page', () => {
        const addLink = screen.getByRole('add-link');
        expect(addLink).toBeInTheDocument();
        fireEvent.click(addLink);
    })
})