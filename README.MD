## Naming conventions

### Variables
```ts
const example = "";
let exmapleTest = "";
```

### Types/Interfaces
```ts
type Example = {};
interface IExample {};
```

### Classes
```ts
class ExampleClass {}
class TestClass {}
```

### Services
Should be single file, single topic, used when we need to save some type of state, so we create a class that contains the logic and necessary public/private properties

```some-example.service.ts```
```ts
class SomeExampleServiceClass {}
export const SomeExampleService = new SomeExampleServiceClass()
```

### Enums
```ts
enum EXAMPLES {
  EXAMPLE_ONE
  EXAMPLE_TWO
}
enum EXAMPLES_VALUE {
  EXAMPLE_ONE = "EXAMPLE_ONE"
  EXAMPLE_TWO = "EXAMPLE_TWO"
}
```