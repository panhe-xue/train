/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
 }
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let addOne = 0;
    let sum = new ListNode('0');
    let head = sum;
    while(l1 || l2 || addOne) {
    	const val1 = l1 ? l1.val : 0
    	const val2 = l2 ? l2.val : 0
    	const all = val1 + val2 + addOne
    	addOne = val1 + val2 > 10 ? 1 : 0
    	sum.next = new ListNode(all % 10)
    	sum = sum.next
    	if(l1) l1 = l1.next
    	if(l2) l2 = l2.next
    }
	return head.next
};