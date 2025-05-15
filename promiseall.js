function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]); // If no promises, resolve immediately with an empty array
      return;
    }

    let results = [];
    let pending = promises.length; // Track number of pending promises

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // Ensure non-promise values are treated as promises
        .then(value => {
          results[index] = value; // Store resolved value
          pending--; // Decrease pending count

          if (pending === 0) {
            resolve(results); // Resolve when all promises succeed
          }
        })
        .catch(reject); // Reject immediately if any promise fails
    });
  });
}

// Test code
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });