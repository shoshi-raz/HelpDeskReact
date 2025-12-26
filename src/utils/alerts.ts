import Swal from "sweetalert2";

const commonConfig = {
    confirmButtonColor: '#0b6bcb', 
    reverseButtons: true,
};

export const toast = {
    success: (title: string, text?: string) => {
        return Swal.fire({
            ...commonConfig,
            icon: 'success',
            title,
            text,
            timer: 2000,
            showConfirmButton: false,
        });
    },
    
    error: (title: string = "oops...", text: string = "somesing went wrong...") => {
        return Swal.fire({
            ...commonConfig,
            icon: 'error',
            title,
            text,
            confirmButtonText: 'close',
        });
    },

    confirm: (title: string, text: string) => {
        return Swal.fire({
            ...commonConfig,
            icon: 'warning',
            title,
            text,
            showCancelButton: true,
            confirmButtonText: 'yes,Im sure',
            cancelButtonText: 'cancel',
        });
    }
};