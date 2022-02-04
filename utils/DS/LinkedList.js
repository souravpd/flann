"use strict";
//Local Imports
const Node = require("./Node");

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertAtHead(newData) {
    let tempNode = new Node(newData);
    tempNode.nextElement = this.head;
    this.head = tempNode;
    return this;
  }
  isEmpty() {
    return this.head == null;
  }
  getHead() {
    return this.head;
  }
  setHead(newHead) {
    this.head = newHead;
    return this;
  }
  getListStr() {
    if (this.isEmpty()) {
      return "null";
    } else {
      let st = "";
      let temp = this.head;
      while (temp != null) {
        st = st + String(temp.data);
        st = st + ";";
        temp = temp.nextElement;
      }
      st = st + "null";
      return st;
    }
  }
  insertAtTail(newData) {
    let node = new Node(newData);
    if (this.isEmpty()) {
      this.head = node;
      return this;
    }
    let currentNode = this.head;
    while (currentNode.nextElement != null) {
      currentNode = currentNode.nextElement;
    }
    currentNode.nextElement = node;
    return this;
  }

  search(value) {
    let currentNode = this.head;
    while (currentNode != null) {
      if (currentNode.data == value) {
        return true;
      }
      currentNode = currentNode.nextElement;
    }
    return false;
  }

  deletAtHead() {
    if (this.isEmpty()) {
      return this;
    }
    let firstElement = this.head;
    this.head = firstElement.nextElement;
    return this;
  }

  deleteVal(value) {
    let deleted = null;
    if (this.isEmpty()) {
      return false;
    }
    let currentNode = this.head;
    if (currentNode.data == value) {
      this.head = currentNode.nextElement;
      return true;
    }

    while (currentNode.nextElement != null) {
      if (currentNode.nextElement.data == value) {
        currentNode.nextElement = currentNode.nextElement.nextElement;
        return true;
      }
      currentNode = currentNode.nextElement;
    }
    deleted = false;
    return deleted;
  }

  deleteAtTail() {
    if (this.isEmpty()) {
      return this;
    }
    let firstNode = this.head;
    if (firstNode.nextElement == null) {
      this.deleteAtHead();
      return this;
    }
    while (firstNode.nextElement.nextElement != null) {
      firstNode = firstNode.nextElement;
    }
    firstNode.nextElement = null;
    return this;
  }
}

module.exports = LinkedList;
