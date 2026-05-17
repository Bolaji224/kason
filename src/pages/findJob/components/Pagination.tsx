// src/components/Pagination.tsx
import React from 'react';
import { BiChevronRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className='mt-1'
                    onClick={() => handlePageClick(i)}
                    disabled={i === currentPage}
                    style={{
                        margin: '0 5px',
                        padding: '2px 10px',
                        cursor: i === currentPage ? 'default' : 'pointer',
                        backgroundColor: i === currentPage ? '#EE009D' : 'white',
                        border: '0.5px solid #ee009d',
                        borderRadius: '5px'
                    }}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div style={{ display: 'flex', flexWrap : "wrap", gap : 2, justifyContent: 'center', alignItems: 'center', margin: '20px auto' }} className='w-[300px] lg:w-[800px] mx-auto'>
            <button onClick={handlePrevious} disabled={currentPage === 1} className='mt-1 flex items-center  border-[1px] border-[#EE009d] text-[14px] rounded-[5px] px-[16px] py-[8px] gap-2'>
            <BiChevronLeft size={18} /> Prevs
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages} className='mt-1 flex items-center  border-[1px] border-[#EE009d] text-[14px] rounded-[5px] px-[16px] py-[8px] gap-2'>
                Next <BiChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
