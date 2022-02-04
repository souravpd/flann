"use strict";
const LinkedList = require("./LinkedList");
const Node = require("./Node");

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.list = [];
    let it;
    for (it = 0; it < vertices; it++) {
      let temp = new LinkedList();
      this.list.push(temp);
    }
  }

  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.list[source].insertAtHead(destination);
      this.list[destination].insertAtHead(source);
    }
  }

  printGraph() {
    let i;
    let st = "";
    for (i = 0; i < this.list.length; i++) {
      st = st + "|" + String(i) + "| => ";
      let temp = this.list[i].getHead();
      while (temp != null) {
        st = st + "[" + String(temp.data) + "] -> ";
        temp = temp.nextElement;
      }
      st = st + "\n";
    }
    return st;
  }
}

module.exports = Graph;
