import { getOrder } from './util.js';
function genirationOrders(num) {
  const orders = [];
  for(let index = 1; index <= num; index++) {
    const element = getOrder(index);
    orders.push(element);
  }
  return orders;
}

export {genirationOrders};

