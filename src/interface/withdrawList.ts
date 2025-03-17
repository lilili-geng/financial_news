export interface WithdrawListResponse {
    code: number;
    message?: string;
    data?: WithdrawList
}


export interface WithdrawList {
    total: number;
    total_page: number;
    pagesize: number;
    list: WithdrawItem[];
}

export interface WithdrawItem {
    _id: string;
    created_at: number;
    updated_at: number;
    order_sn: string;
    app_id: string;
    user_id: string;
    withdraw_id: number;
    chain: string;
    token: string;
    address: string;
    amount: string;
    status: string;
    check_times: number;
    tx_hash: string;
    src_id: string;
    sync_status: string;
}


export interface TokenBalanceList {
    code: number; // 返回的状态码
    message: string; // 错误信息
    data: TokenBalanceItem
}


export interface TokenBalanceItem {
    withdraw_box_partner_token_balance: number; // 提现盒子伙伴代币余额
    withdraw_box_linkx_token_balance: number; // 提现盒子LINKX代币余额
    admin_address_bnb_balance: number; // 管理员地址BNB余额
}

export interface PriceData {
    usdt_to_token_price: string;
    token_to_usdt_price: string;
}

export interface GetTokenPrice {
    code: number;
    message: string;
    data: PriceData;
}


export interface GetRelease {
    code: number;
    message: string;
}