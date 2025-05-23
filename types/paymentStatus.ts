enum paymentStatus {

    // Payment was successful, and the customer paid the exact required amount.
    paid = 'paid',

    // Payment was successful, and the customer paid more than required.
    paid_over = 'paid_over',

    // Payment was successful, but the customer paid less than required.
    wrong_amount = 'wrong_amount',

    // Payment is in process.
    process = 'process',

    // Transaction has been detected on the blockchain, waiting for required network confirmations.
    confirm_check = 'confirm_check',

    // Customer paid less than required, additional payment may be needed.
    wrong_amount_waiting = 'wrong_amount_waiting',

    // Waiting for the transaction to appear on the blockchain.
    check = 'check',

    // Payment failed.
    fail = 'fail',

    // Payment was canceled; no payment was made by the customer.
    cancel = 'cancel',

    // A system error occurred.
    system_fail = 'system_fail',

    // Refund is being processed.
    refund_process = 'refund_process',

    // An error occurred during the refund process.
    refund_fail = 'refund_fail',

    // Refund was successfully completed.
    refund_paid = 'refund_paid',

    // Funds are locked due to AML (Anti-Money Laundering) compliance.
    locked = 'locked'
}

export const paymentStatusTranslations = {
    paid: "Payment successful.",
    paid_over: "Payment successful. You paid more than required.",
    wrong_amount: "Payment successful, but the amount is incorrect.",
    process: "Payment is in process.",
    confirm_check: "Transaction detected, awaiting confirmation.",
    wrong_amount_waiting: "Partial payment received, additional payment needed.",
    check: "Awaiting transaction on the blockchain.",
    fail: "Payment failed.",
    cancel: "Payment canceled, no payment received.",
    system_fail: "System error occurred.",
    refund_process: "Refund in process.",
    refund_fail: "Error during refund process.",
    refund_paid: "Refund successful.",
    locked: "Funds are locked due to compliance review."
};

export default paymentStatus
