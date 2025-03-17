import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export class config {

    public host: string = 'https://crt.linktech.one/';
    public app_id: string = '01JKDBVWYG9NERBG8SA8YJD8CT';
    public key: string = 'Gobcg9BBCNdHI8oAuvW2faJP5VDR6sko';

    public async getResult(url: string, data: any, method: 'GET' | 'POST' = 'GET'): Promise<any> {
        const headers = { 'Content-Type': 'application/json' };
        // console.log(`[${method}] 请求 URL:`, url);
        // console.log(`[${method}] 请求参数:`, JSON.stringify(data));

        let response;

        try {
            if (method === 'POST') {
                const signedData = this.getSignature(data);
                response = await axios.post(url, signedData, { headers });
            } else {
                const queryString = new URLSearchParams(data).toString();
                const getUrl = `${url}?${queryString}`;
                response = await axios.get(getUrl, { headers });
            }

            // console.log(`[${method}] 响应数据:`, JSON.stringify(response.data, null, 2));

            // 写入日志文件
            this.writeLog(`${new Date().toISOString()} [${method}] ${url}\n${JSON.stringify(response.data)}\n`);

            return response.data;
        } catch (error: any) {
            // console.error(`[${method}] 请求错误:`, error);

            // 写入错误日志
            this.writeLog(`${new Date().toISOString()} [${method}] ${url} 请求失败\n错误信息: ${error.message || error}\n`);

            throw error; // 让外部捕获并处理
        }
    }

    private writeLog(logText: string) {
        const logDir = path.join(__dirname, '../log');
        const dateStr = new Date().toISOString().slice(0, 10); // 获取当天日期 "yyyy-mm-dd"
        const logFilePath = path.join(logDir, `${dateStr}_bot.log`);

        // 检查日志目录是否存在，如果不存在则创建
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // 将日志文本追加到日志文件
        fs.appendFileSync(logFilePath, logText);
    }



    /**
     * 生成签名
     */
    private getSignature(data: any): any {
        data.timestamp = Math.floor(Date.now() / 1000);
        const sortedData = Object.keys(data)
            .sort()
            .reduce((acc, key) => {
                acc[key] = data[key];
                return acc;
            }, {} as any);

        const queryString = new URLSearchParams(sortedData).toString();
        const signature = this.md5(`${queryString}&${this.key}`);

        return { ...sortedData, signature };
    }

    /**
     * MD5 哈希函数
     */
    private md5(input: string): string {
        return require('crypto').createHash('md5').update(input).digest('hex');
    }
}