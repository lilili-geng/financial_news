import { Router } from "express";
import { Bot } from "../model/Bot";

const router = Router();

router.get("/withdraw-List", async (req, res): Promise<any> => {
    try {
        const bot = new Bot();
        const page = parseInt(req.query.page as string) || 1;
        const pagesize = parseInt(req.query.pagesize as string) || 10;
        const result = await bot.getWithdrawList({ page, pagesize });
        res.json({ success: true, data: result.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get("/deposit_List", async (req, res): Promise<any> => {
    try {
        const bot = new Bot();
        const page = parseInt(req.query.page as string) || 1;
        const pagesize = parseInt(req.query.pagesize as string) || 10;
        const result = await bot.getDepositList({ page, pagesize });
        res.json({ success: true, data: result.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get("/wallet-balance", async (req, res): Promise<any> => {
    try {
        const bot = new Bot();
        const result = await bot.getWalletBalance();
        res.json({ success: true, data: result.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get("/token_price", async (req, res): Promise<any> => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ success: false, message: req.query });
    }
    try {
        const bot = new Bot();
        const result = await bot.getTokenPrice(token as String);
        res.json({ success: true, data: result.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get("/release", async (req, res): Promise<any> => {
    try {
        const bot = new Bot();
        const result = await bot.release();
        console.log(result, "result");
        res.json({ success: true, data: result.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
    }
});


export default router;
