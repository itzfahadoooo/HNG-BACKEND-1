const express = require("express");
const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, sumDigits, getProperties } = require("../utils/numberUtils");

const router = express.Router();

router.get("/classify-number", async (req, res) => {
    const { number } = req.query;

    if (!number || isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number);
    const properties = getProperties(num);
    
    try {
        const { data: fun_fact } = await axios.get(`http://numbersapi.com/${num}/math?json`);
        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: sumDigits(num),
            fun_fact: fun_fact.text
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch fun fact" });
    }
});

module.exports = router;
