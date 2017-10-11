# Object traversal by path
[![Build Status](https://travis-ci.org/ymhr/object-traversal-by-path.svg?branch=master)](https://travis-ci.org/ymhr/object-traversal-by-path)
Given a path, e.g. `a.b[2].c.d[1].e`, it will navigate down the provided object and return the last value it finds.

## Install
`npm install object-traversal-by-path` or
`yarn install object-traversal-by-path`

## Usage
```javascript
import { traverse } from 'object-traversal-by-path';

const object = {
    a: {
        b: {
            c: 'hello world!'
        }
    }
};
const path = 'a.b.c';

const value = traverse(path, object); // value === 'hello world!'
```

This also works with arrays:
```javascript
import { traverse } from 'object-traversal-by-path';

const object = {
    a: {
        b: [
            { c: 'hello' },
            { c: 'goodbye' }
        ]
    }
};
const path = 'a.b[1].c';

const value = traverse(path, object); // value === 'goodbye'
```