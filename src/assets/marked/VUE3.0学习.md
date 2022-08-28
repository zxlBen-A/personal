# VUE3.0学习

### 一、创建vue3.0工程

#### 重点改动

​ 1.双向绑定原理，使用 **Proxy** 代替 **Object.defineProperty** 实现

​ 2.新的特性(第二部分)，拥抱 TS

#### 安装项目

```
## 第一种办法 使用vue.cli创建项目

## 创建工程
vue create clivue3.0(项目名称)

## 进入
 	cd clivue3.0
  	npm run serve

```

vite 一 新一代前端构建工具

​    **优势**：开发环境中，无需打包操作，可快速实现冷启动

​ 轻量快速热加载

​ 真正的按需编译，不在等待整个应用编译完成

```HTML
## 第二种办法 使用vite创建项目

## 创建工程
npm init vite-app vitevue3.0(项目名称)

##进入 安装依赖，根据提示操作
```

#### 分析工程

​ 入口文件 main.js 分析

```
//引入的不在是一个Vue构造函数，引入的一个名为 createApp的工厂函数(工厂函数不需要new关键字创建)
import {createApp} from 'vue'
import App from './App.vue'

//创建应用实例对象-app（类似与vue2中的vm，但app比vm更"轻"）
const app = createApp(App)
//挂载
app.mount('#app')

//卸载,一般用不到，  在app对象中的方法
//app.unmount('#app')
```

### 二、常用Composition API（组合式api）

##### 1.拉开序幕的 setup

​ 1.理解：Vue3.0中的一个 **新的配置项**，值为一个 **函数**

​ 2.setup 是所有  <font color='red'>Composition API</font> "表演舞台"

​ 3.组件中用到的数据，方法等等，均要配置在**setup**中

​ 4.<font color='red'> setup函数的两种返回值：</font> **必须**

​ 1.若返回一个<font color='red'>对象</font>，则对象中的属性，方法，在模板中均可以直接使用（重点）

​ 2.返回一个渲染函数，可以自定义内容（了解）

5. <font color='red'>注意点</font>：
1. 尽量不要与vue2.x配置混用
2. **setup不能是一个async函数，因为返回值不再是return的对象，模板看不到return的属性**

##### 2.ref函数

​ 作用：定义一个响应式的数据

​ 语法：const xxx=ref(initValue)

​ 创建一个包含响应式数据的 <font color='red'>引用对象</font>

​ JS中操作数据：xxx.value

​ 模板中操作数据：不需要value，直接使用就可以

​ 备注：

​ 接收的数据可以是：基本类型，也可以是对象类型

​ 基本类型的数据：响应式依然是靠Object.defineProperty()的get与set完成的

​                **对象类型的数据**：<font color='red'>内部‘求助’了vue3.0中的一个新函数----  **reactive函数**  </font>

​ 作用：定义一个对象类型的响应数据(基本类型不用它，要用  **ref**  函数) ， 就不需要写value值在获取值

​ 语法：const 代理对象=reactive（源对象）接收一个对象或数组，返回一个**代理对象（Proxy对象）**

​ reactive定义的响应式数据是 **“深层次的”**

​ 内部基于 ES6 的 Proxy实现，通过代理对象操作源对象内部数据进行操作

##### 4.Vue3.0的响应式

​ 实现原理

​ 1.通过  **Proxy**（代理）：拦截对象中任意属性的变化，包括：属性的读写，属性的添加，属性的删除等

​ 2.通过  **Reflect**（反射）：对对象的属性进行操作

​ MDN看详解 （Proxy Reflect）

```
  //vue3的 响应式 数据代理  监听整个对象
  let obj={
    name:"zyj",
    age:18
  }
  let objq=new Proxy(obj,{
    //有人读取objq的某个属性时调用
    get(target, p) {
      console.log(`获取了值${p}`)
      return Reflect.get(target,p)
    },
    //有人修改objq的某个属性，或者 添加某个属性 时调用
    set(target, p, value) {
      console.log(`修改了${p}值`)
      Reflect.set(target,p,value)
    },
    //有人删除objq的某个属性时调用   deleteProperty 删除时会返回一个布尔值，最好返回删除的结果，
    deleteProperty(target, p) {
      console.log(`删除了${p}值`)
      return Reflect.deleteProperty(target,p)
    }
  })
```

##### 5.reactive对比ref

​ 1.从定义数据角度对比：

​        **ref** 用来定义：<font color='red'>基本数据类型</font>

​        **reactive** 用来定义：<font color='red'>对象（数组）类型数据</font>

​ 备注：ref也可以用来定义对象 数组，它内部会自动通过 reactive 转为代理对象

​ 2.从原理角度对比：

​        **ref**  通过   <font color='red'>Object.defineProperty </font>  的 get 和 set 来实现响应式

​        **reactive** 通过使用  <font color='red'>Proxy </font> 来实现响应式（数据劫持） 并通过   **Reflect**  操作源对象内部的数据

 	3.从使用角度对比

​ ref 定义的数据；操作数据需要 .value 读取数据时，不需要.value

​ reactive 定义的数据；操作与读取数据，都不需要.value

##### 6.setup的两个注意点

​ 1.**setup 执行的时机**

​ 在 **beforecreate** 之前执行一次，this是 **undefined**

​ 2.<font color='red'>setup 的参数（重点）</font> 例子（<font color='red'>setup（props,context）</font>）

​ 1. props:值为对象，包含：组件外部传递过来，且组件内部声明接收的属性 (但是子组件必须<font color='red'>先用 props 属性接收</font>， 才可以当作参数使用)

​ 2.context：上下文对象

​ 1.attrs:值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性 相当于 vue2中的 this.$attrs

​ 2.slots:收到的插槽内容，相当于this.$slots

​ 3.emit:分发自定义事件的函数，相当于this.$emit

```
//子组件触发父组件的方法,第一个参数,方法名称.第二个参数,传递的变量
context.emit('masg','666ya')
```

##### 7.计算属性与监听

###### 1.computed函数

​ 与vue2.x中的computed配置功能一样

```
import {reactive, computed} from 'vue'

 setup() {
      let mes = reactive({
        firsename: 'zyj',
        lastname: '==='
      })
      
      //简写形式（只读）
      mes.quanm=computed(()=>{
        return `${mes.firsename}+${mes.lastname}`
      })

      //完整写法(读写都可以 配置项形式)
      mes.quanm = computed({
        get() {
          return `${mes.firsename}+${mes.lastname}`
        },
        set(val) {
          const nameArr=val.split('+')
          mes.firsename=nameArr[0]
          mes.lastname=nameArr[1]
        }
      })
      return {
        mes
      }
    }
```

###### 2.watch监听

​ 与vue2中的watch配置功能一致

​ 三个参数 :第一个监听的属性, 第二个要触发的函数, 第三个就是设置要不要上来就刷新,和 <font color='red'>开启深度监听</font>(需要满足条件)

​    <font color='red'>两个小坑</font> :

​ 1.监听<font color='red'> reactive</font> 定义的属性是,强制开启深度监听(deep:true),  <font color='red'>oldvalue (变化前的值)</font> 无法获取正确的值

​ 2. 监听<font color='red'> reactive</font> 定义的响应式数据中 <font color='red'>某个属性(对象形式)</font> 时:  需要自己手动配置deep才有效

```
 setup() {
      let mes = ref(0)
      let mess = ref('会好的')
      let rea=reactive({
        name:'我是谁',
        obj:{
          salary:20
        }
      })
      // //第一种情况 监听ref定义的一个响应式数据
      watch(mes, (qian, hou) => {
        console.log('变化----', qian, hou)
      }, {immediate: true})

      // //第二中情况  监听ref定义的多个响应式数据
      watch([mes,mess], (qian, hou) => {
        console.log('变化----', qian, hou)
      },{immediate:true})

      // //第三种情况 监听reactive定义的属性  监听reactive里面的数据 deep：true  强制开启
      watch(rea,(qian,hou)=>{
        console.log('rea变化了',qian,hou)
      })

      // //第四中情况 监听reactive定义的属性（基本数据）  变化前的值能正确拿到
      watch(()=>rea.name,(qian,hou)=>{
        console.log('名称变化===',qian,hou)
      })

      //第五种情况 监听监听reactive定义的 引用数据 (需要自己开启 deep:true深度监听)
      watch([()=>rea.name,()=>rea.obj],(qian,hou)=>{
        console.log('监听reactive定义的某一些属性---',qian,hou)
      },{deep:true})
	
	 //第六种
	 watch(()=>{
        return store.state.list // 监听的参数，返回出去，下面就能拿到
      },(todoList: ITodo[])=>{ //这里的参数就是返回的值
        setLocalList(todoList)
   	  })

      return {
        mes,
        mess,
        rea
      }
    }

```

###### 3.watchEffect函数(e发科特)

​ 1.watch的套路是:   既要指明监视的属性,也要指明监听的回调

​ 2.watchEffect的套路是:  不用指明监视哪一个属性,监视的<font color='red'>回调函数中用到哪个属性</font>,就监视哪个属性

​ 3.watchEffect 有点像 computed  <font color='red'> (重点,面试可以聊)</font>

​ 但是 computed 注重的计算出来的值  (回调函数的返回值) , 所有必须要写返回值

​ 而 watchEffect 更注重的是过程,  (回调函数的函数体) , 所有不用写返回值

##### 8.生命周期函数

​ vue3.0中可以继续使用vue2.x中的生命周期函数,<font color='red'>但有两个被更名 (销毁的生命周期变成 取消挂载)</font>

​ beforeDestroy ====>  beforeUnmount  ( 卸载 )

​ destroyed =======> unmounted

​ vue3.0也提供了 组合式api ( <font color='red'>使用是需要引入</font> ) ,与vue2.x对应关系如下

​ beforeCreate ====> setup ( 创建 )

​ Created ====> setup

​ beforeMount ===> onbeforeMount  ( 绑定 )

​ mounted =======>onmounted

​ beforeUpdate ===>onbeforeUpdate  ( 修改 )

​ updated ========>onupdated

​ beforeUnmount ====>  onbeforeUnmount  ( 卸载 )

​ unmounted =======> onunmounted

##### 9.自定义hook函数 (重点)

​ 什么是hook? ------- 本质是一个函数, 把 setup 函数在使用 Composition API（组合式api）进行了封装

​ 类似于vue2.x中的  <font color='red'>mixin</font>

​ 自定义hook的优势,  <font color='red'>复用代码</font>, 让setup中的逻辑更清楚易懂

##### 10.toRef (重点)

​ 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。

​ 语法：const name=toRef （person,'name'）。

​ 应用：要将响应式对象中的某个属性单独提供给外部使用。

​ 扩展：toRefs和toRef功能一致，但可以批量创建多个 ref 对象 语法 <font color='red'> toRefs（person）</font>

### 三.其他 API（不常用）

##### 1.shallowReactive与shallowRef （浅层次） shallow（晒豆 ）

​ shallowReactive：只处理对象最外层属性的响应式（浅层次）

​ shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理（里面的value值是 object对象）

​ 什么时候使用：（可以节省性能）

​ 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===》 shallowReactive

​ 如果有一个对象数据，后续不会修改对象中的内容，而是生成新的对象来代替 ===》shallowRef

##### 2.readonly 与 shallowReadonly	readonly （软的欧蕾）只读

​ readonly ：让一个响应式数据变成只读的 （深只读，所有数据都不可读）

​ shallowReadonly：让一个响应式数据变成只读的 （浅只读，只让数据的第一层 不可读）

​ 应用场景：不希望数据被修改时（比如 组件传递的一个数据，只可以读，不可以修改）

##### 3.toRaw与markRaw

​ toRaw:

​ 作用：将一个由  <span style='background:#eee'>reactive</span> 生成的  **响应式对象**  转为  **普通对象**

 					使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新

​        **markRaw**（重要的一点）

​ 作用：标记一个对象，使其永远不会变成响应式对象

​ 应用场景：

​ 1.有些值不应该被设置为响应式的，例如复杂的第三方类库

​ 2.当渲染具有不可变的大数据列表时，跳过响应式转换可以提高性能

##### 4.customRef

​ 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显示控制

```
import {customRef} from 'vue'

export default {
  setup() {
    function myref(value) {
      let time=null
      return customRef((track,trigger) => {
        return {
          get(){
            console.log(`我被获取了`)
            track()//通知vue追踪数据的变化 重点
            return value
          },
          set(newvalue){
            console.log(`我被设置了`)
            clearTimeout(time)
            //做一个延迟展示的效果 不做防抖，会出现小问题
            time=setTimeout(()=>{
              value=newvalue //将被获取的值，修改为修改后的值
              trigger()//通知vue去重新解析模板 重点
            },1000)
          }
        }
      })
    }
    // let name=ref('hello') 精装房子
    let name = myref('hello') //毛坯房子，可玩行更高
    return {
      name
    }
  }
}
```

​

##### 5.provide和inject （祖孙之前通讯）

​ 作用：实现 <font color='red'>祖孙组件间通讯 </font>

​ 套路：祖组件有一个 **provide** 选项来提供数据，后代组件有一个  **inject**  选项来使用这些数据

​ 写法：

​ 祖先的写法

```
import {provide} from 'vue'
let a=reactive({name:'赵', age:'20'})
provide('name',a)//将自己的数据交出去
```

​ 孙子的写法

```
import {inject,} from 'vue'
const name=inject('name')//拿到交出来的值
return{
  name
}
```

##### 6.响应式数据的判断

- ​ isRef：检查一个值是否为一个 ref 对象
- isReactive：检查一个对象是否是由 Reactive 创建的响应式代理
- isReadonly：检查一个对象是否是由 readonly 创建的只读代理
- isProxy：检查一个对象是否是由 Reactive或者 Readonly 方法创建的代理

### 四.Composition API 的优势

##### 1.Options API存在的问题（vue2 配置式api）

​ 使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods,computed中分别修改，太过于分散

##### 2.Composition API的优势

​ 我们可以更加优雅的组织我们的代码，函数。让相关功能更加有序的组织在一起，**重点**（使用 <font color='red'>hook函数</font>）

### 五.新的组件

##### 1.Fragment (就不需要最外层写一层div)

- ​ 在Vue2中：组件必须有一个根标签
- ​ 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个 **Fragment** 中
- ​ 好处：减少标签层级，减小内存占用

##### 2.Teleport (非常有用)

- 什么式Teleport？ ---是一种能够将我们的组件html结构 <font color='red'>移动到指定位置</font> 的技术

- ```
  <teleport to="body"> <!-- to是传送的位置--> 这里的to也可以写成  #id形式
    <div v-if="isshow" class="mack">
      <div class="dia">
        <h1>我是弹窗</h1>
        <h4>我是内容</h4>
        <h4>我是内容</h4>
        <h4>我是内容</h4>
        <h4>我是内容</h4>
        <button @click="isshow=false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
  ```

##### 3.Suspense 等待异步组件

- ​ 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤

1. 异步引入组件

   ```
   import {defineAsyncComponent} from 'vue'
   const HelloWorld=defineAsyncComponent(()=>import('./components/HelloWorld'))//动态引入组件
   ```

2.使用Suspense包裹组件，并配置好  **default和fallback**

```
<template>
  <div id="app">
    <h3>我是祖先</h3>
    <suspense>
      <template v-slot:default> <!--加载完成时展示的内容-->
        <hello-world></hello-world>
      </template>
      <template v-slot:fallback> <!--没加载完成时展示的内容-->
        <h3>我在加载中...</h3>
      </template>
    </suspense>
  </div>
</template>
```

### 六.其他

##### 1.全局API的转移

- ​ Vue 2.x中有许多全局API和配置

    - 例如注册全局组件，注册全局指令等

    - ```
  Vue.component('',{ data:()=>({ name:'zhao' }), template:'<a>{{name}}</a>'
  })
    ```

  Vue3.0中对api做了调整

  ​ 将全局的API，即Vue.xxx调整到应用实例（app）上

  ##### 2.其他改变

  ​    **vue过渡 transition 中的类名改变 Vue3.0写法**

  ​    **.v-enter-from,**

  ​    **.v-leave-to**{

  ​ opacity:0;

  ​ }

  ​    **.v-enter-from,**

  ​    **.v-leave-to**{

  ​ opacity:1;

  ​ }

  **移除keyCode作为v-on的修饰符，**

  **移除v-on.native修饰符**

  ​ 父组件中绑定事件

  ```
  <sun v-on:close="hand"
  v-on:click="hands"
  > </sun>
  ```

  ​ 子组件中声明自定义事件

  ```
  export default { emits:['close'], }
  ```

​    **移除过滤器**（filter）

​

​

​

​

​

​

​

​	

