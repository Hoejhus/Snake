"use strict";


const node1 = {
  prev: null,
  next: null,
  data: "A",
};

const node2 = {
  prev: null,
  next: null,
  data: "B",
};

const node3 = {
  prev: null,
  next: null,
  data: "C",
};

const node4 = {
  prev: null,
  next: null,
  data: "D",
};

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;

export class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  dumplist() {
    let current = this.head;
    while (current !== null) {
      console.log(`
  node: ${current.data}
  -----------
    prev: ${current.prev ? current.prev.data : null}
    next: ${current.next ? current.next.data : null}
  `);
      current = current.next;
    }
  }

  addLast(data) {
    const newNode = new Node(data);

    if (!this.head) {
      //hvis der ikke er en head, så laver den en ny head og tail ud fra det nye node
      this.head = newNode;
      this.tail = newNode;
    } else {
      //ellers sætter den tail til at være newNode og sætter newNode.prev til at være tail
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  addFirst(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  removeFirst() {
    if (!this.head) {
      return;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }

  removeLast() {
    if (!this.head) {
      return;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }

  removeNode(node) {
    //node er ll.head/ll.tail.xxxx
    if (!this.head || !node) {
      return;
    }

    if (this.head === node) {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    node.prev = null;
    node.next = null;
  }

  insertBefore(nextNode, data) {
    if (!node) {
      return;
    }

    const newNode = new Node(data);

    newNode.prev = nextNode.prev;
    newNode.next = nextNode;

    nextNode.prev = newNode;
  }

  insertAfter(prevNode, data) {
    if (!node) {
      return;
    }

    const newNode = new Node(data);

    newNode.next = prevNode.next;

    prevNode.next = newNode;
  }


  nodeAt(index) {
    let current = this.head;
    let i = 0;

    while (current !== null && i < index) {
      current = current.next;
      i++;
    }

    return current;
  }
  removeNodeAt(index) {
    const node = this.nodeAt(index);
    this.removeNode(node);
  }

  
  swapNodes(node1, node2) {
    if (!node1 || !node2) {
      return;
    }

    if (node1.prev) {
      node1.prev.next = node2;
    } else {
      this.head = node2;
    }

    if (node1.next) {
      node1.next.prev = node2;
    } else {
      this.tail = node2;
    }

    if (node2.prev) {
      node2.prev.next = node1;
    } else {
      this.head = node1;
    }

    if (node2.next) {
      node2.next.prev = node1;
    } else {
      this.tail = node1;
    }

    const temp = node1.next;
    node1.next = node2.next;
    node2.next = temp;

    const temp2 = node1.prev;
    node1.prev = node2.prev;
    node2.prev = temp2;
  }
}

const ll = new LinkedList();
console.log(ll);