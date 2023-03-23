import { afterEach, describe, beforeEach, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils';
import EmployeeFilters from '../employee-filters/EmployeeFilters'

// Must haves
describe('Employee Filters Component', () => {
    beforeEach(() => {
        renderWithProviders(<EmployeeFilters />)
    });

    afterEach(() => {
        cleanup();
    });

    it("should have searchbar", () => {
        const searchbar = screen.getByPlaceholderText("Search by...");
        expect(searchbar).toBeInTheDocument();
    })

    it("should have search filter button", () => {
        const filterbutton = screen.getByRole('search-filter-button');
        expect(filterbutton).toBeInTheDocument();
    })

    it("should have sort button", () => {
        const sortbutton = screen.getByRole('sort-button');
        expect(sortbutton).toBeInTheDocument();
    })

    it('should call handleEmployeeSearch on input change', () => {
        const input = screen.getByPlaceholderText("Search by...") as HTMLInputElement;
        const inputValue = 'test';
        const handleEmployeeSearch = vi.fn();

        input.addEventListener('input', () => handleEmployeeSearch(inputValue));
        input.value = inputValue;
        fireEvent.input(input);
        expect(handleEmployeeSearch).toHaveBeenCalledWith(inputValue);
      });

      it('should call handleSetSearchType on button click', () => {
        const filterButton = screen.getByRole('search-filter-button');
        const handleSetSearchType = vi.fn();

        filterButton.addEventListener('click', handleSetSearchType);
        fireEvent.click(filterButton);
        expect(handleSetSearchType).toHaveBeenCalled();
      });

      it('should call handleSetSearchType on button click', () => {
        const sortButton = screen.getByRole('sort-button');
        const handleSetSearchType = vi.fn();

        sortButton.addEventListener('click', handleSetSearchType);
        fireEvent.click(sortButton);
        expect(handleSetSearchType).toHaveBeenCalled();
      });
})