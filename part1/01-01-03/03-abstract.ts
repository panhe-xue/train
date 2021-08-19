/**
 * 抽象类可以包含具体方法的实现，接口不会包含具体的实现
 */
export {}
abstract class Animal {
    constructor() {
        
    }

    eat(food: string): void {
        console.log(`吃饭这个食物：${food}`)
    }
}

class Dog extends Animal {

}