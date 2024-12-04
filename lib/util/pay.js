const update = (e) => {
    e.preventDefault();
    ordersApi.update(orderId, form, (response)=>{
        const data = response.data.data;
        pay(data.imp_code, data.m_redirect_url, data.order);
    })
}

const pay = (impCode, redirectUrl, order) => {
    let IMP = window.IMP; // 생략가능

    IMP.init(impCode); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    IMP.request_pay({
        pg: order.pay_method_pg,
        pay_method: order.pay_method_method,
        merchant_uid: order.merchant_uid,
        customer_id: order.merchant_uid,
        name: order.buyer_name,
        escrow: false,
        goods_name: order.format_preset_products,
        amount: order.price,
        buyer_name: order.buyer_name,
        buyer_tel: order.buyer_contact,
        buyer_email: user ? user.email : '',
        buyer_addr: order.buyer_address,
        buyer_postcode: form.buyer_address_zipcode,
        m_redirect_url: redirectUrl,
        display: { card_quota: [0, 6] },
    }, function (response) {
        if (!response.error_msg) {
            form.imp_uid = response.imp_uid;
            form.merchant_uid = response.merchant_uid;

            setForm({ ...form });

            ordersApi.complete(form, (response) => {
                const order = response.data.data;

                // 라우터 코드 이거 맞는지 모르겠네요 어쨋든 아래 url로 보내는게 핵심
                router.push(`/orders/result?buyer_contact=${order.buyer_contact}&merchant_uid=${order.merchant_uid}`);
            })
        } else {
            let msg = response.error_msg;

            alert(msg);
        }
    });
}