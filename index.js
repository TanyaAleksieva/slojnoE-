/*
Criteria
(3): colType + formatCurrency
(4): All above + COLUMN_TYPE + sortBy
(5): All above + groupBy
(6): All above +  enumerateData
 */

/**
 * all posible things to use
 */
export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

/**
 * check the type of the column
 * @param {any} c 
 * @param {any} item 
 * @returns type of the column
 */
export const colType = (c, item) => c.dynamicType?.(item) || c.type;

/**
 * format the value and sticks together the value and $ 
 * @param {number} value 
 * @returns formatted string
 */
export const formatCurrency = (value) => "$" + value.toString();

/**
 * External function
 * @param value
 * @returns {*} formatted time string
 */
const formatTime = value => value;

/**
 * External function
 * @param value
 * @returns {*} formatted TimeSpan string
 */
const formatTimeSpan = value => value;

/**
 * External function.
 * @param value
 * @returns {*} formatted Date object
 */
const formatDate = value => value;

/**
 * sort array and compare the values after formatting them
 * @param {object[]} array 
 * @param {string[]} keys 
 * @param {boolean} asc 
 * @param {function} valueFormatter formats value before comparated
 * @param {function} ifCallback 
 * @returns sorted array
 */
export function sortBy(array, keys, asc = true, valueFormatter = undefined, ifCallback = undefined) {
    return array.slice().sort((a, b) => comparator(a, b, keys, asc, valueFormatter, ifCallback));
}

/**
 * formatting column cell values
 * @param {number} col 
 * @param {any} item 
 * @returns formatted value
 */
export function formatCellContent(col, item) {
    let formattedValue = col.key ? item[col.key] : item;

    if (col.format)
        formattedValue = col.format(item, col.key,);

    if (typeof formattedValue === 'number')
        switch (col.type) {
            case COLUMN_TYPE.TIME:
                formattedValue = formatTime(formattedValue); break;
            case COLUMN_TYPE.TIMESPAN:
                formattedValue = formatTimeSpan(formattedValue); break;
            case COLUMN_TYPE.DATE:
                formattedValue = formatDate(formattedValue); break;
            case COLUMN_TYPE.CURRENCY:
                formattedValue = formatCurrency(formattedValue); break;
        }
    else if (col.type == COLUMN_TYPE.STATUS)
        formattedValue = col.template(item);

    return formattedValue;
}

/**
 * group different lists
 * @param {any[]} list 
 * @param {number} key 
 * @returns groups of diferent lists
 */
export function groupBy(list, key) {
    return list.reduce((res, x) => {
        (res[x[key]] = res[x[key]] || []).push(x);
        return res;
    }, {});
}

/**
 * enumerate the data in array
 * @param {object[]} data 
 * @param {string} propertyName 
 * @returns a list with another list in it which stores the amount of clicks on one item
 */
export function enumerateData(data, propertyName) {

    if (!data || !Array.isArray(data))
        throw new Error("Data parameter should be array")

    const list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const clickEvent = new CustomEvent('item_selected', {item: data[i]})

        li.innerText = data[i][propertyName] || '';
        li.addEventListener('click', (e) => li.dispatchEvent(clickEvent))

        list.appendChild(li);
    }

    return list;
}


/**
 * External function. Do not put documentation on this.
 * @param a {any}
 * @param b {any}
 * @param keys {string[]}
 * @param asc {boolean}
 * @param valueFormatter {function}
 * @param ifCallback {function}
 * @returns {boolean}
 */
function comparator(a, b, keys, asc, valueFormatter, ifCallback) {
}

const express = require('express');
const app = express();

app.use(express.static('papka'));

app.listen(3000,() => {
    console.log('Application is started');
})