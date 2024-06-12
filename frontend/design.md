# 设计

::: tip

- 本文的设计模式只针对前端，与后端 MVC 流程略有差异，但殊途同归。
- 关于设计每个人的理解都略有差异，这里只论设计模式优劣，不论对错。

:::

## 🔸 MVC

| 名称                 | 说明         |
| -------------------- | ------------ |
| Model（模型）        | 数据模型     |
| View（视图）         | 视图渲染逻辑 |
| Controller（控制器） | 业务逻辑     |

### 互动模式

#### 模式一：用户操作视图，如 `input 输入`、`button 按钮` 等。

用户可以直接对 `View` 层的 UI 进行操作，以通过事件通知 `Controller` 层，经过处理后修改 `Model` 层的数据，`Model` 层使用最新数据更新 `View`。

![MVC](/img/design/mvc.png)

#### 模式二：用户触发控制器，如 `hashchange 路由`、`keyboard 键盘`、`task 定时任务` 等。

用户也可以直接触发 `Controller` 去更新 `Model` 层状态，再更新 `View` 层。

![MVC](/img/design/mvc2.png)

## 🔸 MVP

| 名称                | 说明         |
| ------------------- | ------------ |
| Model（模型）       | 数据模型     |
| View（视图）        | 视图渲染逻辑 |
| Presenter（控制器） | 业务逻辑     |

### 互动模式

`View` 层 和 `Model` 层完全解耦，所有的状态都通过 `Presenter` 层进行管理。

![MVP](/img/design/mvp.png)

## 🔸 MVVM

| 名称                  | 说明                         |
| --------------------- | ---------------------------- |
| Model（模型）         | 数据模型                     |
| View（视图）          | 视图渲染逻辑                 |
| ViewModel（视图模型） | 视图逻辑与数据逻辑绑定的模型 |

与 `MVP` 模式理念基本一致，只不过视图逻辑与数据逻辑是双绑的。

![MVVM](/img/design/mvvm.png)

## 🔸 单例模式

**单例模式（Singleton Pattern）**：一个类在整个应用程序中只实例化一次。

最简单的单例。

```ts
function instance() {}
export { instance }
```

```ts
function instance() {}
module.exports = {
  instance
}
```

可以看到 `cjs`、`esm` 模块都是 `单例模式`。

### **使用 `class` 实现**

```ts
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance
    }
    this.text = 'Hello World'
    // 只执行一次
    console.log(this.text)
    Singleton.instance = this
  }

  say() {
    console.log('say', this.text)
  }
}
const instance1 = new Singleton()
const instance2 = new Singleton()
instance1.say()
instance2.say()
console.log(instance1 === instance2)
// Hello World
// say Hello World
// say Hello World
// true
```

也可以使用 `闭包` 实现 [单例模式](/frontend/javaScript.html#单例模式)

### 优缺点

**优点：**

- 对象的唯一性，保证了数据一致性
- 减少内存开销

**缺点：**

- 在使用 `Web Worker` 多线程时可能会导致多个实例被创建，导致无法达到单例的目的。

### 应用场景

- 模块化
- 工具 `lodash`、`axios` 等
- 状态管理 `vuex`、`pinia`、`redux` 等

::: info
为什么不用全局变量实现❓

- 全局命名污染
- 不易维护，容易被重写覆盖

:::

## 🔸 工厂模式

**工厂模式 (Factory pattern)**：一种创建对象的方式，使得创建对象的过程与使用对象的过程分离。

- 简单工厂模式（Simple Factory）
- 工厂方法模式（Factory Method）
- 抽象工厂模式（Abstract Factory）

### 简单工厂模式（Simple Factory）

一个工厂类，一个产品类，工厂类创建依据类型创建具体产品。

![简单工厂模式](/img/design/simpleFactory.png)

1. 定义多个产品类
2. 创建一个工厂类
3. 通过一个工厂生产多种产品

```ts
/**
 * 产品类
 */
class Sedan {
  constructor() { }
  run() {
    console.log('Sedan is running.')
  }
}

class Suv {
  constructor() { }
  run() {
    console.log('Suv is running.')
  }
}

class Truck {
  constructor() { }
  run() {
    console.log('Truck is running.')
  }
}

/**
 * 工厂类
 */
class CarFactory {
  constructor() { }
  createSedan() {
    console.log('Sedan is created.')
    return new Sedan()
  }

  createSuv() {
    console.log('Suv is created.')
    return new Suv()
  }

  createTruck() {
    console.log('Truck is created.')
    return new Truck()
  }
}

class CarStore {
  static buy(type) {
    const factory = new CarFactory()
    switch (type) {
      case 'sedan':
        return factory.createSedan()
      case 'suv':
        return factory.createSuv()
      case 'truck':
        return factory.createTruck()
      default:
        throw new Error('Invalid car type.')
    }
  }
}

const sedan = CarStore.buy('sedan')
sedan.run()
const suv = CarStore.buy('suv')
suv.run()
const truck = CarStore.buy('truck')
truck.run()
// Sedan is created.
// Sedan is running.
// Suv is created.
// Suv is running.
// Truck is created.
// Truck is running.
```

### 工厂方法模式（Factory Method）

多个工厂类，一个产品类，利用多态创建不同的产品对象。

![工厂方法模式](/img/design/factoryMethod.png)

1. 定义多个产品类
2. 创建一个抽象工厂类
3. 为每种产品创建一个工厂类继承抽象工厂类，并实现抽象方法
4. 通过多个工厂生产对应产品

```ts
/**
 * 产品类
 */
class Sedan {
  constructor() { }
  run() {
    console.log('Sedan is running.')
  }
}

class Suv {
  constructor() { }
  run() {
    console.log('Suv is running.')
  }
}

class Truck {
  constructor() { }
  run() {
    console.log('Truck is running.')
  }
}
/**
 * 工厂类
 */
class AbstractFactory {
  constructor() { }
  create() {
    throw new Error('This method should be implemented in subclass.')
  }
}

class SedanFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Sedan is created.')
    return new Sedan()
  }
}

class SuvFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Suv is created.')
    return new Suv()
  }
}

class TruckFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Truck is created.')
    return new Truck()
  }
}

class CarStore {
  static buy(type) {
    switch (type) {
      case 'sedan': {
        const factory = new SedanFactory()
        return factory.create()
      }
      case 'suv': {
        const factory = new SuvFactory()
        return factory.create()
      }
      case 'truck': {
        const factory = new TruckFactory()
        return factory.create()
      }
      default:
        throw new Error('Invalid car type.')
    }
  }
}

const sedan = CarStore.buy('sedan')
sedan.run()
const suv = CarStore.buy('suv')
suv.run()
const truck = CarStore.buy('truck')
truck.run()
// Sedan is created.
// Sedan is running.
// Suv is created.
// Suv is running.
// Truck is created.
// Truck is running.
```

### 抽象工厂模式（Abstract Factory）

多个工厂类，多个产品类、产品子类分组，同一个工厂实现类创建同组中不同产品。

![抽象工厂模式](/img/design/abstractFactory.png)

1. 创建一个抽象产品类
2. 定义多个产品类继承抽象产品类，并实现抽象方法
3. 创建一个抽象工厂类
4. 为每种产品创建一个工厂类继承抽象工厂类，并实现抽象方法
5. 通过多组工厂生产对应产品

```ts
/**
 * 产品类
 */
class AbstractCar {
  constructor() { }
  run() {
    throw new Error('This method should be implemented in subclass.')
  }
}

class Sedan extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Sedan is running.')
  }
}

class Suv extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Suv is running.')
  }
}

class Truck extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Truck is running.')
  }
}

class Sedan2 extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Sedan2 is running.')
  }
}

class Suv2 extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Suv2 is running.')
  }
}

class Truck2 extends AbstractCar {
  constructor() {
    super()
  }

  run() {
    console.log('Truck2 is running.')
  }
}
/**
 * 工厂类
 */
class AbstractFactory {
  constructor() { }
  create() {
    throw new Error('This method should be implemented in subclass.')
  }
}

class SedanFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Sedan is created.')
    return new Sedan()
  }
}

class SuvFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Suv is created.')
    return new Suv()
  }
}

class TruckFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Truck is created.')
    return new Truck()
  }
}

class SedanBranchFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Sedan is created at the branch.')
    return new Sedan2()
  }
}

class SuvBranchFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Suv is created at the branch.')
    return new Suv2()
  }
}

class TruckBranchFactory extends AbstractFactory {
  constructor() {
    super()
  }

  create() {
    console.log('Truck is created at the branch.')
    return new Truck2()
  }
}

class CarStore {
  static buy(type, from) {
    switch (type) {
      case 'sedan': {
        let factory = new SedanFactory()
        if (from === 1) {
          factory = new SedanBranchFactory()
        }
        return factory.create()
      }
      case 'suv': {
        let factory = new SuvFactory()
        if (from === 1) {
          factory = new SuvBranchFactory()
        }
        return factory.create()
      }
      case 'truck': {
        let factory = new TruckFactory()
        if (from === 1) {
          factory = new TruckBranchFactory()
        }
        return factory.create()
      }
      default:
        throw new Error('Invalid car type.')
    }
  }
}

const sedan = CarStore.buy('sedan')
sedan.run()
const suv = CarStore.buy('suv')
suv.run()
const truck = CarStore.buy('truck')
truck.run()

const sedan2 = CarStore.buy('sedan', 1)
sedan2.run()
const suv2 = CarStore.buy('suv', 1)
suv2.run()
const truck2 = CarStore.buy('truck', 1)
truck2.run()
// Sedan is created.
// Sedan is running.
// Suv is created.
// Suv is running.
// Truck is created.
// Truck is running.
// Sedan is created at the branch.
// Sedan2 is running.
// Suv is created at the branch.
// Suv2 is running.
// Truck is created at the branch.
// Truck2 is running.
```
