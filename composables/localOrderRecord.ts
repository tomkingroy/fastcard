import type { IOrderRecordItems } from "~/service/order/types"

const ORDER_RECORD_KEY = 'PROIPS_ORDER_RECORD_KEY'
export const getLocalOrderRecords = async (): Promise<IOrderRecordItems[]> => {
    try {
        const localOrderRecord = localStorage.getItem(ORDER_RECORD_KEY);
        return localOrderRecord ? JSON.parse(localOrderRecord) : [];
    } catch (error) {
        console.error("Failed to parse local order records:", error);
        return [];
    }
};

export const addOrderRecordToLocal = async (orderInfo: IOrderRecordItems): Promise<void> => {
    try {
        const orderRecords = await getLocalOrderRecords();
        orderRecords.push(orderInfo);
        localStorage.setItem(ORDER_RECORD_KEY, JSON.stringify(orderRecords));
        console.log("Order record added successfully.");
    } catch (error) {
        console.error("Failed to add order record:", error);
    }
};

export const updateOrderRecordInLocal = async (orderId: string, updatedOrderInfo: Partial<IOrderRecordItems>): Promise<void> => {
    try {
        const orderRecords = await getLocalOrderRecords();
        const orderIndex = orderRecords.findIndex(order => order.orderId === orderId);

        if (orderIndex === -1) {
            console.warn(`Order with orderId ${orderId} not found.`);
            return;
        }

        // Update the specific order record
        orderRecords[orderIndex] = {
            ...orderRecords[orderIndex],
            ...updatedOrderInfo
        };

        localStorage.setItem(ORDER_RECORD_KEY, JSON.stringify(orderRecords));
        console.log("Order record updated successfully.");
    } catch (error) {
        console.error("Failed to update order record:", error);
    }
};
