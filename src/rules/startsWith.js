import { Engine } from 'json-rules-engine';
import 'colors';

export const start = () => {

    const engine = new Engine();

    engine.addOperator('startsWith', (factValue, jsonValue) => {
        if (!factValue.length) return false;
        return factValue[0].toLowerCase() === jsonValue.toLowerCase();
    })

    const ruleA = {
        conditions: {
            all: [{
                fact: 'word',
                operator: 'startsWith',
                value: 'a'
            }]
        },
        event: {
            type: 'start-with-a'
        }
    };

    engine.addRule(ruleA);

    const ruleB = {
        conditions: {
            all: [{
                fact: 'word',
                operator: 'startsWith',
                value: 'b'
            }]
        },
        event: {
            type: 'start-with-b'
        }
    };

    engine.addRule(ruleB);

    // utility for printing output
    const printEventType = {
        'start-with-a': 'start-with-a',
        'start-with-b': 'start-with-b'
    };

    let facts = { word: '' }

    // Register listeners with the engine for rule success and failure
    engine.on('success', (event) => {
        console.log(facts.word + 'did'.green + printEventType[event.type])
    })

    engine.on('failure', (event) => {
        console.log(facts.word + 'did' + 'NOT'.red + ' ' + printEventType[event.type])
    })

    return engine;
};