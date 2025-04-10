export type Photo = {
    id: string;
    download_url: string;
    author: string;
    width: number;
    height: number;
    url: string;
};

export type PhotoState = {
    photos: Photo[];
    likedPhotos: string[];
};
export type Bill = {
    id: string;
    title: string;
    amount: number;
    paid: boolean;
};

export type Installment = {
    id: string;
    product: string;
    monthlyPayment: number;
    totalPayments: number;
    remaining: number;
};