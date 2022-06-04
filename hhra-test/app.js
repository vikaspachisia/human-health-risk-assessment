'use strict';

console.log('Hello world');
const apps = new Map([
    [
        'monolith',
        {
            name: 'monolith gateway',
            description: 'The gateway servicing all form factors (web, mobile, api...).'
        }
    ],
    [
        'web',
        {
            name: 'web gateway',
            description: 'The gateway primarily servicing desktop/laptop form factors.'
        }
    ],
    [
        'mobile',
        {
            name: 'mobile gateway',
            description: 'The gateway primarily servicing mobile form factors.'
        }
    ],
    [
        'api',
        {
            name: 'api gateway',
            description: 'The gateway primarily servicing api requests.'
        }
    ]
]);


console.log(apps.keys((x) => x));
console.log('Bye world');