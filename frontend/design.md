---
{
  "outline": {
    "level": [
      2,
      3
    ]
  }
}
---

# 设计

## 设计原则

| 名称         | 缩写                                     | 说明                                                                                 |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| 单一原则     | **SRP:** Single Responsibility Principle | 一个程序只做好一件事                                                                 |
| 开闭原则     | **OCP:** Open/Closed Principle           | 对扩展开放，对修改关闭                                                               |
| 里氏替换原则 | **LSP:** Liskov Substitution Principle   | 子类替换基类，程序的行为没有发生变化                                                 |
| 依赖倒置原则 | **DIP:** Dependency Inversion Principle  | 高层模块不应该依赖低层模块，两个都应该依赖抽像；抽像不应该依赖细节，细节应该依赖抽像 |
| 接口隔离原则 | **ISP:** Interface Segregation Principle | 客户端不应该依赖那些它不需要的接口                                                   |
| 迪米特原则   | **LoD:** Law of Demeter                  | 一个对象应该对其他对象有最少的了解                                                   |
| 组合复用原则 | **CRP:** Composite Reuse Principle       | 要尽量使用组合，尽量不要使用继承                                                     |

- [深入设计模式](https://refactoringguru.cn/)

## 创建型模式

### 🔸 单例模式

**单例模式（Singleton Pattern）**：一个类在整个应用程序中只实例化一次。

最简单的单例。

```ts
function instance() {}
export { instance }
```

```ts
function instance() {}
module.exports = {
  instance,
}
```

可以看到 `cjs`、`esm` 模块都是 `单例模式`。

#### **使用 `class` 实现**

::: details 示例

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

:::

也可以使用 `闭包` 实现 [单例模式](/frontend/javaScript.html#单例模式)

#### 优缺点

**优点：**

- 对象的唯一性，保证了数据一致性
- 减少内存开销

**缺点：**

- 在使用 `Web Worker` 多线程时可能会导致多个实例被创建，导致无法达到单例的目的。

#### 应用场景

- 模块化
- 工具 `lodash`、`axios` 等
- 状态管理 `vuex`、`pinia`、`redux` 等

::: info
为什么不用全局变量实现❓

- 全局命名污染
- 不易维护，容易被重写覆盖

:::

### 🔸 工厂模式

**工厂模式 (Factory Pattern)**：一种创建对象的方式，使得创建对象的过程与使用对象的过程分离。

#### 模式分类

- 简单工厂模式（Simple Factory）
- 工厂方法模式（Factory Method）
- 抽象工厂模式（Abstract Factory）

#### 简单工厂模式（Simple Factory）

一个工厂类，一个产品类，工厂类创建依据类型创建具体产品。

![简单工厂模式](/img/design/simpleFactory.png)

1. 定义多个产品类
2. 创建一个工厂类
3. 通过一个工厂生产多种产品

::: details 示例

```ts
/**
 * 产品类
 */
class Sedan {
  constructor() {}
  run() {
    console.log('Sedan is running.')
  }
}

class Suv {
  constructor() {}
  run() {
    console.log('Suv is running.')
  }
}

class Truck {
  constructor() {}
  run() {
    console.log('Truck is running.')
  }
}

/**
 * 工厂类
 */
class CarFactory {
  constructor() {}
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

:::

#### 工厂方法模式（Factory Method）

多个工厂类，一个产品类，利用多态创建不同的产品对象。

![工厂方法模式](/img/design/factoryMethod.png)

1. 定义多个产品类
2. 创建一个抽象工厂类
3. 为每种产品创建一个工厂类继承抽象工厂类，并实现抽象方法
4. 通过多个工厂生产对应产品

::: details 示例

```ts
/**
 * 产品类
 */
class Sedan {
  constructor() {}
  run() {
    console.log('Sedan is running.')
  }
}

class Suv {
  constructor() {}
  run() {
    console.log('Suv is running.')
  }
}

class Truck {
  constructor() {}
  run() {
    console.log('Truck is running.')
  }
}
/**
 * 工厂类
 */
class AbstractFactory {
  constructor() {}
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

:::

#### 抽象工厂模式（Abstract Factory）

多个工厂类，多个产品类、产品子类分组，同一个工厂实现类创建同组中不同产品。

![抽象工厂模式](/img/design/abstractFactory.png)

1. 创建一个抽象产品类
2. 定义多个产品类继承抽象产品类，并实现抽象方法
3. 创建一个抽象工厂类
4. 为每种产品创建一个工厂类继承抽象工厂类，并实现抽象方法
5. 通过多组工厂生产对应产品

::: details 示例

```ts
/**
 * 产品类
 */
class AbstractCar {
  constructor() {}
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
  constructor() {}
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

:::

### 🔸 建造者模式

**建造者模式（Builder Pattern）**：它允许你分步骤构建复杂对象。这种模式将对象的构造过程与其表示分离，这样相同的构造过程可以创建不同的表示。

- 生成器 （Builder）：接口声明在所有类型生成器中通用的产品构造步骤。
- 具体生成器 （Concrete Builders）：提供构造过程的不同实现。 具体生成器也可以构造不遵循通用接口的产品。
- 产品 （Products）：是最终生成的对象。 由不同生成器构造的产品无需属于同一类层次结构或接口。
- 主管 （Director）：类定义调用构造步骤的顺序， 这样你就可以创建和复用特定的产品配置。
- 客户端 （Client）：必须将某个生成器对象与主管类关联。 一般情况下， 你只需通过主管类构造函数的参数进行一次性关联即可。 此后主管类就能使用生成器对象完成后续所有的构造任务。 但在客户端将生成器对象传递给主管类制造方法时还有另一种方式。 在这种情况下， 你在使用主管类生产产品时每次都可以使用不同的生成器。

## 结构型模式

### 🔸 适配器模式

**适配器模式（Adapter Pattern）**：通过一个适配器将一个类的接口转换成期望的另一个接口，使原本不能一起工作的类能够协同工作。

#### 结构组成

- 适配者类（旧的标准）
- 目标类（新的标准）
- 适配器类（适配器）

::: details 示例

```ts
/**
 * 适配者类
 */
class Usb {
  constructor() {
    this.name = 'usb'
  }

  use() {
    console.log('Use usb')
  }
}
/**
 * 目标类
 */
class TypeC {
  constructor() {
    this.name = 'type-c'
  }

  use() {
    console.log('Use type-c')
  }
}
/**
 * 适配器
 */
class Adapter {
  constructor(instance) {
    this.name = instance.name
  }

  use() {
    switch (this.name) {
      case 'usb':
        instance.use()
        break
      case 'type-c':
        /**
         * changeover
         */
        console.log('Adapting type-c to usb.')
        break
      default:
        throw new Error('Invalid socket type.')
    }
  }
}

const usb = new Usb()
const typeC = new TypeC()
const normal = new Adapter(typeC)
normal.use()
// Adapting type-c to usb.
```

:::

### 🔸 装饰器模式

**装饰器模式（Decorator Pattern）**：允许向一个现有的对象添加新的功能，同时又不改变其结构。

![装饰器模式](/img/design/decorator.png)

#### Typescript 装饰器

- 类装饰器（Class Decorator）
- 属性装饰器（Property Decorator）
- 方法装饰器（Method Decorator）
- 访问器装饰器（Accessor Decorator）
- 参数装饰器（Parameter Decorator）

#### 解决的问题

- 避免通过继承引入静态特征
- 劫持对象：在运行时动态地添加或修改对象的功能

::: details 示例

```ts
function log(
  _target: any,
  key: string | symbol,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args)
    console.log(`Method ${key.toString()} executed`)
    return result
  }
  return descriptor
}

class Person {
  @log
  say() {
  }
}

const person = new Person()
person.say()
```

:::

### 🔸 代理模式

**代理模式（Proxy Pattern）**：一个对象代表另一个对象以代替其完成功能。

![代理模式](/img/design/proxy.png)

::: details 示例

```ts
const data = {
  name: '张三',
}
const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    console.log('get')
    return result
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    console.log('set')
    return result
  },
})
console.log(proxyData.name)
proxyData.name = '李四'
// get
// 张三
// set
```

:::

## 行为型模式

### 🔸 观察者模式

一种一对多的依赖关系，当 `主题（Subject）` 的状态发生改变时，其所有 `观察者（Observer）` 都会收到通知并自动更新。

#### 结构组成

- 主题（Subject）
- 观察者（Observer）

##### 主题（Subject）

- 提供订阅、取消订阅能力
- 维护观察者列表
- 通知

##### 观察者（Observer）

- 接收通知

![观察者模式](/img/design/observer.png)

::: details 示例

```ts
class Subject {
  constructor() {
    this.observers = new Set()
  }

  subscribe(observer) {
    this.observers.add(observer)
  }

  unsubscribe(observer) {
    this.observers.delete(observer)
  }

  notify(data) {
    for (const observer of this.observers) {
      observer.update(data)
    }
  }
}

class Observer {
  update(data) {
    console.log(data)
  }
}

const subject = new Subject()
const observer = new Observer()
subject.subscribe(observer)
subject.notify('Hello World')
// Hello World
subject.unsubscribe(observer)
subject.notify('Hello World')
```

:::

### 🔸 发布订阅模式

一种多对多的依赖关系，当 `主题（Subject）` 的状态发生改变时，其所有 `观察者（Observer）` 都会收到通知并自动更新。

#### 结构组成

- 发布者（Publisher）
- 事件调度中心（Event Channel）
- 订阅者（Subscriber）

##### 发布者（Publisher）

- 发布信息

##### 事件调度中心（Event Channel）

- 提供订阅、取消订阅能力
- 维护观察者列表
- 通知

##### 订阅者（Subscriber）

- 接收通知

![发布订阅模式](/img/design/publish.png)

::: details 示例

```ts
class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }

  on(name, listener) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Set())
    }
    const listeners = this.listeners.get(name)
    listeners.add(listener)
  }

  off(name, listener) {
    if (this.listeners.has(name)) {
      const listeners = this.listeners.get(name)
      listeners.delete(listener)
    }
  }

  emit(name, data) {
    if (this.listeners.has(name)) {
      const listeners = this.listeners.get(name)
      listeners.forEach(listener => listener(data))
    }
  }

  once(name, listener) {
    const oneTimeListener = (...args) => {
      this.off(name, oneTimeListener)
      listener.apply(this, args)
    }
    this.on(name, oneTimeListener)
  }
}

const eventEmitter = new EventEmitter()

function update(data) {
  console.log(data)
}

eventEmitter.on('message', update)
eventEmitter.emit('message', 'Hello World')
eventEmitter.off('message', update)
console.log(`message has been removed.`)
eventEmitter.emit('message', 'Hello World')
eventEmitter.once('once-message', (data) => {
  console.log(data)
})
eventEmitter.emit('once-message', 'Hello World')
eventEmitter.emit('once-message', 'Hello World again')
// Hello World
// message has been removed.
// Hello World
```

:::

### 🔸 中介者模式

**中介者模式（Mediator Pattern）**：降低多个对象和类之间的通信复杂性。

![中介者模式](/img/design/mediator.png)

## 架构模式

### 🔸 MVC

| 名称                 | 说明         |
| -------------------- | ------------ |
| Model（模型）        | 数据模型     |
| View（视图）         | 视图渲染逻辑 |
| Controller（控制器） | 业务逻辑     |

#### 互动模式

##### 模式一：用户操作视图，如 `input 输入`、`button 按钮` 等。

用户可以直接对 `View` 层的 UI 进行操作，以通过事件通知 `Controller` 层，经过处理后修改 `Model` 层的数据，`Model` 层使用最新数据更新 `View`。

![MVC](/img/design/mvc.png)

##### 模式二：用户触发控制器，如 `hashchange 路由`、`keyboard 键盘`、`task 定时任务` 等。

用户也可以直接触发 `Controller` 去更新 `Model` 层状态，再更新 `View` 层。

![MVC](/img/design/mvc2.png)

### 🔸 MVP

| 名称                | 说明         |
| ------------------- | ------------ |
| Model（模型）       | 数据模型     |
| View（视图）        | 视图渲染逻辑 |
| Presenter（控制器） | 业务逻辑     |

#### 互动模式

`View` 层 和 `Model` 层完全解耦，所有的状态都通过 `Presenter` 层进行管理。

![MVP](/img/design/mvp.png)

### 🔸 MVVM

| 名称                  | 说明                         |
| --------------------- | ---------------------------- |
| Model（模型）         | 数据模型                     |
| View（视图）          | 视图渲染逻辑                 |
| ViewModel（视图模型） | 视图逻辑与数据逻辑绑定的模型 |

与 `MVP` 模式理念基本一致，只不过视图逻辑与数据逻辑是双绑的。

![MVVM](/img/design/mvvm.png)
