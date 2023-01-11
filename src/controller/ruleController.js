import { start } from "../rules/startsWith.js";

export const factsRules = (req, res) => {
    try {
        const { facts } = req.body;
        console.log('req.body: ', req.body)
        if (!facts.length) {
            res.status(412).json({ error: "Precondition Failed" })
        }
        facts.map(async (fact) => await start().run(fact))
        res.status(200).json({ message: 'OK' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};