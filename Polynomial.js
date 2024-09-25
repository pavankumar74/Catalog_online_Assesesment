const fs = require('fs');

// Function to decode the y values based on their base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation to find the constant term (c)
function lagrangeInterpolation(points) {
    let c = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        // Compute L(i)(0)
        let li = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= (0 - xj) / (xi - xj);
            }
        }

        // Accumulate the constant term
        c += yi * li;
    }

    return c;
}

// Main function to process the test case
function findConstantTerm(filePath) {
    // Read the input JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const n = data.keys.n;
    const k = data.keys.k;
    
    let points = [];
    
    // Read and decode the roots (x, y) pairs
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const base = parseInt(data[i].base);
            const value = data[i].value;
            const y = decodeValue(base, value);
            points.push([i, y]);
        }
    }

    // We only need the first k points
    points = points.slice(0, k);

    // Find the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points);

    console.log("The constant term (c) is:", constantTerm);
}

// Specify the path to the JSON test case
const filePath = 'testcase.json';
findConstantTerm(filePath);
const filePath1 = 'testcase1.json';
findConstantTerm(filePath1);
