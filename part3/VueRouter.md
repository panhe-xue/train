### VueRouter 使用的几点总结：
    1. 配置一个路由列表route path ---> component
    2. 创建一个 router实例 new VueRouter(route)
    3. 传入router实例到Vue new Vue({ router })
    4. route-link组件来切换组件
    5. route-view组件来承载显示匹配组件
    6. vue实例可以访问到$route,$router属性

### install方法需要做哪些事情
    1. 混入$router对象到vue原型上

### 构造函数要做的事情
    1. 