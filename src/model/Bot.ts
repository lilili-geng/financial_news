
import { config } from '../config';
import { WithdrawList, TokenBalanceList, PriceData, GetRelease } from '../interface/index';

export class Bot {

    private config: config;

    constructor() {
        this.config = new config(); // 实例化 config 类
    }

    /**
     * 获取提现列表的异步方法
     *
     * @param param 参数对象，包含页码和每页显示数量
     * @param param.page 页码
     * @param param.pagesize 每页显示数量
     * @returns 返回一个Promise对象，包含code、data和msg属性
     * @returns.code 响应状态码，1表示成功，0表示失败
     * @returns.data 提现列表数据，成功时返回，失败时为undefined
     * @returns.msg 错误信息，失败时返回，成功时为undefined
     */
    public async getWithdrawList({
        page,
        pagesize,
    }: { page: number; pagesize: number }): Promise<{ code: number; data?: WithdrawList; msg?: string }> {
        try {
            const url = `${this.config.host}link/withdraw_list`;

            const params = {
                page,
                pagesize,
            };

            const result = await this.config.getResult(url, params, "GET");
            if (result.code === 0 && result.data?.list) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: "系统错误" };
        }
    }


    /**
     * 获取收藏列表
     *
     * @param options 包含分页信息的对象
     * @param options.page 当前页码
     * @param options.pagesize 每页显示的条数
     * @returns 返回一个Promise对象，该对象包含一个code字段表示状态码，一个data字段表示收藏列表数据（可选），一个msg字段表示错误信息（可选）
     * @throws 如果请求过程中出现错误，会抛出异常
     */
    public async getCollectList({
        page,
        pagesize,
    }: { page: number; pagesize: number }): Promise<{ code: number; data?: WithdrawList; msg?: string }> {
        try {
            const url = `${this.config.host}link/collect_list`;

            const params = {
                page,
                pagesize,
            };
            const result = await this.config.getResult(url, params, "GET");
            if (result.code === 0 && result.data?.list) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: "系统错误" };
        }
    }


    /**
     * 获取存款列表
     *
     * @param params 包含分页信息的对象
     * @param params.page 当前页码
     * @param params.pagesize 每页显示数量
     * @returns 返回包含状态码、数据和消息的Promise对象
     */
    public async getDepositList({
        page,
        pagesize,
    }: { page: number; pagesize: number }): Promise<{ code: number; data?: WithdrawList; msg?: string }> {
        try {
            const url = `${this.config.host}link/deposit_list`;

            const params = {
                page,
                pagesize,
            };

            const result = await this.config.getResult(url, params, 'GET');
            if (result.code === 0 && result.data?.list) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: '系统错误' };
        }
    }


    /**
     * 获取热钱包余额
     *
     * @returns 返回一个包含状态码、数据以及错误信息的对象。
     * - `code`: 状态码，1 表示成功，0 表示失败。
     * - `data`: 成功时返回的钱包余额列表，失败时为 `undefined`。
     * - `msg`: 错误信息，成功时为 `undefined`，失败时包含错误信息。
     */
    public async getWalletBalance(): Promise<{ code: number; data?: TokenBalanceList; msg?: string }> {
        try {
            const url = `${this.config.host}link/wallet_balance`;

            // 获取钱包余额
            const result = await this.config.getResult(url, {}, 'GET');
            if (result.code === 0 && result.data) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: '系统错误' };
        }
    }



    /**
     * 获取代币价格
     *
     * @param token 代币符号
     * @returns Promise对象，包含code、data和msg属性。code为返回状态码，data为代币价格数据，msg为错误信息
     * LINK token ： 0x0D0D3547891BcA1B97964922725A1Ec1ff3258b3
     */
    public async getTokenPrice(token: String): Promise<{ code: number; data?: PriceData; msg?: string }> {
        try {
            const url = `${this.config.host}link/token_price/${token}`;

            // 获取钱包余额
            const result = await this.config.getResult(url, {}, 'GET');
            if (result.code === 0 && result.data) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: '系统错误' };
        }
    }




    /**
     * 获取释放
     *
     * @returns Promise对象，包含code、data和msg属性。code为返回状态码，data为代币价格数据，msg为错误信息
     * wallet token ： 0x8c2eC7Ff0d99167024190B6F48e60960740F5CeE
     */
    public async release(): Promise<{ code: number; data?: GetRelease; msg?: string }> {
        try {
            const url = `${this.config.host}link/${this.config.app_id}/release`;

            // 获取钱包余额
            const result = await this.config.getResult(url, {
                address: "0x8c2eC7Ff0d99167024190B6F48e60960740F5CeE"
            }, 'POST');

            if (result.code === 0 && result.data) {
                return { code: 1, data: result.data };
            } else {
                return { code: 0, msg: result.message || "未知错误" };
            }
        } catch (e) {
            return { code: 0, msg: '系统错误' };
        }
    }
}