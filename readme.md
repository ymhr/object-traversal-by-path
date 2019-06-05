# Object traversal by path
[![Build Status](https://travis-ci.org/ymhr/object-traversal-by-path.svg?branch=master)](https://travis-ci.org/ymhr/object-traversal-by-path)

Given a path, e.g. `a.b[2].c.d[1].e`, it will navigate down the provided object and return the last value it finds.

You can play with it in a sandbox [here](https://codesandbox.io/embed/stupefied-mendeleev-dd6yv)

## Install
`npm install object-traversal-by-path` or
`yarn add object-traversal-by-path`

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

## Mutating
You can deeply mutate objects with the `mutate` function.

```javascript
import { mutate } from 'object-traversal-by-path';

const object = {
    a: {
        b: [
            { c: 'hello' },
            { c: 'goodbye' }
        ]
    }
};
const path = 'a.b[1].c';

const value = mutate(path, object, () => 'see you soon!'); 

console.log(value.a.b[1].c); // 'see you soon!'

```