export const StatePresetProduct = {
    BEFORE_PAYMENT: 1, // 결제전
    READY: 2, // 상품준비중
    ONGOING_PROTOTYPE: 3, // 시안준비중
    FINISH_PROTOTYPE: 4, // 시안제작완료
    ONGOING_DELIVERY: 5, // 배송중
    DELIVERED: 6, // 배송완료
    CONFIRMED: 7, // 구매확정
    CANCEL: 8, // 취소
    ONGOING_REFUND: 9, // 교환/반품진행중
    FINISH_REFUND: 10, // 교환/반품완료
    DENY_REFUND: 11 // 교환/반품반려
};

export const FormatStatePresetProduct = {
    BEFORE_PAYMENT: '결제전', // 결제전
    READY: '상품준비중', // 상품준비중
    ONGOING_PROTOTYPE: '시안준비중', //
    FINISH_PROTOTYPE: '시안제작완료', //
    ONGOING_DELIVERY: '배송중', //
    DELIVERED: '배송완료', //
    CONFIRMED: '구매확정', //
    CANCEL: '취소', //
    ONGOING_REFUND: '교환/반품진행중', //
    FINISH_REFUND: '교환/반품완료', //
    DENY_REFUND: '교환/반품반려' //
};

export const getStatePresetProductOptions = () => {
    return [
        /*{
            value: StatePresetProduct.BEFORE_PAYMENT,
            label: FormatStatePresetProduct.BEFORE_PAYMENT,
        },*/
        {
            value: StatePresetProduct.READY,
            label: FormatStatePresetProduct.READY,
        },
        {
            value: StatePresetProduct.ONGOING_PROTOTYPE,
            label: FormatStatePresetProduct.ONGOING_PROTOTYPE,
        },
        {
            value: StatePresetProduct.FINISH_PROTOTYPE,
            label: FormatStatePresetProduct.FINISH_PROTOTYPE,
        },
        {
            value: StatePresetProduct.ONGOING_DELIVERY,
            label: FormatStatePresetProduct.ONGOING_DELIVERY,
        },
        {
            value: StatePresetProduct.DELIVERED,
            label: FormatStatePresetProduct.DELIVERED,
        },
        {
            value: StatePresetProduct.CONFIRMED,
            label: FormatStatePresetProduct.CONFIRMED,
        },
        {
            value: StatePresetProduct.CANCEL,
            label: FormatStatePresetProduct.CANCEL,
        },
        {
            value: StatePresetProduct.ONGOING_REFUND,
            label: FormatStatePresetProduct.ONGOING_REFUND,
        },
        {
            value: StatePresetProduct.FINISH_REFUND,
            label: FormatStatePresetProduct.FINISH_REFUND,
        },
        {
            value: StatePresetProduct.DENY_REFUND,
            label: FormatStatePresetProduct.DENY_REFUND,
        },
    ]
};

// 구매 확정 가능 여부
export const CanConfirm = {
    CANNOT_CONFIRM: 0, // 구매 확정 불가능
    CAN_CONFIRM: 1,    // 구매 확정 가능
};

// 리뷰 작성 가능 여부 
export const CanReview = {
    CANNOT_REVIEW: 0, // 리뷰 작성 불가능
    CAN_REVIEW: 1,    // 리뷰 작성 가능
};


// 환불 가능 여부
export const CanRefund = {
    CANNOT_REFUND: 0,  // 환불 불가능
    CAN_REFUND: 1,     // 환불 가능
};


