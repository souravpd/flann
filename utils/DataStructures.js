class PQNode {
  constructor(user, distance) {
    (this.user = user), (this.distance = distance);
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length == 0;
  }
  enqueue(user, distance) {
    let pqNode = new PQNode(user, distance);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].distance > pqNode.distance) {
        this.items.splice(i, 0, pqNode);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(pqNode);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  rear() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}
class Graph {
  constructor() {
    this.graph = new Map();
  }
  addVertex(user) {
    this.graph.set(user, new Set());
  }
  addEdge(user1, user2) {
    this.graph.get(user1).add(user2);
    this.graph.get(user2).add(user1);
  }
  printGraph() {
    for (let user of this.graph) {
      console.log(user);
    }
  }
  getGraph() {
    return this.graph;
  }
  dijkstra(start_user) {
    let distance = new Map();
    let parent = new Map();
    for (let user of this.graph.keys()) {
      distance.set(user, Infinity);
      parent.set(user, null);
    }
    distance.set(start_user, 0);
    let pq = new PriorityQueue();
    pq.enqueue(start_user, 0);
    while (!pq.isEmpty()) {
      let current = pq.dequeue();
      let neighbours = this.graph.get(current.user).values();
      for (let n of neighbours) {
        if (distance.get(current.user) + 1 < distance.get(n)) {
          distance.set(n, 1 + distance.get(current.user));
          parent.set(n, current.user);
          pq.enqueue(n, distance.get(n));
        }
      }
    }
    return { distance, parent };
  }
}

// =========TESTING CODE ====================//
// g = new Graph();
// g.addVertex("name1");
// g.addVertex("name2");
// g.addVertex("name3");
// g.addVertex("name4");
// g.addVertex("name5");
// g.addVertex("name6");
// g.addVertex("name7");
// g.addVertex("name8");
// g.addVertex("name9");
// g.addVertex("name10");

// g.addEdge("name1", "name2");
// g.addEdge("name1", "name3");
// g.addEdge("name1", "name4");
// g.addEdge("name2", "name5");
// g.addEdge("name3", "name4");
// g.addEdge("name3", "name6");
// g.addEdge("name6", "name7");
// g.addEdge("name7", "name8");
// g.addEdge("name7", "name9");
// g.addEdge("name9", "name10");
// g.printGraph();

// let { distance, parent } = g.dijkstra("name1");

// console.log(distance);
